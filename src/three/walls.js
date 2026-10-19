import { roomPolygon } from '../data/shape.js';

export const WALL_THICKNESS = 0.12;
export const GLASS_THICKNESS = 0.04;

const EPS = 1e-3;

/**
 * Kanten des Raumumrisses: Startpunkt, Richtung `u` (Einheitsvektor), Länge und die
 * nach innen zeigende Normale `n`.
 */
function edgesOf(poly) {
  return poly.map((p, i) => {
    const q = poly[(i + 1) % poly.length];
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    const u = [(q[0] - p[0]) / len, (q[1] - p[1]) / len];
    return { p, len, u, n: [-u[1], u[0]] };
  });
}

/** Abschnitt [a, b] einer Kante, auf dem `e2` deckungsgleich, aber gegenläufig verläuft (Nachbarraum). */
function sharedRange(e, e2) {
  if (e.u[0] * e2.u[0] + e.u[1] * e2.u[1] > -1 + 1e-6) return null;
  const dist = (e2.p[0] - e.p[0]) * e.n[0] + (e2.p[1] - e.p[1]) * e.n[1];
  if (Math.abs(dist) > EPS) return null;
  const along = (pt) => (pt[0] - e.p[0]) * e.u[0] + (pt[1] - e.p[1]) * e.u[1];
  const t1 = along(e2.p);
  const t2 = t1 - e2.len;
  const a = Math.max(0, Math.min(t1, t2));
  const b = Math.min(e.len, Math.max(t1, t2));
  return b - a > EPS ? [a, b] : null;
}

/**
 * Abschnitt [a, b] einer Kante, auf dem eine Tür oder Glaswand liegt
 * (Öffnung = Strecke x1/z1 – x2/z2 auf derselben Wandlinie, Richtung egal).
 */
function openingRange(e, o) {
  const dx = o.x2 - o.x1;
  const dz = o.z2 - o.z1;
  const len = Math.hypot(dx, dz);
  if (len < EPS) return null;
  if (Math.abs((dx * e.u[1] - dz * e.u[0]) / len) > 1e-3) return null;
  const dist = (o.x1 - e.p[0]) * e.n[0] + (o.z1 - e.p[1]) * e.n[1];
  if (Math.abs(dist) > 0.02) return null;
  const along = (x, z) => (x - e.p[0]) * e.u[0] + (z - e.p[1]) * e.u[1];
  const t1 = along(o.x1, o.z1);
  const t2 = along(o.x2, o.z2);
  const a = Math.max(0, Math.min(t1, t2));
  const b = Math.min(e.len, Math.max(t1, t2));
  return b - a > EPS ? [a, b] : null;
}

const intersects = (r, a, b) => r[1] > a + EPS && r[0] < b - EPS;

function subtract(intervals, cuts) {
  let result = intervals;
  for (const [ca, cb] of cuts) {
    const next = [];
    for (const [a, b] of result) {
      if (cb <= a + EPS || ca >= b - EPS) {
        next.push([a, b]);
        continue;
      }
      if (ca > a + EPS) next.push([a, ca]);
      if (cb < b - EPS) next.push([cb, b]);
    }
    result = next;
  }
  return result.filter(([a, b]) => b - a > EPS);
}

/**
 * Computes wall segments for all rooms of a floor.
 * - Each room gets walls inset on its own side, so neighbouring rooms never overlap.
 * - Corridors have no wall where they touch other rooms (the room wall is used).
 * - Rooms touching a corridor get a door opening (with lintel) in the middle of the shared edge.
 * - Edges may run at any angle (slanted walls); corners are mitred.
 * - `openings` (doors and glass walls drawn in the editor) cut the walls they lie on. A door on an
 *   edge shared with a corridor replaces the automatic door there.
 *
 * Returns segments `{ quad: [[x, z] × 4], len, kind: 'wall' | 'lintel' | 'glass' }` – `quad` is the
 * footprint (outer edge, then inner edge backwards); for glass the thin pane.
 */
