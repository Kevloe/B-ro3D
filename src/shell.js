import './style.css';
import { store } from './data/store.js';
import { esc } from './utils.js';

/**
 * Gemeinsamer Rahmen beider Seiten (index.html = Übersicht, editor.html = Editor):
 * Kopfzeile mit Status und Hinweisleiste.
 */

const STATUS_TEXT = {
  loading: 'Lädt …',
  standard: 'Standard',
  draft: 'Entwurf (nur in diesem Browser)',
  fallback: 'Testgebäude',
  error: 'Entwurf nicht gespeichert',
};

const STATUS_HINT = {
  standard: () => `Veröffentlichter Stand aus ${store.config.standard}`,
  draft: () => 'Änderungen sind nur in diesem Browser gespeichert. Zum Veröffentlichen im Editor exportieren.',
  fallback: () => `Standard-Datei nicht gefunden (${store.config.standard}) – es wird das Testgebäude gezeigt.`,
};

export async function startPage(page, createView) {
  const app = document.getElementById('app');
  const banner = document.getElementById('banner');

  function renderBuildingName() {
    document.getElementById('building-name').textContent = store.building.name;
  }

  function renderStatus() {
    const el = document.getElementById('sync-status');
    const { state, message } = store.status;
    el.className = `sync-status is-${state}`;
    el.textContent = STATUS_TEXT[state] ?? state;
    el.title = [STATUS_HINT[state]?.(), message].filter(Boolean).join('\n');
  }

  function renderBanner() {
    const parts = [];
    if (store.isDraft && store.draftOutdated) {
      parts.push(`
        <div class="banner banner-warn">
          <span>Der <strong>Standard wurde geändert</strong>, seit dein Entwurf begonnen wurde. Dein Entwurf enthält diese Änderungen nicht.</span>
          <button class="btn sm" data-banner="discard">Neuen Standard laden</button>
          <button class="btn sm" data-banner="dismiss">Entwurf behalten</button>
        </div>`);
    } else if (store.isDraft && page === 'viewer') {
      parts.push(`
        <div class="banner">
          <span>Du siehst deinen <strong>Entwurf</strong> aus dem Editor. Alle anderen sehen weiterhin den Standard.</span>
          <a class="btn sm" href="editor.html">Im Editor öffnen</a>
          <button class="btn sm" data-banner="discard">Entwurf verwerfen</button>
        </div>`);
    }
    if (store.status.state === 'fallback' && page === 'editor') {
      parts.push(`
        <div class="banner banner-warn">
          <span>Standard-Datei <strong>${esc(store.config.standard)}</strong> nicht gefunden – es wird das Testgebäude gezeigt.</span>
        </div>`);
    }
    banner.innerHTML = parts.join('');
    banner.hidden = !parts.length;
  }

  banner.addEventListener('click', async (e) => {
    const act = e.target.closest('[data-banner]')?.dataset.banner;
    if (act === 'discard') {
      if (!store.matchesStandard && !confirm('Entwurf verwerfen und den Standard laden? (Rückgängig ist im Editor möglich)')) return;
      await store.discardDraft();
    }
    if (act === 'dismiss') store.draftOutdated = false;
    renderBanner();
  });

  store.subscribe(renderBuildingName);
  store.on('status', () => {
    renderStatus();
    renderBanner();
  });

  app.innerHTML = '<div class="app-loading">Lädt …</div>';
  renderStatus();
  await store.init();
  renderBuildingName();
  renderStatus();
  app.innerHTML = '';
  createView(app);
  renderBanner();
}
