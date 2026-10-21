import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { roomColor } from '../data/roomTypes.js';
import { floorBounds, groundIndex, itemWorld, PRINTER_D, PRINTER_W, TANK_SIZE } from '../data/model.js';
import { computeWalls } from './walls.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { stairLayout } from '../data/stairs.js';
import {
  roomCenter,
  roomLabelPoint,
  roomPieces,
  roomPolygon,
  roomRotation,
  roomToWorld,
  subtractConvex,
} from '../data/shape.js';
import { esc } from '../utils.js';

const SLAB_T = 0.2;
const DOOR_H = 2.1;
const LOW_WALL_H = 1.1;
const ACCENT = '#e2001a';

/** Rechtecke ({ x, z, w, d }) als eine Geometrie: Quader der Höhe `h` oder (h = 0) Bodenflächen. */
function rectsGeometry(rects, h) {
  const geos = rects.map((r) => {
    const g = h ? new THREE.BoxGeometry(r.w, h, r.d) : new THREE.PlaneGeometry(r.w, r.d).rotateX(-Math.PI / 2);
    return g.translate(r.x + r.w / 2, 0, r.z + r.d / 2);
  });
  if (!geos.length) return new THREE.PlaneGeometry(0, 0);
  if (geos.length === 1) return geos[0];
  const merged = mergeGeometries(geos);
  geos.forEach((g) => g.dispose());
  return merged;
}

/** Umriss ([[x, z], …]) als THREE.Shape; die Form liegt in der x/y-Ebene mit y = -z. */
const toShape = (poly) => new THREE.Shape(poly.map(([x, z]) => new THREE.Vector2(x, -z)));

/** Umriss als Prisma der Höhe `h` ab y = 0. */
function prismGeometry(poly, h) {
  return new THREE.ExtrudeGeometry(toShape(poly), { depth: h, bevelEnabled: false }).rotateX(-Math.PI / 2);
}

/** Konvexe Teile minus konvexe Löcher (Deckenöffnungen) als Liste konvexer Polygone. */
function cutHoles(pieces, holes) {
  let polys = pieces;
  for (const hole of holes) polys = polys.flatMap((p) => subtractConvex(p, hole));
  return polys;
}

/** Polygone als eine Geometrie: Prismen der Höhe `h` oder (h = 0) Bodenflächen. */
function polysGeometry(polys, h) {
  if (!polys.length) return new THREE.PlaneGeometry(0, 0);
  const geos = polys.map((poly) =>
    h ? prismGeometry(poly, h) : new THREE.ShapeGeometry(toShape(poly)).rotateX(-Math.PI / 2),
  );
  if (geos.length === 1) return geos[0];
  const merged = mergeGeometries(geos);
  geos.forEach((g) => g.dispose());
  return merged;
}

/** Deckenöffnung über einer Treppe als Polygon in Weltkoordinaten (Treppenhaus kann gedreht sein). */
function stairOpening(room, height) {
  const { x, z, w, d } = stairLayout(room, height).opening;
  return [[x, z], [x + w, z], [x + w, z + d], [x, z + d]].map((p) => roomToWorld(room, p));
}

/** Gruppe, in der ungedrehte Raumkoordinaten gelten (für Treppen und Aufzug gedrehter Räume). */
function roomFrame(room) {
  const frame = new THREE.Group();
  const [cx, cz] = roomCenter(room);
  frame.position.set(cx, 0, cz);
  frame.rotation.y = -THREE.MathUtils.degToRad(roomRotation(room));
  const inner = new THREE.Group();
  inner.position.set(-cx, 0, -cz);
  frame.add(inner);
  return { frame, inner };
}

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * 3D-Darstellung eines Gebäudes (wird von Übersicht und Editor-Vorschau genutzt).
 */
