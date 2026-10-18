import { store } from '../data/store.js';
import {
  clampItems,
  cloneRoom,
  createFloor,
  createPrinter,
  createRoom,
  createTank,
  defaultFloorName,
  floorBounds,
  isValidIp,
  nextPrinterName,
  nextTankName,
  PRINTER_D,
  PRINTER_W,
  TANK_SIZE,
} from '../data/model.js';
import {
  generatePorts,
  incrementTrailing,
  nextPort,
  parsePort,
  PORTS_PER_PANEL,
  resizePorts,
  switchLabel,
} from '../data/ports.js';
import { ROOM_TYPES, roomColor } from '../data/roomTypes.js';
import { createSampleBuilding } from '../data/sampleBuilding.js';
import { rotateStairDir, STAIR_DIRS, STAIR_SHAPES, stairLayout } from '../data/stairs.js';
import { BuildingView } from '../three/BuildingView.js';
import { clamp, esc, fmt } from '../utils.js';

const MIN_SIZE = 1;
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const TANK_SNAP = 0.1;
const MAX_PORTS = 96;

export function createEditor(root) {
  root.innerHTML = `
    <div class="editor-layout">
      <div class="toolbar">
        <div class="tb-group">
          <span class="tb-label">Etage</span>
          <select id="e-floor" class="input sm"></select>
          <button class="btn sm" data-act="floor-add" title="Neue Etage oben anlegen">+ Etage</button>
          <button class="btn sm" data-act="floor-dup" title="Aktuelle Etage darüber kopieren">Duplizieren</button>
          <button class="btn sm" data-act="floor-up" title="Etage nach oben verschieben">↑</button>
          <button class="btn sm" data-act="floor-down" title="Etage nach unten verschieben">↓</button>
          <button class="btn sm danger" data-act="floor-del" title="Etage löschen">Löschen</button>
        </div>
        <div class="tb-sep"></div>
        <div class="tb-group">
          <div class="seg">
            <button class="btn sm" data-act="tool-select" data-tool="select" title="Auswählen / Verschieben (V)">Auswählen</button>
            <button class="btn sm" data-act="tool-draw" data-tool="draw" title="Raum aufziehen (R)">Raum zeichnen</button>
            <button class="btn sm" data-act="tool-stairs" data-tool="stairs" title="Treppenhaus aufziehen (S)">Treppenhaus</button>
            <button class="btn sm" data-act="tool-tank" data-tool="tank" title="Bodentank in einen Raum setzen (T)">Bodentank setzen</button>
            <button class="btn sm" data-act="tool-printer" data-tool="printer" title="Drucker in einen Raum oder Flur setzen (P)">Drucker setzen</button>
          </div>
          <button class="btn sm" data-act="room-add" title="Raum in der Mitte einfügen">+ Raum</button>
          <span class="tb-label">Raster</span>
          <select id="e-snap" class="input sm">
            <option value="0.1">0,1 m</option>
            <option value="0.25">0,25 m</option>
            <option value="0.5" selected>0,5 m</option>
            <option value="1">1 m</option>
          </select>
        </div>
        <div class="tb-sep"></div>
        <div class="tb-group">
          <button class="btn sm" data-act="undo" title="Rückgängig (Strg+Z)">↶</button>
          <button class="btn sm" data-act="redo" title="Wiederholen (Strg+Y)">↷</button>
        </div>
        <div class="tb-group tb-right">
          <button class="btn sm" data-act="import" title="Exportierte Gebäudedatei in den Entwurf laden">Import</button>
          <button class="btn sm btn-primary" data-act="export" title="Entwurf als Datei speichern – auf dem Server als Standard-Datei ablegen, damit alle ihn sehen">Export</button>
          <button class="btn sm" data-act="standard" title="Entwurf verwerfen und den veröffentlichten Standard laden">Standard laden</button>
          <button class="btn sm" data-act="reset" title="Testgebäude wiederherstellen">Beispiel laden</button>
          <input type="file" id="e-file" accept="application/json,.json" hidden>
        </div>
      </div>
      <div class="editor-main">
        <div class="plan-wrap" id="e-plan-wrap">
          <svg id="e-plan" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="plan-hud">
            <button class="icon-btn" data-act="zoom-in" title="Hineinzoomen">+</button>
            <button class="icon-btn" data-act="zoom-out" title="Herauszoomen">−</button>
            <button class="icon-btn" data-act="zoom-fit" title="Einpassen">⤢</button>
            <span class="hud-coords" id="e-coords"></span>
          </div>
          <div class="plan-help" id="e-help"></div>
        </div>
        <div class="preview-wrap">
          <div class="view3d" id="e-3d"></div>
          <div class="preview-badge">3D-Vorschau</div>
        </div>
        <aside class="sidebar sidebar-right">
          <div id="e-props"></div>
          <section class="panel">
            <h2 class="panel-title">Räume dieser Etage</h2>
            <div class="room-list" id="e-rooms"></div>
          </section>
        </aside>
      </div>
      <div class="modal-backdrop" id="e-modal" hidden></div>
    </div>`;

  const $ = (sel) => root.querySelector(sel);
  const svg = $('#e-plan');
  const planWrap = $('#e-plan-wrap');

  const state = {
    floorId: store.building.floors[0]?.id,
    selectedRoomId: null,
    selectedTankId: null,
    selectedPrinterId: null,
    tool: 'select',
    snap: 0.5,
    tankModal: false,
  };
  const plan = { cx: 15, cz: 6, scale: 30 }; // scale = Pixel pro Meter
  let drag = null;
  let draftRect = null;
  // 'props' | 'modal': dieses Formular beim nächsten Render nicht neu zeichnen, damit der Fokus bleibt
  let changeSource = null;
  let lastTankClick = { id: null, time: 0 };

  const preview = new BuildingView($('#e-3d'), {
    background: '#f2f4f7',
    onRoomClick: (roomId, floorId) => {
      if (roomId && floorId === state.floorId) select(roomId);
    },
    onTankClick: (tankId, roomId, floorId) => {
      if (floorId !== state.floorId) return;
      select(roomId, tankId);
      openTankModal();
    },
    onPrinterClick: (printerId, roomId, floorId) => {
      if (floorId === state.floorId) select(roomId, null, printerId);
    },
  });

  // ---------------------------------------------------------------- helpers

  const floors = () => store.building.floors;
  const currentFloor = () => floors().find((f) => f.id === state.floorId) ?? floors()[0];
  const selectedRoom = () => currentFloor()?.rooms.find((r) => r.id === state.selectedRoomId) ?? null;
  const selectedTank = () => selectedRoom()?.tanks.find((t) => t.id === state.selectedTankId) ?? null;
  const roomById = (b, id) => b.floors.find((f) => f.id === state.floorId)?.rooms.find((r) => r.id === id);
  const tankById = (b) => roomById(b, state.selectedRoomId)?.tanks.find((t) => t.id === state.selectedTankId);
  const selectedPrinter = () => selectedRoom()?.printers.find((p) => p.id === state.selectedPrinterId) ?? null;
  const printerById = (b) =>
    roomById(b, state.selectedRoomId)?.printers.find((p) => p.id === state.selectedPrinterId);
  const snapValue = (v, free, step = state.snap) => (free ? Math.round(v * 100) / 100 : Math.round(v / step) * step);
  const round2 = (v) => Math.round(v * 100) / 100;

  function toWorld(e) {
    const r = svg.getBoundingClientRect();
    return {
      x: plan.cx + (e.clientX - r.left - r.width / 2) / plan.scale,
      z: plan.cz + (e.clientY - r.top - r.height / 2) / plan.scale,
    };
  }

  /** Oberster Raum unter einem Punkt (Räume vor Fluren). */
  function roomAt(p) {
    const hits = currentFloor().rooms.filter(
      (r) => p.x >= r.x && p.x <= r.x + r.width && p.z >= r.z && p.z <= r.z + r.depth,
    );
    return hits.find((r) => r.type !== 'corridor') ?? hits[0] ?? null;
  }

  function fitPlan() {
    const floor = currentFloor();
    let b = floor && floorBounds(floor);
    if (!b) {
      // leere Etage: am Gebäude ausrichten
      const all = floors().map(floorBounds).filter(Boolean);
      b = all.length
        ? {
            minX: Math.min(...all.map((x) => x.minX)),
            minZ: Math.min(...all.map((x) => x.minZ)),
            maxX: Math.max(...all.map((x) => x.maxX)),
            maxZ: Math.max(...all.map((x) => x.maxZ)),
          }
        : { minX: 0, minZ: 0, maxX: 20, maxZ: 12 };
    }
    const W = svg.clientWidth || 600;
    const H = svg.clientHeight || 400;
    const margin = 3;
    plan.scale = clamp(Math.min(W / (b.maxX - b.minX + margin * 2), H / (b.maxZ - b.minZ + margin * 2)), 4, 200);
    plan.cx = (b.minX + b.maxX) / 2;
    plan.cz = (b.minZ + b.maxZ) / 2;
  }

  function zoomAt(factor, clientX, clientY) {
    const r = svg.getBoundingClientRect();
    const px = (clientX ?? r.left + r.width / 2) - r.left - r.width / 2;
    const py = (clientY ?? r.top + r.height / 2) - r.top - r.height / 2;
    const wx = plan.cx + px / plan.scale;
    const wz = plan.cz + py / plan.scale;
    plan.scale = clamp(plan.scale * factor, 4, 300);
    plan.cx = wx - px / plan.scale;
    plan.cz = wz - py / plan.scale;
    renderPlan();
  }

  function overlappingIds(rooms) {
    const ids = new Set();
    for (let i = 0; i < rooms.length; i++) {
      for (let j = i + 1; j < rooms.length; j++) {
        const a = rooms[i];
        const b = rooms[j];
        const w = Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x);
        const d = Math.min(a.z + a.depth, b.z + b.depth) - Math.max(a.z, b.z);
        if (w > 0.01 && d > 0.01) ids.add(a.id).add(b.id);
      }
    }
    return ids;
  }

  // ---------------------------------------------------------------- rendering

  function renderPlan() {
    const floor = currentFloor();
    const W = svg.clientWidth;
    const H = svg.clientHeight;
    if (!floor || !W || !H) return;

    const s = plan.scale;
    const px = 1 / s;
    const x0 = plan.cx - W / 2 / s;
    const z0 = plan.cz - H / 2 / s;
    svg.setAttribute('viewBox', `${x0} ${z0} ${W / s} ${H / s}`);

    const minor = s < 10 ? 5 : 1;
    const major = s < 10 ? 25 : 5;
    const parts = [];

    parts.push(`
      <defs>
        <pattern id="g-minor" width="${minor}" height="${minor}" patternUnits="userSpaceOnUse">
          <path d="M ${minor} 0 L 0 0 0 ${minor}" fill="none" stroke="#e4e8ee" stroke-width="${px}"/>
        </pattern>
        <pattern id="g-major" width="${major}" height="${major}" patternUnits="userSpaceOnUse">
          <path d="M ${major} 0 L 0 0 0 ${major}" fill="none" stroke="#cdd3dc" stroke-width="${px}"/>
        </pattern>
      </defs>
      <rect x="${x0}" y="${z0}" width="${W / s}" height="${H / s}" fill="url(#g-minor)"/>
      <rect x="${x0}" y="${z0}" width="${W / s}" height="${H / s}" fill="url(#g-major)"/>
      <path d="M ${x0} 0 H ${x0 + W / s} M 0 ${z0} V ${z0 + H / s}" stroke="#aeb7c3" stroke-width="${px}"/>`);

    // Etage darunter als Referenz
    const idx = floors().indexOf(floor);
    const below = floors()[idx - 1];
    if (below) {
      for (const r of below.rooms) {
        parts.push(
          `<rect class="ref-room" x="${r.x}" y="${r.z}" width="${r.width}" height="${r.depth}"
            stroke-width="${px}" stroke-dasharray="${4 * px} ${3 * px}"/>`,
        );
      }
    }

    const hasFloorAbove = idx < floors().length - 1;
    const overlaps = overlappingIds(floor.rooms);
    const ordered = [...floor.rooms].sort((a, b) => (a.type === 'corridor' ? -1 : 0) - (b.type === 'corridor' ? -1 : 0));
    for (const r of ordered) {
      const sel = r.id === state.selectedRoomId;
      const showText = r.width * s > 44 && r.depth * s > 26;
      parts.push(`
        <g class="room${sel ? ' selected' : ''}${overlaps.has(r.id) ? ' overlap' : ''}" data-room="${r.id}">
          <rect x="${r.x}" y="${r.z}" width="${r.width}" height="${r.depth}"
            fill="${roomColor(r)}" fill-opacity="${r.type === 'corridor' ? 0.35 : 0.55}"
            stroke-width="${(sel ? 2.5 : 1.25) * px}"/>
          ${r.type === 'stairs' && hasFloorAbove ? renderStairs(r, floor.height, px) : ''}
          ${
            showText
              ? `<text x="${r.x + r.width / 2}" y="${r.z + 16 * px}" font-size="${13 * px}" class="room-name">${esc(r.name)}</text>`
              : ''
          }
        </g>`);
    }

    // Bodentanks (mindestens 12 px groß, damit sie greifbar bleiben)
    const ts = Math.max(TANK_SIZE, 12 * px);
    const showTankText = s > 18;
    for (const r of floor.rooms) {
      for (const t of r.tanks) {
        const tx = r.x + t.x;
        const tz = r.z + t.z;
        const sel = t.id === state.selectedTankId;
        parts.push(`
          <g class="tank${sel ? ' selected' : ''}" data-tank="${t.id}" data-tank-room="${r.id}">
            <rect x="${tx - ts / 2}" y="${tz - ts / 2}" width="${ts}" height="${ts}" rx="${2 * px}"
              stroke-width="${(sel ? 2 : 1.25) * px}"/>
            <path d="M ${tx - ts / 4} ${tz} H ${tx + ts / 4} M ${tx} ${tz - ts / 4} V ${tz + ts / 4}" stroke-width="${1.25 * px}"/>
            ${
              showTankText
                ? `<text x="${tx}" y="${tz + ts / 2 + 9 * px}" font-size="${10 * px}">${esc(t.name)} · ${t.ports.length}</text>`
                : ''
            }
          </g>`);
      }
    }

    // Drucker (mindestens 16 × 13 px)
    const pw = Math.max(PRINTER_W, 16 * px);
    const pd = Math.max(PRINTER_D, 13 * px);
    for (const r of floor.rooms) {
      for (const p of r.printers) {
        const cx = r.x + p.x;
        const cz = r.z + p.z;
        const sel = p.id === state.selectedPrinterId;
        parts.push(`
          <g class="printer${sel ? ' selected' : ''}" data-printer="${p.id}" data-printer-room="${r.id}">
            <rect x="${cx - pw / 2}" y="${cz - pd / 2}" width="${pw}" height="${pd}" rx="${3 * px}"
              stroke-width="${(sel ? 2 : 1.25) * px}"/>
            <rect class="paper" x="${cx - pw * 0.28}" y="${cz - pd * 0.18}" width="${pw * 0.56}" height="${pd * 0.36}"/>
            ${
              showTankText
                ? `<text x="${cx}" y="${cz + pd / 2 + 9 * px}" font-size="${10 * px}">${esc(p.name)}</text>`
                : ''
            }
          </g>`);
      }
    }

    const sel = selectedRoom();
    if (sel && !state.selectedTankId && !state.selectedPrinterId && state.tool === 'select') {
      const hs = 9 * px;
      const pts = {
        nw: [sel.x, sel.z],
        n: [sel.x + sel.width / 2, sel.z],
        ne: [sel.x + sel.width, sel.z],
        e: [sel.x + sel.width, sel.z + sel.depth / 2],
        se: [sel.x + sel.width, sel.z + sel.depth],
        s: [sel.x + sel.width / 2, sel.z + sel.depth],
        sw: [sel.x, sel.z + sel.depth],
        w: [sel.x, sel.z + sel.depth / 2],
      };
      parts.push(`
        <text class="dim" x="${sel.x + sel.width / 2}" y="${sel.z - 10 * px}" font-size="${11 * px}">${fmt(sel.width, 2)} m</text>
        <text class="dim" x="${sel.x - 10 * px}" y="${sel.z + sel.depth / 2}" font-size="${11 * px}"
          transform="rotate(-90 ${sel.x - 10 * px} ${sel.z + sel.depth / 2})">${fmt(sel.depth, 2)} m</text>`);
      for (const h of HANDLES) {
        const [hx, hz] = pts[h];
        parts.push(
          `<rect class="handle h-${h}" data-handle="${h}" x="${hx - hs / 2}" y="${hz - hs / 2}"
            width="${hs}" height="${hs}" stroke-width="${1.5 * px}"/>`,
        );
      }
    }

    if (draftRect) {
      const { x, z, width, depth } = draftRect;
      parts.push(`
        <rect class="draft" x="${x}" y="${z}" width="${width}" height="${depth}"
          stroke-width="${2 * px}" stroke-dasharray="${6 * px} ${4 * px}"/>
        <text class="dim" x="${x + width / 2}" y="${z + depth / 2}" font-size="${12 * px}">
          ${fmt(width, 2)} × ${fmt(depth, 2)} m</text>`);
    }

    svg.innerHTML = parts.join('');
    planWrap.dataset.tool = state.tool;
  }

  /** Stufen als Linien, Podest und Pfeil in Laufrichtung (Grundriss-Symbol einer Treppe). */
  function renderStairs(room, height, px) {
    const { steps, landings, path } = stairLayout(room, height);
    const rects = [...steps, ...landings]
      .map((r) => `<rect x="${r.x}" y="${r.z}" width="${r.w}" height="${r.d}"/>`)
      .join('');
    const [ax, az] = path.at(-1);
    const [bx, bz] = path.at(-2);
    const len = Math.hypot(ax - bx, az - bz) || 1;
    const [ux, uz] = [(ax - bx) / len, (az - bz) / len];
    const head = Math.min(0.35, len / 2);
    const tip = `M ${ax - ux * head - uz * head * 0.6} ${az - uz * head + ux * head * 0.6} L ${ax} ${az}
      L ${ax - ux * head + uz * head * 0.6} ${az - uz * head - ux * head * 0.6}`;
    const [sx, sz] = path[0];
    return `
      <g class="stair" stroke-width="${px}">
        ${rects}
        <circle cx="${sx}" cy="${sz}" r="${Math.max(0.08, 3 * px)}"/>
        <path class="stair-arrow" d="M ${path.map((p) => p.join(' ')).join(' L ')} ${tip}" stroke-width="${1.5 * px}"/>
      </g>`;
  }

  function renderToolbar() {
    $('#e-floor').innerHTML = [...floors()]
      .reverse()
      .map((f) => `<option value="${f.id}" ${f.id === state.floorId ? 'selected' : ''}>${esc(f.name)}</option>`)
      .join('');
    const idx = floors().findIndex((f) => f.id === state.floorId);
    root.querySelector('[data-act="floor-del"]').disabled = floors().length <= 1;
    root.querySelector('[data-act="floor-up"]').disabled = idx >= floors().length - 1;
    root.querySelector('[data-act="floor-down"]').disabled = idx <= 0;
    root.querySelector('[data-act="undo"]').disabled = !store.canUndo;
    root.querySelector('[data-act="redo"]').disabled = !store.canRedo;
    root.querySelectorAll('[data-tool]').forEach((b) => b.classList.toggle('active', b.dataset.tool === state.tool));
    $('#e-help').textContent = {
      draw: 'Raum zeichnen: Rechteck mit gedrückter Maustaste aufziehen · Esc zum Beenden',
      stairs: 'Treppenhaus zeichnen: Rechteck aufziehen · Form und Laufrichtung rechts einstellen · Esc zum Beenden',
      tank: 'Bodentank setzen: in einen Raum klicken · Esc zum Beenden',
      printer: 'Drucker setzen: in einen Raum oder Flur klicken · Esc zum Beenden',
      select:
        'Klicken = auswählen · Ziehen = verschieben · Griffe = Größe ändern · Doppelklick auf Bodentank = Ports bearbeiten · P = Drucker setzen · Alt = ohne Raster',
    }[state.tool];
  }

  /** Kompakte Anzeige des ausgewählten Tanks in der Sidebar; bearbeitet wird im Modal. */
  function renderTankSection(tank) {
    const patched = tank.ports.filter((p) => switchLabel(p)).length;
    return `
      <section class="panel panel-tank">
        <h2 class="panel-title">Bodentank</h2>
        <div class="tank-summary">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="tank-summary-name">${esc(tank.name)}</div>
            <div class="muted">${tank.ports.length} Ports · ${patched} am Switch</div>
          </div>
        </div>
        <button class="btn btn-block btn-primary" data-act="tank-edit">Ports bearbeiten …</button>
        <div class="btn-row">
          <button class="btn sm" data-act="tank-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Löschen</button>
        </div>
        <span class="hint-text">Tipp: Doppelklick auf den Tank oder Enter öffnet den Editor.</span>
      </section>`;
  }

  function renderPrinterSection(printer) {
    const ipInvalid = printer.ip && !isValidIp(printer.ip);
    return `
      <section class="panel panel-printer">
        <h2 class="panel-title">Drucker</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="printer:name" value="${esc(printer.name)}"></label>
        <label class="field"><span>IP-Adresse</span>
          <input class="input mono" data-bind="printer:ip" value="${esc(printer.ip)}" placeholder="z. B. 192.168.10.50" inputmode="decimal" spellcheck="false">
        </label>
        <span class="field-warn" data-out="ip-warn" ${ipInvalid ? '' : 'hidden'}>Das ist keine gültige IPv4-Adresse.</span>
        <div class="btn-row">
          <button class="btn sm" data-act="printer-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="printer-del">Löschen</button>
        </div>
      </section>`;
  }

  function renderTankModal() {
    const modal = $('#e-modal');
    const tank = state.tankModal && selectedTank();
    if (!tank) {
      state.tankModal = false;
      modal.hidden = true;
      modal.innerHTML = '';
      return;
    }
    const room = selectedRoom();
    const first = parsePort(tank.ports[0]?.name) ?? { panel: 1, port: 1 };
    const firstSwitch = tank.ports.find((p) => p.switch)?.switch ?? '';
    const switches = new Set();
    for (const f of floors())
      for (const r of f.rooms) for (const t of r.tanks) for (const p of t.ports) if (p.switch) switches.add(p.switch);
    const scrollTop = modal.querySelector('.port-table-wrap')?.scrollTop ?? 0;

    modal.hidden = false;
    modal.innerHTML = `
      <div class="modal modal-wide" role="dialog" aria-modal="true" aria-labelledby="e-modal-title">
        <div class="modal-head">
          <span class="tank-icon-lg"></span>
          <div>
            <div class="modal-title" id="e-modal-title">Bodentank bearbeiten</div>
            <div class="modal-sub">${esc(room.name)} · ${esc(currentFloor().name)}</div>
          </div>
          <button class="icon-btn" data-act="modal-close" title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <div class="modal-fields">
            <label class="field"><span>Name</span><input class="input" data-bind="tank:name" value="${esc(tank.name)}"></label>
            <label class="field"><span>Anzahl Ports</span>
              <input class="input" type="number" min="0" max="${MAX_PORTS}" step="1" data-bind="tank:count" value="${tank.ports.length}">
            </label>
          </div>

          <div class="bulk-tools">
            <div class="bulk-tool">
              <span class="bulk-title">Patchfeld-Ports fortlaufend benennen</span>
              <div class="bulk-row">
                <span class="prefix">ab P</span>
                <input class="input" type="number" min="1" step="1" id="e-start-panel" value="${first.panel}" title="Patchfeld">
                <span class="prefix">/</span>
                <input class="input" type="number" min="1" max="${PORTS_PER_PANEL}" step="1" id="e-start-port" value="${first.port}" title="Port (1–${PORTS_PER_PANEL})">
                <button class="btn sm" data-act="ports-renumber">Übernehmen</button>
              </div>
              <span class="hint-text">Nach Port ${PORTS_PER_PANEL} geht es mit dem nächsten Patchfeld weiter.</span>
            </div>
            <div class="bulk-tool">
              <span class="bulk-title">Switch fortlaufend zuweisen</span>
              <div class="bulk-row">
                <input class="input input-switch" id="e-bulk-switch" list="e-switches" placeholder="Switch, z. B. Switch P1" value="${esc(firstSwitch)}">
                <span class="prefix">ab Port</span>
                <input class="input" id="e-bulk-switch-port" value="${esc(tank.ports.find((p) => p.switchPort)?.switchPort ?? '1')}" title="Erster Switch-Port">
                <button class="btn sm" data-act="switch-assign">Übernehmen</button>
              </div>
              <span class="hint-text">Weist allen Ports der Reihe nach Switch-Ports zu. Einzelne Ports kannst du unten ändern.</span>
            </div>
          </div>

          <div class="port-table-wrap">
            ${
              tank.ports.length
                ? `<table class="port-table">
                <thead>
                  <tr><th>#</th><th>Patchfeld-Port</th><th>Switch</th><th>Switch-Port</th><th></th></tr>
                </thead>
                <tbody>
                  ${tank.ports
                    .map(
                      (p, i) => `
                  <tr>
                    <td class="pt-idx">${i + 1}</td>
                    <td><input class="input sm" data-bind="port:${i}:name" value="${esc(p.name)}" placeholder="P01/01"></td>
                    <td><input class="input sm" data-bind="port:${i}:switch" list="e-switches" value="${esc(p.switch)}" placeholder="—"></td>
                    <td><input class="input sm pt-swport" data-bind="port:${i}:switchPort" value="${esc(p.switchPort)}" placeholder="—"></td>
                    <td><button class="icon-btn sm" data-act="port-del" data-index="${i}" title="Port entfernen">✕</button></td>
                  </tr>`,
                    )
                    .join('')}
                </tbody>
              </table>`
                : `<div class="empty">Keine Ports. Lege über „Anzahl Ports“ oder „+ Port“ welche an.</div>`
            }
          </div>
          <datalist id="e-switches">${[...switches].map((s) => `<option value="${esc(s)}">`).join('')}</datalist>
        </div>
        <div class="modal-foot">
          <button class="btn sm" data-act="port-add">+ Port</button>
          <button class="btn sm" data-act="tank-dup">Tank duplizieren</button>
          <button class="btn sm danger" data-act="tank-del">Tank löschen</button>
          <button class="btn btn-primary" data-act="modal-close">Fertig</button>
        </div>
      </div>`;
    const wrap = modal.querySelector('.port-table-wrap');
    if (wrap) wrap.scrollTop = scrollTop;
  }

  function openTankModal() {
    if (!selectedTank()) return;
    state.tankModal = true;
    renderTankModal();
    $('#e-modal [data-bind="tank:name"]')?.focus();
  }

  function closeTankModal() {
    state.tankModal = false;
    renderTankModal();
  }

  function renderProps() {
    const room = selectedRoom();
    const tank = selectedTank();
    const printer = selectedPrinter();
    const floor = currentFloor();
    const b = store.building;
    const typeOptions = Object.entries(ROOM_TYPES)
      .map(([k, t]) => `<option value="${k}" ${room?.type === k ? 'selected' : ''}>${esc(t.label)}</option>`)
      .join('');

    const roomSection = room
      ? `
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="room:name" value="${esc(room.name)}"></label>
        <label class="field"><span>Typ</span><select class="input" data-bind="room:type">${typeOptions}</select></label>
        <div class="field">
          <span>Farbe</span>
          <div class="color-row">
            <input type="color" data-bind="room:color" value="${roomColor(room)}">
            ${room.color ? `<button class="btn sm" data-act="color-reset">Typfarbe</button>` : `<span class="muted">Typfarbe</span>`}
          </div>
        </div>
        ${
          room.type === 'stairs'
            ? `<label class="field"><span>Treppenform</span><select class="input" data-bind="room:stairShape">${Object.entries(STAIR_SHAPES)
                .map(([k, l]) => `<option value="${k}" ${room.stairShape === k ? 'selected' : ''}>${esc(l)}</option>`)
                .join('')}</select></label>
        <div class="field">
          <span>Laufrichtung (aufwärts)</span>
          <div class="color-row">
            <select class="input" data-bind="room:stairDir">${Object.entries(STAIR_DIRS)
              .map(([k, l]) => `<option value="${k}" ${room.stairDir === k ? 'selected' : ''}>${esc(l)}</option>`)
              .join('')}</select>
            <button class="btn sm" data-act="stairs-rotate" title="Um 90° drehen">↻</button>
          </div>
          ${
            floors().indexOf(floor) === floors().length - 1
              ? `<span class="hint-text">Oberste Etage: Hier führt keine Treppe weiter nach oben.</span>`
              : ''
          }
        </div>`
            : ''
        }
        <label class="field"><span>Nutzer / Team</span><input class="input" data-bind="room:occupant" value="${esc(room.occupant)}" placeholder="z. B. Team Vertrieb"></label>
        <label class="field"><span>Beschreibung</span><textarea class="input" rows="2" data-bind="room:description">${esc(room.description)}</textarea></label>
        <div class="field-grid">
          <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="room:x" value="${round2(room.x)}"></label>
          <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="room:z" value="${round2(room.z)}"></label>
          <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:width" value="${round2(room.width)}"></label>
          <label class="field"><span>Tiefe (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:depth" value="${round2(room.depth)}"></label>
        </div>
        <div class="field">
          <span>Bodentanks</span>
          <div class="tank-list">
            ${
              room.tanks.length
                ? room.tanks
                    .map(
                      (t) => `<button class="tank-chip ${t.id === state.selectedTankId ? 'active' : ''}" data-act="tank-edit" data-tank="${t.id}" title="Ports bearbeiten">
                        <span class="tl-icon"></span>${esc(t.name)}<span class="tc-count">${t.ports.length} Ports</span>
                      </button>`,
                    )
                    .join('')
                : `<span class="muted">Keine Bodentanks.</span>`
            }
          </div>
          <button class="btn sm" data-act="tank-add">+ Bodentank</button>
        </div>
        <div class="field">
          <span>Drucker</span>
          <div class="tank-list">
            ${
              room.printers.length
                ? room.printers
                    .map(
                      (p) => `<button class="tank-chip ${p.id === state.selectedPrinterId ? 'active' : ''}" data-act="printer-select" data-printer="${p.id}">
                        <span class="pl-icon"></span>${esc(p.name)}<span class="tc-count mono">${esc(p.ip || '–')}</span>
                      </button>`,
                    )
                    .join('')
                : `<span class="muted">Keine Drucker.</span>`
            }
          </div>
          <button class="btn sm" data-act="printer-add">+ Drucker</button>
        </div>
        <div class="btn-row">
          <button class="btn sm" data-act="room-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="room-del">Löschen</button>
        </div>
      </section>`
      : `
      <section class="panel">
        <h2 class="panel-title">Raum</h2>
        <div class="empty">Kein Raum ausgewählt. Klicke einen Raum im Grundriss an oder zeichne einen neuen (R).</div>
      </section>`;

    $('#e-props').innerHTML = `
      ${tank ? renderTankSection(tank) : ''}
      ${printer ? renderPrinterSection(printer) : ''}
      ${roomSection}
      <section class="panel">
        <h2 class="panel-title">Etage</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="floor:name" value="${esc(floor.name)}"></label>
        <label class="field"><span>Geschosshöhe (m)</span><input class="input" type="number" step="0.1" min="2" max="10" data-bind="floor:height" value="${floor.height}"></label>
      </section>
      <section class="panel">
        <h2 class="panel-title">Gebäude</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="building:name" value="${esc(b.name)}"></label>
      </section>`;
  }

  function renderRoomList() {
    const rooms = [...currentFloor().rooms].sort((a, b) => a.name.localeCompare(b.name, 'de', { numeric: true }));
    $('#e-rooms').innerHTML = rooms.length
      ? rooms
          .map(
            (r) => `
        <button class="room-item ${r.id === state.selectedRoomId ? 'active' : ''}" data-room="${r.id}">
          <span class="swatch" style="background:${roomColor(r)}"></span>
          <span class="ri-text"><span class="ri-name">${esc(r.name)}</span></span>
          ${r.printers.length ? `<span class="ri-meta" title="Drucker">${r.printers.length} DR</span>` : ''}
          ${r.tanks.length ? `<span class="ri-meta" title="Bodentanks">${r.tanks.length} BT</span>` : ''}
        </button>`,
          )
          .join('')
      : `<div class="empty">Noch keine Räume.</div>`;
  }

  function renderAll() {
    renderToolbar();
    renderPlan();
    renderProps();
    renderRoomList();
  }

  function syncPreview() {
    preview.setBuilding(store.building);
    preview.setFocusFloor(state.floorId);
    preview.setSelectedRoom(state.selectedRoomId);
    preview.setSelectedTank(state.selectedTankId);
    preview.setSelectedPrinter(state.selectedPrinterId);
  }

  // ---------------------------------------------------------------- actions

  function select(roomId, tankId = null, printerId = null) {
    if (
      state.selectedRoomId === roomId &&
      state.selectedTankId === tankId &&
      state.selectedPrinterId === printerId
    )
      return;
    state.selectedRoomId = roomId;
    state.selectedTankId = roomId ? tankId : null;
    state.selectedPrinterId = roomId ? printerId : null;
    preview.setSelectedRoom(roomId);
    preview.setSelectedTank(state.selectedTankId);
    preview.setSelectedPrinter(state.selectedPrinterId);
    renderPlan();
    renderProps();
    renderRoomList();
  }

  function setFloor(floorId, { fit = false } = {}) {
    state.floorId = floorId;
    state.selectedRoomId = null;
    state.selectedTankId = null;
    state.selectedPrinterId = null;
    preview.setFocusFloor(floorId);
    preview.setSelectedRoom(null);
    preview.setSelectedTank(null);
    preview.setSelectedPrinter(null);
    preview.fitAll();
    if (fit) fitPlan();
    renderAll();
  }

  function setTool(tool) {
    state.tool = tool;
    renderToolbar();
    renderPlan();
  }

  function addRoom(props) {
    const floor = currentFloor();
    const room = createRoom({ name: `Raum ${floor.rooms.length + 1}`, ...props });
    store.mutate((b) => b.floors.find((f) => f.id === floor.id).rooms.push(room));
    select(room.id);
  }

  /** Höchster vergebener Port im Gebäude, z. B. { panel: 3, port: 12 } für P03/12. */
  function highestPort() {
    let best = null;
    for (const f of floors())
      for (const r of f.rooms)
        for (const t of r.tanks)
          for (const p of t.ports) {
            const parsed = parsePort(p.name);
            if (parsed && (!best || parsed.panel * 1000 + parsed.port > best.panel * 1000 + best.port)) best = parsed;
          }
    return best;
  }

  /** Neuer Bodentank mit 4 Ports, fortlaufend nach dem höchsten Port im Gebäude benannt. */
  function addTank(room, pos, props = {}) {
    const last = highestPort();
    const tank = createTank({
      name: nextTankName(room),
      x: round2(pos.x),
      z: round2(pos.z),
      ports: generatePorts(last ? nextPort(last) : { panel: 1, port: 1 }, 4),
      ...props,
    });
    store.mutate((b) => {
      const r = roomById(b, room.id);
      r.tanks.push(tank);
      clampItems(r);
    });
    select(room.id, tank.id);
  }

  function addPrinter(room, pos, props = {}) {
    const printer = createPrinter({
      name: nextPrinterName(store.building),
      x: round2(pos.x),
      z: round2(pos.z),
      ...props,
    });
    store.mutate((b) => {
      const r = roomById(b, room.id);
      r.printers.push(printer);
      clampItems(r);
    });
    select(room.id, null, printer.id);
  }

  function deleteSelected() {
    if (state.selectedPrinterId) {
      const printerId = state.selectedPrinterId;
      state.selectedPrinterId = null;
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        r.printers = r.printers.filter((p) => p.id !== printerId);
      });
      return;
    }
    if (state.selectedTankId) {
      const tankId = state.selectedTankId;
      state.selectedTankId = null;
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        r.tanks = r.tanks.filter((t) => t.id !== tankId);
      });
      return;
    }
    const id = state.selectedRoomId;
    if (!id) return;
    state.selectedRoomId = null;
    store.mutate((b) => {
      const f = b.floors.find((x) => x.id === state.floorId);
      f.rooms = f.rooms.filter((r) => r.id !== id);
    });
  }

  function duplicateSelected() {
    const room = selectedRoom();
    if (!room) return;
    const tank = selectedTank();
    if (tank) {
      addTank(room, { x: tank.x + 0.6, z: tank.z }, { ports: tank.ports.map((p) => ({ ...p })) });
      return;
    }
    const printer = selectedPrinter();
    if (printer) {
      addPrinter(room, { x: printer.x + 0.8, z: printer.z }, { ip: '' });
      return;
    }
    addRoom(cloneRoom(room, { name: `${room.name} (Kopie)`, x: room.x + 1, z: room.z + 1 }));
  }

  function moveSelected(dx, dz) {
    if (!selectedRoom()) return;
    store.mutate((b) => {
      const item = tankById(b) ?? printerById(b);
      if (item) {
        item.x = round2(item.x + dx);
        item.z = round2(item.z + dz);
        clampItems(roomById(b, state.selectedRoomId));
        return;
      }
      const r = roomById(b, state.selectedRoomId);
      r.x = round2(r.x + dx);
      r.z = round2(r.z + dz);
    });
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(store.building, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    // Gleicher Name wie die Standard-Datei, damit sie auf dem Server direkt ersetzt werden kann
    a.download = store.config.standard.split('/').pop();
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const actions = {
    'floor-add': () => {
      const floor = createFloor({ name: defaultFloorName(floors().length), height: currentFloor()?.height ?? 3 });
      store.mutate((b) => b.floors.push(floor));
      setFloor(floor.id);
    },
    'floor-dup': () => {
      const src = currentFloor();
      const idx = floors().indexOf(src);
      const copy = createFloor({
        name: `${src.name} (Kopie)`,
        height: src.height,
        rooms: src.rooms.map((r) => cloneRoom(r)),
      });
      store.mutate((b) => b.floors.splice(idx + 1, 0, copy));
      setFloor(copy.id);
    },
    'floor-up': () => moveFloor(1),
    'floor-down': () => moveFloor(-1),
    'floor-del': () => {
      const floor = currentFloor();
      if (floors().length <= 1) return;
      if (!confirm(`Etage „${floor.name}“ mit ${floor.rooms.length} Räumen löschen?`)) return;
      const idx = floors().indexOf(floor);
      store.mutate((b) => b.floors.splice(idx, 1));
      setFloor(floors()[Math.max(0, idx - 1)].id);
    },
    'tool-select': () => setTool('select'),
    'tool-draw': () => setTool('draw'),
    'tool-stairs': () => setTool('stairs'),
    'stairs-rotate': () => {
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        r.stairDir = rotateStairDir(r.stairDir);
      });
    },
    'tool-tank': () => setTool('tank'),
    'tool-printer': () => setTool('printer'),
    'printer-add': () => {
      const room = selectedRoom();
      if (room) addPrinter(room, { x: room.width / 2, z: room.depth / 2 });
    },
    'printer-select': (btn) => select(state.selectedRoomId, null, btn.dataset.printer),
    'printer-dup': duplicateSelected,
    'printer-del': deleteSelected,
    'room-add': () => {
      const size = 4;
      addRoom({
        x: snapValue(plan.cx - size / 2),
        z: snapValue(plan.cz - size / 2),
        width: size,
        depth: size,
      });
    },
    'room-dup': duplicateSelected,
    'room-del': deleteSelected,
    'color-reset': () => {
      store.mutate((b) => (roomById(b, state.selectedRoomId).color = null));
    },
    'tank-add': () => {
      const room = selectedRoom();
      if (room) addTank(room, { x: room.width / 2, z: room.depth / 2 });
    },
    'tank-edit': (btn) => {
      if (btn.dataset.tank) select(state.selectedRoomId, btn.dataset.tank);
      openTankModal();
    },
    'modal-close': closeTankModal,
    'switch-assign': () => {
      const sw = $('#e-bulk-switch').value.trim();
      const start = $('#e-bulk-switch-port').value.trim() || '1';
      store.mutate((b) => {
        tankById(b).ports.forEach((p, i) => {
          p.switch = sw;
          p.switchPort = incrementTrailing(start, i);
        });
      });
    },
    'tank-dup': duplicateSelected,
    'tank-del': deleteSelected,
    'port-add': () => {
      store.mutate((b) => {
        const t = tankById(b);
        t.ports = resizePorts(t.ports, Math.min(MAX_PORTS, t.ports.length + 1));
      });
    },
    'port-del': (btn) => {
      const i = Number(btn.dataset.index);
      store.mutate((b) => tankById(b).ports.splice(i, 1));
    },
    'ports-renumber': () => {
      const panel = Math.max(1, parseInt($('#e-start-panel').value, 10) || 1);
      const port = clamp(parseInt($('#e-start-port').value, 10) || 1, 1, PORTS_PER_PANEL);
      store.mutate((b) => {
        const t = tankById(b);
        const names = generatePorts({ panel, port }, t.ports.length);
        t.ports = t.ports.map((p, i) => ({ ...p, name: names[i].name }));
      });
    },
    undo: () => store.undo(),
    redo: () => store.redo(),
    export: exportJson,
    import: () => $('#e-file').click(),
    standard: async () => {
      if (!store.matchesStandard && !confirm('Entwurf verwerfen und den Standard laden? (Rückgängig ist möglich)')) return;
      await store.discardDraft();
      setFloor(floors()[0].id, { fit: true });
    },
    reset: () => {
      if (!confirm('Aktuelles Gebäude durch das Testgebäude ersetzen? (Rückgängig ist möglich)')) return;
      store.replace(createSampleBuilding());
      setFloor(floors()[0].id, { fit: true });
    },
    'zoom-in': () => zoomAt(1.25),
    'zoom-out': () => zoomAt(0.8),
    'zoom-fit': () => {
      fitPlan();
      renderPlan();
    },
  };

  function moveFloor(dir) {
    const idx = floors().findIndex((f) => f.id === state.floorId);
    const target = idx + dir;
    if (target < 0 || target >= floors().length) return;
    store.mutate((b) => {
      const [f] = b.floors.splice(idx, 1);
      b.floors.splice(target, 0, f);
    });
  }

  // ---------------------------------------------------------------- events

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (btn && !btn.disabled) actions[btn.dataset.act]?.(btn);
  });

  $('#e-floor').addEventListener('change', (e) => setFloor(e.target.value));
  $('#e-snap').addEventListener('change', (e) => (state.snap = Number(e.target.value)));
  $('#e-rooms').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-room]');
    if (btn) select(btn.dataset.room);
  });

  $('#e-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      store.replace(JSON.parse(await file.text()));
      setFloor(floors()[0].id, { fit: true });
    } catch (err) {
      alert(`Import fehlgeschlagen: ${err.message}`);
    }
  });

  const onBindChange = (source) => (e) => {
    const el = e.target.closest('[data-bind]');
    if (!el) return;
    const [scope, key, field] = el.dataset.bind.split(':');
    let value = el.value;

    if (scope === 'port') {
      changeSource = source;
      store.mutate((b) => (tankById(b).ports[Number(key)][field] = value.trim()));
      changeSource = null;
      return;
    }
    if (scope === 'tank' && key === 'count') {
      const count = clamp(parseInt(value, 10) || 0, 0, MAX_PORTS);
      store.mutate((b) => {
        const t = tankById(b);
        t.ports = resizePorts(t.ports, count);
      });
      return;
    }
    if (['x', 'z', 'width', 'depth', 'height'].includes(key)) {
      value = parseFloat(String(value).replace(',', '.'));
      if (!Number.isFinite(value)) return renderProps();
      if (key === 'width' || key === 'depth') value = Math.max(0.5, value);
      if (key === 'height') value = clamp(value, 2, 10);
      value = round2(value);
    }
    // Typwechsel ändert die Farbe → Formular neu zeichnen
    changeSource = key !== 'type' ? source : null;
    if (scope === 'printer') value = value.trim();
    store.mutate((b) => {
      const target =
        scope === 'tank'
          ? tankById(b)
          : scope === 'printer'
            ? printerById(b)
            : scope === 'room'
            ? roomById(b, state.selectedRoomId)
            : scope === 'floor'
              ? b.floors.find((f) => f.id === state.floorId)
              : b;
      if (!target) return;
      target[key] = value;
      const room = roomById(b, state.selectedRoomId);
      if (room && (scope === 'tank' || key === 'width' || key === 'depth')) clampItems(room);
    });
    changeSource = null;
    if (scope === 'printer' && key === 'ip') {
      const warn = root.querySelector('[data-out="ip-warn"]');
      if (warn) warn.hidden = !value || isValidIp(value);
    }
  };
  $('#e-props').addEventListener('change', onBindChange('props'));
  $('#e-modal').addEventListener('change', onBindChange('modal'));
  $('#e-modal').addEventListener('pointerdown', (e) => {
    if (e.target === e.currentTarget) closeTankModal();
  });
  $('#e-modal').addEventListener('keydown', (e) => {
    // Enter in einem Port-Feld: übernehmen und zum gleichen Feld im nächsten Port springen
    const el = e.target.closest('[data-bind^="port:"]');
    if (e.key !== 'Enter' || !el) return;
    e.preventDefault();
    const [, i, field] = el.dataset.bind.split(':');
    el.blur();
    $(`#e-modal [data-bind="port:${Number(i) + 1}:${field}"]`)?.focus();
  });

  // Grundriss-Interaktion
  svg.addEventListener('contextmenu', (e) => e.preventDefault());

  svg.addEventListener('pointerdown', (e) => {
    const w = toWorld(e);
    const handleEl = e.target.closest('[data-handle]');
    const tankEl = e.target.closest('[data-tank]');
    const printerEl = e.target.closest('[data-printer]');
    const roomEl = e.target.closest('[data-room]');
    svg.setPointerCapture(e.pointerId);

    if (e.button === 1 || e.button === 2) {
      drag = { type: 'pan', sx: e.clientX, sy: e.clientY, cx: plan.cx, cz: plan.cz };
      return;
    }
    if (e.button !== 0) return;

    if (state.tool === 'draw' || state.tool === 'stairs') {
      const p = { x: snapValue(w.x, e.altKey), z: snapValue(w.z, e.altKey) };
      drag = { type: 'draw', start: p };
      draftRect = { x: p.x, z: p.z, width: 0, depth: 0 };
      return;
    }
    if (state.tool === 'tank') {
      const room = roomAt(w);
      if (room) {
        addTank(room, {
          x: snapValue(w.x - room.x, e.altKey, TANK_SNAP),
          z: snapValue(w.z - room.z, e.altKey, TANK_SNAP),
        });
      }
      return;
    }
    if (state.tool === 'printer') {
      const room = roomAt(w);
      if (room) {
        addPrinter(room, {
          x: snapValue(w.x - room.x, e.altKey, TANK_SNAP),
          z: snapValue(w.z - room.z, e.altKey, TANK_SNAP),
        });
      }
      return;
    }
    if (printerEl) {
      select(printerEl.dataset.printerRoom, null, printerEl.dataset.printer);
      const p = selectedPrinter();
      drag = { type: 'printer', start: w, orig: { x: p.x, z: p.z }, started: false };
      return;
    }
    if (tankEl) {
      const now = performance.now();
      const isDouble = lastTankClick.id === tankEl.dataset.tank && now - lastTankClick.time < 400;
      lastTankClick = { id: tankEl.dataset.tank, time: now };
      select(tankEl.dataset.tankRoom, tankEl.dataset.tank);
      if (isDouble) {
        drag = null;
        openTankModal();
        return;
      }
      const t = selectedTank();
      drag = { type: 'tank', start: w, orig: { x: t.x, z: t.z }, started: false };
      return;
    }
    if (handleEl && selectedRoom()) {
      const r = selectedRoom();
      drag = {
        type: 'resize',
        handle: handleEl.dataset.handle,
        start: w,
        orig: {
          ...r,
          tanks: r.tanks.map((t) => ({ x: t.x, z: t.z })),
          printers: r.printers.map((p) => ({ x: p.x, z: p.z })),
        },
        started: false,
      };
      return;
    }
    if (roomEl) {
      select(roomEl.dataset.room);
      const r = selectedRoom();
      drag = { type: 'move', start: w, orig: { x: r.x, z: r.z }, started: false };
      return;
    }
    select(null);
    drag = { type: 'pan', sx: e.clientX, sy: e.clientY, cx: plan.cx, cz: plan.cz };
  });

  svg.addEventListener('pointermove', (e) => {
    const w = toWorld(e);
    $('#e-coords').textContent = `x ${fmt(w.x, 2)} · z ${fmt(w.z, 2)} m`;
    if (!drag) return;

    if (drag.type === 'pan') {
      plan.cx = drag.cx - (e.clientX - drag.sx) / plan.scale;
      plan.cz = drag.cz - (e.clientY - drag.sy) / plan.scale;
      renderPlan();
      return;
    }

    if (drag.type === 'draw') {
      const p = { x: snapValue(w.x, e.altKey), z: snapValue(w.z, e.altKey) };
      draftRect = {
        x: Math.min(drag.start.x, p.x),
        z: Math.min(drag.start.z, p.z),
        width: round2(Math.abs(p.x - drag.start.x)),
        depth: round2(Math.abs(p.z - drag.start.z)),
      };
      renderPlan();
      return;
    }

    const dx = w.x - drag.start.x;
    const dz = w.z - drag.start.z;
    if (!drag.started) {
      if (Math.hypot(dx, dz) * plan.scale < 3) return;
      drag.started = true;
      store.checkpoint();
    }
    const free = e.altKey;
    store.mutate(
      (b) => {
        const r = roomById(b, state.selectedRoomId);
        if (!r) return;
        if (drag.type === 'tank' || drag.type === 'printer') {
          const item = drag.type === 'tank' ? tankById(b) : printerById(b);
          item.x = snapValue(drag.orig.x + dx, free, TANK_SNAP);
          item.z = snapValue(drag.orig.z + dz, free, TANK_SNAP);
          clampItems(r);
          return;
        }
        if (drag.type === 'move') {
          r.x = round2(snapValue(drag.orig.x + dx, free));
          r.z = round2(snapValue(drag.orig.z + dz, free));
          return;
        }
        const o = drag.orig;
        const h = drag.handle;
        if (h.includes('w')) {
          const x = Math.min(snapValue(o.x + dx, free), o.x + o.width - MIN_SIZE);
          r.x = round2(x);
          r.width = round2(o.x + o.width - x);
        }
        if (h.includes('e')) r.width = round2(Math.max(MIN_SIZE, snapValue(o.x + o.width + dx, free) - o.x));
        if (h.includes('n')) {
          const z = Math.min(snapValue(o.z + dz, free), o.z + o.depth - MIN_SIZE);
          r.z = round2(z);
          r.depth = round2(o.z + o.depth - z);
        }
        if (h.includes('s')) r.depth = round2(Math.max(MIN_SIZE, snapValue(o.z + o.depth + dz, free) - o.z));
        // Bodentanks und Drucker bleiben beim Ändern der Raumgröße an ihrer Stelle im Gebäude
        r.tanks.forEach((t, i) => {
          t.x = o.tanks[i].x + (o.x - r.x);
          t.z = o.tanks[i].z + (o.z - r.z);
        });
        r.printers.forEach((p, i) => {
          p.x = o.printers[i].x + (o.x - r.x);
          p.z = o.printers[i].z + (o.z - r.z);
        });
        clampItems(r);
      },
      { checkpoint: false },
    );
  });

  const endDrag = () => {
    if (drag?.type === 'draw' && draftRect) {
      const rect = draftRect;
      draftRect = null;
      if (rect.width >= MIN_SIZE && rect.depth >= MIN_SIZE) {
        const props = { x: round2(rect.x), z: round2(rect.z), width: rect.width, depth: rect.depth };
        if (state.tool === 'stairs') {
          const count = currentFloor().rooms.filter((r) => r.type === 'stairs').length;
          // Treppe läuft entlang der längeren Seite
          Object.assign(props, { type: 'stairs', name: `Treppenhaus ${count + 1}`, stairDir: rect.depth >= rect.width ? 'n' : 'e' });
        }
        state.tool = 'select';
        addRoom(props);
        renderToolbar();
      }
      renderPlan();
    }
    drag = null;
  };
  svg.addEventListener('pointerup', endDrag);
  svg.addEventListener('pointercancel', endDrag);

  svg.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY);
    },
    { passive: false },
  );

  const onKey = (e) => {
    if (state.tankModal) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeTankModal();
      }
      return;
    }
    if (e.target.closest?.('input, textarea, select')) return;
    const ctrl = e.ctrlKey || e.metaKey;
    const key = e.key.toLowerCase();
    if (ctrl && key === 'z' && !e.shiftKey) store.undo();
    else if (ctrl && (key === 'y' || (key === 'z' && e.shiftKey))) store.redo();
    else if (ctrl && key === 'd') duplicateSelected();
    else if (key === 'delete' || key === 'backspace') deleteSelected();
    else if (key === 'enter' && state.selectedTankId) openTankModal();
    else if (key === 'escape') {
      draftRect = null;
      drag = null;
      setTool('select');
      if (state.selectedTankId || state.selectedPrinterId) select(state.selectedRoomId, null);
      else select(null);
    } else if (key === 'r' && !ctrl) setTool('draw');
    else if (key === 's' && !ctrl) setTool('stairs');
    else if (key === 'q' && !ctrl && selectedRoom()?.type === 'stairs') actions['stairs-rotate']();
    else if (key === 't' && !ctrl) setTool('tank');
    else if (key === 'p' && !ctrl) setTool('printer');
    else if (key === 'v' && !ctrl) setTool('select');
    else if (key.startsWith('arrow') && state.selectedRoomId) {
      const base = state.selectedTankId || state.selectedPrinterId ? TANK_SNAP : state.snap;
      const step = e.shiftKey ? 1 : base;
      const d = { arrowleft: [-step, 0], arrowright: [step, 0], arrowup: [0, -step], arrowdown: [0, step] }[key];
      moveSelected(...d);
    } else return;
    e.preventDefault();
  };
  window.addEventListener('keydown', onKey);

  const unsubscribe = store.subscribe(() => {
    if (!floors().some((f) => f.id === state.floorId)) state.floorId = floors()[0].id;
    if (state.selectedRoomId && !selectedRoom()) state.selectedRoomId = null;
    if (state.selectedTankId && !selectedTank()) state.selectedTankId = null;
    if (state.selectedPrinterId && !selectedPrinter()) state.selectedPrinterId = null;
    syncPreview();
    renderToolbar();
    renderPlan();
    renderRoomList();
    if (changeSource !== 'props') renderProps();
    if (changeSource !== 'modal') renderTankModal();
  });

  const resizeObserver = new ResizeObserver(() => renderPlan());
  resizeObserver.observe(planWrap);

  // ---------------------------------------------------------------- init

  syncPreview();
  preview.fitAll(false);
  requestAnimationFrame(() => {
    fitPlan();
    renderAll();
  });
  renderAll();

  return {
    destroy() {
      unsubscribe();
      resizeObserver.disconnect();
      window.removeEventListener('keydown', onKey);
      preview.dispose();
    },
  };
}
