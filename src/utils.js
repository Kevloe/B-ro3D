const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

export const fmt = (n, digits = 1) =>
  Number(n).toLocaleString('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits });

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export function uid(prefix = 'id') {
  const rnd = globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now().toString(36);
  return `${prefix}-${rnd.slice(0, 8)}`;
}
