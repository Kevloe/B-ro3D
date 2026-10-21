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
  - **Drehung**: Kreis-Griff über dem ausgewählten Raum ziehen (Raster 15°, `Alt` = frei) oder rechts unter „Drehung“
    eingeben bzw. mit ↺/↻ in 15°-Schritten. Gedreht wird um die Raummitte; Bodentanks, Drucker, Treppen, Türen
    und Glaswände drehen mit. X/Z bezeichnen die linke obere Ecke des Raums vor dem Drehen.
  - **Polygon-Raum** (`F`): Umriss Ecke für Ecke klicken, auf den Startpunkt klicken (oder Doppelklick / Enter) zum
    Schließen; Rücktaste nimmt die letzte Ecke zurück, `Shift` = waagerecht/senkrecht, fängt Raumecken und Wandenden.
    Beim ausgewählten Polygon-Raum Ecken ziehen, „+“ auf einer Kantenmitte ziehen = neue Ecke, Doppelklick auf
    eine Ecke = entfernen. Jeder Raum lässt sich rechts unter „Form“ in ein Polygon umwandeln.
  - **Raumform** (rechts unter „Form“): Rechteck, **L-Form** (Aussparung an einer Ecke), **schräge Wand** oder **Polygon**
    (Ecke diagonal abgeschnitten). Ecke und Größe rechts einstellen oder am Rauten-Griff im Grundriss ziehen.
  - **Fläche** in m² steht im Grundriss, in der Raumliste und rechts beim Raum (plus Summe der Etage);
    in der Übersicht im Raum-Dialog, in der Raumliste und je Etage
  - Etagen anlegen (`+ OG` oben, `+ UG` unten), duplizieren, sortieren, löschen
  - **Hintergrundbild pro Etage** (rechts unter „Etage“ → „Bild laden …“): Grundriss-Zeichnung (PNG, JPG, WebP, SVG)
    als schwache Vorlage zum Nachzeichnen, nur im Editor sichtbar. Deckkraft per Regler (Standard 15 %).
    **Maßstab setzen**: Anfang und Ende einer bekannten Strecke im Bild anklicken und die echte Länge eingeben.
    **Verschieben**: Bild im Grundriss ziehen. Das Bild wird beim Laden verkleinert/komprimiert und mit exportiert.
  - **Untergeschosse**: Eine Etage ist das Erdgeschoss (Geländehöhe, rechts unter „Etage“ → „Als Erdgeschoss festlegen“).
    Alles darunter liegt in 3D unter dem Gelände; ist ein UG gewählt, wird das Gelände darunter gezeigt,
    sonst scheint es durch. Ältere Dateien: die unterste Etage ist das Erdgeschoss.
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
- **Aufzug in der Mitte** (Häkchen beim Treppenhaus): Aufzugsschacht im Treppenauge zwischen den beiden Läufen,
  Tür zum Geschosspodest. Nur bei zweiläufigen Treppen; quer zur Laufrichtung braucht das Treppenhaus mindestens
  ca. 3,1 m. Der Schacht wird auf jeder Etage gezeichnet, auch auf der obersten.

Räume vom Typ **Flur** bekommen keine Wände zu angrenzenden Räumen. Türen zum Flur werden nicht automatisch
gesetzt, sondern wie alle Türen mit dem Werkzeug **Tür** (`D`).

### Türen und Glaswände

- **Tür** (`D` im Editor): auf eine Wand klicken – zwischen zwei Räumen, zum Flur, nach außen oder auf eine freie Wand.
  „Aufschlag drehen“ wechselt Anschlag und Öffnungsrichtung im Grundriss.
- **Glaswand** (`G`): an einer Wand entlang ziehen (Klick = 2 m). In 3D eine Glasscheibe mit Profilen oben und unten.
  Eine Tür in einer Glaswand bekommt darüber Glas (Oberlicht) statt eines Wandsturzes – egal, ob Tür oder Glas zuerst da war.
- Anklicken = auswählen, ziehen = entlang der Wand verschieben, Enden ziehen = Breite ändern, `Entf` = löschen.
  Rechts lässt sich zwischen Tür und Glaswand wechseln und die Breite eingeben.
- Wird ein Raum verschoben oder gedreht, wandern seine Türen und Glaswände mit. Liegt eine nicht mehr auf einer Wand,
  wird sie im Grundriss blass gezeigt und in 3D nicht dargestellt.

### Freie Wände

- **Wand** (`W` im Editor): von Punkt zu Punkt ziehen, in jedem Winkel. Fängt Raumecken und Wandenden in der Nähe,
  sonst das Raster; `Shift` = nur waagerecht/senkrecht, `Alt` = ohne Raster.
- Anklicken = auswählen, ziehen = verschieben, Enden ziehen = Länge und Richtung ändern, Länge rechts eingeben,
  `Strg+D` duplizieren, `Entf` löschen. Türen und Glaswände lassen sich auf freie Wände setzen und wandern mit.

„Beispiel laden“ stellt das Testgebäude (Flur mit 6 Räumen) wieder her.

## Struktur

```
public/       config.json (Einstellungen), standard.json (Standard-Gebäude)
src/
  data/       Datenmodell, Store (Standard laden, Entwurf, Undo/Redo), Raumtypen, Testgebäude
  three/      3D-Rendering (BuildingView, Wandberechnung)
  views/      Übersicht und Editor
```
