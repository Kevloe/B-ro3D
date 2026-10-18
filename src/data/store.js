import { createSampleBuilding } from './sampleBuilding.js';
import { normalizeBuilding } from './model.js';
// Beim Build eingebettet: Über file:// (index.html per Doppelklick) kann der Browser keine Dateien nachladen
import bundledConfig from '../../public/config.json';
import bundledStandard from '../../public/standard.json';

const MAX_UNDO = 100;
const SAVE_DELAY_MS = 300;

/** Einstellungen, ohne neuen Build auf dem Server änderbar (public/config.json). */
const CONFIG_URL = 'config.json';
const DEFAULT_CONFIG = { standard: 'standard.json' };

/** Entwurf aus dem Editor; derselbe Schlüssel wie früher, damit alte lokale Stände erhalten bleiben. */
const DRAFT_KEY = 'buero3d.building.v2';

const IS_FILE = location.protocol === 'file:';

const fingerprint = (building) => JSON.stringify(building);

function readDraft() {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    // Altes Format (vor dem Entwurf): direkt das Gebäude
    return data.building ? data : { building: data, basedOn: null };
  } catch {
    return null;
  }
}

async function fetchJson(url) {
  if (IS_FILE) {
    if (url === CONFIG_URL) return bundledConfig;
    if (url === DEFAULT_CONFIG.standard) return bundledStandard;
    throw new Error(`${url}: über file:// nicht ladbar, nur die beim Build eingebettete standard.json`);
  }
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
  return res.json();
}

/**
 * Zentraler Zustand ohne Server:
 * - Alle sehen den Standard, eine exportierte Gebäudedatei (Pfad in config.json).
 * - Änderungen im Editor landen als Entwurf nur in diesem Browser.
 * - Veröffentlichen = Export herunterladen und auf dem Server als Standard-Datei ablegen.
 *
 * Events: 'change' (Gebäude geändert, detail.source), 'status' (Standard oder Entwurf).
 */
class Store extends EventTarget {
  constructor() {
    super();
    this.config = { ...DEFAULT_CONFIG };
    this.building = normalizeBuilding(createSampleBuilding());
    this.standard = null; // Gebäude aus der Standard-Datei
    this.standardError = null;
    this.isDraft = false;
    this.draftOutdated = false; // Standard wurde nach Beginn des Entwurfs geändert
    this.undoStack = [];
    this.redoStack = [];
    this.saveTimer = null;
    this.status = { state: 'loading' };
  }

  // ---------------------------------------------------------------- Laden

  async init() {
    try {
      this.config = { ...DEFAULT_CONFIG, ...(await fetchJson(CONFIG_URL)) };
    } catch {
      /* ohne config.json gelten die Vorgaben */
    }
    await this.loadStandard();

    const draft = readDraft();
    if (draft) {
      this.building = normalizeBuilding(draft.building);
      this.isDraft = true;
      this.draftOutdated = Boolean(this.standard) && draft.basedOn !== fingerprint(this.standard);
    } else {
      this.building = structuredClone(this.standard ?? normalizeBuilding(createSampleBuilding()));
    }
    this.updateStatus();

    window.addEventListener('storage', (e) => {
      // Entwurf in einem anderen Tab geändert oder verworfen
      if (e.key === DRAFT_KEY) this.reloadFromStorage();
    });
  }

  async loadStandard() {
    try {
      const data = await fetchJson(this.config.standard);
      // Auch eine Datei des früheren Servers ({ version, building }) wird akzeptiert
      this.standard = normalizeBuilding(data.building ?? data);
      this.standardError = null;
    } catch (err) {
      this.standard = null;
      this.standardError = err.message;
    }
  }

  reloadFromStorage() {
    const draft = readDraft();
    this.isDraft = Boolean(draft);
    this.building = draft
      ? normalizeBuilding(draft.building)
      : structuredClone(this.standard ?? normalizeBuilding(createSampleBuilding()));
    this.undoStack = [];
    this.redoStack = [];
    this.updateStatus();
    this.emit('remote');
  }

  // ---------------------------------------------------------------- Bearbeiten

  get canUndo() {
    return this.undoStack.length > 0;
  }

  get canRedo() {
    return this.redoStack.length > 0;
  }

  /** Speichert den aktuellen Stand als Undo-Schritt (z. B. einmal zu Beginn eines Ziehens). */
  checkpoint() {
    this.undoStack.push(JSON.stringify(this.building));
    if (this.undoStack.length > MAX_UNDO) this.undoStack.shift();
    this.redoStack = [];
  }

  mutate(fn, { checkpoint = true } = {}) {
    if (checkpoint) this.checkpoint();
    fn(this.building);
    this.commit('mutate');
  }

  replace(data) {
    const next = normalizeBuilding(data);
    this.checkpoint();
    this.building = next;
    this.commit('replace');
  }

  undo() {
    if (!this.canUndo) return;
    this.redoStack.push(JSON.stringify(this.building));
    this.building = JSON.parse(this.undoStack.pop());
    this.commit('undo');
  }

  redo() {
    if (!this.canRedo) return;
    this.undoStack.push(JSON.stringify(this.building));
    this.building = JSON.parse(this.redoStack.pop());
    this.commit('redo');
  }

  commit(source) {
    if (!this.isDraft) {
      this.isDraft = true;
      this.draftOutdated = false;
      this.updateStatus();
    }
    this.emit(source);
    clearTimeout(this.saveTimer);
    this.saveTimer = setTimeout(() => this.saveDraft(), SAVE_DELAY_MS);
  }

  // ---------------------------------------------------------------- Entwurf

  saveDraft() {
    clearTimeout(this.saveTimer);
    if (!this.isDraft) return;
    const basedOn = readDraft()?.basedOn ?? (this.standard ? fingerprint(this.standard) : null);
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ basedOn, savedAt: new Date().toISOString(), building: this.building }));
      this.updateStatus();
    } catch (err) {
      this.setStatus('error', `Entwurf konnte nicht gespeichert werden: ${err.message}`);
    }
  }

  /** Entwurf verwerfen und den aktuellen Standard laden (Rückgängig ist möglich). */
  async discardDraft() {
    clearTimeout(this.saveTimer);
    await this.loadStandard();
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* nichts zu tun */
    }
    this.checkpoint();
    this.building = structuredClone(this.standard ?? normalizeBuilding(createSampleBuilding()));
    this.isDraft = false;
    this.draftOutdated = false;
    this.updateStatus();
    this.emit('replace');
  }

  /** Entspricht der Entwurf (noch) dem Standard? Dann muss nichts veröffentlicht werden. */
  get matchesStandard() {
    return Boolean(this.standard) && fingerprint(this.building) === fingerprint(this.standard);
  }

  updateStatus() {
    if (this.isDraft) this.setStatus('draft');
    else if (this.standardError) this.setStatus('fallback', this.standardError);
    else this.setStatus('standard');
  }

  // ---------------------------------------------------------------- Events

  setStatus(state, message = '') {
    this.status = { state, message };
    this.dispatchEvent(new CustomEvent('status', { detail: this.status }));
  }

  emit(source) {
    this.dispatchEvent(new CustomEvent('change', { detail: { source } }));
  }

  subscribe(fn) {
    const handler = (e) => fn(e.detail);
    this.addEventListener('change', handler);
    return () => this.removeEventListener('change', handler);
  }

  on(type, fn) {
    const handler = (e) => fn(e.detail);
    this.addEventListener(type, handler);
    return () => this.removeEventListener(type, handler);
  }
}

export const store = new Store();
