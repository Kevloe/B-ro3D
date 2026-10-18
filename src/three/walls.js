export const WALL_THICKNESS = 0.12;

const EPS = 1e-3;

/**
 * Edges of a room rectangle. `side` points to the outside of the room
 * (-1 = towards smaller coordinate, +1 = towards larger coordinate).
 */
function edgesOf(r) {
  return [
    { axis: 'x', fixed: r.z, a: r.x, b: r.x + r.width, side: -1 },
    { axis: 'x', fixed: r.z + r.depth, a: r.x, b: r.x + r.width, side: 1 },
    { axis: 'z', fixed: r.x, a: r.z, b: r.z + r.depth, side: -1 },
    { axis: 'z', fixed: r.x + r.width, a: r.z, b: r.z + r.depth, side: 1 },
  ];
}

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
 *
 * Returns segments `{ axis, pos, a, b, kind: 'wall' | 'lintel' }` where `pos` is the
 * wall centre line on the fixed axis and `a..b` the extent along `axis`.
 */
export function computeWalls(rooms, doorWidth = 1) {
  const out = [];
  const isCorridor = (r) => r.type === 'corridor';

  for (const room of rooms) {
    for (const edge of edgesOf(room)) {
      const overlaps = [];
      for (const other of rooms) {
        if (other === room) continue;
        for (const e2 of edgesOf(other)) {
          if (e2.axis !== edge.axis || e2.side !== -edge.side || Math.abs(e2.fixed - edge.fixed) > EPS) continue;
          const a = Math.max(edge.a, e2.a);
          const b = Math.min(edge.b, e2.b);
          if (b - a > EPS) overlaps.push({ a, b, corridor: isCorridor(other) });
        }
      }

      let segments = [[edge.a, edge.b]];
      let lintels = [];
      if (isCorridor(room)) {
        segments = subtract(segments, overlaps.map((o) => [o.a, o.b]));
      } else {
        lintels = overlaps
          .filter((o) => o.corridor && o.b - o.a >= doorWidth + 0.3)
          .map((o) => {
            const mid = (o.a + o.b) / 2;
            return [mid - doorWidth / 2, mid + doorWidth / 2];
          });
        segments = subtract(segments, lintels);
      }

      const pos = edge.fixed - (edge.side * WALL_THICKNESS) / 2;
      for (const [a, b] of segments) out.push({ axis: edge.axis, pos, a, b, kind: 'wall' });
      for (const [a, b] of lintels) out.push({ axis: edge.axis, pos, a, b, kind: 'lintel' });
    }
  }
  return out;
}
