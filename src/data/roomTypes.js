export const ROOM_TYPES = {
  office: { label: 'Büro', color: '#7fa8d6' },
  meeting: { label: 'Besprechung', color: '#e5a55f' },
  corridor: { label: 'Flur', color: '#cfc9bf' },
  kitchen: { label: 'Küche', color: '#8fc28a' },
  wc: { label: 'WC', color: '#9fcbd4' },
  stairs: { label: 'Treppenhaus', color: '#aab3bf' },
  storage: { label: 'Lager / Technik', color: '#b7a8cc' },
  other: { label: 'Sonstiges', color: '#d8d2c6' },
};

export const roomColor = (room) => room.color || ROOM_TYPES[room.type]?.color || ROOM_TYPES.other.color;

export const roomTypeLabel = (room) => ROOM_TYPES[room.type]?.label ?? ROOM_TYPES.other.label;
