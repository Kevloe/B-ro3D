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
 * - Corridors have no wall where they touch other rooms (the room wall is used). Doors are never
 *   added automatically – only the ones drawn in the editor.
 * - Edges may run at any angle (slanted walls, rotated rooms); corners are mitred.
 * - `openings` (doors and glass walls drawn in the editor) cut the walls they lie on. A door inside a
 *   glass wall gets glass above it instead of a lintel.
 * - `freeWalls` are free-standing walls centred on their line, cut by openings like room walls.
 *
 * Returns segments `{ quad: [[x, z] × 4], len, kind: 'wall' | 'lintel' | 'glass' | 'transom' }` – `quad`
 * is the footprint (outer edge, then inner edge backwards); for glass and transoms the thin pane.
 */
export function computeWalls(rooms, openings = [], freeWalls = []) {
  const out = [];
  const isCorridor = (r) => r.type === 'corridor';
  const all = rooms.map((room) => ({ room, edges: edgesOf(roomPolygon(room)) }));
  const T = WALL_THICKNESS;
  const G = GLASS_THICKNESS;

  /** Wand, Stürze, Glas und Oberlichter einer Kante; `quad` und `pane` liefern die Grundflächen. */
  function emit(edge, own, quad, pane, base = [[0, edge.len]]) {
    const doors = own.filter((x) => x.type === 'door').map((x) => x.range);
    const glassAll = own.filter((x) => x.type === 'glass').map((x) => x.range);
    // Tür in einer Glaswand: darüber Glas statt Sturz, die Scheibe daneben endet an der Tür
    const inGlass = (d) => glassAll.some((g) => intersects(g, d[0], d[1]));
    const lintels = doors.filter((d) => !inGlass(d));
    const transoms = doors.filter(inGlass);
    const glass = subtract(glassAll, doors);
    for (const s of subtract(base, [...doors, ...glassAll]))
      out.push({ quad: quad(s), len: s[1] - s[0], kind: 'wall' });
    for (const s of lintels) out.push({ quad: quad(s), len: s[1] - s[0], kind: 'lintel' });
    for (const s of glass) {
      const q = pane(s);
      if (q) out.push({ quad: q, len: s[1] - s[0], kind: 'glass' });
    }
    for (const s of transoms) {
      const q = pane(s);
      if (q) out.push({ quad: q, len: s[1] - s[0], kind: 'transom' });
    }
  }

  const at = (edge, t) => [edge.p[0] + edge.u[0] * t, edge.p[1] + edge.u[1] * t];
  const off = (edge, t, d) => {
    const [x, z] = at(edge, t);
    return [x + edge.n[0] * d, z + edge.n[1] * d];
  };

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

      let own = openings.map((o) => ({ type: o.type, range: openingRange(edge, o) })).filter((x) => x.range);
      let full = [[0, edge.len]];
      // Am Flur übernimmt der Raum die Wand – samt Tür oder Glas
      if (isCorridor(room)) {
        const shared = overlaps.map((o) => [o.a, o.b]);
        full = subtract(full, shared);
        own = own.flatMap((x) => subtract([x.range], shared).map((range) => ({ type: x.type, range })));
      }

      const innerAt = (t) => {
        if (t < EPS) return inner[i];
        if (t > edge.len - EPS) return inner[(i + 1) % edges.length];
        return off(edge, t, T);
      };
      const quad = ([a, b]) => [at(edge, a), at(edge, b), innerAt(b), innerAt(a)];
      // Glas: zwischen zwei Räumen eine Scheibe genau auf der Grenze (nur einer der beiden zeichnet sie),
      // sonst mittig in der eigenen Wand
      const pane = ([a, b]) => {
        const neighbour = overlaps.find((o) => !o.corridor && intersects([a, b], o.a, o.b));
        if (neighbour && neighbour.id < room.id) return null;
        const [o1, o2] = neighbour ? [-G / 2, G / 2] : [T / 2 - G / 2, T / 2 + G / 2];
        return [off(edge, a, o1), off(edge, b, o1), off(edge, b, o2), off(edge, a, o2)];
      };
      emit(edge, own, quad, pane, full);
    });
  }

  for (const w of freeWalls) {
    const [edge] = edgesOf([
      [w.x1, w.z1],
      [w.x2, w.z2],
    ]);
    const own = openings.map((o) => ({ type: o.type, range: openingRange(edge, o) })).filter((x) => x.range);
    const band = (d1, d2) => ([a, b]) => [off(edge, a, d1), off(edge, b, d1), off(edge, b, d2), off(edge, a, d2)];
    emit(edge, own, band(-T / 2, T / 2), band(-G / 2, G / 2));
  }
  return out;
}
