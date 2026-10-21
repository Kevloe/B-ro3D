/**
 * Raumformen. Ein Raum bleibt ein Rechteck (x, z, width, depth = umschließendes Rechteck),
 * an einer Ecke kann aber ein Stück fehlen:
 * - 'l':       rechteckige Aussparung → L-förmiger Raum
 * - 'chamfer': dreieckige Aussparung → schräge Wand
 * Größe der Aussparung: cutW (entlang x) × cutD (entlang z), Ecke: cutCorner.
 */
export const ROOM_SHAPES = {
  rect: 'Rechteck',
  l: 'L-Form',
  chamfer: 'Schräge Wand',
};

export const CUT_CORNERS = {
  nw: 'oben links',
  ne: 'oben rechts',
  se: 'unten rechts',
  sw: 'unten links',
};

const CORNER_ORDER = ['nw', 'ne', 'se', 'sw'];
export const MIN_CUT = 0.5;
const MIN_REST = 0.5; // so viel bleibt bei einer L-Form mindestens stehen
const EPS = 1e-6;

/**
 * Drehung: `rotation` in Grad um die Mitte des umschließenden Rechtecks, positiv = im Grundriss
 * im Uhrzeigersinn. x/z/width/depth, Aussparung, Bodentanks und Drucker gelten im ungedrehten Raum
 * („lokal“); erst der Umriss in Weltkoordinaten wird gedreht.
 */
export const roomRotation = (room) => {
  const r = Number(room.rotation) || 0;
  return Math.abs(r) < 1e-9 ? 0 : r;
};

/** Winkel auf (-180, 180] bringen, auf 0,1° gerundet. */
export function normalizeRotation(deg) {
  let r = ((Number(deg) || 0) % 360 + 360) % 360;
  if (r > 180) r -= 360;
  return Math.round(r * 10) / 10 || 0;
}

export const roomCenter = (room) => [room.x + room.width / 2, room.z + room.depth / 2];