export function computeWalls(rooms, doorWidth = 1, openings = []) {
  const out = [];
  const isCorridor = (r) => r.type === 'corridor';
  const all = rooms.map((room) => ({ room, edges: edgesOf(roomPolygon(room)) }));
  const T = WALL_THICKNESS;

  for (const { room, edges } of all) {
    // Innenecken: Schnittpunkt der um T nach innen versetzten Nachbarkanten (Gehrung)
    const inner = edges.map((e, i) => {
      const prev = edges[(i + edges.length - 1) % edges.length];
      const k = T / (1 + prev.n[0] * e.n[0] + prev.n[1] * e.n[1]);
      return [e.p[0] + (prev.n[0] + e.n[0]) * k, e.p[1] + (prev.n[1] + e.n[1]) * k];
    });

    edges.forEach((edge, i) => {
      const overlaps = [];
      for (const other of all) {
        if (other.room === room) continue;
        for (const e2 of other.edges) {
          const range = sharedRange(edge, e2);
          if (range) overlaps.push({ a: range[0], b: range[1], corridor: isCorridor(other.room), id: other.room.id });
        }
      }

      const shared = overlaps.map((o) => [o.a, o.b]);
      let segments = [[0, edge.len]];
      let own = openings.map((o) => ({ type: o.type, range: openingRange(edge, o) })).filter((x) => x.range);
      // Am Flur übernimmt der Raum die Wand – samt Tür oder Glas
      if (isCorridor(room)) {
        segments = subtract(segments, shared);
        own = own.flatMap((x) => subtract([x.range], shared).map((range) => ({ type: x.type, range })));
      }
      const doors = own.filter((x) => x.type === 'door').map((x) => x.range);
      const glass = own.filter((x) => x.type === 'glass').map((x) => x.range);
      const autoDoors = isCorridor(room)
        ? []
        : overlaps
            .filter((o) => o.corridor && o.b - o.a >= doorWidth + 0.3 && !doors.some((d) => intersects(d, o.a, o.b)))
            .map((o) => {
              const mid = (o.a + o.b) / 2;
              return [mid - doorWidth / 2, mid + doorWidth / 2];
            });
      const lintels = [...autoDoors, ...doors];
      segments = subtract(segments, [...lintels, ...glass]);

      const at = (t) => [edge.p[0] + edge.u[0] * t, edge.p[1] + edge.u[1] * t];
      const innerAt = (t) => {
        if (t < EPS) return inner[i];
        if (t > edge.len - EPS) return inner[(i + 1) % edges.length];
        const [x, z] = at(t);
        return [x + edge.n[0] * T, z + edge.n[1] * T];
      };
      const quad = ([a, b]) => [at(a), at(b), innerAt(b), innerAt(a)];
      for (const s of segments) out.push({ quad: quad(s), len: s[1] - s[0], kind: 'wall' });
      for (const s of lintels) out.push({ quad: quad(s), len: s[1] - s[0], kind: 'lintel' });

      // Glas: zwischen zwei Räumen eine Scheibe genau auf der Grenze (nur einer der beiden zeichnet sie),
      // sonst mittig in der eigenen Wand
      const G = GLASS_THICKNESS;
      for (const [a, b] of glass) {
        const neighbour = overlaps.find((o) => !o.corridor && intersects([a, b], o.a, o.b));
        if (neighbour && neighbour.id < room.id) continue;
        const [o1, o2] = neighbour ? [-G / 2, G / 2] : [T / 2 - G / 2, T / 2 + G / 2];
        const off = (t, d) => {
          const [x, z] = at(t);
          return [x + edge.n[0] * d, z + edge.n[1] * d];
        };
        out.push({ quad: [off(a, o1), off(b, o1), off(b, o2), off(a, o2)], len: b - a, kind: 'glass' });
      }
    });
  }
  return out;
}
