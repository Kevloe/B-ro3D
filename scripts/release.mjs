// Packt alles für den Server in release/buero3d.tar.gz:
//   dist/    gebaute Web-App inkl. config.json und standard.json (nginx liefert sie aus)
//   deploy/  nginx-Konfiguration, Anleitung
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, statSync } from 'node:fs';

if (!existsSync('dist/index.html')) {
  console.error('dist/ fehlt – zuerst "npm run build" ausführen.');
  process.exit(1);
}
mkdirSync('release', { recursive: true });
const out = 'release/buero3d.tar.gz';
execFileSync('tar', ['-czf', out, '--exclude=*.tmp-*', 'dist', 'deploy'], { stdio: 'inherit' });
console.log(`${out} erstellt (${Math.round(statSync(out).size / 1024)} KB)`);
