import { defineConfig } from 'vite';

// Zwei Seiten: Übersicht (index.html) und Editor (editor.html, nirgends verlinkt).
// Jede Seite wird einzeln gebaut ("npm run build" ruft beide auf), damit jede ein
// einziges klassisches Skript bekommt – so läuft dist/index.html auch per Doppelklick (file://).
const PAGES = { main: 'index.html', editor: 'editor.html' };

/** Browser laden über file:// keine ES-Module und nichts mit crossorigin – daher klassisches Skript mit defer. */
function fileProtocolHtml() {
  return {
    name: 'file-protocol-html',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => html.replace(/ type="module"/g, ' defer').replace(/ crossorigin/g, ''),
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const page = mode === 'editor' ? 'editor' : 'main';
  return {
    // Relative Pfade: Die App läuft unter / und auch in einem Unterordner (z. B. /buero3d/)
    base: './',
    plugins: command === 'build' ? [fileProtocolHtml()] : [],
    build: {
      outDir: 'dist',
      // Der zweite Durchlauf (Editor) darf die Übersicht nicht löschen
      emptyOutDir: page === 'main',
      modulePreload: false,
      // Eine CSS-Datei pro Seite statt per Skript eingefügt
      cssCodeSplit: false,
      rollupOptions: {
        input: { [page]: PAGES[page] },
        output: { format: 'iife', inlineDynamicImports: true },
      },
      // three.js allein ist ~500 kB – die Warnung ist hier erwartet
      chunkSizeWarningLimit: 800,
    },
  };
});