/** Punkt um `center` drehen (Grad, im Grundriss im Uhrzeigersinn). */
export function rotatePoint([x, z], [cx, cz], deg) {
  if (!deg) return [x, z];
  const a = (deg * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  const dx = x - cx;
  const dz = z - cz;
  return [cx + dx * c - dz * s, cz + dx * s + dz * c];
}

/** Ungedrehter Punkt des Raums → Weltkoordinaten. */
export const roomToWorld = (room, p) => rotatePoint(p, roomCenter(room), roomRotation(room));

/** Weltkoordinaten → ungedrehter Punkt des Raums. */
export const worldToRoom = (room, p) => rotatePoint(p, roomCenter(room), -roomRotation(room));

/** Richtung (Vektor) aus Weltkoordinaten in den ungedrehten Raum. */
export const vectorToRoom = (room, v) => rotatePoint(v, [0, 0], -roomRotation(room));

/** Form eines Raums; Treppenhäuser sind immer rechteckig. */
export const roomShape = (room) =>
  room.type !== 'stairs' && (room.shape === 'l' || room.shape === 'chamfer') ? room.shape : 'rect';

/** Hält die Aussparung innerhalb sinnvoller Grenzen (verändert den Raum). */
export function clampCut(room) {
  const rest = room.shape === 'l' ? MIN_REST : 0;
  const fit = (v, size) => {
    const max = Math.max(MIN_CUT, size - rest);
    return Math.round(Math.min(Math.max(Number(v) || 0, Math.min(MIN_CUT, max)), max) * 100) / 100;
  };
  room.cutW = fit(room.cutW, room.width);
  room.cutD = fit(room.cutD, room.depth);
}

/** Standardgröße der Aussparung beim Wechsel der Form: halbe Raumgröße. */
export function defaultCut(room) {
  const half = (v) => Math.max(MIN_CUT, Math.round(v / 2 / 0.5) * 0.5);
  return { cutW: half(room.width), cutD: half(room.depth) };
}

/**
 * Umriss als Punktliste [[x, z], …], im Grundriss im Uhrzeigersinn (x nach rechts, z nach unten).
 * Alle Räume haben denselben Umlaufsinn, gemeinsame Kanten laufen also entgegengesetzt.
 */
export function roomPolygon(room) {
  const poly = localPolygon(room);
  return roomRotation(room) ? poly.map((p) => roomToWorld(room, p)) : poly;
}

/** Umriss ohne Drehung (in den Koordinaten von x/z/width/depth). */
export function localPolygon(room) {
  const x0 = room.x;
  const z0 = room.z;
  const x1 = room.x + room.width;
  const z1 = room.z + room.depth;
  const corners = { nw: [x0, z0], ne: [x1, z0], se: [x1, z1], sw: [x0, z1] };
  const shape = roomShape(room);
  if (shape === 'rect') return CORNER_ORDER.map((c) => corners[c]);

  const i = Math.max(0, CORNER_ORDER.indexOf(room.cutCorner));
  const P = corners[CORNER_ORDER[i]];
  const prev = corners[CORNER_ORDER[(i + 3) % 4]];
  const next = corners[CORNER_ORDER[(i + 1) % 4]];
  // Schenkel: entlang x die Breite der Aussparung, entlang z die Tiefe
  const leg = (to) => {
    const horizontal = to[1] === P[1];
    const len = horizontal ? room.cutW : room.cutD;
    return horizontal ? [Math.sign(to[0] - P[0]) * len, 0] : [0, Math.sign(to[1] - P[1]) * len];
  };
  const a = leg(prev);
  const b = leg(next);
  const replace = [[P[0] + a[0], P[1] + a[1]]];
  if (shape === 'l') replace.push([P[0] + a[0] + b[0], P[1] + a[1] + b[1]]);
  replace.push([P[0] + b[0], P[1] + b[1]]);

  const pts = [];
  for (let k = 0; k < 4; k++) {
    const c = CORNER_ORDER[(i + k) % 4];
    if (k === 0) pts.push(...replace);
    else pts.push(corners[c]);
  }
  // Schräge über die ganze Seite: doppelte Punkte entfernen (Raum wird zum Dreieck)
  return pts.filter((p, k) => {
    const q = pts[(k + 1) % pts.length];
    return Math.abs(p[0] - q[0]) > EPS || Math.abs(p[1] - q[1]) > EPS;
  });
}

/** Zerlegung in konvexe Teile (L-Form = zwei Rechtecke), in Weltkoordinaten. */
export function roomPieces(room) {
  const pieces = localPieces(room);
  return roomRotation(room) ? pieces.map((poly) => poly.map((p) => roomToWorld(room, p))) : pieces;
}

function localPieces(room) {
  if (roomShape(room) !== 'l') return [localPolygon(room)];
  const { x, z, width: w, depth: d, cutW, cutD } = room;
  const c = room.cutCorner;
  const rect = (rx, rz, rw, rd) => [[rx, rz], [rx + rw, rz], [rx + rw, rz + rd], [rx, rz + rd]];
  const east = c === 'ne' || c === 'se';
  const north = c === 'nw' || c === 'ne';
  // volle Tiefe auf der Seite ohne Aussparung, dazu der Streifen neben der Aussparung
  const full = east ? rect(x, z, w - cutW, d) : rect(x + cutW, z, w - cutW, d);
  const part = rect(east ? x + w - cutW : x, north ? z + cutD : z, cutW, d - cutD);
  return [full, part];
}

export function polygonArea(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, z1] = poly[i];
    const [x2, z2] = poly[(i + 1) % poly.length];
    a += x1 * z2 - x2 * z1;
  }
  return Math.abs(a) / 2;
}

/** Grundfläche in m² (Außenmaß des Raums). */
export const roomArea = (room) => polygonArea(roomPolygon(room));

function centroid(poly) {
  let a = 0;
  let cx = 0;
  let cz = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, z1] = poly[i];
    const [x2, z2] = poly[(i + 1) % poly.length];
    const f = x1 * z2 - x2 * z1;
    a += f;
    cx += (x1 + x2) * f;
    cz += (z1 + z2) * f;
  }
  if (Math.abs(a) < EPS) return poly[0];
  return [cx / (3 * a), cz / (3 * a)];
}

/** Punkt für die Beschriftung: Mitte des größten Teils, liegt also immer im Raum. */
export function roomLabelPoint(room) {
  const pieces = roomPieces(room);
  const best = pieces.reduce((m, p) => (polygonArea(p) > polygonArea(m) ? p : m), pieces[0]);
  return centroid(best);
}

export function pointInPolygon([px, pz], poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, zi] = poly[i];
    const [xj, zj] = poly[j];
    if (zi > pz !== zj > pz && px < ((xj - xi) * (pz - zi)) / (zj - zi) + xi) inside = !inside;
  }
  return inside;
}

/** Punkt im Raum (Rand zählt dazu). */
export function pointInRoom(room, world) {
  const p = worldToRoom(room, world);
  if (p[0] < room.x - EPS || p[0] > room.x + room.width + EPS) return false;
  if (p[1] < room.z - EPS || p[1] > room.z + room.depth + EPS) return false;
  if (roomShape(room) === 'rect') return true;
  const poly = localPolygon(room);
  return pointInPolygon(p, poly) || nearestOnPolygon(poly, p).dist < 1e-3;
}

