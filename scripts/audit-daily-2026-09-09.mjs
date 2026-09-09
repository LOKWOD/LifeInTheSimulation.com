import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || "."), failures = [], htmlFiles = [];
const today = [
  "essays/preference-is-not-a-value.html",
  "guides/how-to-write-an-ai-decision-record.html",
  "guides/paper-shredders-strip-cross-micro-cut.html"
];
const assets = [
  "/assets/visuals/preference-is-not-value-editorial.webp",
  "/assets/visuals/ai-decision-record-editorial.webp",
  "/assets/visuals/paper-shredder-choice-editorial.webp"
];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if ([".git", ".site-bundle", "node_modules"].includes(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full); else if (entry.name.endsWith(".html")) htmlFiles.push(full);
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
const titles = new Map(), canonicals = new Map();
for (const file of htmlFiles) {
  const rel = relative(root, file), html = readFileSync(file, "utf8");
  if (!/<html\b[^>]*\blang=["']en["']/i.test(html)) fail(`${rel}: missing lang=en`);
  if (!/<meta\s+name=["']viewport["']/i.test(html)) fail(`${rel}: missing viewport`);
  if (!/<h1\b/i.test(html) && rel !== "404.html") fail(`${rel}: missing h1`);
  if (!/<\/body>/i.test(html)) fail(`${rel}: missing </body>`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1].trim();
  if (title) { if (titles.has(title)) fail(`duplicate title: ${title} (${titles.get(title)}, ${rel})`); else titles.set(title, rel); }
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1];
  if (canonical) { if (canonicals.has(canonical)) fail(`duplicate canonical: ${canonical}`); else canonicals.set(canonical, rel); }
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) {
    const href = match[1]; if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue;
    const target = targetFor(file, href); if (target && !existsSync(target)) fail(`${rel}: missing internal target ${href}`);
  }
}

for (const rel of today) {
  const full = join(root, rel);
  if (!existsSync(full)) { fail(`${rel}: missing page`); continue; }
  const html = readFileSync(full, "utf8");
  for (const [pattern, label] of [
    [/<meta\s+name="description"/, "description"], [/<link\s+rel="canonical"/, "canonical"],
    [/<meta\s+property="og:title"/, "Open Graph title"], [/<meta\s+property="og:image"/, "Open Graph image"],
    [/<meta\s+name="twitter:card"/, "Twitter card"], [/<script\s+type="application\/ld\+json">/, "JSON-LD"],
    [/data-toc/, "table of contents"], [/static\.cloudflareinsights\.com\/beacon\.min\.js/, "Cloudflare analytics"],
    [/lokwod-visitor-beacon/, "visitor beacon"], [/editorial-byline/, "editorial byline"]
  ]) if (!pattern.test(html)) fail(`${rel}: missing ${label}`);
  if (count(html, /href="\//g) < 8) fail(`${rel}: fewer than three meaningful internal links`);
  if (count(html, /<figure\b/g) !== 1) fail(`${rel}: expected exactly one editorial visual`);
  if (html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length < 1200) fail(`${rel}: page is not substantial enough`);
  if (!/<figcaption>/i.test(html)) fail(`${rel}: visual missing caption`);
  if (count(html, /<img\b/g) !== 1 || !/<img\b[^>]*\balt="[^"]+"/i.test(html)) fail(`${rel}: expected one editorial image with useful alt text`);
  const imageSrc = html.match(/<img\b[^>]*\bsrc="([^"]+)"/i)?.[1];
  const imageFile = imageSrc ? targetFor(full, imageSrc) : null;
  if (!imageFile || !existsSync(imageFile) || statSync(imageFile).size < 20000) fail(`${rel}: missing or implausibly small editorial asset ${imageSrc || "(none)"}`);
  if (/<(?:svg|canvas)\b|data:image\/svg|<table\b[^>]*class="[^"]*(?:chart|comparison)/i.test(html)) fail(`${rel}: chart-like visual markup is not allowed in this batch`);
  for (const json of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(json[1]); } catch (error) { fail(`${rel}: invalid JSON-LD (${error.message})`); } }
  if (/[?&]tag=|amzn\.to|rel="[^"]*sponsored/i.test(html)) fail(`${rel}: unexpected affiliate/tracking markup`);
  const stem = rel.replace(/\.html$/, "").replaceAll("/", "-");
  for (const suffix of ["social.webp", "1x1.webp", "4x3.webp", "16x9.webp"]) if (!existsSync(join(root, "assets", "social", `${stem}-${suffix}`))) fail(`${rel}: missing generated social image ${suffix}`);
}

const feed = readFileSync(join(root, "feed.xml"), "utf8"), sitemap = readFileSync(join(root, "sitemap.xml"), "utf8"), credits = readFileSync(join(root, "assets", "visuals", "credits.json"), "utf8");
if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i.test(feed)) fail("feed: contains an unescaped ampersand");
const siteJs = readFileSync(join(root, "assets", "site.js"), "utf8");
const essaysArchive = readFileSync(join(root, "essays.html"), "utf8"), guidesArchive = readFileSync(join(root, "field-guides.html"), "utf8"), home = readFileSync(join(root, "index.html"), "utf8");
if (!/>36<\/span> transmissions available/.test(essaysArchive)) fail("essays archive: stale result count");
if (!/>41<\/span> protocols available/.test(guidesArchive)) fail("field guides archive: stale result count");
if (!/>36<\/dt><dd>Essays/.test(home) || !/>41<\/dt><dd>Field guides/.test(home)) fail("homepage: stale library counts");
if (!siteJs.includes("const cards = $$('.filter-card');")) fail("archive filter: search/count remains scoped to the legacy card grid");
for (const [directory, archive, expected] of [["essays", essaysArchive, 36], ["guides", guidesArchive, 41]]) {
  const publishedFiles = readdirSync(join(root, directory)).filter((name) => name.endsWith(".html"));
  const linkedFiles = new Set([...archive.matchAll(new RegExp(`href="/${directory}/([^\"]+\\.html)"`, "g"))].map((match) => match[1]));
  if (publishedFiles.length !== expected) fail(`${directory} archive: expected ${expected} files, found ${publishedFiles.length}`);
  if (linkedFiles.size !== expected) fail(`${directory} archive: expected ${expected} unique page links, found ${linkedFiles.size}`);
  for (const file of publishedFiles) if (!linkedFiles.has(file)) fail(`${directory} archive: ${file} is not discoverable`);
  const searchableCards = (archive.match(/class="[^"]*filter-card/g) || []).length;
  if (searchableCards !== expected) fail(`${directory} archive: expected ${expected} searchable cards, found ${searchableCards}`);
}
for (const rel of today) {
  const url = `https://lifeinthesimulation.com/${rel}`;
  if (count(feed, new RegExp(escapeRe(url), "g")) !== 2) fail(`feed: ${url} must appear exactly twice`);
  if (count(sitemap, new RegExp(escapeRe(url), "g")) !== 1) fail(`sitemap: ${url} must appear exactly once`);
}
for (const asset of assets) if (!credits.includes(asset)) fail(`image credits: missing ${asset}`);

