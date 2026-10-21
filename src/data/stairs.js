import { WALL_THICKNESS } from '../three/walls.js';

export const STAIR_SHAPES = {
  'u-left': 'Zweiläufig, Antritt links',
  'u-right': 'Zweiläufig, Antritt rechts',
  straight: 'Einläufig (gerade)',
};

/** Laufrichtung = Richtung, in die man die (erste) Treppe hinaufgeht. */
export const STAIR_DIRS = {
  n: 'nach oben (Norden)',
  e: 'nach rechts (Osten)',
  s: 'nach unten (Süden)',
  w: 'nach links (Westen)',
};

const DIR_ORDER = ['n', 'e', 's', 'w'];
export const rotateStairDir = (dir) => DIR_ORDER[(DIR_ORDER.indexOf(dir) + 1) % 4] ?? 'n';

const RISER = 0.18; // angestrebte Stufenhöhe
const EYE = 0.15; // Treppenauge zwischen den Läufen
const EDGE = 0.15; // Abstand des Pfeils zu den Enden

// Aufzug im Treppenauge (nur zweiläufig): Schacht zwischen den Läufen, Tür zum Geschosspodest
const SHAFT_MIN = 1.1; // Schachtbreite quer zur Laufrichtung
const SHAFT_MAX = 1.8;
const SHAFT_DEPTH = 1.8; // Schachttiefe entlang der Laufrichtung (höchstens)
const SHAFT_GAP = 0.1; // Abstand Schacht – Lauf
export const SHAFT_WALL = 0.12;
export const LIFT_DOOR = 0.9;
const MIN_FLIGHT = 0.8; // Laufbreite, die neben dem Schacht mindestens bleiben muss

/** Mindestbreite (innen, quer zur Laufrichtung) für ein Treppenhaus mit Aufzug. */
export const ELEVATOR_MIN_WIDTH = 2 * MIN_FLIGHT + SHAFT_MIN + 2 * SHAFT_GAP;

/** Hat das Treppenhaus einen Aufzug, der auch hineinpasst? */
export function elevatorFits(room) {
  if (!room.elevator || room.stairShape === 'straight') return false;
  const alongZ = room.stairDir === 'n' || room.stairDir === 's';
  const W = (alongZ ? room.width : room.depth) - WALL_THICKNESS * 2;
  return W >= ELEVATOR_MIN_WIDTH - 1e-6;
}

/**
 * Stufen und Podeste eines Treppenhauses in Raumkoordinaten ohne Drehung (achsparallele Rechtecke;
 * bei gedrehten Räumen dreht der Aufrufer sie mit dem Raum).
 * Gerechnet wird lokal innerhalb der Wände: u quer zur Laufrichtung (0..W), v entlang der
 * Laufrichtung (0..D). Die Treppe beginnt bei v = 0 und führt auf Höhe `height` (nächste Etage).
 *
 * Zweiläufig: Geschosspodest (Boden) – Lauf 1 – Zwischenpodest – Lauf 2 zurück aufs Geschosspodest darüber.
 * Einläufig: Lauf von v = 0 bis zum Austritt am anderen Ende.
 *
 * Rückgabe: { steps: [{ x, z, w, d, top }], landings: [...gleich...], path: [[x, z], ...],
 *   opening: { x, z, w, d } } – `opening` ist die Deckenöffnung in der Etage darüber.
 */
