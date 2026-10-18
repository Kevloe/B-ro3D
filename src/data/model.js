import { ROOM_TYPES } from './roomTypes.js';
import { uid } from '../utils.js';
import { STAIR_DIRS, STAIR_SHAPES } from './stairs.js';

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
    color: null,
    occupant: '',
    description: '',
    tanks: [],
    printers: [],
    stairShape: 'u-left', // nur für Typ Treppenhaus
    stairDir: 'n',
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

/** Hält Bodentanks und Drucker innerhalb des Raums. */
export function clampItems(room) {
  for (const t of room.tanks) {
    t.x = clampIn(t.x, TANK_SIZE / 2, room.width);
    t.z = clampIn(t.z, TANK_SIZE / 2, room.depth);
  }
  for (const p of room.printers) {
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

export function defaultFloorName(index) {
  return index === 0 ? 'Erdgeschoss' : `${index}. Obergeschoss`;
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
    rooms: (Array.isArray(f.rooms) ? f.rooms : []).map((r) => ({
      id: r.id || uid('r'),
      name: String(r.name ?? 'Raum'),
      type: ROOM_TYPES[r.type] ? r.type : 'other',
      x: num(r.x, 0),
      z: num(r.z, 0),
      width: Math.max(0.5, num(r.width, 4)),
      depth: Math.max(0.5, num(r.depth, 4)),
      color: r.color || null,
      occupant: String(r.occupant ?? ''),
      description: String(r.description ?? ''),
      stairShape: STAIR_SHAPES[r.stairShape] ? r.stairShape : 'u-left',
      stairDir: STAIR_DIRS[r.stairDir] ? r.stairDir : 'n',
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
  if (!floors.length) floors.push(createFloor({ name: defaultFloorName(0) }));
  return { name: String(data.name ?? 'Gebäude'), floors };
}