for (const host of ["nist.gov", "airc.nist.gov", "oecd.ai"]) if (!readFileSync(join(root, today[0]), "utf8").includes(host)) fail(`${today[0]}: missing authoritative ${host} source`);
for (const host of ["nist.gov", "airc.nist.gov", "nvlpubs.nist.gov"]) if (!readFileSync(join(root, today[1]), "utf8").includes(host)) fail(`${today[1]}: missing authoritative ${host} source`);
for (const host of ["cpsc.gov", "isigmaonline.org", "fellowes.com", "staples.com"]) if (!readFileSync(join(root, today[2]), "utf8").includes(host)) fail(`${today[2]}: missing official ${host} source`);
if (!/Commercial disclosure[\s\S]*non-affiliate references/i.test(readFileSync(join(root, today[2]), "utf8"))) fail(`${today[2]}: missing clear non-affiliate disclosure`);

if (!/<lastBuildDate>Wed, 09 Sep 2026/.test(feed)) fail("feed: stale lastBuildDate");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (sitemapUrls.length !== new Set(sitemapUrls).size) fail("sitemap: duplicate URLs");
for (const [topic, rel] of [["topics/attention-agency.html", today[0]], ["topics/ai-knowledge.html", today[1]], ["topics/privacy-security.html", today[2]]]) if (!readFileSync(join(root, topic), "utf8").includes(`/${rel}`)) fail(`${topic}: missing today's curated link ${rel}`);

if (failures.length) { console.error(failures.map((item) => `FAIL ${item}`).join("\n")); process.exit(1); }
console.log(`PASS ${htmlFiles.length} HTML pages checked; ${titles.size} unique titles; ${canonicals.size} unique canonicals; internal links, today's metadata/schema/integrations, official sources, editorial images, RSS, sitemap and topic discovery verified.`);
