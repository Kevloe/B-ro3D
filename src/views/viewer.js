import { store } from '../data/store.js';
import { findPrinter, findRoom, findTank, isValidIp, tankPortCount } from '../data/model.js';
import { groupPortsByPanel, switchLabel } from '../data/ports.js';
import { roomColor, roomTypeLabel } from '../data/roomTypes.js';
import { STAIR_SHAPES } from '../data/stairs.js';
import { BuildingView } from '../three/BuildingView.js';
import { esc, fmt } from '../utils.js';

export function createViewer(root) {
  root.innerHTML = `
    <div class="viewer-layout">
      <aside class="sidebar">
        <section class="panel">
          <h2 class="panel-title">Etagen</h2>
          <div class="floor-list" id="v-floors"></div>
        </section>
        <section class="panel panel-grow">
          <h2 class="panel-title">Räume</h2>
          <input type="search" id="v-search" class="input" placeholder="Raum, Team, Typ oder Port suchen …" autocomplete="off">
          <div class="room-list" id="v-rooms"></div>
        </section>
        <section class="panel">
          <h2 class="panel-title">Darstellung</h2>
          <label class="check"><input type="checkbox" id="v-lowwalls"> Wände niedrig (Einblick)</label>
          <label class="check"><input type="checkbox" id="v-labels" checked> Beschriftungen</label>
          <label class="range">
            <span>Etagenabstand</span>
            <input type="range" id="v-explode" min="0" max="8" step="0.5" value="0">
          </label>
          <button class="btn btn-block" id="v-fit">Ansicht zurücksetzen</button>
        </section>
      </aside>
      <div class="stage">
        <div class="view3d" id="v-3d"></div>
        <div class="modal-backdrop" id="v-modal" hidden></div>
        <div class="hint">Linke Maustaste: drehen · Rechte Maustaste: verschieben · Mausrad: zoomen</div>
      </div>
    </div>`;

  const $ = (sel) => root.querySelector(sel);
  const state = { focusFloorId: null, selectedRoomId: null, openTankId: null, openPrinterId: null, modal: null, query: '' };

  const view = new BuildingView($('#v-3d'), {
    onRoomClick: (roomId) => selectRoom(roomId, { fly: false }),
    onTankClick: (tankId, roomId) => {
      if (state.selectedRoomId !== roomId) selectRoom(roomId, { fly: false, open: false });
      openTank(tankId);
    },
    onPrinterClick: (printerId, roomId) => {
      if (state.selectedRoomId !== roomId) selectRoom(roomId, { fly: false, open: false });
      openPrinter(printerId);
    },
  });
  view.setBuilding(store.building);

  const floorsTopDown = () => [...store.building.floors].reverse();
  const listedRooms = (floor) =>
    floor.rooms.filter((r) => r.type !== 'corridor' || r.printers.length || r.tanks.length);

  function renderFloors() {
    const { floors } = store.building;
    const btn = (id, name, meta) => `
      <button class="floor-btn ${state.focusFloorId === id ? 'active' : ''}" data-floor="${id ?? ''}">
        <span>${esc(name)}</span><span class="meta">${meta}</span>
      </button>`;
    $('#v-floors').innerHTML = [
      btn(null, 'Alle Etagen', `${floors.length}`),
      ...floorsTopDown().map((f) => btn(f.id, f.name, `${listedRooms(f).length} Räume`)),
    ].join('');
  }

  function renderRooms() {
    const q = state.query.trim().toLowerCase();
    const matches = (r) =>
      !q ||
      [r.name, r.occupant, r.description, roomTypeLabel(r), ...r.tanks.flatMap((t) => [t.name, ...t.ports.flatMap((p) => [p.name, p.switch])]), ...r.printers.flatMap((p) => [p.name, p.ip])]
        .some((s) => s?.toLowerCase().includes(q));

    const groups = floorsTopDown()
      .filter((f) => !state.focusFloorId || f.id === state.focusFloorId)
      .map((floor) => ({
        floor,
        rooms: listedRooms(floor)
          .filter(matches)
          .sort((a, b) => a.name.localeCompare(b.name, 'de', { numeric: true })),
      }))
      .filter((g) => g.rooms.length);

    $('#v-rooms').innerHTML = groups.length
      ? groups
          .map(
            ({ floor, rooms }) => `
        <div class="room-group">
          <div class="room-group-title">${esc(floor.name)}</div>
          ${rooms
            .map(
              (r) => `
            <button class="room-item ${r.id === state.selectedRoomId ? 'active' : ''}" data-room="${r.id}">
              <span class="swatch" style="background:${roomColor(r)}"></span>
              <span class="ri-text">
                <span class="ri-name">${esc(r.name)}</span>
                ${r.occupant ? `<span class="ri-sub">${esc(r.occupant)}</span>` : ''}
              </span>
              ${r.printers.length ? `<span class="ri-meta" title="Drucker">${r.printers.length} DR</span>` : ''}
              ${r.tanks.length ? `<span class="ri-meta" title="Bodentanks">${r.tanks.length} BT</span>` : ''}
            </button>`,
            )
            .join('')}
        </div>`,
          )
          .join('')
      : `<div class="empty">Keine Räume gefunden.</div>`;
  }

  function renderRoomModal(room, floor) {
    const total = tankPortCount(room);
    const patched = room.tanks.reduce((n, t) => n + t.ports.filter((p) => switchLabel(p)).length, 0);
    const detail = (label, value) => (value ? `<div class="detail"><dt>${label}</dt><dd>${value}</dd></div>` : '');
    return `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="v-modal-title">
        <div class="modal-head">
          <span class="room-icon-lg" style="background:${roomColor(room)}"></span>
          <div>
            <div class="modal-title" id="v-modal-title">${esc(room.name)}</div>
            <div class="modal-sub">${esc(roomTypeLabel(room))} · ${esc(floor.name)}</div>
          </div>
          <button class="icon-btn" data-close-modal title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <dl class="detail-grid">
            ${detail('Nutzer / Team', esc(room.occupant))}
            ${detail('Raumtyp', esc(roomTypeLabel(room)))}
            ${detail('Etage', esc(floor.name))}
            ${detail('Maße', `${fmt(room.width)} × ${fmt(room.depth)} m`)}
            ${detail('Treppe', room.type === 'stairs' ? esc(STAIR_SHAPES[room.stairShape]) : '')}
            ${detail('Bodentanks', room.tanks.length ? `${room.tanks.length} · ${total} Ports · ${patched} gepatcht` : '')}
            ${detail('Drucker', room.printers.length ? String(room.printers.length) : '')}
          </dl>
          ${room.description ? `<p class="room-desc">${esc(room.description)}</p>` : ''}
          <div class="section-title">Bodentanks</div>
          ${
            room.tanks.length
              ? `<div class="tank-cards">
              ${room.tanks
                .map((t) => {
                  const tp = t.ports.filter((p) => switchLabel(p)).length;
                  const preview = t.ports.slice(0, 6).map((p) => `<span class="mini-port">${esc(p.name)}</span>`).join('');
                  return `
                <button class="tank-card" data-tank="${t.id}">
                  <span class="tank-card-head">
                    <span class="tank-icon-sm"></span>
                    <span class="tank-card-name">${esc(t.name)}</span>
                    <span class="tank-card-meta">${t.ports.length} Ports · ${tp} gepatcht</span>
                    <span class="tank-card-arrow">›</span>
                  </span>
                  <span class="mini-ports">${preview}${t.ports.length > 6 ? `<span class="mini-port more">+${t.ports.length - 6}</span>` : ''}</span>
                </button>`;
                })
                .join('')}
            </div>`
              : `<div class="empty">In diesem Raum sind keine Bodentanks hinterlegt.</div>`
          }
          ${
            room.printers.length
              ? `<div class="section-title">Drucker</div>
            <div class="tank-cards">
              ${room.printers
                .map(
                  (pr) => `
                <button class="tank-card" data-printer="${pr.id}">
                  <span class="tank-card-head">
                    <span class="pl-icon lg"></span>
                    <span class="tank-card-name">${esc(pr.name)}</span>
                    <span class="tank-card-meta mono">${esc(pr.ip || 'keine IP')}</span>
                    <span class="tank-card-arrow">›</span>
                  </span>
                </button>`,
                )
                .join('')}
            </div>`
              : ''
          }
        </div>
      </div>`;
  }

  function renderTankModal(tank, room, floor) {
    const groups = groupPortsByPanel(tank.ports);
    return `
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="v-modal-title">
        <div class="modal-head">
          <button class="icon-btn" data-back title="Zurück zu ${esc(room.name)}">←</button>
          <span class="tank-icon-lg"></span>
          <div>
            <div class="modal-title" id="v-modal-title">Bodentank ${esc(tank.name)}</div>
            <div class="modal-sub">${esc(room.name)} · ${esc(floor.name)} · ${tank.ports.length} Ports</div>
          </div>
          <button class="icon-btn" data-close-modal title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          ${
            groups.length
              ? groups
                  .map(
                    (g) => `
            <div class="port-panel">
              <div class="port-panel-title">Patchfeld ${esc(g.panel)} <span>${g.ports.length} Ports</span></div>
              <div class="port-grid">
                ${g.ports
                  .map(
                    (p) => `<div class="port${switchLabel(p) ? '' : ' is-free'}" title="Anschluss ${p.index + 1} im Tank">
                      <span class="port-jack"></span>
                      <span class="port-text">
                        <span class="port-name">${esc(p.name)}</span>
                        <span class="port-switch">${switchLabel(p) ? esc(switchLabel(p)) : 'nicht gepatcht'}</span>
                      </span>
                      <span class="port-idx">${p.index + 1}</span>
                    </div>`,
                  )
                  .join('')}
              </div>
            </div>`,
                  )
                  .join('')
              : `<div class="empty">In diesem Bodentank sind keine Ports hinterlegt.</div>`
          }
        </div>
      </div>`;
  }

  function renderPrinterModal(printer, room, floor) {
    const ip = printer.ip.trim();
    return `
      <div class="modal modal-narrow" role="dialog" aria-modal="true" aria-labelledby="v-modal-title">
        <div class="modal-head">
          <button class="icon-btn" data-back title="Zurück zu ${esc(room.name)}">←</button>
          <span class="printer-icon-lg"></span>
          <div>
            <div class="modal-title" id="v-modal-title">${esc(printer.name)}</div>
            <div class="modal-sub">Drucker · ${esc(room.name)} · ${esc(floor.name)}</div>
          </div>
          <button class="icon-btn" data-close-modal title="Schließen (Esc)">✕</button>
        </div>
        <div class="modal-body">
          <div class="ip-box">
            <span class="ip-label">IP-Adresse</span>
            <span class="ip-value mono">${ip ? esc(ip) : '–'}</span>
            ${ip ? `<button class="btn sm" data-copy-ip="${esc(ip)}">Kopieren</button>` : ''}
          </div>
          <dl class="detail-grid">
            <div class="detail"><dt>Name</dt><dd>${esc(printer.name)}</dd></div>
            <div class="detail"><dt>Raum</dt><dd>${esc(room.name)}</dd></div>
            <div class="detail"><dt>Etage</dt><dd>${esc(floor.name)}</dd></div>
          </dl>
          ${
            isValidIp(ip)
              ? `<a class="btn btn-primary btn-block" href="http://${esc(ip)}" target="_blank" rel="noopener noreferrer">Weboberfläche öffnen ↗</a>`
              : ''
          }
        </div>
      </div>`;
  }

  /** Ein Modal für Raum, Bodentank oder Drucker (state.modal = 'room' | 'tank' | 'printer' | null). */
  function renderModal() {
    const modal = $('#v-modal');
    let html = '';
    if (state.modal === 'printer') {
      const hit = state.openPrinterId && findPrinter(store.building, state.openPrinterId);
      if (hit) html = renderPrinterModal(hit.printer, hit.room, hit.floor);
    } else if (state.modal === 'tank') {
      const hit = state.openTankId && findTank(store.building, state.openTankId);
      if (hit) html = renderTankModal(hit.tank, hit.room, hit.floor);
    } else if (state.modal === 'room') {
      const hit = state.selectedRoomId && findRoom(store.building, state.selectedRoomId);
      if (hit) html = renderRoomModal(hit.room, hit.floor);
    }
    if (!html) state.modal = null;
    modal.hidden = !html;
    modal.innerHTML = html;
    modal.querySelector('[data-close-modal]')?.focus();
  }

  function openTank(tankId) {
    state.openTankId = tankId;
    state.modal = 'tank';
    view.setSelectedTank(tankId);
    renderModal();
  }

  function openPrinter(printerId) {
    state.openPrinterId = printerId;
    state.modal = 'printer';
    view.setSelectedPrinter(printerId);
    renderModal();
  }

  function closeModal() {
    state.modal = null;
    state.openTankId = null;
    state.openPrinterId = null;
    view.setSelectedTank(null);
    view.setSelectedPrinter(null);
    renderModal();
  }

  function backToRoom() {
    state.openTankId = null;
    state.openPrinterId = null;
    view.setSelectedTank(null);
    view.setSelectedPrinter(null);
    state.modal = 'room';
    renderModal();
  }

  function selectRoom(roomId, { fly = true, open = true } = {}) {
    state.selectedRoomId = roomId;
    if (roomId && fly) view.focusRoom(roomId);
    view.setSelectedRoom(roomId);
    renderRooms();
    if (roomId && open) {
      state.modal = 'room';
      renderModal();
    } else if (!roomId) {
      closeModal();
    }
  }

  function setFocus(floorId) {
    state.focusFloorId = floorId;
    view.setFocusFloor(floorId);
    const hit = state.selectedRoomId && findRoom(store.building, state.selectedRoomId);
    if (floorId && hit && hit.floor.id !== floorId) selectRoom(null);
    renderFloors();
    renderRooms();
    view.fitAll();
  }

  // ---------------------------------------------------------------- events

  $('#v-floors').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-floor]');
    if (btn) setFocus(btn.dataset.floor || null);
  });
  $('#v-rooms').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-room]');
    if (btn) selectRoom(btn.dataset.room);
  });
  $('#v-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.closest('[data-close-modal]')) return closeModal();
    if (e.target.closest('[data-back]')) return backToRoom();
    const copy = e.target.closest('[data-copy-ip]');
    if (copy) {
      navigator.clipboard?.writeText(copy.dataset.copyIp).then(
        () => (copy.textContent = 'Kopiert ✓'),
        () => (copy.textContent = 'Nicht möglich'),
      );
      return;
    }
    const tankCard = e.target.closest('[data-tank]');
    if (tankCard) return openTank(tankCard.dataset.tank);
    const printerCard = e.target.closest('[data-printer]');
    if (printerCard) openPrinter(printerCard.dataset.printer);
  });
  $('#v-search').addEventListener('input', (e) => {
    state.query = e.target.value;
    renderRooms();
  });
  $('#v-lowwalls').addEventListener('change', (e) => view.setWallMode(e.target.checked ? 'low' : 'full'));
  $('#v-labels').addEventListener('change', (e) => view.setLabels(e.target.checked));
  $('#v-explode').addEventListener('input', (e) => view.setExplode(Number(e.target.value)));
  $('#v-fit').addEventListener('click', () => view.fitAll());

  const onKey = (e) => {
    if (e.key !== 'Escape') return;
    if (state.modal) closeModal();
    else selectRoom(null);
  };
  window.addEventListener('keydown', onKey);

  const unsubscribe = store.subscribe(() => {
    const { building } = store;
    if (state.focusFloorId && !building.floors.some((f) => f.id === state.focusFloorId)) state.focusFloorId = null;
    if (state.selectedRoomId && !findRoom(building, state.selectedRoomId)) state.selectedRoomId = null;
    if (state.openTankId && !findTank(building, state.openTankId)) state.openTankId = null;
    if (state.openPrinterId && !findPrinter(building, state.openPrinterId)) state.openPrinterId = null;
    view.setBuilding(building);
    view.setFocusFloor(state.focusFloorId);
    view.setSelectedRoom(state.selectedRoomId);
    view.setSelectedTank(state.openTankId);
    view.setSelectedPrinter(state.openPrinterId);
    renderFloors();
    renderRooms();
    renderModal();
  });

  renderFloors();
  renderRooms();

  return {
    destroy() {
      unsubscribe();
      window.removeEventListener('keydown', onKey);
      view.dispose();
    },
  };
}
