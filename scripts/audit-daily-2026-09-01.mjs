import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const failures = [];
const htmlFiles = [];
const today = [
  "essays/automation-does-not-remove-responsibility.html",
  "guides/encrypted-cloud-storage-proton-tresorit-cryptomator.html",
  "guides/noise-canceling-headphones-for-focus.html"
];
const assets = [
  "/assets/visuals/automation-responsibility-editorial.webp",
  "/assets/visuals/encrypted-cloud-storage-editorial.webp",
  "/assets/visuals/focus-headphones-editorial.webp"
];

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
function escapeRe(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
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

for (const rel of today) {
  const html = readFileSync(join(root, rel), "utf8");
  for (const [pattern, label] of [
    [/<meta\s+name="description"/, "description"],
    [/<link\s+rel="canonical"/, "canonical"],
    [/<meta\s+property="og:title"/, "Open Graph title"],
    [/<meta\s+property="og:image"/, "Open Graph image"],
    [/<meta\s+name="twitter:card"/, "Twitter card"],
    [/<script\s+type="application\/ld\+json">/, "JSON-LD"],
    [/data-toc/, "table of contents"],
    [/static\.cloudflareinsights\.com\/beacon\.min\.js/, "Cloudflare analytics"],
    [/lokwod-visitor-beacon/, "visitor beacon"]
  ]) if (!pattern.test(html)) fail(`${rel}: missing ${label}`);
  if (count(html, /href="\//g) < 8) fail(`${rel}: fewer than three meaningful internal links`);
  if (count(html, /<figure\b/g) !== 1) fail(`${rel}: expected exactly one editorial visual`);
  if (html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length < 1100) fail(`${rel}: page is not substantial enough`);
  if (!/<figcaption>/i.test(html)) fail(`${rel}: visual missing caption`);
  if (count(html, /<img\b/g) !== 1 || !/<img\b[^>]*\balt="[^"]+"/i.test(html)) fail(`${rel}: expected one editorial image with useful alt text`);
  const imageSrc = html.match(/<img\b[^>]*\bsrc="([^"]+)"/i)?.[1];
  if (!imageSrc || !existsSync(targetFor(join(root, rel), imageSrc))) fail(`${rel}: missing editorial image asset ${imageSrc || "(none)"}`);
  for (const json of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(json[1]); } catch (error) { fail(`${rel}: invalid JSON-LD (${error.message})`); }
  }
  if (/[?&]tag=|amzn\.to|rel="[^"]*sponsored/i.test(html)) fail(`${rel}: unexpected affiliate/tracking markup`);
}

const feed = readFileSync(join(root, "feed.xml"), "utf8");
const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
const credits = readFileSync(join(root, "assets", "visuals", "credits.json"), "utf8");
const essaysArchive = readFileSync(join(root, "essays.html"), "utf8");
const guidesArchive = readFileSync(join(root, "field-guides.html"), "utf8");
if (!/>29<\/span> transmissions available/.test(essaysArchive)) fail("essays archive: stale result count");
if (!/>27<\/span> protocols available/.test(guidesArchive)) fail("field guides archive: stale result count");
for (const rel of today) {
  const url = `https://lifeinthesimulation.com/${rel}`;
  if (count(feed, new RegExp(escapeRe(url), "g")) !== 2) fail(`feed: ${url} must appear exactly twice`);
  if (count(sitemap, new RegExp(escapeRe(url), "g")) !== 1) fail(`sitemap: ${url} must appear exactly once`);
}
for (const asset of assets) if (!credits.includes(asset)) fail(`image credits: missing ${asset}`);

const responsibility = readFileSync(join(root, today[0]), "utf8");
for (const host of ["nist.gov", "airc.nist.gov"]) if (!responsibility.includes(host)) fail(`${today[0]}: missing authoritative ${host} source`);
const storage = readFileSync(join(root, today[1]), "utf8");
for (const host of ["proton.me", "tresorit.com", "docs.cryptomator.org"]) if (!storage.includes(host)) fail(`${today[1]}: missing official ${host} source`);
const headphones = readFileSync(join(root, today[2]), "utf8");
for (const host of ["cdc.gov", "osha.gov", "support.apple.com"]) if (!headphones.includes(host)) fail(`${today[2]}: missing official ${host} source`);

if (!/<lastBuildDate>Tue, 01 Sep 2026/.test(feed)) fail("feed: stale lastBuildDate");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== new Set(sitemapUrls).size) fail("sitemap: duplicate URLs");

if (failures.length) {
  console.error(failures.map((item) => `FAIL ${item}`).join("\n"));
  process.exit(1);
}
console.log(`PASS ${htmlFiles.length} HTML pages checked; ${titles.size} unique titles; ${canonicals.size} unique canonicals; internal links, today's metadata/schema/integrations, official sources, visual credits, RSS and sitemap verified.`);
