import { generatePorts, nextPort, parsePort } from './ports.js';

/**
 * Testgebäude: ein langer Flur (30 m) mit je drei Räumen auf beiden Seiten.
 * Koordinaten in Metern, x = Länge, z = Tiefe (Grundriss von oben).
 */
export function createSampleBuilding() {
  const roomW = 9;
  const roomD = 5.5;
  const corridorD = 2.2;
  const offset = 1.5; // Flur ragt an beiden Enden etwas über die Räume hinaus
  const north = 0;
  const corridorZ = roomD;
  const south = roomD + corridorD;

  const building = {
    name: 'Testbüro',
    floors: [
      {
        id: 'f-eg',
        name: 'Erdgeschoss',
        height: 3,
        rooms: [
          {
            id: 'r-flur', name: 'Flur', type: 'corridor',
            x: 0, z: corridorZ, width: roomW * 3 + offset * 2, depth: corridorD,
            color: null, occupant: '', description: 'Hauptflur',
          },
          {
            id: 'r-101', name: 'Büro 101', type: 'office',
            x: offset, z: north, width: roomW, depth: roomD,
            color: null, occupant: 'Team Vertrieb', description: '4 Arbeitsplätze',
          },
          {
            id: 'r-102', name: 'Büro 102', type: 'office',
            x: offset + roomW, z: north, width: roomW, depth: roomD,
            color: null, occupant: 'Team Marketing', description: '4 Arbeitsplätze',
          },
          {
            id: 'r-103', name: 'Büro 103', type: 'office',
            x: offset + roomW * 2, z: north, width: roomW, depth: roomD,
            color: null, occupant: 'Geschäftsleitung', description: '2 Arbeitsplätze',
          },
          {
            id: 'r-104', name: 'Büro 104', type: 'office',
            x: offset, z: south, width: roomW, depth: roomD,
            color: null, occupant: 'Team IT', description: '5 Arbeitsplätze',
          },
          {
            id: 'r-105', name: 'Besprechung 105', type: 'meeting',
            x: offset + roomW, z: south, width: roomW, depth: roomD,
            color: null, occupant: '', description: '12 Sitzplätze, Beamer',
          },
          {
            id: 'r-106', name: 'Teeküche 106', type: 'kitchen',
            x: offset + roomW * 2, z: south, width: roomW, depth: roomD,
            color: null, occupant: '', description: 'Kaffee, Kühlschrank, Spülmaschine',
          },
        ],
      },
    ],
  };

  // Bodentanks: Büros 2 Tanks à 6 Ports, Besprechung 2 à 4, Teeküche 1 à 2.
  // Ports fortlaufend über das ganze Gebäude: P01/01 … P01/24, P02/01 …
  const tankLayout = {
    'r-101': [6, 6], 'r-102': [6, 6], 'r-103': [6, 6],
    'r-104': [6, 6], 'r-105': [4, 4], 'r-106': [2],
  };
  let next = { panel: 1, port: 1 };
  for (const room of building.floors[0].rooms) {
    const counts = tankLayout[room.id] ?? [];
    room.tanks = counts.map((count, i) => {
      const ports = generatePorts(next, count);
      next = nextPort(parsePort(ports[ports.length - 1].name));
      return {
        id: `t-${room.id.slice(2)}-${i + 1}`,
        name: `BT ${i + 1}`,
        x: Math.round(((room.width * (i + 1)) / (counts.length + 1)) * 100) / 100,
        z: Math.round((room.depth / 2) * 100) / 100,
        ports,
      };
    });
  }

  // Switch-Belegung: P01 → Switch 1 Port 1–24, P02 → Switch 1 Port 25–48, P03 → Switch 2 Port 1–24
  for (const room of building.floors[0].rooms) {
    for (const tank of room.tanks) {
      for (const port of tank.ports) {
        const { panel, port: n } = parsePort(port.name);
        port.switch = `Switch ${Math.ceil(panel / 2)}`;
        port.switchPort = String(((panel - 1) % 2) * 24 + n);
      }
    }
  }

  // Drucker: einer im Flur, einer in Büro 102
  const rooms = Object.fromEntries(building.floors[0].rooms.map((r) => [r.id, r]));
  for (const r of building.floors[0].rooms) r.printers = [];
  rooms['r-flur'].printers.push({ id: 'p-flur', name: 'Drucker Flur', ip: '192.168.10.50', x: 15, z: 0.45 });
  rooms['r-102'].printers.push({ id: 'p-102', name: 'Drucker Marketing', ip: '192.168.10.51', x: 8.3, z: 0.5 });
  return building;
}