export function stairLayout(room, height) {
  const dir = DIR_ORDER.includes(room.stairDir) ? room.stairDir : 'n';
  const alongZ = dir === 'n' || dir === 's';
  // Innenmaß: Stufen stehen nicht in den Wänden
  const ix = room.x + WALL_THICKNESS;
  const iz = room.z + WALL_THICKNESS;
  const iw = Math.max(0.2, room.width - WALL_THICKNESS * 2);
  const id = Math.max(0.2, room.depth - WALL_THICKNESS * 2);
  const W = alongZ ? iw : id;
  const D = alongZ ? id : iw;
  const mirror = room.stairShape === 'u-right';

  // lokal (u, v) -> Welt; u zeigt in Laufrichtung nach links
  const toWorld = (u0, v) => {
    const u = mirror ? W - u0 : u0;
    switch (dir) {
      case 's': return [ix + iw - u, iz + v];
      case 'n': return [ix + u, iz + id - v];
      case 'e': return [ix + v, iz + u];
      default: return [ix + iw - v, iz + id - u];
    }
  };
  const rect = (u, v, du, dv, top) => {
    const [x1, z1] = toWorld(u, v);
    const [x2, z2] = toWorld(u + du, v + dv);
    return { x: Math.min(x1, x2), z: Math.min(z1, z2), w: Math.abs(x2 - x1), d: Math.abs(z2 - z1), top };
  };

  const risers = Math.max(2, Math.round(height / RISER));
  const riser = height / risers;
  const steps = [];
  const landings = [];
  let path;
  let opening;
  let elevator = null;

  if (room.stairShape === 'straight') {
    const exitD = Math.min(1, D * 0.2); // Austritt oben bleibt Boden der nächsten Etage
    const run = D - exitD;
    const tread = run / risers;
    for (let i = 0; i < risers; i++) steps.push(rect(0, i * tread, W, tread, (i + 1) * riser));
    path = [[W / 2, EDGE], [W / 2, run + exitD / 2]];
    opening = rect(0, 0, W, run);
  } else {
    const lift = elevatorFits(room);
    const shaftW = lift ? Math.min(SHAFT_MAX, W - 2 * MIN_FLIGHT - 2 * SHAFT_GAP) : 0;
    const eye = lift ? shaftW + 2 * SHAFT_GAP : EYE;
    const fw = Math.max(0.3, (W - eye) / 2); // Laufbreite
    const landingD = Math.min(Math.max(fw, 0.8), D * 0.3);
    const run = D - landingD * 2;
    const n1 = Math.ceil(risers / 2);
    const n2 = risers - n1;
    const t1 = run / n1;
    for (let i = 0; i < n1; i++) steps.push(rect(0, landingD + i * t1, fw, t1, (i + 1) * riser));
    const landingH = n1 * riser;
    landings.push(rect(0, D - landingD, W, landingD, landingH));
    const t2 = run / n2;
    for (let i = 0; i < n2; i++)
      steps.push(rect(W - fw, D - landingD - (i + 1) * t2, fw, t2, landingH + (i + 1) * riser));
    const mid = D - landingD / 2;
    path = [[fw / 2, landingD / 2], [fw / 2, mid], [W - fw / 2, mid], [W - fw / 2, landingD / 2]];
    opening = rect(0, landingD, W, D - landingD);

    if (lift) {
      // Schacht direkt am Geschosspodest, Tür zeigt zum Podest (v = landingD)
      const u0 = fw + SHAFT_GAP;
      const v0 = landingD;
      const sd = Math.min(SHAFT_DEPTH, run);
      const t = SHAFT_WALL;
      const side = (shaftW - LIFT_DOOR) / 2;
      elevator = {
        shaft: rect(u0, v0, shaftW, sd),
        walls: [
          rect(u0, v0 + sd - t, shaftW, t), // Rückwand
          rect(u0, v0 + t, t, sd - 2 * t), // Seiten
          rect(u0 + shaftW - t, v0 + t, t, sd - 2 * t),
          rect(u0, v0, side, t), // Front links und rechts der Tür
          rect(u0 + shaftW - side, v0, side, t),
        ],
        door: rect(u0 + side, v0, LIFT_DOOR, t),
      };
      for (const r of [elevator.shaft, ...elevator.walls, elevator.door]) delete r.top;
    }
  }

  delete opening.top;
  return { steps, landings, opening, elevator, path: path.map(([u, v]) => toWorld(u, v)) };
}
