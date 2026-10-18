# Büro 3D

Web-App zur 3D-Übersicht von Büroetagen mit Editor.

## Starten (Entwicklung)

```bash
npm install
npm run dev     # Übersicht: http://localhost:5173/  Editor: http://localhost:5173/editor.html
```

Ohne Server: Nach `npm run build` lässt sich `dist/index.html` (bzw. `dist/editor.html`) auch direkt per Doppelklick öffnen.
Dabei gilt die beim Build eingebettete `public/standard.json`. Eine danach ausgetauschte `standard.json` oder `config.json` wirkt nur auf einem Webserver.

Kein Backend: Die App ist rein statisch. Alle sehen den **Standard**, eine exportierte Gebäudedatei.

## Standard festlegen

Einstellungen in `public/config.json` (auf dem Server: `config.json` neben `index.html`, ohne neuen Build änderbar):

```json
{ "standard": "standard.json" }
```

- `standard`: Gebäudedatei, die alle sehen. Neuen Standard veröffentlichen = im Editor **Export** →
  heruntergeladene `standard.json` über die alte Datei legen (lokal `public/standard.json`).
  Alternativ einen beliebigen Export daneben legen und hier eintragen.

Änderungen im Editor sind ein **Entwurf** und bleiben nur in diesem Browser (Kopfzeile zeigt „Entwurf“).
„Standard laden“ verwirft den Entwurf. Wurde der Standard geändert, während ein Entwurf offen ist, erscheint ein Hinweis.

Deployment auf Ubuntu mit nginx: siehe [deploy/README.md](deploy/README.md) (`npm run release` baut das Paket).

## Ansichten

- **Übersicht** (`index.html`): 3D-Ansicht des Gebäudes. Etage wählen (darunterliegende Etagen werden
  durchscheinend gezeigt, darüberliegende ausgeblendet), Räume suchen, Raum anklicken für Details.
- **Editor** (`editor.html`, von der Übersicht aus nicht verlinkt – Adresse direkt aufrufen): 2D-Grundriss pro Etage mit Live-3D-Vorschau.
  - `R` Raum zeichnen, `V` Auswählen, Ziehen = verschieben, Griffe = Größe ändern
  - `Entf` löschen, `Strg+D` duplizieren, Pfeiltasten verschieben, `Strg+Z / Strg+Y`
  - `Alt` beim Ziehen = ohne Raster
  - Etagen anlegen, duplizieren, sortieren, löschen
  - Import / Export als JSON

### Bodentanks und Drucker

- **Bodentanks** (`T` im Editor): beliebig viele pro Raum, verschiebbar. Doppelklick öffnet den Tank-Editor
  mit Patchfeld-Ports (P01/01 … PX/24) und Switch-Belegung je Port. In der Übersicht zeigt ein Klick
  auf den Tank alle Ports mit Switch und Switch-Port.
- **Drucker** (`P` im Editor): in Räumen und Fluren platzierbar, mit Name und IP-Adresse.
  In der Übersicht zeigt ein Klick die IP (kopierbar) und einen Link zur Weboberfläche.

### Treppenhäuser

- **Treppenhaus** (`S` im Editor): Rechteck aufziehen – wird ein Raum vom Typ *Treppenhaus*. Alternativ bei einem
  bestehenden Raum den Typ auf *Treppenhaus* stellen.
- Rechts einstellbar: **Treppenform** (zweiläufig mit Podest, Antritt links/rechts, oder einläufig) und
  **Laufrichtung** (Richtung, in die es aufwärts geht; `Q` oder ↻ dreht um 90°).
- Im Grundriss erscheinen Stufen und Laufpfeil (Punkt = Antritt), in 3D führen die Stufen bis auf die Höhe der nächsten Etage.
  Die Bodenplatte darüber bekommt dort eine Deckenöffnung. Ist die Etage darüber ausgeblendet (oder „Wände niedrig“ aktiv),
  endet die Treppe an der Wandoberkante. Auf der obersten Etage wird keine Treppe nach oben gezeichnet.

Räume vom Typ **Flur** bekommen keine Wände zu angrenzenden Räumen; Räume, die an einen Flur grenzen,
bekommen automatisch eine Tür.

„Beispiel laden“ stellt das Testgebäude (Flur mit 6 Räumen) wieder her.

## Struktur

```
public/       config.json (Einstellungen), standard.json (Standard-Gebäude)
src/
  data/       Datenmodell, Store (Standard laden, Entwurf, Undo/Redo), Raumtypen, Testgebäude
  three/      3D-Rendering (BuildingView, Wandberechnung)
  views/      Übersicht und Editor
```
