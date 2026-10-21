import { uid } from '../utils.js';

/**
 * Freie Wände: Strecken (x1/z1 – x2/z2) einer Etage, unabhängig von den Räumen, z. B. Trennwände
 * in einem Großraum. Die Wand steht mittig auf der Strecke; Türen und Glaswände lassen sich
 * darauf setzen wie auf eine Raumwand.
 */
export const MIN_WALL = 0.3;

export function createWall(props = {}) {
  return { id: uid('w'), x1: 0, z1: 0, x2: 1, z2: 0, ...props };
}

export function normalizeWall(w) {
  const v = [w?.x1, w?.z1, w?.x2, w?.z2].map(Number);
  if (!v.every(Number.isFinite) || Math.hypot(v[2] - v[0], v[3] - v[1]) < 0.05) return null;
  return { id: w.id || uid('w'), x1: v[0], z1: v[1], x2: v[2], z2: v[3] };
}

export const wallLength = (w) => Math.hypot(w.x2 - w.x1, w.z2 - w.z1);

/** Abstand eines Punkts zur Strecke der Wand. */
export function distToWall(w, [px, pz]) {
  const dx = w.x2 - w.x1;
  const dz = w.z2 - w.z1;
  const len2 = dx * dx + dz * dz || 1;
  const t = Math.min(1, Math.max(0, ((px - w.x1) * dx + (pz - w.z1) * dz) / len2));
  return Math.hypot(px - (w.x1 + dx * t), pz - (w.z1 + dz * t));
}