/** Nächster Punkt auf dem Umriss samt nach innen zeigender Normale der Kante. */
export function nearestOnPolygon(poly, [px, pz]) {
  let best = null;
  for (let i = 0; i < poly.length; i++) {
    const [ax, az] = poly[i];
    const [bx, bz] = poly[(i + 1) % poly.length];
    const dx = bx - ax;
    const dz = bz - az;
    const len2 = dx * dx + dz * dz || 1;
    const t = Math.min(1, Math.max(0, ((px - ax) * dx + (pz - az) * dz) / len2));
    const qx = ax + dx * t;
    const qz = az + dz * t;
    const dist = Math.hypot(px - qx, pz - qz);
    if (!best || dist < best.dist) {
      const len = Math.sqrt(len2);
      best = { point: [qx, qz], normal: [-dz / len, dx / len], dist };
    }
  }
  return best;
}

function separated(a, b, tol) {
  for (const poly of [a, b]) {
    for (let i = 0; i < poly.length; i++) {
      const [ax, az] = poly[i];
      const [bx, bz] = poly[(i + 1) % poly.length];
      const len = Math.hypot(bx - ax, bz - az) || 1;
      const nx = -(bz - az) / len;
      const nz = (bx - ax) / len;
      const proj = (p) => p.map(([x, z]) => x * nx + z * nz);
      const pa = proj(a);
      const pb = proj(b);
      if (Math.max(...pa) <= Math.min(...pb) + tol || Math.max(...pb) <= Math.min(...pa) + tol) return true;
    }
  }
  return false;
}

/** Umschließendes achsparalleles Rechteck des (gedrehten) Raums. */
export function roomBounds(room) {
  if (!roomRotation(room)) return { minX: room.x, minZ: room.z, maxX: room.x + room.width, maxZ: room.z + room.depth };
  const poly = roomPolygon(room);
  const xs = poly.map((p) => p[0]);
  const zs = poly.map((p) => p[1]);
  return { minX: Math.min(...xs), minZ: Math.min(...zs), maxX: Math.max(...xs), maxZ: Math.max(...zs) };
}

/** Überlappen sich zwei Räume (bloßes Berühren zählt nicht)? */
export function roomsOverlap(a, b, tol = 0.01) {
  const ba = roomBounds(a);
  const bb = roomBounds(b);
  const w = Math.min(ba.maxX, bb.maxX) - Math.max(ba.minX, bb.minX);
  const d = Math.min(ba.maxZ, bb.maxZ) - Math.max(ba.minZ, bb.minZ);
  if (w <= tol || d <= tol) return false;
  return roomPieces(a).some((pa) => roomPieces(b).some((pb) => !separated(pa, pb, tol)));
}

/**
 * Konvexes Polygon minus konvexes Loch als Liste konvexer, sich nicht überlappender Teile
 * (je Kante des Lochs das Stück außerhalb, der Rest wird weiter zerlegt).
 */
export function subtractConvex(subject, hole) {
  // Loch im Uhrzeigersinn (wie roomPolygon), damit „innen“ für alle Kanten dieselbe Seite ist
  let signed = 0;
  for (let i = 0; i < hole.length; i++) {
    const [x1, z1] = hole[i];
    const [x2, z2] = hole[(i + 1) % hole.length];
    signed += x1 * z2 - x2 * z1;
  }
  const h = signed < 0 ? [...hole].reverse() : hole;
  const out = [];
  let rest = subject;
  for (let i = 0; i < h.length && rest; i++) {
    const a = h[i];
    const b = h[(i + 1) % h.length];
    const outside = clipHalf(rest, b, a);
    if (outside) out.push(outside);
    rest = clipHalf(rest, a, b);
  }
  return out;
}

/** Teil eines konvexen Polygons links der Geraden a → b (im Grundriss: innen bei Uhrzeigersinn). */
function clipHalf(poly, a, b) {
  const nx = -(b[1] - a[1]);
  const nz = b[0] - a[0];
  const side = ([x, z]) => (x - a[0]) * nx + (z - a[1]) * nz;
  const out = [];
  for (let k = 0; k < poly.length; k++) {
    const p = poly[k];
    const q = poly[(k + 1) % poly.length];
    const sp = side(p);
    const sq = side(q);
    if (sp >= -EPS) out.push(p);
    if ((sp >= -EPS) !== (sq >= -EPS)) {
      const t = sp / (sp - sq);
      out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]);
    }
  }
  return out.length >= 3 && polygonArea(out) > 1e-6 ? out : null;
}
