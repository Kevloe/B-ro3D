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
  groundIndex,
  isValidIp,
  itemWorld,
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
import {
  ELEVATOR_MIN_WIDTH,
  elevatorFits,
  rotateStairDir,
  STAIR_DIRS,
  STAIR_SHAPES,
  stairLayout,
} from '../data/stairs.js';
import { WALL_THICKNESS } from '../three/walls.js';
import { createWall, MIN_WALL, wallLength } from '../data/freeWalls.js';
import {
  createOpening,
  DOOR_WIDTH,
  isOnFreeWall,
  isOnRoom,
  isOnWall,
  MIN_OPENING,
  nearestWall,
  OPENING_TYPES,
  openingDir,
  openingLength,
  round3,
  translateOpening,
  wallPoint,
} from '../data/openings.js';
import {
  clampCut,
  CUT_CORNERS,
  defaultCut,
  normalizeRotation,
  pointInRoom,
  rotatePoint,
  ROOM_SHAPES,
  roomArea,
  roomCenter,
  roomLabelPoint,
  roomPolygon,
  roomRotation,
  roomShape,
  roomsOverlap,
  roomToWorld,
  vectorToRoom,
  worldToRoom,
} from '../data/shape.js';
import { BuildingView } from '../three/BuildingView.js';
import { clamp, esc, fmt } from '../utils.js';

const MIN_SIZE = 1;
const HANDLES = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const TANK_SNAP = 0.1;
const MAX_PORTS = 96;
const UNDERLAY_MAX_PX = 2400; // Hintergrundbilder werden beim Laden auf diese Kantenlänge verkleinert
const UNDERLAY_OPACITY = 0.15;

