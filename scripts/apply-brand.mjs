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
      if (path === join(root, 'index.html')) {
        const signature = '<div class="home-brand-signature" aria-label="Life in the Simulation — Ideas for a clearer reality"><span class="home-brand-icon" aria-hidden="true"></span><span class="home-brand-words"><span>Life in the</span><strong>Simulation</strong><small>Ideas for a clearer reality</small></span></div>';
        html = html.includes('home-brand-signature')
          ? html.replace(/<div class="home-brand-signature"[^>]*>(?:<\/div>|[\s\S]*?<\/div>)/, signature)
          : html.replace('<div class="hero-copy">', `<div class="hero-copy">\n    ${signature}`);
      }
      writeFileSync(path, html); count++;
    }
  }
}
walk(root);
console.log(`Applied brand to ${count} pages`);
