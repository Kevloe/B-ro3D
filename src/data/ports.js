/**
 * LAN-Ports in Bodentanks. Benennung nach Patchfeld und Port: P01/01 … P01/24, P02/01 … PX/24.
 */
export const PORTS_PER_PANEL = 24;

const pad = (n) => String(n).padStart(2, '0');

/** Ein Port im Bodentank: Patchfeld-Port + Belegung am Switch. */
export const createPort = (name = '', props = {}) => ({ name, switch: '', switchPort: '', ...props });

/**
 * Zählt die letzte Zahl in einem Text hoch: "23" + 1 → "24", "Gi1/0/9" + 2 → "Gi1/0/11".
 * Ohne Zahl wird der Text unverändert zurückgegeben.
 */
export function incrementTrailing(text, by) {
  const m = /^(.*?)(\d+)(\D*)$/.exec(String(text));
  if (!m) return String(text);
  const n = String(Number(m[2]) + by).padStart(m[2].length, '0');
  return `${m[1]}${n}${m[3]}`;
}

/** Text für die Switch-Belegung eines Ports, oder '' wenn nicht gepatcht. */
export function switchLabel(port) {
  if (!port.switch && !port.switchPort) return '';
  return [port.switch, port.switchPort && `Port ${port.switchPort}`].filter(Boolean).join(' · ');
}

export const portName = (panel, port) => `P${pad(panel)}/${pad(port)}`;

export function parsePort(name) {
  const m = /^\s*P(\d+)\s*\/\s*(\d+)\s*$/i.exec(name ?? '');
  return m ? { panel: Number(m[1]), port: Number(m[2]) } : null;
}

export function nextPort({ panel, port }) {
  return port >= PORTS_PER_PANEL ? { panel: panel + 1, port: 1 } : { panel, port: port + 1 };
}

/** Erzeugt `count` fortlaufende Ports ab Patchfeld/Port `start`, mit Umbruch nach Port 24. */
export function generatePorts(start, count) {
  const ports = [];
  let cur = { panel: Math.max(1, start.panel), port: Math.min(Math.max(1, start.port), PORTS_PER_PANEL) };
  for (let i = 0; i < count; i++) {
    ports.push(createPort(portName(cur.panel, cur.port)));
    cur = nextPort(cur);
  }
  return ports;
}

/** Ändert die Anzahl der Ports; neue Ports werden ab dem letzten fortlaufend benannt. */
export function resizePorts(ports, count) {
  if (count <= ports.length) return ports.slice(0, count);
  const last = [...ports].reverse().map((p) => parsePort(p.name)).find(Boolean);
  const start = last ? nextPort(last) : { panel: 1, port: 1 };
  return [...ports, ...generatePorts(start, count - ports.length)];
}

/** Gruppiert Ports nach Patchfeld (P01, P02, …); nicht passende Namen landen unter „Sonstige“. */
export function groupPortsByPanel(ports) {
  const groups = new Map();
  ports.forEach((p, index) => {
    const parsed = parsePort(p.name);
    const key = parsed ? `P${pad(parsed.panel)}` : 'Sonstige';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push({ ...p, index });
  });
  return [...groups.entries()]
    .sort(([a], [b]) => (a === 'Sonstige' ? 1 : b === 'Sonstige' ? -1 : a.localeCompare(b, 'de', { numeric: true })))
    .map(([panel, items]) => ({ panel, ports: items }));
}