export class BuildingView {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      wallMode: 'full', // 'full' | 'low'
      explode: 0, // zusätzlicher Abstand zwischen Etagen in Metern
      labels: true,
      background: '#eef1f5',
      onRoomClick: null,
      onTankClick: null,
      onPrinterClick: null,
      ...options,
    };
    this.building = null;
    this.focusFloorId = null;
    this.selectedRoomId = null;
    this.hoverRoomId = null;
    this.selectedTankId = null;
    this.hoverTankId = null;
    this.selectedPrinterId = null;
    this.hoverPrinterId = null;
    this.rooms = new Map(); // roomId -> { mesh, label, floorId, room }
    this.tanks = new Map(); // tankId -> { mesh, label, floorId, roomId }
    this.printers = new Map(); // printerId -> { mesh, label, floorId, roomId }
    this.floors = new Map(); // floorId -> THREE.Group
    this.selectionObj = null;
    this.anim = null;
    this.hasFitted = false;

    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;

    const renderer = (this.renderer = new THREE.WebGLRenderer({ antialias: true }));
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(w, h);
    this.labelRenderer.domElement.className = 'label-layer';
    container.appendChild(this.labelRenderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.options.background);

    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 2000);
    this.camera.position.set(30, 28, 38);

    const controls = (this.controls = new OrbitControls(this.camera, renderer.domElement));
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxPolarAngle = Math.PI * 0.48;
    controls.minDistance = 3;
    controls.maxDistance = 400;
    controls.addEventListener('start', () => (this.anim = null));

    this.scene.add(new THREE.HemisphereLight(0xffffff, 0xa9b3bf, 1.5));
    const sun = (this.sun = new THREE.DirectionalLight(0xffffff, 2.2));
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.03;
    this.scene.add(sun, sun.target);

    this.ground = new THREE.Mesh(
      new THREE.PlaneGeometry(1000, 1000),
      new THREE.MeshStandardMaterial({ color: 0xdfe3e9, roughness: 1, opacity: 0.55 }),
    );
    this.ground.rotation.x = -Math.PI / 2;
    this.ground.position.y = -SLAB_T - 0.01;
    this.ground.receiveShadow = true;
    this.scene.add(this.ground);

    this.grid = new THREE.GridHelper(300, 300, 0xc9cfd7, 0xd5dae0);
    this.grid.position.y = -SLAB_T - 0.005;
    this.scene.add(this.grid);

    this.buildingGroup = new THREE.Group();
    this.scene.add(this.buildingGroup);

    this.raycaster = new THREE.Raycaster();
    this.bindPointer();

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);

    this.tick = this.tick.bind(this);
    this.raf = requestAnimationFrame(this.tick);
  }

  // ---------------------------------------------------------------- public API

  setBuilding(building) {
    this.building = building;
    this.clear();

    // Erdgeschoss auf Höhe 0, Untergeschosse darunter
    const ground = groundIndex(building);
    let elevation = -building.floors.slice(0, ground).reduce((sum, f) => sum + f.height, 0);
    building.floors.forEach((floor, index) => {
      const below = building.floors[index - 1];
      const context = {
        hasFloorAbove: index < building.floors.length - 1,
        // Deckenöffnungen über den Treppen der Etage darunter
        openings: below
          ? below.rooms.filter((r) => r.type === 'stairs').map((r) => stairOpening(r, below.height))
          : [],
      };
      const group = this.buildFloor(floor, context);
      group.userData.elevation = elevation;
      group.userData.index = index - ground;
      this.floors.set(floor.id, group);
      this.buildingGroup.add(group);
      elevation += floor.height;
    });

    this.layoutFloors();
    this.applyFocus();
    this.applyHighlight();
    if (!this.hasFitted) {
      this.fitAll(false);
      this.hasFitted = true;
    }
  }

  setFocusFloor(floorId) {
    this.focusFloorId = floorId;
    this.applyFocus();
    this.applyHighlight();
  }

  setSelectedRoom(roomId) {
    this.selectedRoomId = roomId;
    this.applyHighlight();
  }

  setSelectedPrinter(printerId) {
    this.selectedPrinterId = printerId;
    this.applyHighlight();
  }

  setSelectedTank(tankId) {
    this.selectedTankId = tankId;
    this.applyHighlight();
  }

  setWallMode(mode) {
    this.options.wallMode = mode;
    if (this.building) this.setBuilding(this.building);
  }

  setExplode(value) {
    this.options.explode = value;
    this.layoutFloors();
  }

  setLabels(on) {
    this.options.labels = on;
    this.applyFocus();
  }

  focusRoom(roomId) {
    const info = this.rooms.get(roomId);
    if (!info) return;
    const group = this.floors.get(info.floorId);
    const r = info.room;
    const target = new THREE.Vector3(r.x + r.width / 2, group.position.y + 0.5, r.z + r.depth / 2);
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    dir.y = Math.max(dir.y, 0.75);
    dir.normalize();
    const dist = Math.max(r.width, r.depth) * 1.5 + 8;
    this.flyTo(target.clone().addScaledVector(dir, dist), target);
  }

  fitAll(animate = true) {
    const box = new THREE.Box3();
    for (const group of this.floors.values()) {
      const { state, bounds, height } = group.userData;
      if (!bounds || state === 'hidden' || (state === 'ghost' && this.focusFloorId)) continue;
      box.expandByPoint(new THREE.Vector3(bounds.minX, group.position.y, bounds.minZ));
      box.expandByPoint(new THREE.Vector3(bounds.maxX, group.position.y + height, bounds.maxZ));
    }
    if (box.isEmpty()) {
      // leere Etage: auf ihre Höhe schauen (Untergeschosse liegen unter 0)
      const y = this.floors.get(this.focusFloorId)?.position.y ?? 0;
      box.set(new THREE.Vector3(-5, y, -5), new THREE.Vector3(5, y + 3, 5));
    }

    const center = box.getCenter(new THREE.Vector3());
    const radius = box.getSize(new THREE.Vector3()).length() / 2;
    const fov = THREE.MathUtils.degToRad(this.camera.fov / 2);
    const dist = (radius / Math.sin(fov)) * Math.max(0.85, 0.85 / this.camera.aspect);
    const dir = new THREE.Vector3(0.45, 0.8, 1).normalize();
    this.flyTo(center.clone().addScaledVector(dir, dist), center, animate);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.resizeObserver.disconnect();
    this.controls.dispose();
    this.clear();
    this.ground.geometry.dispose();
    this.ground.material.dispose();
    this.grid.geometry.dispose();
    this.grid.material.dispose();
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this.labelRenderer.domElement.remove();
  }

  // ---------------------------------------------------------------- building

  buildFloor(floor, { hasFloorAbove = false, openings = [] } = {}) {
    const group = new THREE.Group();
    const mats = [];
    const material = (params) => {
      const m = new THREE.MeshStandardMaterial(params);
      mats.push(m);
      return m;
    };
    const labels = [];
    const bounds = floorBounds(floor);
    const low = this.options.wallMode === 'low';
    const fullH = floor.height - SLAB_T;
    const wallH = low ? Math.min(LOW_WALL_H, fullH) : fullH;
    const stairTops = []; // Stufen über der Wandoberkante, nur sichtbar mit der Etage darüber

    if (bounds) {
      const pad = 0.15;
      const [x0, z0, x1, z1] = [bounds.minX - pad, bounds.minZ - pad, bounds.maxX + pad, bounds.maxZ + pad];
      const outline = [[x0, z0], [x1, z0], [x1, z1], [x0, z1]];
      const slab = new THREE.Mesh(
        polysGeometry(cutHoles([outline], openings), SLAB_T),
        material({ color: 0xd3d8df, roughness: 0.9 }),
      );
      slab.position.y = -SLAB_T;
      slab.receiveShadow = true;
      slab.castShadow = true;
      group.add(slab);

      const tagEl = document.createElement('div');
      tagEl.className = 'floor-tag';
      tagEl.textContent = floor.name;
      const tag = new CSS2DObject(tagEl);
      tag.position.set(bounds.minX - 0.4, 0, bounds.maxZ + 0.4);
      group.add(tag);
      labels.push(tag);
    }

    for (const room of floor.rooms) {
      const mesh = new THREE.Mesh(
        polysGeometry(cutHoles(roomPieces(room), openings), 0),
        material({ color: roomColor(room), roughness: 0.85 }),
      );
      mesh.position.y = 0.01;
      mesh.receiveShadow = true;
      mesh.userData = { roomId: room.id, floorId: floor.id };
      group.add(mesh);

      const el = document.createElement('div');
      el.className = 'room-label' + (room.type === 'corridor' ? ' is-corridor' : '');
      el.innerHTML =
        `<span class="rl-name">${esc(room.name)}</span>` +
        (room.occupant ? `<span class="rl-sub">${esc(room.occupant)}</span>` : '');
      const label = new CSS2DObject(el);
      const [lx, lz] = roomLabelPoint(room);
      label.position.set(lx, 1.2, lz);
      group.add(label);
      labels.push(label);

      this.rooms.set(room.id, { mesh, label, floorId: floor.id, room });

      if (room.type === 'stairs') {
        const { frame, inner } = roomFrame(room);
        group.add(frame);
        if (hasFloorAbove) stairTops.push(...this.buildStairs(inner, room, floor, material, wallH));
        this.buildElevator(inner, room, floor, material, wallH);
      }

      for (const tank of room.tanks) {
        const [tx, tz] = itemWorld(room, tank);
        const lid = new THREE.Mesh(
          new THREE.BoxGeometry(TANK_SIZE, 0.03, TANK_SIZE),
          material({ color: 0x6f7782, roughness: 0.35, metalness: 0.6 }),
        );
        lid.position.set(tx, 0.025, tz);
        lid.rotation.y = -THREE.MathUtils.degToRad(roomRotation(room));
        lid.castShadow = true;
        lid.userData = { tankId: tank.id, roomId: room.id, floorId: floor.id };
        group.add(lid);

        const tagEl = document.createElement('button');
        tagEl.type = 'button';
        tagEl.className = 'tank-label';
        tagEl.title = `${tank.name} – ${tank.ports.length} Ports`;
        tagEl.innerHTML = `<span class="tl-icon"></span>${esc(tank.name)}<span class="tl-count">${tank.ports.length}</span>`;
        tagEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.options.onTankClick?.(tank.id, room.id, floor.id);
        });
        const tag = new CSS2DObject(tagEl);
        tag.position.set(tx, 0.35, tz);
        group.add(tag);
        labels.push(tag);

        this.tanks.set(tank.id, { mesh: lid, label: tag, floorId: floor.id, roomId: room.id });
      }

      for (const printer of room.printers) {
        const [px, pz] = itemWorld(room, printer);
        const bodyH = 0.42;
        const unit = new THREE.Group();
        unit.position.set(px, 0, pz);
        unit.rotation.y = -THREE.MathUtils.degToRad(roomRotation(room));
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(PRINTER_W * 0.9, bodyH, PRINTER_D * 0.9),
          material({ color: 0xe9ecf0, roughness: 0.6 }),
        );
        body.position.set(0, bodyH / 2, 0);
        body.castShadow = true;
        body.receiveShadow = true;
        body.userData = { printerId: printer.id, roomId: room.id, floorId: floor.id };
        const top = new THREE.Mesh(
          new THREE.BoxGeometry(PRINTER_W * 0.9, 0.06, PRINTER_D * 0.9),
          material({ color: 0x3b4352, roughness: 0.5 }),
        );
        top.position.set(0, bodyH + 0.03, 0);
        top.castShadow = true;
        const tray = new THREE.Mesh(
          new THREE.BoxGeometry(PRINTER_W * 0.6, 0.02, 0.12),
          material({ color: 0xffffff, roughness: 0.9 }),
        );
        tray.position.set(0, bodyH * 0.55, PRINTER_D * 0.45 + 0.05);
        unit.add(body, top, tray);
        group.add(unit);

        const tagEl = document.createElement('button');
        tagEl.type = 'button';
        tagEl.className = 'printer-label';
        tagEl.title = `${printer.name}${printer.ip ? ` – ${printer.ip}` : ''}`;
        tagEl.innerHTML = `<span class="pl-icon"></span>${esc(printer.name)}`;
        tagEl.addEventListener('click', (e) => {
          e.stopPropagation();
          this.options.onPrinterClick?.(printer.id, room.id, floor.id);
        });
        const tag = new CSS2DObject(tagEl);
        tag.position.set(px, 0.85, pz);
        group.add(tag);
        labels.push(tag);

        this.printers.set(printer.id, { mesh: body, label: tag, floorId: floor.id, roomId: room.id });
      }
    }

    const wallMat = material({ color: 0xfbfbf9, roughness: 0.7 });
    let glassMat = null;
    let frameMat = null;
    for (const seg of computeWalls(floor.rooms, floor.openings ?? [], floor.walls ?? [])) {
      if (seg.len < 0.01) continue;
      if (seg.kind === 'glass' || seg.kind === 'transom') {
        // Oberlicht über einer Tür in der Glaswand: Glas ab Türhöhe, Profil auch über der Tür
        const y0 = seg.kind === 'transom' ? Math.min(DOOR_H, wallH) : 0;
        if (wallH - y0 < 0.02) continue;
        glassMat ??= material({ color: 0x9cc7e0, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.32, depthWrite: false });
        frameMat ??= material({ color: 0x5b6573, roughness: 0.5, metalness: 0.4 });
        const prof = Math.min(0.05, (wallH - y0) / 4);
        const pane = new THREE.Mesh(prismGeometry(seg.quad, wallH - y0 - prof * 2), glassMat);
        pane.position.y = y0 + prof;
        group.add(pane);
        // Profile unten und oben
        for (const y of [y0, wallH - prof]) {
          const frame = new THREE.Mesh(prismGeometry(seg.quad, prof), frameMat);
          frame.position.y = y;
          frame.castShadow = true;
          group.add(frame);
        }
        continue;
      }
      if (seg.kind === 'lintel' && (low || wallH <= DOOR_H + 0.05)) continue;
      const h = seg.kind === 'wall' ? wallH : wallH - DOOR_H;
      const wall = new THREE.Mesh(prismGeometry(seg.quad, h), wallMat);
      wall.position.y = seg.kind === 'wall' ? 0 : DOOR_H;
      wall.castShadow = true;
      wall.receiveShadow = true;
      group.add(wall);
    }

    group.userData = { floorId: floor.id, mats, labels, bounds, stairTops, height: floor.height, state: 'full' };
    return group;
  }

  /**
   * Massive Stufen und Podeste bis zur Höhe der nächsten Etage. Gibt die Teile über `cutH`
   * (Wandoberkante) zurück: Sie werden ausgeblendet, solange die Etage darüber nicht zu sehen ist –
   * dann endet die Treppe wie in einem Schnitt an der Wand.
   */
  buildStairs(group, room, floor, material, cutH) {
    const { steps, landings } = stairLayout(room, floor.height);
    const mats = [material({ color: 0xc4c9d0, roughness: 0.8 }), material({ color: 0xb8bec6, roughness: 0.8 })];
    const tops = [];
    const add = (r, mat) => {
      const box = new THREE.Mesh(new THREE.BoxGeometry(r.w, r.top, r.d), mat);
      box.position.set(r.x + r.w / 2, r.top / 2 + 0.01, r.z + r.d / 2);
      box.castShadow = true;
      box.receiveShadow = true;
      group.add(box);
      if (r.top > cutH + 0.01) tops.push(box);
    };
    steps.forEach((r, i) => add(r, mats[i % 2]));
    landings.forEach((r) => add(r, mats[0]));
    return tops;
  }

  /** Aufzugsschacht im Treppenauge mit geschlossener Tür zum Geschosspodest (auch auf der obersten Etage). */
  buildElevator(group, room, floor, material, wallH) {
    const lift = stairLayout(room, floor.height).elevator;
    if (!lift) return;
    const shaft = new THREE.Mesh(rectsGeometry(lift.walls, wallH), material({ color: 0xd9dde2, roughness: 0.8 }));
    const doorH = Math.min(DOOR_H, wallH);
    const door = new THREE.Mesh(
      rectsGeometry([lift.door], doorH),
      material({ color: 0x9aa3ad, roughness: 0.3, metalness: 0.7 }),
    );
    shaft.position.y = wallH / 2;
    door.position.y = doorH / 2;
    for (const m of [shaft, door]) {
      m.castShadow = true;
      m.receiveShadow = true;
      group.add(m);
    }
    if (wallH > doorH + 0.01) {
      const lintel = new THREE.Mesh(rectsGeometry([lift.door], wallH - doorH), shaft.material);
      lintel.position.y = doorH + (wallH - doorH) / 2;
      group.add(lintel);
    }
  }

  clear() {
    this.clearSelection();
    for (const group of this.floors.values()) {
      group.traverse((obj) => {
        if (obj.isCSS2DObject) obj.element.remove();
        obj.geometry?.dispose();
      });
      group.userData.mats.forEach((m) => m.dispose());
      this.buildingGroup.remove(group);
    }
    this.floors.clear();
    this.rooms.clear();
    this.tanks.clear();
    this.printers.clear();
  }

  layoutFloors() {
    for (const group of this.floors.values()) {
      group.position.y = group.userData.elevation + group.userData.index * this.options.explode;
    }
    this.fitShadow();
    this.applyGround();
  }

  applyFocus() {
    if (!this.building) return;
    const floors = this.building.floors;
    const focusIndex = this.focusFloorId ? floors.findIndex((f) => f.id === this.focusFloorId) : -1;

    floors.forEach((floor, i) => {
      const group = this.floors.get(floor.id);
      if (!group) return;
      let state = 'full';
      if (focusIndex >= 0) state = i === focusIndex ? 'full' : i < focusIndex ? 'ghost' : 'hidden';
      group.userData.state = state;
      group.visible = state !== 'hidden';
      for (const m of group.userData.mats) {
        const ghost = state === 'ghost';
        // Glas ist von sich aus durchsichtig: Grundwerte beim ersten Mal merken
        m.userData.base ??= { opacity: m.opacity, transparent: m.transparent, depthWrite: m.depthWrite };
        const base = m.userData.base;
        const transparent = ghost || base.transparent;
        if (m.transparent !== transparent) m.needsUpdate = true;
        m.transparent = transparent;
        m.opacity = ghost ? Math.min(0.14, base.opacity) : base.opacity;
        m.depthWrite = !ghost && base.depthWrite;
      }
      for (const label of group.userData.labels) {
        label.visible = state === 'full' && this.options.labels;
      }
    });
    this.applyGround();
    floors.forEach((floor, i) => {
      const above = floors[i + 1] && this.floors.get(floors[i + 1].id);
      for (const mesh of this.floors.get(floor.id)?.userData.stairTops ?? []) mesh.visible = Boolean(above?.visible);
    });
  }

  /**
   * Gelände: Ist ein Untergeschoss gewählt, liegt der Boden unter diesem Geschoss.
   * Sonst auf Höhe des Erdgeschosses und – wenn Untergeschosse zu sehen sind – durchscheinend.
   */
  applyGround() {
    if (!this.building) return;
    const groups = this.building.floors.map((f) => this.floors.get(f.id)).filter(Boolean);
    const focus = groups.find((g) => g.userData.floorId === this.focusFloorId);
    const basement = focus && focus.userData.index < 0;
    const y = basement ? focus.position.y - SLAB_T - 0.01 : -SLAB_T - 0.01;
    const seeThrough = !basement && groups.some((g) => g.userData.index < 0 && g.visible);
    this.ground.position.y = y;
    this.grid.position.y = y + 0.005;
    const m = this.ground.material;
    if (m.transparent !== seeThrough) m.needsUpdate = true;
    m.transparent = seeThrough;
    m.depthWrite = !seeThrough;
  }

  applyHighlight() {
    for (const [id, info] of this.rooms) {
      const m = info.mesh.material;
      if (id === this.selectedRoomId) {
        m.emissive.set(ACCENT);
        m.emissiveIntensity = 0.25;
      } else if (id === this.hoverRoomId) {
        m.emissive.set(0xffffff);
        m.emissiveIntensity = 0.2;
      } else {
        m.emissive.set(0x000000);
      }
      info.label.element.classList.toggle('is-selected', id === this.selectedRoomId);
    }
    for (const [id, info] of this.tanks) {
      const m = info.mesh.material;
      const active = id === this.selectedTankId;
      if (active) {
        m.emissive.set(ACCENT);
        m.emissiveIntensity = 0.8;
      } else if (id === this.hoverTankId) {
        m.emissive.set(0xffffff);
        m.emissiveIntensity = 0.35;
      } else {
        m.emissive.set(0x000000);
      }
      info.label.element.classList.toggle('is-selected', active);
    }
    for (const [id, info] of this.printers) {
      const m = info.mesh.material;
      const active = id === this.selectedPrinterId;
      if (active) {
        m.emissive.set(ACCENT);
        m.emissiveIntensity = 0.45;
      } else if (id === this.hoverPrinterId) {
        m.emissive.set(0xffffff);
        m.emissiveIntensity = 0.25;
      } else {
        m.emissive.set(0x000000);
      }
      info.label.element.classList.toggle('is-selected', active);
    }
    this.updateSelection();
  }

  /** Transparent volume + outline around the selected room. */
  updateSelection() {
    this.clearSelection();
    const info = this.rooms.get(this.selectedRoomId);
    if (!info) return;
    const group = this.floors.get(info.floorId);
    if (group.userData.state !== 'full') return;
    const r = info.room;
    const h = group.userData.height - SLAB_T;
    const geo = prismGeometry(roomPolygon(r), h);
    const fill = new THREE.Mesh(
      geo,
      new THREE.MeshBasicMaterial({ color: ACCENT, transparent: true, opacity: 0.1, depthWrite: false }),
    );
    const edges = new THREE.LineSegments(
      new THREE.EdgesGeometry(geo),
      new THREE.LineBasicMaterial({ color: ACCENT }),
    );
    const sel = new THREE.Group();
    sel.add(fill, edges);
    sel.position.y = 0.02;
    group.add(sel);
    this.selectionObj = sel;
  }

  clearSelection() {
    if (!this.selectionObj) return;
    this.selectionObj.traverse((o) => {
      o.geometry?.dispose();
      o.material?.dispose();
    });
    this.selectionObj.removeFromParent();
    this.selectionObj = null;
  }

  fitShadow() {
    const box = new THREE.Box3();
    for (const group of this.floors.values()) {
      const b = group.userData.bounds;
      if (!b) continue;
      box.expandByPoint(new THREE.Vector3(b.minX, group.position.y, b.minZ));
      box.expandByPoint(new THREE.Vector3(b.maxX, group.position.y + group.userData.height, b.maxZ));
    }
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const radius = Math.max(10, box.getSize(new THREE.Vector3()).length() / 2);
    this.sun.position.copy(center).add(new THREE.Vector3(radius * 0.7, radius * 1.6, radius * 0.5));
    this.sun.target.position.copy(center);
    const cam = this.sun.shadow.camera;
    cam.left = cam.bottom = -radius * 1.3;
    cam.right = cam.top = radius * 1.3;
    cam.near = 0.5;
    cam.far = radius * 5;
    cam.updateProjectionMatrix();
  }

  // ---------------------------------------------------------------- interaction

  bindPointer() {
    const el = this.renderer.domElement;
    let down = null;
    el.addEventListener('pointerdown', (e) => (down = { x: e.clientX, y: e.clientY }));
    el.addEventListener('pointerup', (e) => {
      if (!down || e.button !== 0) return;
      const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
      down = null;
      if (moved > 5) return;
      const hit = this.pick(e);
      if (hit?.tankId) this.options.onTankClick?.(hit.tankId, hit.roomId, hit.floorId);
      else if (hit?.printerId) this.options.onPrinterClick?.(hit.printerId, hit.roomId, hit.floorId);
      else this.options.onRoomClick?.(hit?.roomId ?? null, hit?.floorId ?? null);
    });
    el.addEventListener('pointermove', (e) => {
      if (e.buttons) return;
      const hit = this.pick(e);
      const tankId = hit?.tankId ?? null;
      const printerId = hit?.printerId ?? null;
      const roomId = tankId || printerId ? null : (hit?.roomId ?? null);
      el.style.cursor = hit ? 'pointer' : '';
      if (roomId !== this.hoverRoomId || tankId !== this.hoverTankId || printerId !== this.hoverPrinterId) {
        this.hoverRoomId = roomId;
        this.hoverTankId = tankId;
        this.hoverPrinterId = printerId;
        this.applyHighlight();
      }
    });
    el.addEventListener('pointerleave', () => {
      if (this.hoverRoomId || this.hoverTankId || this.hoverPrinterId) {
        this.hoverRoomId = null;
        this.hoverTankId = null;
        this.hoverPrinterId = null;
        this.applyHighlight();
      }
    });
  }

  pick(e) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const isActive = (info) => this.floors.get(info.floorId)?.userData.state === 'full';
    // Bodentanks und Drucker sind klein: großzügiger Trefferbereich über den Abstand zum Strahl
    const items = [
      ...[...this.tanks.values()].filter(isActive).map((i) => ({ mesh: i.mesh, size: TANK_SIZE })),
      ...[...this.printers.values()].filter(isActive).map((i) => ({ mesh: i.mesh, size: PRINTER_W })),
    ];
    const ray = this.raycaster.ray;
    let best = null;
    for (const { mesh, size } of items) {
      const p = mesh.getWorldPosition(new THREE.Vector3());
      const dist = ray.distanceToPoint(p);
      const tolerance = Math.max(size * 0.7, ray.origin.distanceTo(p) * 0.012);
      if (dist < tolerance && (!best || dist < best.dist)) best = { dist, mesh };
    }
    if (best) return best.mesh.userData;

    const roomMeshes = [...this.rooms.values()].filter(isActive).map((i) => i.mesh);
    const hit = this.raycaster.intersectObjects(roomMeshes, false)[0];
    return hit ? hit.object.userData : null;
  }

  flyTo(position, target, animate = true) {
    if (!animate) {
      this.camera.position.copy(position);
      this.controls.target.copy(target);
      this.anim = null;
      return;
    }
    this.anim = {
      p0: this.camera.position.clone(),
      p1: position,
      t0: this.controls.target.clone(),
      t1: target,
      start: performance.now(),
      duration: 750,
    };
  }

  resize() {
    const w = this.container.clientWidth;
    const h = this.container.clientHeight;
    if (!w || !h) return;
    this.renderer.setSize(w, h);
    this.labelRenderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  tick() {
    this.raf = requestAnimationFrame(this.tick);
    if (this.anim) {
      const k = Math.min(1, (performance.now() - this.anim.start) / this.anim.duration);
      const t = ease(k);
      this.camera.position.lerpVectors(this.anim.p0, this.anim.p1, t);
      this.controls.target.lerpVectors(this.anim.t0, this.anim.t1, t);
      if (k >= 1) this.anim = null;
    }
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }
}
