# Deployment auf Ubuntu (nginx, rein statisch)

Kein Backend: nginx liefert nur Dateien aus.

```
Browser ──► nginx :80/:443 ──► /var/www/buero3d
                                 ├── index.html            Übersicht (für alle)
                                 ├── editor.html           Editor (nicht verlinkt)
                                 ├── assets/
                                 ├── config.json           Einstellungen
                                 └── standard.json         Gebäude, das alle sehen
```

## 1. Paket bauen (Windows, im Projektordner)

```powershell
npm run release
scp release/buero3d.tar.gz <benutzer>@<server>:/tmp/
```

## 2. Server einrichten (einmalig)

```bash
sudo apt install -y nginx rsync
sudo mkdir -p /opt/buero3d /var/www/buero3d
sudo tar -xzf /tmp/buero3d.tar.gz -C /opt/buero3d
sudo cp -r /opt/buero3d/dist/. /var/www/buero3d/

# nginx (vorher server_name in der Datei anpassen!)
sudo cp /opt/buero3d/deploy/nginx/buero3d.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/buero3d.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
sudo ufw allow 'Nginx Full'   # falls die Firewall aktiv ist
```

## 3. Neuen Standard veröffentlichen

1. Editor unter `http://<server>/editor.html` öffnen und bearbeiten (die Änderungen bleiben als Entwurf im eigenen Browser).
2. **Export** klicken → es wird `standard.json` heruntergeladen.
3. Datei auf den Server legen:

```bash
scp standard.json <benutzer>@<server>:/tmp/
sudo cp /var/www/buero3d/standard.json /var/www/buero3d/standard.$(date +%F-%H%M).json   # alte Version sichern
sudo cp /tmp/standard.json /var/www/buero3d/standard.json
```

Alle Browser sehen den neuen Stand beim nächsten Laden der Seite. Kein Neustart nötig.

Zurück zu einer alten Version: die gesicherte Datei wieder nach `standard.json` kopieren – oder in
`config.json` direkt auf sie zeigen (`"standard": "standard.2026-10-17-0930.json"`).

## 4. Einstellungen (`/var/www/buero3d/config.json`)

```json
{
  "standard": "standard.json"
}
```

| Schlüssel | Bedeutung |
|---|---|
| `standard` | Pfad der Gebäudedatei, die alle sehen (relativ zur App). Jeder Export kann hier eingetragen werden. |

Änderungen wirken beim nächsten Laden der Seite.

## 5. Updates der App einspielen

`standard.json` und `config.json` auf dem Server bleiben dabei erhalten:

```bash
sudo tar -xzf /tmp/buero3d.tar.gz -C /opt/buero3d
sudo rsync -a --delete --exclude=/config.json --exclude='/standard*.json' /opt/buero3d/dist/ /var/www/buero3d/
```

## HTTPS

- Mit öffentlichem DNS-Namen: `sudo apt install certbot python3-certbot-nginx && sudo certbot --nginx -d <hostname>`
- Internes Netz: Zertifikat der eigenen CA verwenden (Vorlage am Ende von `buero3d.conf`).

## Fehlersuche

- Kopfzeile zeigt „Testgebäude“ → `standard.json` fehlt oder ist kein gültiges JSON
  (Pfad in `config.json` prüfen; Hinweis per Mauszeiger auf den Status).
- `sudo tail -f /var/log/nginx/error.log`