export function createEditor(root) {
  root.innerHTML = `
    <div class="editor-layout">
      <div class="toolbar">
        <div class="tb-group">
          <span class="tb-label">Etage</span>
          <select id="e-floor" class="input sm"></select>
          <button class="btn sm" data-act="floor-add" title="Neues Obergeschoss oben anlegen">+ OG</button>
          <button class="btn sm" data-act="floor-add-below" title="Neues Untergeschoss unten anlegen">+ UG</button>
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
            <button class="btn sm" data-act="tool-door" data-tool="door" title="Tür auf eine Wand setzen (D)">Tür</button>
            <button class="btn sm" data-act="tool-glass" data-tool="glass" title="Glaswand entlang einer Wand ziehen (G)">Glaswand</button>
            <button class="btn sm" data-act="tool-wall" data-tool="wall" title="Freie Wand ziehen (W)">Wand</button>
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
          <svg id="e-plan" xmlns="http://www.w3.org/2000/svg">
            <g id="e-plan-bg"></g>
            <image id="e-plan-underlay" class="underlay" preserveAspectRatio="none" style="display:none"/>
            <g id="e-plan-fg"></g>
          </svg>
          <input type="file" id="e-underlay-file" accept="image/*" hidden>
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
  // Ebenen: Raster – Hintergrundbild – Räume. Das Bild bleibt stehen und wird nicht bei jedem Rendern neu geparst.
  const bgLayer = $('#e-plan-bg');
  const fgLayer = $('#e-plan-fg');
  const underlayEl = $('#e-plan-underlay');
  let underlaySrc = null;

  const state = {
    floorId: store.building.groundFloorId ?? store.building.floors[0]?.id,
    selectedRoomId: null,
    selectedTankId: null,
    selectedPrinterId: null,
    selectedOpeningId: null,
    selectedWallId: null,
    tool: 'select',
    snap: 0.5,
    tankModal: false,
  };
  const plan = { cx: 15, cz: 6, scale: 30 }; // scale = Pixel pro Meter
  let drag = null;
  let draftRect = null;
  let calib = null; // Maßstab setzen: { a: [x, z], b, hover }
  let draftGlass = null; // Glaswand beim Aufziehen: { x1, z1, x2, z2 }
  let draftWall = null; // freie Wand beim Aufziehen: { x1, z1, x2, z2 }
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
  const floorOpenings = () => currentFloor()?.openings ?? [];
  const selectedOpening = () => floorOpenings().find((o) => o.id === state.selectedOpeningId) ?? null;
  const openingById = (b) =>
    b.floors.find((f) => f.id === state.floorId)?.openings?.find((o) => o.id === state.selectedOpeningId);
  const floorWalls = () => currentFloor()?.walls ?? [];
  const selectedWall = () => floorWalls().find((w) => w.id === state.selectedWallId) ?? null;
  const wallById = (b) => b.floors.find((f) => f.id === state.floorId)?.walls?.find((w) => w.id === state.selectedWallId);
  /** Fangbereich für Wände: 14 px, mindestens 0,25 m. */
  const wallAt = (w) =>
    nearestWall(currentFloor().rooms, [w.x, w.z], Math.max(0.25, 14 / plan.scale), floorWalls());
  const snapValue = (v, free, step = state.snap) => (free ? Math.round(v * 100) / 100 : Math.round(v / step) * step);
  const round2 = (v) => Math.round(v * 100) / 100;

  /**
   * Punkt für eine freie Wand: fängt Raumecken und Wandenden in der Nähe (10 px), sonst Raster.
   * Shift = nur waagerecht/senkrecht zum Punkt `from`.
   */
  function snapWallPoint(w, free, from = null, ortho = false) {
    let p = [snapValue(w.x, free), snapValue(w.z, free)];
    if (!free) {
      const range = 10 / plan.scale;
      const targets = [
        ...currentFloor().rooms.flatMap((r) => roomPolygon(r)),
        ...floorWalls().flatMap((x) => [[x.x1, x.z1], [x.x2, x.z2]]),
      ];
      let best = range;
      for (const t of targets) {
        const d = Math.hypot(t[0] - w.x, t[1] - w.z);
        if (d < best) {
          best = d;
          p = [round3(t[0]), round3(t[1])];
        }
      }
    }
    if (from && ortho) {
      if (Math.abs(p[0] - from[0]) >= Math.abs(p[1] - from[1])) p[1] = from[1];
      else p[0] = from[0];
    }
    return p;
  }

  function toWorld(e) {
    const r = svg.getBoundingClientRect();
    return {
      x: plan.cx + (e.clientX - r.left - r.width / 2) / plan.scale,
      z: plan.cz + (e.clientY - r.top - r.height / 2) / plan.scale,
    };
  }

  /** Oberster Raum unter einem Punkt (Räume vor Fluren). */
  function roomAt(p) {
    const hits = currentFloor().rooms.filter((r) => pointInRoom(r, [p.x, p.z]));
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

  /** x/z eines gedrehten Raums so setzen, dass seine linke obere Ecke (ungedreht) bei `corner` liegt. */
  function placeCorner(r, corner) {
    const [ox, oz] = rotatePoint([-r.width / 2, -r.depth / 2], [0, 0], roomRotation(r));
    r.x = round3(corner[0] - ox - r.width / 2);
    r.z = round3(corner[1] - oz - r.depth / 2);
  }

  /** SVG-Drehung eines Raums um seine Mitte (leer ohne Drehung). */
  const rotateAttr = (r) => {
    const a = roomRotation(r);
    if (!a) return '';
    const [cx, cz] = roomCenter(r);
    return `transform="rotate(${a} ${cx} ${cz})"`;
  };

  /** Ecke mit der Aussparung und der innere Punkt der Aussparung (Griff zum Ändern der Größe), ungedreht. */
  function cutHandle(r) {
    const east = r.cutCorner === 'ne' || r.cutCorner === 'se';
    const north = r.cutCorner === 'nw' || r.cutCorner === 'ne';
    const corner = [east ? r.x + r.width : r.x, north ? r.z : r.z + r.depth];
    const point = [corner[0] + (east ? -r.cutW : r.cutW), corner[1] + (north ? r.cutD : -r.cutD)];
    return { corner, point, east, north };
  }

  const areaText = (v) => `${fmt(v, 2)} m²`;
  const floorArea = (floor) => floor.rooms.reduce((sum, r) => sum + roomArea(r), 0);

  function overlappingIds(rooms) {
    const ids = new Set();
    for (let i = 0; i < rooms.length; i++) {
      for (let j = i + 1; j < rooms.length; j++) {
        if (roomsOverlap(rooms[i], rooms[j])) ids.add(rooms[i].id).add(rooms[j].id);
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

    const bgHtml = `
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
      <path d="M ${x0} 0 H ${x0 + W / s} M 0 ${z0} V ${z0 + H / s}" stroke="#aeb7c3" stroke-width="${px}"/>`;

    // Etage darunter als Referenz
    const idx = floors().indexOf(floor);
    const below = floors()[idx - 1];
    if (below) {
      for (const r of below.rooms) {
        parts.push(
          `<polygon class="ref-room" points="${roomPolygon(r).join(' ')}"
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
      // Rechteck: Name oben (Treppensymbol bleibt frei), sonst in der Mitte des größten Teils
      const [tx, tz] =
        roomShape(r) === 'rect'
          ? roomToWorld(r, [r.x + r.width / 2, r.z + (roomRotation(r) ? r.depth / 2 - 7 * px : 16 * px)])
          : roomLabelPoint(r).map((v, i) => v - (i ? 7 * px : 0));
      parts.push(`
        <g class="room${sel ? ' selected' : ''}${overlaps.has(r.id) ? ' overlap' : ''}" data-room="${r.id}">
          <polygon class="room-shape" points="${roomPolygon(r).join(' ')}"
            fill="${roomColor(r)}" fill-opacity="${r.type === 'corridor' ? 0.35 : 0.55}"
            stroke-width="${(sel ? 2.5 : 1.25) * px}" stroke-linejoin="round"/>
          ${
            r.type === 'stairs'
              ? `<g ${rotateAttr(r)}>${hasFloorAbove ? renderStairs(r, floor.height, px) : ''}${renderElevator(r, floor.height, px)}</g>`
              : ''
          }
          ${
            showText
              ? `<text x="${tx}" y="${tz}" font-size="${13 * px}" class="room-name">${esc(r.name)}</text>
                 <text x="${tx}" y="${tz + 15 * px}" font-size="${11 * px}" class="room-area">${areaText(roomArea(r))}</text>`
              : ''
          }
        </g>`);
    }

    for (const w of floorWalls()) parts.push(renderFreeWall(w, px));
    if (draftWall) parts.push(renderFreeWall({ ...draftWall, id: '' }, px, true));

    // Glas zuerst, damit Türen in einer Glaswand darüber liegen und greifbar bleiben
    const openingsInOrder = [...floorOpenings()].sort((a, b) => (a.type === 'glass' ? 0 : 1) - (b.type === 'glass' ? 0 : 1));
    for (const o of openingsInOrder) parts.push(renderOpening(o, floor, px));
    if (draftGlass) parts.push(renderOpening({ ...draftGlass, id: '', type: 'glass' }, floor, px, true));

    // Bodentanks (mindestens 12 px groß, damit sie greifbar bleiben)
    const ts = Math.max(TANK_SIZE, 12 * px);
    const showTankText = s > 18;
    for (const r of floor.rooms) {
      for (const t of r.tanks) {
        const [tx, tz] = itemWorld(r, t);
        const sel = t.id === state.selectedTankId;
        const rot = roomRotation(r) ? `transform="rotate(${roomRotation(r)} ${tx} ${tz})"` : '';
        parts.push(`
          <g class="tank${sel ? ' selected' : ''}" data-tank="${t.id}" data-tank-room="${r.id}">
            <rect x="${tx - ts / 2}" y="${tz - ts / 2}" width="${ts}" height="${ts}" rx="${2 * px}"
              stroke-width="${(sel ? 2 : 1.25) * px}" ${rot}/>
            <path d="M ${tx - ts / 4} ${tz} H ${tx + ts / 4} M ${tx} ${tz - ts / 4} V ${tz + ts / 4}" stroke-width="${1.25 * px}" ${rot}/>
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
        const [cx, cz] = itemWorld(r, p);
        const sel = p.id === state.selectedPrinterId;
        const rot = roomRotation(r) ? `transform="rotate(${roomRotation(r)} ${cx} ${cz})"` : '';
        parts.push(`
          <g class="printer${sel ? ' selected' : ''}" data-printer="${p.id}" data-printer-room="${r.id}">
            <rect x="${cx - pw / 2}" y="${cz - pd / 2}" width="${pw}" height="${pd}" rx="${3 * px}"
              stroke-width="${(sel ? 2 : 1.25) * px}" ${rot}/>
            <rect class="paper" x="${cx - pw * 0.28}" y="${cz - pd * 0.18}" width="${pw * 0.56}" height="${pd * 0.36}" ${rot}/>
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
      // Drehgriff über der Mitte der oberen Kante
      const rx = sel.x + sel.width / 2;
      const rz = sel.z - 26 * px;
      parts.push(`<g ${rotateAttr(sel)}>
        <path class="rot-guide" d="M ${rx} ${sel.z} V ${rz}" stroke-width="${px}"/>
        <circle class="handle handle-rot" data-handle="rotate" cx="${rx}" cy="${rz}" r="${5.5 * px}" stroke-width="${1.5 * px}">
          <title>Drehen (Raster 15°, Alt = frei)</title></circle>
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
      if (roomShape(sel) !== 'rect') {
        const { corner, point } = cutHandle(sel);
        const [cx, cz] = point;
        const guide =
          roomShape(sel) === 'chamfer'
            ? `<path class="cut-guide" d="M ${cx} ${corner[1]} L ${cx} ${cz} L ${corner[0]} ${cz}"
                stroke-width="${px}" stroke-dasharray="${4 * px} ${3 * px}"/>`
            : '';
        parts.push(`
          ${guide}
          <path class="handle handle-cut" data-handle="cut"
            d="M ${cx} ${cz - hs * 0.75} L ${cx + hs * 0.75} ${cz} L ${cx} ${cz + hs * 0.75} L ${cx - hs * 0.75} ${cz} Z"
            stroke-width="${1.5 * px}"/>`);
      }
      if (roomRotation(sel))
        parts.push(`<text class="dim" x="${rx}" y="${rz - 13 * px}" font-size="${11 * px}">${fmt(roomRotation(sel), 1)}°</text>`);
      parts.push('</g>');
    }

    if (draftRect) {
      const { x, z, width, depth } = draftRect;
      parts.push(`
        <rect class="draft" x="${x}" y="${z}" width="${width}" height="${depth}"
          stroke-width="${2 * px}" stroke-dasharray="${6 * px} ${4 * px}"/>
        <text class="dim" x="${x + width / 2}" y="${z + depth / 2}" font-size="${12 * px}">
          ${fmt(width, 2)} × ${fmt(depth, 2)} m</text>`);
    }

    if (calib) {
      const [ax, az] = calib.a;
      const [bx, bz] = calib.b ?? calib.hover;
      parts.push(`
        <g class="calib">
          <path d="M ${ax} ${az} L ${bx} ${bz}" stroke-width="${2 * px}"/>
          <circle cx="${ax}" cy="${az}" r="${4 * px}" stroke-width="${1.5 * px}"/>
          <circle cx="${bx}" cy="${bz}" r="${4 * px}" stroke-width="${1.5 * px}"/>
          <text class="dim" x="${(ax + bx) / 2}" y="${(az + bz) / 2 - 12 * px}" font-size="${12 * px}">${fmt(Math.hypot(bx - ax, bz - az), 2)} m</text>
        </g>`);
    }

    bgLayer.innerHTML = bgHtml;
    fgLayer.innerHTML = parts.join('');
    renderUnderlay(floor);
    planWrap.dataset.tool = state.tool;
  }

  /**
   * Tür: Lücke in der Wand, Türblatt und Schwenkbogen (Anschlag über `swing`).
   * Glaswand: blaue Doppellinie. Liegt die Öffnung auf keiner Wand, wird sie gestrichelt gezeigt.
   */
  function renderOpening(o, floor, px, draft = false) {
    const sel = o.id && o.id === state.selectedOpeningId;
    const detached = !draft && !isOnWall(o, floor);
    const line = `M ${o.x1} ${o.z1} L ${o.x2} ${o.z2}`;
    let symbol;
    if (o.type === 'door') {
      const len = openingLength(o);
      const [ux, uz] = openingDir(o);
      const side = o.swing & 2 ? -1 : 1;
      const atB = o.swing & 1;
      const [hx, hz] = atB ? [o.x2, o.z2] : [o.x1, o.z1];
      const [ex, ez] = atB ? [o.x1, o.z1] : [o.x2, o.z2];
      const lx = hx - uz * side * len;
      const lz = hz + ux * side * len;
      const cross = (lx - hx) * (ez - hz) - (lz - hz) * (ex - hx);
      symbol = `
        <path class="op-gap" d="${line}" stroke-width="${5 * px}"/>
        <path class="op-leaf" d="M ${hx} ${hz} L ${lx} ${lz}" stroke-width="${2 * px}"/>
        <path class="op-swing" d="M ${lx} ${lz} A ${len} ${len} 0 0 ${cross > 0 ? 1 : 0} ${ex} ${ez}"
          stroke-width="${px}" stroke-dasharray="${3 * px} ${2 * px}"/>`;
    } else {
      symbol = `
        <path class="op-gap" d="${line}" stroke-width="${5 * px}"/>
        <path class="op-glass" d="${line}" stroke-width="${3.5 * px}"/>`;
    }
    const handles = sel
      ? [['a', o.x1, o.z1], ['b', o.x2, o.z2]]
          .map(
            ([k, x, z]) =>
              `<circle class="handle op-handle" data-ohandle="${k}" cx="${x}" cy="${z}" r="${4.5 * px}" stroke-width="${1.5 * px}"/>`,
          )
          .join('')
      : '';
    return `
      <g class="opening op-${o.type}${sel ? ' selected' : ''}${detached ? ' detached' : ''}${draft ? ' draft-op' : ''}"
        ${o.id ? `data-opening="${o.id}"` : ''}>
        ${symbol}
        <path class="op-hit" d="${line}" stroke-width="${14 * px}"/>
        ${handles}
      </g>`;
  }

  /** Freie Wand: dunkler Balken in Wandstärke, ausgewählt mit Griffen an den Enden. */
  function renderFreeWall(w, px, draft = false) {
    const sel = w.id && w.id === state.selectedWallId;
    const line = `M ${w.x1} ${w.z1} L ${w.x2} ${w.z2}`;
    const handles = sel
      ? [['a', w.x1, w.z1], ['b', w.x2, w.z2]]
          .map(
            ([k, x, z]) =>
              `<circle class="handle fw-handle" data-whandle="${k}" cx="${x}" cy="${z}" r="${4.5 * px}" stroke-width="${1.5 * px}"/>`,
          )
          .join('')
      : '';
    const len = wallLength(w);
    const label =
      sel || draft
        ? `<text class="dim" x="${(w.x1 + w.x2) / 2}" y="${(w.z1 + w.z2) / 2 - 12 * px}" font-size="${11 * px}">${fmt(len, 2)} m</text>`
        : '';
    return `
      <g class="fwall${sel ? ' selected' : ''}${draft ? ' draft-op' : ''}" ${w.id ? `data-wall="${w.id}"` : ''}>
        <path class="fw-body" d="${line}" stroke-width="${Math.max(WALL_THICKNESS, 3 * px)}"/>
        <path class="fw-hit" d="${line}" stroke-width="${14 * px}"/>
        ${handles}
        ${label}
      </g>`;
  }

  function addWall(props) {
    const w = createWall(props);
    store.mutate((b) => {
      const f = b.floors.find((x) => x.id === state.floorId);
      (f.walls ??= []).push(w);
    });
    selectWall(w.id);
  }

  function selectWall(id) {
    state.selectedWallId = id;
    state.selectedOpeningId = null;
    state.selectedRoomId = null;
    state.selectedTankId = null;
    state.selectedPrinterId = null;
    preview.setSelectedRoom(null);
    preview.setSelectedTank(null);
    preview.setSelectedPrinter(null);
    renderPlan();
    renderProps();
    renderRoomList();
  }

  /** Türen und Glaswände auf einer freien Wand – sie wandern beim Verschieben mit. */
  const wallOpenings = (floor, wall) => (floor.openings ?? []).filter((o) => isOnFreeWall(o, wall));

  /** Neue Tür mittig an der angeklickten Stelle der nächsten Wand. */
  function addDoor(w, free) {
    const wall = wallAt(w);
    if (!wall) return;
    const width = Math.min(DOOR_WIDTH, wall.len);
    const mid = snapValue(wall.t, free, TANK_SNAP);
    const a = clamp(mid - width / 2, 0, wall.len - width);
    const [x1, z1] = wallPoint(wall, a);
    const [x2, z2] = wallPoint(wall, a + width);
    addOpening({ type: 'door', x1: round3(x1), z1: round3(z1), x2: round3(x2), z2: round3(z2) });
  }

  function addOpening(props) {
    const o = createOpening(props);
    store.mutate((b) => {
      const f = b.floors.find((x) => x.id === state.floorId);
      (f.openings ??= []).push(o);
    });
    selectOpening(o.id);
  }

  function selectOpening(id) {
    state.selectedOpeningId = id;
    state.selectedWallId = null;
    state.selectedRoomId = null;
    state.selectedTankId = null;
    state.selectedPrinterId = null;
    preview.setSelectedRoom(null);
    preview.setSelectedTank(null);
    preview.setSelectedPrinter(null);
    renderPlan();
    renderProps();
    renderRoomList();
  }

  /** Türen und Glaswände auf dem Umriss eines Raums – sie wandern beim Verschieben und Drehen mit. */
  const attachedOpenings = (floor, room) => (floor.openings ?? []).filter((o) => isOnRoom(o, room));

  /** Öffnungen (Kopien von vorher) um `center` drehen und in die Etage übernehmen. */
  function rotateOpenings(floor, originals, center, deg) {
    for (const src of originals) {
      const o = floor.openings?.find((x) => x.id === src.id);
      if (!o) continue;
      const [x1, z1] = rotatePoint([src.x1, src.z1], center, deg);
      const [x2, z2] = rotatePoint([src.x2, src.z2], center, deg);
      Object.assign(o, { x1: round3(x1), z1: round3(z1), x2: round3(x2), z2: round3(z2) });
    }
  }

  /** Hintergrundbild der Etage: nur Attribute setzen, das Bild selbst nur bei Wechsel. */
  function renderUnderlay(floor) {
    const u = floor.underlay;
    underlayEl.style.display = u?.visible ? '' : 'none';
    if (!u?.visible) return;
    if (underlaySrc !== u.src) {
      underlayEl.setAttribute('href', u.src);
      underlaySrc = u.src;
    }
    underlayEl.setAttribute('x', u.x);
    underlayEl.setAttribute('y', u.z);
    underlayEl.setAttribute('width', u.width);
    underlayEl.setAttribute('height', u.width * u.ratio);
    underlayEl.setAttribute('opacity', u.opacity);
  }

  /** Bilddatei verkleinern und komprimieren (WebP, sonst JPEG), damit der Entwurf in den Browser-Speicher passt. */
  async function readUnderlayFile(file) {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      // SVG ohne feste Größe meldet 0
      const nw = img.naturalWidth || 1600;
      const nh = img.naturalHeight || 1200;
      const k = Math.min(1, UNDERLAY_MAX_PX / Math.max(nw, nh));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(nw * k));
      canvas.height = Math.max(1, Math.round(nh * k));
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let src = canvas.toDataURL('image/webp', 0.7);
      if (!src.startsWith('data:image/webp')) src = canvas.toDataURL('image/jpeg', 0.75);
      return { src, ratio: canvas.height / canvas.width };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  async function loadUnderlay(file) {
    let image;
    try {
      image = await readUnderlayFile(file);
    } catch {
      alert('Das Bild konnte nicht gelesen werden. Unterstützt werden Bilddateien wie PNG, JPG, WebP oder SVG – PDF-Pläne bitte vorher als Bild exportieren.');
      return;
    }
    const old = currentFloor().underlay;
    let place = old && { x: old.x, z: old.z, width: old.width };
    if (!place) {
      // neues Bild: in den sichtbaren Ausschnitt einpassen, danach mit „Maßstab setzen“ ausrichten
      const vw = (svg.clientWidth || 600) / plan.scale;
      const vh = (svg.clientHeight || 400) / plan.scale;
      const width = round2(0.8 * Math.min(vw, vh / image.ratio));
      place = { x: round2(plan.cx - width / 2), z: round2(plan.cz - (width * image.ratio) / 2), width };
    }
    store.mutate((b) => {
      b.floors.find((f) => f.id === state.floorId).underlay = {
        ...image,
        ...place,
        opacity: old?.opacity ?? UNDERLAY_OPACITY,
        visible: true,
      };
    });
  }

  /** Zwei Punkte einer bekannten Strecke angeklickt: Bild so skalieren, dass sie die echte Länge hat. */
  function finishCalibration() {
    const [ax, az] = calib.a;
    const [bx, bz] = calib.b;
    const measured = Math.hypot(bx - ax, bz - az);
    renderPlan();
    const input = measured > 0.05 ? prompt(`Wie lang ist diese Strecke in Wirklichkeit (in m)?\nIm Moment: ${fmt(measured, 2)} m`, fmt(measured, 2)) : null;
    calib = null;
    const real = parseFloat(String(input ?? '').replace(',', '.'));
    if (!(real > 0)) return renderPlan();
    const k = real / measured;
    const r3 = (v) => Math.round(v * 1000) / 1000;
    store.mutate((b) => {
      const u = b.floors.find((f) => f.id === state.floorId).underlay;
      // der erste Punkt bleibt, wo er ist
      u.x = r3(ax - (ax - u.x) * k);
      u.z = r3(az - (az - u.z) * k);
      u.width = r3(u.width * k);
    });
    setTool('select');
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

  /** Aufzug als Grundriss-Symbol: Schacht mit Kreuz, Tür zum Podest. */
  function renderElevator(room, height, px) {
    const lift = stairLayout(room, height).elevator;
    if (!lift) return '';
    const { x, z, w, d } = lift.shaft;
    const walls = lift.walls.map((r) => `<rect x="${r.x}" y="${r.z}" width="${r.w}" height="${r.d}"/>`).join('');
    const door = lift.door;
    return `
      <g class="lift" stroke-width="${px}">
        <rect class="lift-shaft" x="${x}" y="${z}" width="${w}" height="${d}"/>
        <path class="lift-cross" d="M ${x} ${z} L ${x + w} ${z + d} M ${x + w} ${z} L ${x} ${z + d}"/>
        <g class="lift-walls">${walls}</g>
        <rect class="lift-door" x="${door.x}" y="${door.z}" width="${door.w}" height="${door.d}"/>
        ${w * plan.scale > 40 ? `<text x="${x + w / 2}" y="${z + d / 2}" font-size="${10 * px}">Aufzug</text>` : ''}
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
      door: 'Tür setzen: auf eine Wand klicken (auch zwischen zwei Räumen) · Alt = ohne Raster · Esc zum Beenden',
      glass: 'Glaswand: an einer Wand entlang ziehen (Klick = 2 m) · Alt = ohne Raster · Esc zum Beenden',
      wall: 'Wand: von Punkt zu Punkt ziehen · fängt Raumecken und Wandenden · Shift = waagerecht/senkrecht · Alt = ohne Raster · Esc zum Beenden',
      printer: 'Drucker setzen: in einen Raum oder Flur klicken · Esc zum Beenden',
      calibrate: 'Maßstab setzen: Anfang und Ende einer bekannten Strecke im Hintergrundbild anklicken, dann die echte Länge eingeben · Esc zum Beenden',
      underlay: 'Hintergrundbild verschieben: im Grundriss ziehen · Esc zum Beenden',
      select:
        'Klicken = auswählen · Ziehen = verschieben · Griffe = Größe ändern · Kreis = drehen · Raute = Aussparung/Schräge · Doppelklick auf Bodentank = Ports bearbeiten · P = Drucker setzen · Alt = ohne Raster',
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

  function renderOpeningSection(o, floor) {
    const types = Object.entries(OPENING_TYPES)
      .map(
        ([k, l]) =>
          `<button class="btn sm${o.type === k ? ' active' : ''}" data-act="opening-type" data-type="${k}">${esc(l)}</button>`,
      )
      .join('');
    return `
      <section class="panel">
        <h2 class="panel-title">${esc(OPENING_TYPES[o.type])}</h2>
        <div class="field"><span>Art</span><div class="seg seg-fill">${types}</div></div>
        <label class="field"><span>Breite (m)</span>
          <input class="input" type="number" step="0.1" min="${MIN_OPENING}" data-bind="opening:width" value="${round2(openingLength(o))}">
        </label>
        ${o.type === 'door' ? `<button class="btn sm" data-act="opening-swing" title="Anschlag und Öffnungsrichtung wechseln">Aufschlag drehen</button>` : ''}
        ${
          isOnWall(o, floor)
            ? `<span class="hint-text">Ziehen = entlang der Wand verschieben · Enden ziehen = Breite ändern</span>`
            : `<span class="field-warn">Liegt auf keiner Wand und wird in 3D nicht dargestellt. Auf eine Wand ziehen oder löschen.</span>`
        }
        <div class="btn-row">
          <button class="btn sm danger" data-act="opening-del">Löschen</button>
        </div>
      </section>`;
  }

  function renderWallSection(w) {
    return `
      <section class="panel">
        <h2 class="panel-title">Wand</h2>
        <label class="field"><span>Länge (m)</span>
          <input class="input" type="number" step="0.1" min="${MIN_WALL}" data-bind="wall:length" value="${round2(wallLength(w))}">
        </label>
        <span class="hint-text">Ziehen = verschieben · Enden ziehen = Länge und Richtung ändern · Türen und Glaswände lassen sich daraufsetzen</span>
        <div class="btn-row">
          <button class="btn sm" data-act="wall-dup">Duplizieren</button>
          <button class="btn sm danger" data-act="wall-del">Löschen</button>
        </div>
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
        ${room.type !== 'stairs' ? renderShapeFields(room) : ''}
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
        </div>
        <label class="check"><input type="checkbox" data-bind="room:elevator" ${room.elevator ? 'checked' : ''}> Aufzug in der Mitte</label>
        ${room.elevator ? elevatorHint(room) : ''}`
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
          <span>Drehung (°)</span>
          <div class="color-row">
            <input class="input" type="number" step="1" data-bind="room:rotation" value="${roomRotation(room)}">
            <button class="btn sm" data-act="room-rotate" data-deg="-15" title="15° gegen den Uhrzeigersinn">↺</button>
            <button class="btn sm" data-act="room-rotate" data-deg="15" title="15° im Uhrzeigersinn">↻</button>
          </div>
          <span class="hint-text">Auch am Kreis-Griff über dem Raum (Raster 15°, Alt = frei). X/Z ist die linke obere Ecke vor dem Drehen.</span>
        </div>
        <div class="area-row"><span>Fläche</span><strong data-out="room-area">${areaText(roomArea(room))}</strong></div>
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
      ${selectedOpening() ? renderOpeningSection(selectedOpening(), floor) : ''}
      ${selectedWall() ? renderWallSection(selectedWall()) : ''}
      ${tank ? renderTankSection(tank) : ''}
      ${printer ? renderPrinterSection(printer) : ''}
      ${roomSection}
      <section class="panel">
        <h2 class="panel-title">Etage</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="floor:name" value="${esc(floor.name)}"></label>
        <label class="field"><span>Geschosshöhe (m)</span><input class="input" type="number" step="0.1" min="2" max="10" data-bind="floor:height" value="${floor.height}"></label>
        <div class="area-row"><span>Fläche aller Räume</span><strong data-out="floor-area">${areaText(floorArea(floor))}</strong></div>
        ${renderUnderlayFields(floor)}
        ${
          floor.id === b.groundFloorId
            ? `<span class="hint-text">Erdgeschoss (Geländehöhe). Etagen darunter sind Untergeschosse.</span>`
            : `<button class="btn sm" data-act="floor-ground" title="Diese Etage liegt auf Geländehöhe; alle darunter werden Untergeschosse">Als Erdgeschoss festlegen</button>`
        }
      </section>
      <section class="panel">
        <h2 class="panel-title">Gebäude</h2>
        <label class="field"><span>Name</span><input class="input" data-bind="building:name" value="${esc(b.name)}"></label>
      </section>`;
  }

  function renderUnderlayFields(floor) {
    const u = floor.underlay;
    if (!u)
      return `
        <div class="field">
          <span>Hintergrundbild</span>
          <button class="btn sm" data-act="underlay-load">Bild laden …</button>
          <span class="hint-text">Grundriss-Zeichnung als schwache Vorlage zum Nachzeichnen. Nur im Editor sichtbar.</span>
        </div>`;
    const kb = Math.round((u.src.length * 0.75) / 1024);
    return `
        <div class="field underlay-fields">
          <span>Hintergrundbild <span class="muted">· ${kb} kB</span></span>
          <label class="check"><input type="checkbox" data-bind="underlay:visible" ${u.visible ? 'checked' : ''}> anzeigen</label>
          <label class="range"><span>Deckkraft</span>
            <input type="range" min="0.05" max="0.6" step="0.05" data-bind="underlay:opacity" value="${u.opacity}">
          </label>
          <div class="field-grid">
            <label class="field"><span>Breite (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="underlay:width" value="${round2(u.width)}"></label>
            <span></span>
            <label class="field"><span>X (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:x" value="${round2(u.x)}"></label>
            <label class="field"><span>Z (m)</span><input class="input" type="number" step="0.1" data-bind="underlay:z" value="${round2(u.z)}"></label>
          </div>
          <div class="btn-row">
            <button class="btn sm${state.tool === 'calibrate' ? ' active' : ''}" data-act="underlay-calibrate" title="Zwei Punkte einer bekannten Strecke anklicken">Maßstab setzen</button>
            <button class="btn sm${state.tool === 'underlay' ? ' active' : ''}" data-act="underlay-move">Verschieben</button>
          </div>
          <div class="btn-row">
            <button class="btn sm" data-act="underlay-load">Ersetzen …</button>
            <button class="btn sm danger" data-act="underlay-del">Entfernen</button>
          </div>
        </div>`;
  }

  function elevatorHint(room) {
    if (room.stairShape === 'straight')
      return `<span class="field-warn">Der Aufzug sitzt im Treppenauge – dafür eine zweiläufige Treppenform wählen.</span>`;
    if (!elevatorFits(room)) {
      const need = fmt(ELEVATOR_MIN_WIDTH + WALL_THICKNESS * 2, 2);
      return `<span class="field-warn">Zu schmal für einen Aufzug: quer zur Laufrichtung mindestens ${need} m nötig.</span>`;
    }
    return `<span class="hint-text">Der Schacht steht zwischen den Läufen, die Tür zeigt zum Geschosspodest. Er wird auf jeder Etage gezeichnet.</span>`;
  }

  /** Raumform: Rechteck, L-Form oder schräge Wand an einer Ecke. */
  function renderShapeFields(room) {
    const shape = roomShape(room);
    const buttons = Object.entries(ROOM_SHAPES)
      .map(
        ([k, l]) =>
          `<button class="btn sm${shape === k ? ' active' : ''}" data-act="room-shape" data-shape="${k}">${esc(l)}</button>`,
      )
      .join('');
    const field = `<div class="field"><span>Form</span><div class="seg seg-fill">${buttons}</div></div>`;
    if (shape === 'rect') return field;
    const corners = Object.entries(CUT_CORNERS)
      .map(([k, l]) => `<option value="${k}" ${room.cutCorner === k ? 'selected' : ''}>${esc(l)}</option>`)
      .join('');
    const [lw, ld] = shape === 'l' ? ['Aussparung Breite', 'Aussparung Tiefe'] : ['Schräge in X', 'Schräge in Z'];
    return `
        ${field}
        <div class="field">
          <span>${shape === 'l' ? 'Aussparung an Ecke' : 'Schräge an Ecke'}</span>
          <div class="color-row">
            <select class="input" data-bind="room:cutCorner">${corners}</select>
            <button class="btn sm" data-act="cut-rotate" title="Zur nächsten Ecke (im Uhrzeigersinn)">↻</button>
          </div>
        </div>
        <div class="field-grid">
          <label class="field"><span>${lw} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutW" value="${round2(room.cutW)}"></label>
          <label class="field"><span>${ld} (m)</span><input class="input" type="number" step="0.1" min="0.5" data-bind="room:cutD" value="${round2(room.cutD)}"></label>
        </div>
        <span class="hint-text">Größe auch über den Rauten-Griff im Grundriss änderbar.</span>`;
  }

  function renderRoomList() {
    const rooms = [...currentFloor().rooms].sort((a, b) => a.name.localeCompare(b.name, 'de', { numeric: true }));
    $('#e-rooms').innerHTML = rooms.length
      ? rooms
          .map(
            (r) => `
        <button class="room-item ${r.id === state.selectedRoomId ? 'active' : ''}" data-room="${r.id}">
          <span class="swatch" style="background:${roomColor(r)}"></span>
          <span class="ri-text"><span class="ri-name">${esc(r.name)}</span><span class="ri-sub">${areaText(roomArea(r))}</span></span>
          ${r.printers.length ? `<span class="ri-meta" title="Drucker">${r.printers.length} DR</span>` : ''}
          ${r.tanks.length ? `<span class="ri-meta" title="Bodentanks">${r.tanks.length} BT</span>` : ''}
        </button>`,
          )
          .join('')
      : `<div class="empty">Noch keine Räume.</div>`;
  }

  function updateDraftGlass(t1) {
    drag.t1 = t1;
    const [x1, z1] = wallPoint(drag.wall, Math.min(drag.t0, t1));
    const [x2, z2] = wallPoint(drag.wall, Math.max(drag.t0, t1));
    draftGlass = { x1, z1, x2, z2 };
    renderPlan();
  }

  /** Flächenangaben aktualisieren, ohne das Formular neu zu zeichnen (Fokus bleibt). */
  function updateAreas() {
    const room = selectedRoom();
    const roomOut = root.querySelector('[data-out="room-area"]');
    if (room && roomOut) roomOut.textContent = areaText(roomArea(room));
    const floorOut = root.querySelector('[data-out="floor-area"]');
    if (floorOut) floorOut.textContent = areaText(floorArea(currentFloor()));
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
      state.selectedPrinterId === printerId &&
      !state.selectedOpeningId &&
      !state.selectedWallId
    )
      return;
    state.selectedOpeningId = null;
    state.selectedWallId = null;
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
    state.selectedOpeningId = null;
    state.selectedWallId = null;
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
    // Die Knöpfe „Maßstab setzen“ / „Verschieben“ in der Seitenleiste zeigen den Modus an
    const panelTool = [state.tool, tool].some((t) => t === 'calibrate' || t === 'underlay');
    if (tool !== 'calibrate') calib = null;
    draftGlass = null;
    draftWall = null;
    state.tool = tool;
    renderToolbar();
    renderPlan();
    if (panelTool) renderProps();
  }

  function addRoom(props) {
    const floor = currentFloor();
    const room = createRoom({ name: `Raum ${floor.rooms.length + 1}`, ...props });
    const wasEmpty = !floor.rooms.length;
    store.mutate((b) => b.floors.find((f) => f.id === floor.id).rooms.push(room));
    // erster Raum einer Etage: 3D-Vorschau auf ihn ausrichten
    if (wasEmpty) preview.fitAll();
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
    if (state.selectedWallId) {
      const id = state.selectedWallId;
      state.selectedWallId = null;
      store.mutate((b) => {
        const f = b.floors.find((x) => x.id === state.floorId);
        const wall = f.walls.find((w) => w.id === id);
        f.walls = f.walls.filter((w) => w.id !== id);
        // Türen/Glas nur auf dieser Wand gehen mit
        if (f.openings) f.openings = f.openings.filter((o) => !isOnFreeWall(o, wall) || isOnWall(o, f));
      });
      return;
    }
    if (state.selectedOpeningId) {
      const id = state.selectedOpeningId;
      state.selectedOpeningId = null;
      store.mutate((b) => {
        const f = b.floors.find((x) => x.id === state.floorId);
        f.openings = f.openings.filter((o) => o.id !== id);
      });
      return;
    }
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
      const room = f.rooms.find((r) => r.id === id);
      f.rooms = f.rooms.filter((r) => r.id !== id);
      // Türen/Glas nur dieses Raums (z. B. in einer Außenwand) gehen mit, gemeinsame mit Nachbarn bleiben
      if (f.openings) f.openings = f.openings.filter((o) => !isOnRoom(o, room) || isOnWall(o, f));
    });
  }

  function duplicateSelected() {
    const wall = selectedWall();
    if (wall) {
      const { id, ...rest } = wall;
      addWall({ ...rest, x1: wall.x1 + 0.5, z1: wall.z1 + 0.5, x2: wall.x2 + 0.5, z2: wall.z2 + 0.5 });
      return;
    }
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
    if (selectedWall()) {
      store.mutate((b) => {
        const w = wallById(b);
        const f = b.floors.find((x) => x.id === state.floorId);
        for (const o of wallOpenings(f, w)) translateOpening(o, dx, dz);
        translateOpening(w, dx, dz);
      });
      return;
    }
    if (!selectedRoom()) return;
    store.mutate((b) => {
      const item = tankById(b) ?? printerById(b);
      if (item) {
        // Pfeiltasten wirken im Grundriss, Gegenstände liegen im (evtl. gedrehten) Raum
        const [lx, lz] = vectorToRoom(roomById(b, state.selectedRoomId), [dx, dz]);
        item.x = round2(item.x + lx);
        item.z = round2(item.z + lz);
        clampItems(roomById(b, state.selectedRoomId));
        return;
      }
      const r = roomById(b, state.selectedRoomId);
      for (const o of attachedOpenings(b.floors.find((f) => f.id === state.floorId), r)) translateOpening(o, dx, dz);
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
      const level = floors().length - groundIndex(store.building);
      const floor = createFloor({ name: defaultFloorName(level), height: currentFloor()?.height ?? 3 });
      store.mutate((b) => b.floors.push(floor));
      setFloor(floor.id);
    },
    'floor-add-below': () => {
      const level = -groundIndex(store.building) - 1;
      const floor = createFloor({ name: defaultFloorName(level), height: currentFloor()?.height ?? 3 });
      store.mutate((b) => b.floors.unshift(floor));
      setFloor(floor.id);
    },
    'underlay-load': () => $('#e-underlay-file').click(),
    'underlay-del': () => {
      store.mutate((b) => delete b.floors.find((f) => f.id === state.floorId).underlay);
      if (state.tool === 'calibrate' || state.tool === 'underlay') setTool('select');
    },
    'underlay-calibrate': () => {
      calib = null;
      setTool(state.tool === 'calibrate' ? 'select' : 'calibrate');
    },
    'underlay-move': () => setTool(state.tool === 'underlay' ? 'select' : 'underlay'),
    'floor-ground': () => {
      store.mutate((b) => (b.groundFloorId = state.floorId));
    },
    'floor-dup': () => {
      const src = currentFloor();
      const idx = floors().indexOf(src);
      const copy = createFloor({
        name: `${src.name} (Kopie)`,
        height: src.height,
        rooms: src.rooms.map((r) => cloneRoom(r)),
        ...(src.underlay ? { underlay: { ...src.underlay } } : {}),
        ...(src.openings?.length ? { openings: src.openings.map(({ id, ...o }) => createOpening(o)) } : {}),
        ...(src.walls?.length ? { walls: src.walls.map(({ id, ...w }) => createWall(w)) } : {}),
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
      store.mutate((b) => {
        b.floors.splice(idx, 1);
        // Erdgeschoss gelöscht: die Etage darüber (sonst darunter) liegt jetzt auf Geländehöhe
        if (b.groundFloorId === floor.id) b.groundFloorId = (b.floors[idx] ?? b.floors[idx - 1]).id;
      });
      setFloor(floors()[Math.max(0, idx - 1)].id);
    },
    'tool-select': () => setTool('select'),
    'tool-draw': () => setTool('draw'),
    'tool-stairs': () => setTool('stairs'),
    'tool-door': () => setTool('door'),
    'tool-glass': () => setTool('glass'),
    'tool-wall': () => setTool('wall'),
    'wall-dup': duplicateSelected,
    'wall-del': deleteSelected,
    'room-rotate': (btn) => rotateRoom(roomRotation(selectedRoom()) + Number(btn.dataset.deg)),
    'opening-type': (btn) => {
      store.mutate((b) => (openingById(b).type = btn.dataset.type));
    },
    'opening-swing': () => {
      store.mutate((b) => {
        const o = openingById(b);
        o.swing = (o.swing + 1) % 4;
      });
    },
    'opening-del': deleteSelected,
    'stairs-rotate': () => {
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        r.stairDir = rotateStairDir(r.stairDir);
      });
    },
    'room-shape': (btn) => {
      const shape = btn.dataset.shape;
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        if (roomShape(r) === 'rect' && shape !== 'rect') Object.assign(r, defaultCut(r));
        r.shape = shape;
        clampCut(r);
        clampItems(r);
      });
    },
    'cut-rotate': () => {
      const order = Object.keys(CUT_CORNERS);
      store.mutate((b) => {
        const r = roomById(b, state.selectedRoomId);
        r.cutCorner = order[(order.indexOf(r.cutCorner) + 1) % order.length];
        clampItems(r);
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
      setFloor(store.building.groundFloorId, { fit: true });
    },
    reset: () => {
      if (!confirm('Aktuelles Gebäude durch das Testgebäude ersetzen? (Rückgängig ist möglich)')) return;
      store.replace(createSampleBuilding());
      setFloor(store.building.groundFloorId, { fit: true });
    },
    'zoom-in': () => zoomAt(1.25),
    'zoom-out': () => zoomAt(0.8),
    'zoom-fit': () => {
      fitPlan();
      renderPlan();
    },
  };

  /** Raum auf einen Winkel drehen; Türen und Glaswände auf seinen Wänden drehen mit. */
  function rotateRoom(deg) {
    const room = selectedRoom();
    if (!room) return;
    const next = normalizeRotation(deg);
    const delta = next - roomRotation(room);
    if (!delta) return renderProps();
    const originals = attachedOpenings(currentFloor(), room).map((o) => ({ ...o }));
    store.mutate((b) => {
      const r = roomById(b, state.selectedRoomId);
      r.rotation = next;
      rotateOpenings(b.floors.find((f) => f.id === state.floorId), originals, roomCenter(r), delta);
    });
  }

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

  $('#e-underlay-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (file) loadUnderlay(file);
  });
  // Deckkraft beim Ziehen des Reglers sofort zeigen, gespeichert wird beim Loslassen
  $('#e-props').addEventListener('input', (e) => {
    if (e.target.dataset.bind === 'underlay:opacity') underlayEl.setAttribute('opacity', e.target.value);
  });

  $('#e-file').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    try {
      store.replace(JSON.parse(await file.text()));
      setFloor(store.building.groundFloorId, { fit: true });
    } catch (err) {
      alert(`Import fehlgeschlagen: ${err.message}`);
    }
  });

  const onBindChange = (source) => (e) => {
    const el = e.target.closest('[data-bind]');
    if (!el) return;
    const [scope, key, field] = el.dataset.bind.split(':');
    let value = el.type === 'checkbox' ? el.checked : el.value;

    if (scope === 'port') {
      changeSource = source;
      store.mutate((b) => (tankById(b).ports[Number(key)][field] = value.trim()));
      changeSource = null;
      return;
    }
    if (scope === 'opening' && key === 'width') {
      const width = parseFloat(String(value).replace(',', '.'));
      if (!(width >= MIN_OPENING)) return renderProps();
      // Mitte bleibt, beide Enden wandern
      store.mutate((b) => {
        const o = openingById(b);
        const [ux, uz] = openingDir(o);
        const cx = (o.x1 + o.x2) / 2;
        const cz = (o.z1 + o.z2) / 2;
        Object.assign(o, {
          x1: round3(cx - (ux * width) / 2),
          z1: round3(cz - (uz * width) / 2),
          x2: round3(cx + (ux * width) / 2),
          z2: round3(cz + (uz * width) / 2),
        });
      });
      return;
    }
    if (scope === 'wall' && key === 'length') {
      const length = parseFloat(String(value).replace(',', '.'));
      if (!(length >= MIN_WALL)) return renderProps();
      // Anfang bleibt, das Ende wandert in gleicher Richtung
      store.mutate((b) => {
        const w = wallById(b);
        const [ux, uz] = openingDir(w);
        w.x2 = round3(w.x1 + ux * length);
        w.z2 = round3(w.z1 + uz * length);
      });
      return;
    }
    if (scope === 'room' && key === 'rotation') {
      const deg = parseFloat(String(value).replace(',', '.'));
      if (!Number.isFinite(deg)) return renderProps();
      return rotateRoom(deg);
    }
    if (scope === 'tank' && key === 'count') {
      const count = clamp(parseInt(value, 10) || 0, 0, MAX_PORTS);
      store.mutate((b) => {
        const t = tankById(b);
        t.ports = resizePorts(t.ports, count);
      });
      return;
    }
    if (['x', 'z', 'width', 'depth', 'height', 'cutW', 'cutD', 'opacity'].includes(key)) {
      value = parseFloat(String(value).replace(',', '.'));
      if (!Number.isFinite(value)) return renderProps();
      if (key === 'width' || key === 'depth') value = Math.max(0.5, value);
      if (key === 'height') value = clamp(value, 2, 10);
      value = round2(value);
    }
    // Typwechsel ändert die Farbe, Treppenform/Aufzug den Hinweis → Formular neu zeichnen
    changeSource = ['type', 'elevator', 'stairShape'].includes(key) ? null : source;
    if (scope === 'printer') value = value.trim();
    store.mutate((b) => {
      const target =
        scope === 'tank'
          ? tankById(b)
          : scope === 'printer'
            ? printerById(b)
            : scope === 'room'
            ? roomById(b, state.selectedRoomId)
            : scope === 'underlay'
            ? b.floors.find((f) => f.id === state.floorId)?.underlay
            : scope === 'floor'
              ? b.floors.find((f) => f.id === state.floorId)
              : b;
      if (!target) return;
      if (scope === 'room' && (key === 'x' || key === 'z')) {
        const d = value - target[key];
        const f = b.floors.find((x) => x.id === state.floorId);
        for (const o of attachedOpenings(f, target)) translateOpening(o, key === 'x' ? d : 0, key === 'z' ? d : 0);
      }
      const corner = scope === 'room' && (key === 'width' || key === 'depth') && roomToWorld(target, [target.x, target.z]);
      target[key] = value;
      if (corner && roomRotation(target)) placeCorner(target, corner);
      const room = roomById(b, state.selectedRoomId);
      if (scope === 'room' && ['width', 'depth', 'cutW', 'cutD'].includes(key)) clampCut(room);
      if (room && (scope === 'tank' || ['width', 'depth', 'cutW', 'cutD', 'cutCorner'].includes(key))) clampItems(room);
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

    if (state.tool === 'calibrate') {
      if (!calib || calib.b) calib = { a: [w.x, w.z], b: null, hover: [w.x, w.z] };
      else {
        calib.b = [w.x, w.z];
        finishCalibration();
        return;
      }
      renderPlan();
      return;
    }
    if (state.tool === 'underlay') {
      const u = currentFloor().underlay;
      if (u) drag = { type: 'underlay', start: w, orig: { x: u.x, z: u.z }, started: false };
      return;
    }
    if (state.tool === 'draw' || state.tool === 'stairs') {
      const p = { x: snapValue(w.x, e.altKey), z: snapValue(w.z, e.altKey) };
      drag = { type: 'draw', start: p };
      draftRect = { x: p.x, z: p.z, width: 0, depth: 0 };
      return;
    }
    if (state.tool === 'door') {
      addDoor(w, e.altKey);
      return;
    }
    if (state.tool === 'wall') {
      const [x, z] = snapWallPoint(w, e.altKey);
      drag = { type: 'wall-draw', start: [x, z] };
      draftWall = { x1: x, z1: z, x2: x, z2: z };
      renderPlan();
      return;
    }
    if (state.tool === 'glass') {
      const wall = wallAt(w);
      if (wall) {
        const t = snapValue(wall.t, e.altKey, TANK_SNAP);
        drag = { type: 'glass', wall, t0: clamp(t, 0, wall.len) };
        updateDraftGlass(drag.t0);
      }
      return;
    }
    if (state.tool === 'tank' || state.tool === 'printer') {
      const room = roomAt(w);
      if (room) {
        const [lx, lz] = worldToRoom(room, [w.x, w.z]);
        const pos = { x: snapValue(lx - room.x, e.altKey, TANK_SNAP), z: snapValue(lz - room.z, e.altKey, TANK_SNAP) };
        if (state.tool === 'tank') addTank(room, pos);
        else addPrinter(room, pos);
      }
      return;
    }
    const oHandleEl = e.target.closest('[data-ohandle]');
    const openingEl = e.target.closest('[data-opening]');
    if (oHandleEl && selectedOpening()) {
      drag = { type: 'opening-end', end: oHandleEl.dataset.ohandle, start: w, orig: { ...selectedOpening() }, started: false };
      return;
    }
    if (openingEl) {
      selectOpening(openingEl.dataset.opening);
      drag = { type: 'opening', start: w, orig: { ...selectedOpening() }, started: false };
      return;
    }
    const wHandleEl = e.target.closest('[data-whandle]');
    if (wHandleEl && selectedWall()) {
      drag = { type: 'wall-end', end: wHandleEl.dataset.whandle, start: w, started: false };
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
    if (handleEl && selectedRoom() && handleEl.dataset.handle === 'rotate') {
      const r = selectedRoom();
      drag = {
        type: 'rotate',
        start: w,
        orig: { rotation: roomRotation(r), openings: attachedOpenings(currentFloor(), r).map((o) => ({ ...o })) },
        started: false,
      };
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
    const wallEl = e.target.closest('[data-wall]');
    if (wallEl) {
      selectWall(wallEl.dataset.wall);
      const f = currentFloor();
      const wall = selectedWall();
      const openings = wallOpenings(f, wall).map((o) => ({ ...o }));
      drag = { type: 'wall', start: w, orig: { ...wall, openings }, started: false };
      return;
    }
    if (roomEl) {
      select(roomEl.dataset.room);
      const r = selectedRoom();
      const openings = attachedOpenings(currentFloor(), r).map((o) => ({ ...o }));
      drag = { type: 'move', start: w, orig: { x: r.x, z: r.z, openings }, started: false };
      return;
    }
    select(null);
    drag = { type: 'pan', sx: e.clientX, sy: e.clientY, cx: plan.cx, cz: plan.cz };
  });

  svg.addEventListener('pointermove', (e) => {
    const w = toWorld(e);
    $('#e-coords').textContent = `x ${fmt(w.x, 2)} · z ${fmt(w.z, 2)} m`;
    if (calib && !calib.b) {
      calib.hover = [w.x, w.z];
      renderPlan();
    }
    if (!drag) return;

    if (drag.type === 'pan') {
      plan.cx = drag.cx - (e.clientX - drag.sx) / plan.scale;
      plan.cz = drag.cz - (e.clientY - drag.sy) / plan.scale;
      renderPlan();
      return;
    }

    if (drag.type === 'glass') {
      const { wall } = drag;
      const t = (w.x - wall.p[0]) * wall.u[0] + (w.z - wall.p[1]) * wall.u[1];
      updateDraftGlass(clamp(snapValue(t, e.altKey, TANK_SNAP), 0, wall.len));
      return;
    }

    if (drag.type === 'wall-draw') {
      const [x2, z2] = snapWallPoint(w, e.altKey, drag.start, e.shiftKey);
      draftWall = { x1: drag.start[0], z1: drag.start[1], x2, z2 };
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
        if (drag.type === 'opening' || drag.type === 'opening-end') {
          const o = openingById(b);
          const src = drag.orig;
          const [ux, uz] = openingDir(src);
          const t = snapValue(dx * ux + dz * uz, free, TANK_SNAP);
          if (drag.type === 'opening') {
            Object.assign(o, { x1: src.x1, z1: src.z1, x2: src.x2, z2: src.z2 });
            translateOpening(o, ux * t, uz * t);
          } else if (drag.end === 'a') {
            // Ende entlang der Wand ziehen, Mindestbreite bleibt
            const s = Math.min(t, openingLength(src) - MIN_OPENING);
            o.x1 = round3(src.x1 + ux * s);
            o.z1 = round3(src.z1 + uz * s);
          } else {
            const s = Math.max(t, MIN_OPENING - openingLength(src));
            o.x2 = round3(src.x2 + ux * s);
            o.z2 = round3(src.z2 + uz * s);
          }
          return;
        }
        if (drag.type === 'wall' || drag.type === 'wall-end') {
          const fw = wallById(b);
          const f = b.floors.find((x) => x.id === state.floorId);
          if (drag.type === 'wall-end') {
            const fixed = drag.end === 'a' ? [fw.x2, fw.z2] : [fw.x1, fw.z1];
            const [x, z] = snapWallPoint(w, free, fixed, e.shiftKey);
            if (Math.hypot(x - fixed[0], z - fixed[1]) < MIN_WALL) return;
            if (drag.end === 'a') Object.assign(fw, { x1: x, z1: z });
            else Object.assign(fw, { x2: x, z2: z });
            return;
          }
          const src = drag.orig;
          const mx = snapValue(dx, free);
          const mz = snapValue(dz, free);
          Object.assign(fw, { x1: src.x1, z1: src.z1, x2: src.x2, z2: src.z2 });
          translateOpening(fw, mx, mz);
          for (const o0 of src.openings) {
            const o = f.openings.find((x) => x.id === o0.id);
            if (!o) continue;
            Object.assign(o, { x1: o0.x1, z1: o0.z1, x2: o0.x2, z2: o0.z2 });
            translateOpening(o, mx, mz);
          }
          return;
        }
        if (drag.type === 'underlay') {
          const u = b.floors.find((f) => f.id === state.floorId).underlay;
          u.x = round2(drag.orig.x + dx);
          u.z = round2(drag.orig.z + dz);
          return;
        }
        const r = roomById(b, state.selectedRoomId);
        if (!r) return;
        if (drag.type === 'tank' || drag.type === 'printer') {
          const item = drag.type === 'tank' ? tankById(b) : printerById(b);
          const [lx, lz] = vectorToRoom(r, [dx, dz]);
          item.x = snapValue(drag.orig.x + lx, free, TANK_SNAP);
          item.z = snapValue(drag.orig.z + lz, free, TANK_SNAP);
          clampItems(r);
          return;
        }
        if (drag.type === 'move') {
          r.x = round2(snapValue(drag.orig.x + dx, free));
          r.z = round2(snapValue(drag.orig.z + dz, free));
          const f = b.floors.find((x) => x.id === state.floorId);
          for (const src of drag.orig.openings) {
            const o = f.openings.find((x) => x.id === src.id);
            if (!o) continue;
            Object.assign(o, { x1: src.x1, z1: src.z1, x2: src.x2, z2: src.z2 });
            translateOpening(o, r.x - drag.orig.x, r.z - drag.orig.z);
          }
          return;
        }
        if (drag.type === 'rotate') {
          // Griff sitzt über der oberen Kante: Winkel 0 = Griff genau nach oben
          const [cx, cz] = roomCenter(r);
          const raw = (Math.atan2(w.x - cx, cz - w.z) * 180) / Math.PI;
          const next = normalizeRotation(free ? Math.round(raw) : Math.round(raw / 15) * 15);
          r.rotation = next;
          rotateOpenings(b.floors.find((x) => x.id === state.floorId), drag.orig.openings, [cx, cz], next - drag.orig.rotation);
          return;
        }
        const o = drag.orig;
        const h = drag.handle;
        if (h === 'cut') {
          const { corner, east, north } = cutHandle(r);
          const [lx, lz] = worldToRoom(r, [w.x, w.z]);
          const px = snapValue(lx, free);
          const pz = snapValue(lz, free);
          r.cutW = round2(east ? corner[0] - px : px - corner[0]);
          r.cutD = round2(north ? pz - corner[1] : corner[1] - pz);
          clampCut(r);
          clampItems(r);
          return;
        }
        // Gerechnet wird im ungedrehten Raum; ohne Drehung rasten die Kanten am Raster,
        // gedreht die Maße (das Raster liegt dann schräg zum Raum)
        const rotated = Boolean(roomRotation(o));
        const [ldx, ldz] = vectorToRoom(o, [dx, dz]);
        const edge = (start, size, d, lower) => {
          if (!rotated) return snapValue(start + (lower ? 0 : size) + d, free);
          return lower ? start + size - snapValue(size - d, free) : start + snapValue(size + d, free);
        };
        let [x0, z0, x1, z1] = [o.x, o.z, o.x + o.width, o.z + o.depth];
        if (h.includes('w')) x0 = Math.min(edge(o.x, o.width, ldx, true), x1 - MIN_SIZE);
        if (h.includes('e')) x1 = Math.max(edge(o.x, o.width, ldx, false), x0 + MIN_SIZE);
        if (h.includes('n')) z0 = Math.min(edge(o.z, o.depth, ldz, true), z1 - MIN_SIZE);
        if (h.includes('s')) z1 = Math.max(edge(o.z, o.depth, ldz, false), z0 + MIN_SIZE);
        r.width = round2(x1 - x0);
        r.depth = round2(z1 - z0);
        // gegenüberliegende Seite bleibt im Gebäude stehen: neue Mitte mit dem alten Raum drehen
        const [cx, cz] = roomToWorld(o, [(x0 + x1) / 2, (z0 + z1) / 2]);
        r.x = round3(cx - r.width / 2);
        r.z = round3(cz - r.depth / 2);
        clampCut(r);
        // Bodentanks und Drucker bleiben beim Ändern der Raumgröße an ihrer Stelle im Gebäude
        const keep = (item, src) => {
          const [lx, lz] = worldToRoom(r, itemWorld(o, src));
          item.x = round2(lx - r.x);
          item.z = round2(lz - r.z);
        };
        r.tanks.forEach((t, i) => keep(t, o.tanks[i]));
        r.printers.forEach((p, i) => keep(p, o.printers[i]));
        clampItems(r);
      },
      { checkpoint: false },
    );
  });

  const endDrag = () => {
    if (drag?.type === 'wall-draw' && draftWall) {
      const wall = draftWall;
      draftWall = null;
      drag = null;
      if (wallLength(wall) >= MIN_WALL) addWall(wall);
      else renderPlan();
      return;
    }
    if (drag?.type === 'glass' && draftGlass) {
      const { wall, t0 } = drag;
      let [a, b] = [t0, drag.t1 ?? t0].sort((x, y) => x - y);
      // nur geklickt: 2 m Glas um die Klickstelle
      if (b - a < MIN_OPENING) {
        const width = Math.min(2, wall.len);
        a = clamp(t0 - width / 2, 0, wall.len - width);
        b = a + width;
      }
      draftGlass = null;
      drag = null;
      const [x1, z1] = wallPoint(wall, a);
      const [x2, z2] = wallPoint(wall, b);
      addOpening({ type: 'glass', x1: round3(x1), z1: round3(z1), x2: round3(x2), z2: round3(z2) });
      return;
    }
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
      draftGlass = null;
      draftWall = null;
      calib = null;
      drag = null;
      setTool('select');
      if (state.selectedOpeningId || state.selectedWallId) select(null);
      else if (state.selectedTankId || state.selectedPrinterId) select(state.selectedRoomId, null);
      else select(null);
    } else if (key === 'r' && !ctrl) setTool('draw');
    else if (key === 's' && !ctrl) setTool('stairs');
    else if (key === 'q' && !ctrl && selectedRoom()?.type === 'stairs') actions['stairs-rotate']();
    else if (key === 't' && !ctrl) setTool('tank');
    else if (key === 'p' && !ctrl) setTool('printer');
    else if (key === 'd' && !ctrl) setTool('door');
    else if (key === 'g' && !ctrl) setTool('glass');
    else if (key === 'w' && !ctrl) setTool('wall');
    else if (key === 'v' && !ctrl) setTool('select');
    else if (key.startsWith('arrow') && (state.selectedRoomId || state.selectedWallId)) {
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
    if (state.selectedOpeningId && !selectedOpening()) state.selectedOpeningId = null;
    if (state.selectedWallId && !selectedWall()) state.selectedWallId = null;
    syncPreview();
    renderToolbar();
    renderPlan();
    renderRoomList();
    if (changeSource !== 'props') renderProps();
    else updateAreas();
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
