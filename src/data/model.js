import { ROOM_TYPES } from './roomTypes.js';
import { uid } from '../utils.js';
import { STAIR_DIRS, STAIR_SHAPES } from './stairs.js';
import { clampCut, CUT_CORNERS, nearestOnPolygon, pointInPolygon, ROOM_SHAPES, roomPolygon, roomShape } from './shape.js';

const num = (v, fallback) => (Number.isFinite(Number(v)) ? Number(v) : fallback);

export function createRoom(props = {}) {
  return {
    id: uid('r'),
    name: 'Raum',
    type: 'office',
    x: 0,
    z: 0,
    width: 4,
    depth: 4,
    shape: 'rect', // 'rect' | 'l' | 'chamfer', siehe shape.js
    cutCorner: 'ne',
    cutW: 2,
    cutD: 2,
    color: null,
    occupant: '',
    description: '',
    tanks: [],
    printers: [],
    stairShape: 'u-left', // nur für Typ Treppenhaus
    stairDir: 'n',
    elevator: false, // Aufzug im Treppenauge, nur für Typ Treppenhaus
    ...props,
  };
}

export const TANK_SIZE = 0.4;

/** Bodentank; x/z sind relativ zur linken oberen Ecke des Raums (Mittelpunkt des Tanks). */
export function createTank(props = {}) {
  return { id: uid('t'), name: 'BT 1', x: 1, z: 1, ports: [], ...props };
}

export function nextTankName(room) {
  const nums = room.tanks.map((t) => Number(/(\d+)\s*$/.exec(t.name)?.[1] ?? 0));
  return `BT ${Math.max(0, ...nums) + 1}`;
}

export const PRINTER_W = 0.6;
export const PRINTER_D = 0.5;

/** Drucker; x/z sind relativ zur linken oberen Ecke des Raums (Mittelpunkt). */
export function createPrinter(props = {}) {
  return { id: uid('p'), name: 'Drucker', ip: '', x: 1, z: 1, ...props };
}

export function nextPrinterName(building) {
  const nums = building.floors.flatMap((f) =>
    f.rooms.flatMap((r) => r.printers.map((p) => Number(/^Drucker (\d+)$/.exec(p.name)?.[1] ?? 0))),
  );
  return `Drucker ${Math.max(0, ...nums) + 1}`;
}

export const isValidIp = (ip) =>
  /^(25[0-5]|2[0-4]\d|1?\d?\d)(\.(25[0-5]|2[0-4]\d|1?\d?\d)){3}$/.test(String(ip).trim());

const clampIn = (v, half, size) => Math.round(Math.min(Math.max(v, half), Math.max(half, size - half)) * 100) / 100;

/** Liegt ein Gegenstand in der Aussparung einer L-Form oder hinter der Schräge, an die Wand schieben. */
function pushInside(item, room, poly, half) {
  const p = [room.x + item.x, room.z + item.z];
  if (pointInPolygon(p, poly)) {
    const { dist, normal } = nearestOnPolygon(poly, p);
    if (dist >= half) return;
    item.x += normal[0] * (half - dist);
    item.z += normal[1] * (half - dist);
  } else {
    const { point, normal } = nearestOnPolygon(poly, p);
    item.x = point[0] + normal[0] * half - room.x;
    item.z = point[1] + normal[1] * half - room.z;
  }
  item.x = Math.round(item.x * 100) / 100;
  item.z = Math.round(item.z * 100) / 100;
}

/** Hält Bodentanks und Drucker innerhalb des Raums. */
export function clampItems(room) {
  const poly = roomShape(room) === 'rect' ? null : roomPolygon(room);
  for (const t of room.tanks) {
    if (poly) pushInside(t, room, poly, TANK_SIZE / 2);
    t.x = clampIn(t.x, TANK_SIZE / 2, room.width);
    t.z = clampIn(t.z, TANK_SIZE / 2, room.depth);
  }
  for (const p of room.printers) {
    if (poly) pushInside(p, room, poly, PRINTER_W / 2);
    p.x = clampIn(p.x, PRINTER_W / 2, room.width);
    p.z = clampIn(p.z, PRINTER_D / 2, room.depth);
  }
}

/** Kopie eines Raums mit neuen IDs für Raum, Bodentanks und Drucker. */
export function cloneRoom(room, props = {}) {
  return {
    ...room,
    id: uid('r'),
    tanks: room.tanks.map((t) => ({ ...t, id: uid('t'), ports: t.ports.map((p) => ({ ...p })) })),
    printers: room.printers.map((p) => ({ ...p, id: uid('p') })),
    ...props,
  };
}

export const tankPortCount = (room) => room.tanks.reduce((n, t) => n + t.ports.length, 0);

export function createFloor(props = {}) {
  return { id: uid('f'), name: 'Etage', height: 3, rooms: [], ...props };
}

/** Name nach Geschoss: 0 = Erdgeschoss, 1 = 1. Obergeschoss, -1 = 1. Untergeschoss. */
/**
 * Hintergrundbild einer Etage (Vorlage zum Nachzeichnen, nur im Editor sichtbar).
 * x/z = linke obere Ecke in Metern, width in Metern, ratio = Höhe / Breite des Bildes.
 */
function normalizeUnderlay(u) {
  if (!u || typeof u.src !== 'string' || !u.src) return null;
  return {
    src: u.src,
    x: num(u.x, 0),
    z: num(u.z, 0),
    width: Math.max(0.5, num(u.width, 20)),
    ratio: Math.max(0.01, num(u.ratio, 0.75)),
    opacity: Math.min(1, Math.max(0.02, num(u.opacity, 0.15))),
    visible: u.visible !== false,
  };
}

