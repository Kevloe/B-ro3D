import { uid } from '../utils.js';
import { nearestOnPolygon, roomPolygon } from './shape.js';
import { distToWall } from './freeWalls.js';

/**
 * Türen und Glaswände: Strecken (x1/z1 – x2/z2) auf einer Wandlinie einer Etage.
 * Gespeichert unabhängig von den Räumen, damit eine Tür zwischen zwei Räumen beide Wände öffnet.
 */
export const OPENING_TYPES = { door: 'Tür', glass: 'Glaswand' };
export const DOOR_WIDTH = 1;
export const MIN_OPENING = 0.3;
const ON_WALL = 0.02;

export function createOpening(props = {}) {
  return { id: uid('o'), type: 'door', x1: 0, z1: 0, x2: 1, z2: 0, swing: 0, ...props };
}

export const openingLength = (o) => Math.hypot(o.x2 - o.x1, o.z2 - o.z1);

/** Einheitsvektor entlang der Öffnung. */
export function openingDir(o) {
  const len = openingLength(o) || 1;
  return [(o.x2 - o.x1) / len, (o.z2 - o.z1) / len];
}

/**
 * Nächste Raumkante oder freie Wand zu einem Punkt (höchstens `maxDist` entfernt):
 * Startpunkt, Richtung, Länge, Position `t` des Lotfußpunkts und Abstand.
 */
export function nearestWall(rooms, [px, pz], maxDist, walls = []) {
  let best = null;
  const consider = (p, q, room) => {
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]);
    if (len < 1e-6) return;
    const u = [(q[0] - p[0]) / len, (q[1] - p[1]) / len];
    const t = Math.min(len, Math.max(0, (px - p[0]) * u[0] + (pz - p[1]) * u[1]));
    const dist = Math.hypot(px - (p[0] + u[0] * t), pz - (p[1] + u[1] * t));
    // bei gleichem Abstand gewinnt ein Raum vor dem Flur
    const better =
      !best || dist < best.dist - 1e-6 || (dist < best.dist + 1e-6 && best.room?.type === 'corridor');
    if (dist <= maxDist && better) best = { room, p, u, len, t, dist };
  };
  for (const room of rooms) {
    const poly = roomPolygon(room);
    poly.forEach((p, i) => consider(p, poly[(i + 1) % poly.length], room));
  }
  for (const w of walls) consider([w.x1, w.z1], [w.x2, w.z2], null);
  return best;
}

/** Punkt auf der Kante bei Position t. */
export const wallPoint = (wall, t) => [wall.p[0] + wall.u[0] * t, wall.p[1] + wall.u[1] * t];

/** Liegt die Öffnung mit beiden Enden auf dem Umriss dieses Raums? */
export function isOnRoom(o, room) {
  const poly = roomPolygon(room);
  return (
    nearestOnPolygon(poly, [o.x1, o.z1]).dist < ON_WALL &&
    nearestOnPolygon(poly, [o.x2, o.z2]).dist < ON_WALL &&
    nearestOnPolygon(poly, [(o.x1 + o.x2) / 2, (o.z1 + o.z2) / 2]).dist < ON_WALL
  );
}

/** Liegt die Öffnung mit beiden Enden auf dieser freien Wand? */
export const isOnFreeWall = (o, w) =>
  distToWall(w, [o.x1, o.z1]) < ON_WALL && distToWall(w, [o.x2, o.z2]) < ON_WALL;

/** Liegt die Öffnung auf irgendeiner Wand der Etage (sonst wird sie nicht dargestellt)? */
export const isOnWall = (o, floor) =>
  floor.rooms.some((r) => isOnRoom(o, r)) || (floor.walls ?? []).some((w) => isOnFreeWall(o, w));

export function translateOpening(o, dx, dz) {
  o.x1 = round3(o.x1 + dx);
  o.z1 = round3(o.z1 + dz);
  o.x2 = round3(o.x2 + dx);
  o.z2 = round3(o.z2 + dz);
}

export const round3 = (v) => Math.round(v * 1000) / 1000;
