import { readFileSync, writeFileSync, readdirSync, copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const root = process.argv[2] || '_site';
mkdirSync(join(root, 'assets'), { recursive: true });
copyFileSync('assets/life-in-the-simulation-brand-board.png', join(root, 'assets/life-in-the-simulation-brand-board.png'));
let count = 0;
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith('.html')) {
      let html = readFileSync(path, 'utf8');
      html = html.replaceAll('Field notes from the rendered layer', 'Ideas for a clearer reality');
      if (path === join(root, 'index.html') && !html.includes('home-brand-signature')) {
        html = html.replace('<div class="hero-copy">', '<div class="hero-copy">\n    <div class="home-brand-signature" role="img" aria-label="Life in the Simulation — Ideas for a clearer reality"></div>');
      }
      writeFileSync(path, html); count++;
    }
  }
}
walk(root);
console.log(`Applied brand to ${count} pages`);
