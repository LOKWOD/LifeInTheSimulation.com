import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const failures = [];
const htmlFiles = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".site-bundle", "node_modules"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".html")) htmlFiles.push(full);
  }
}

function fail(message) { failures.push(message); }
function count(text, re) { return [...text.matchAll(re)].length; }
function targetFor(file, href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean) return null;
  if (clean.startsWith("/")) return join(root, clean === "/" ? "index.html" : clean.slice(1));
  return resolve(dirname(file), clean);
}

walk(root);
const titles = new Map();
const canonicals = new Map();

for (const file of htmlFiles) {
  const rel = relative(root, file);
  const html = readFileSync(file, "utf8");
  if (!/<html\b[^>]*\blang=["']en["']/i.test(html)) fail(`${rel}: missing lang=en`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(`${rel}: missing viewport`);
  if (!/<h1\b/i.test(html) && rel !== "404.html") fail(`${rel}: missing h1`);
  if (!/<\/body>/i.test(html)) fail(`${rel}: missing </body>`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
  if (title) {
    if (titles.has(title)) fail(`duplicate title: ${title} (${titles.get(title)}, ${rel})`);
    else titles.set(title, rel);
  }
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  if (canonical) {
    if (canonicals.has(canonical)) fail(`duplicate canonical: ${canonical}`);
    else canonicals.set(canonical, rel);
  }
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) {
    const href = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;
    const target = targetFor(file, href);
    if (target && !existsSync(target)) fail(`${rel}: missing internal target ${href}`);
  }
}

const today = [
  "essays/ai-accuracy-is-not-understanding.html",
  "guides/best-books-to-understand-ai.html"
];
for (const rel of today) {
  const html = readFileSync(join(root, rel), "utf8");
  for (const requirement of [
    [/<meta\s+name="description"/, "description"],
    [/<link\s+rel="canonical"/, "canonical"],
    [/<meta\s+property="og:title"/, "Open Graph title"],
    [/<meta\s+name="twitter:card"/, "Twitter card"],
    [/<script\s+type="application\/ld\+json">/, "JSON-LD"],
    [/data-toc/, "table of contents"],
    [/static\.cloudflareinsights\.com\/beacon\.min\.js/, "Cloudflare analytics"],
    [/lokwod-visitor-beacon/, "visitor beacon"]
  ]) if (!requirement[0].test(html)) fail(`${rel}: missing ${requirement[1]}`);
  if (count(html, /href="\//g) < 8) fail(`${rel}: fewer than three meaningful internal links`);
  for (const json of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json[1]); } catch (error) { fail(`${rel}: invalid JSON-LD (${error.message})`); }
  }
  if (/[?&]tag=|amzn\.to|rel="[^"]*sponsored/i.test(html)) fail(`${rel}: unexpected affiliate/tracking markup`);
}

const feed = readFileSync(join(root, "feed.xml"), "utf8");
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const rel of today) {
  const url = `https://lifeinthesimulation.com/${rel}`;
  if (count(feed, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) !== 2) fail(`feed: ${url} must appear exactly twice (link and guid)`);
  if (count(sitemap, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) !== 1) fail(`sitemap: ${url} must appear exactly once`);
}
if (!/<lastBuildDate>Sat, 22 Aug 2026/.test(feed)) fail("feed: stale lastBuildDate");
if (count(sitemap, /<loc>/g) !== new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])).size) fail("sitemap: duplicate URLs");

if (failures.length) {
  console.error(failures.map((item) => `FAIL ${item}`).join("\n"));
  process.exit(1);
}
console.log(`PASS ${htmlFiles.length} HTML pages checked; ${titles.size} unique titles; ${canonicals.size} unique canonicals; internal links, today's metadata/schema/integrations, RSS and sitemap verified.`);