/** Tür oder Glaswand, vom Editor auf eine Wandlinie gelegt (Strecke in Weltkoordinaten). */
function normalizeOpening(o) {
  const v = [o?.x1, o?.z1, o?.x2, o?.z2].map(Number);
  if (!v.every(Number.isFinite) || Math.hypot(v[2] - v[0], v[3] - v[1]) < 0.05) return null;
  return {
    id: o.id || uid('o'),
    type: o.type === 'glass' ? 'glass' : 'door',
    x1: v[0],
    z1: v[1],
    x2: v[2],
    z2: v[3],
    swing: [0, 1, 2, 3].includes(o.swing) ? o.swing : 0, // Türanschlag im Grundriss
  };
}

export function defaultFloorName(level) {
  if (level === 0) return 'Erdgeschoss';
  return level > 0 ? `${level}. Obergeschoss` : `${-level}. Untergeschoss`;
}

/** Index der Etage auf Geländehöhe (Erdgeschoss); darunter liegen die Untergeschosse. */
export function groundIndex(building) {
  return Math.max(0, building.floors.findIndex((f) => f.id === building.groundFloorId));
}

/** Bounding box of all rooms of a floor, or null if the floor is empty. */
export function floorBounds(floor) {
  if (!floor.rooms.length) return null;
  const b = { minX: Infinity, minZ: Infinity, maxX: -Infinity, maxZ: -Infinity };
  for (const r of floor.rooms) {
    b.minX = Math.min(b.minX, r.x);
    b.minZ = Math.min(b.minZ, r.z);
    b.maxX = Math.max(b.maxX, r.x + r.width);
    b.maxZ = Math.max(b.maxZ, r.z + r.depth);
  }
  return b;
}

export function findTank(building, tankId) {
  for (const floor of building.floors) {
    for (const room of floor.rooms) {
      const tank = room.tanks.find((t) => t.id === tankId);
      if (tank) return { tank, room, floor };
    }
  }
  return null;
}

export function findPrinter(building, printerId) {
  for (const floor of building.floors) {
    for (const room of floor.rooms) {
      const printer = room.printers.find((p) => p.id === printerId);
      if (printer) return { printer, room, floor };
    }
  }
  return null;
}

export function findRoom(building, roomId) {
  for (const floor of building.floors) {
    const room = floor.rooms.find((r) => r.id === roomId);
    if (room) return { room, floor };
  }
  return null;
}

/** Validates and fills defaults, so imported/stored data is always well-formed. */
export function normalizeBuilding(data) {
  if (!data || !Array.isArray(data.floors)) {
    throw new Error('Ungültige Gebäudedatei: Feld "floors" fehlt.');
  }
  const floors = data.floors.map((f, i) => ({
    id: f.id || uid('f'),
    name: String(f.name ?? defaultFloorName(i)),
    height: Math.max(2, num(f.height, 3)),
    // nur wenn vorhanden, damit Dateien ohne Bild unverändert bleiben
    ...(normalizeUnderlay(f.underlay) ? { underlay: normalizeUnderlay(f.underlay) } : {}),
    ...(Array.isArray(f.openings) && f.openings.length
      ? { openings: f.openings.map(normalizeOpening).filter(Boolean) }
      : {}),
    rooms: (Array.isArray(f.rooms) ? f.rooms : []).map((r) => ({
      id: r.id || uid('r'),
      name: String(r.name ?? 'Raum'),
      type: ROOM_TYPES[r.type] ? r.type : 'other',
      x: num(r.x, 0),
      z: num(r.z, 0),
      width: Math.max(0.5, num(r.width, 4)),
      depth: Math.max(0.5, num(r.depth, 4)),
      shape: ROOM_SHAPES[r.shape] ? r.shape : 'rect',
      cutCorner: CUT_CORNERS[r.cutCorner] ? r.cutCorner : 'ne',
      cutW: num(r.cutW, 2),
      cutD: num(r.cutD, 2),
      color: r.color || null,
      occupant: String(r.occupant ?? ''),
      description: String(r.description ?? ''),
      stairShape: STAIR_SHAPES[r.stairShape] ? r.stairShape : 'u-left',
      stairDir: STAIR_DIRS[r.stairDir] ? r.stairDir : 'n',
      elevator: Boolean(r.elevator),
      tanks: (Array.isArray(r.tanks) ? r.tanks : []).map((t, ti) => ({
        id: t.id || uid('t'),
        name: String(t.name ?? `BT ${ti + 1}`),
        x: num(t.x, 1),
        z: num(t.z, 1),
        ports: (Array.isArray(t.ports) ? t.ports : []).map((p) => ({
          name: String(typeof p === 'string' ? p : (p?.name ?? '')),
          switch: String(p?.switch ?? ''),
          switchPort: String(p?.switchPort ?? ''),
        })),
      })),
      printers: (Array.isArray(r.printers) ? r.printers : []).map((p, pi) => ({
        id: p.id || uid('p'),
        name: String(p.name ?? `Drucker ${pi + 1}`),
        ip: String(p.ip ?? ''),
        x: num(p.x, 1),
        z: num(p.z, 1),
      })),
    })),
  }));
  for (const f of floors) for (const r of f.rooms) clampCut(r);
  if (!floors.length) floors.push(createFloor({ name: defaultFloorName(0) }));
  // Ohne Angabe ist die unterste Etage das Erdgeschoss (wie in älteren Dateien)
  const groundFloorId = floors.some((f) => f.id === data.groundFloorId) ? data.groundFloorId : floors[0].id;
  return { name: String(data.name ?? 'Gebäude'), groundFloorId, floors };
}
