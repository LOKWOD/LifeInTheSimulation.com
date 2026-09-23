import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";

const root = resolve(process.argv[2] || "."), failures = [], htmlFiles = [];
const today = [
  "essays/brain-scan-is-not-a-thought.html",
  "guides/how-to-separate-claim-evidence-inference.html",
  "guides/usb-c-cables-charge-data-video.html"
];
const assets = [
  "/assets/visuals/brain-scan-measurement-editorial.webp",
  "/assets/visuals/claim-evidence-inference-editorial.webp",
  "/assets/visuals/usb-c-cable-capabilities-editorial.webp"
];

function walk(dir) { for (const entry of readdirSync(dir, { withFileTypes: true })) { if ([".git", ".site-bundle", "node_modules"].includes(entry.name)) continue; const full = join(dir, entry.name); if (entry.isDirectory()) walk(full); else if (entry.name.endsWith(".html")) htmlFiles.push(full); } }
function fail(message) { failures.push(message); }
function count(text, re) { return [...text.matchAll(re)].length; }
function escapeRe(text) { return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function targetFor(file, href) { const clean = href.split("#")[0].split("?")[0]; if (!clean) return null; if (clean.startsWith("/")) return join(root, clean === "/" ? "index.html" : clean.slice(1)); return resolve(dirname(file), clean); }

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
  for (const match of html.matchAll(/\shref=["']([^"']+)["']/gi)) { const href = match[1]; if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(href)) continue; const target = targetFor(file, href); if (target && !existsSync(target)) fail(`${rel}: missing internal target ${href}`); }
}

for (const rel of today) {
  const full = join(root, rel); if (!existsSync(full)) { fail(`${rel}: missing page`); continue; }
  const html = readFileSync(full, "utf8");
  for (const [pattern, label] of [[/<meta\s+name="description"/, "description"], [/<link\s+rel="canonical"/, "canonical"], [/<meta\s+property="og:title"/, "Open Graph title"], [/<meta\s+property="og:image"/, "Open Graph image"], [/<meta\s+name="twitter:card"/, "Twitter card"], [/<script\s+type="application\/ld\+json">/, "JSON-LD"], [/data-toc/, "table of contents"], [/static\.cloudflareinsights\.com\/beacon\.min\.js/, "Cloudflare analytics"], [/lokwod-visitor-beacon/, "visitor beacon"], [/editorial-byline/, "editorial byline"]]) if (!pattern.test(html)) fail(`${rel}: missing ${label}`);
  if (count(html, /href="\//g) < 8) fail(`${rel}: fewer than three meaningful internal links`);
  if (count(html, /<figure\b/g) !== 1) fail(`${rel}: expected exactly one editorial visual`);
  if (html.replace(/<[^>]+>/g, " ").trim().split(/\s+/).length < 1200) fail(`${rel}: page is not substantial enough`);
  if (!/<figcaption>/i.test(html)) fail(`${rel}: visual missing caption`);
  if (count(html, /<img\b/g) !== 1 || !/<img\b[^>]*\balt="[^"]+"/i.test(html)) fail(`${rel}: expected one editorial image with useful alt text`);
  const imageSrc = html.match(/<img\b[^>]*\bsrc="([^"]+)"/i)?.[1], imageFile = imageSrc ? targetFor(full, imageSrc) : null;
  if (!imageFile || !existsSync(imageFile) || statSync(imageFile).size < 20000) fail(`${rel}: missing or implausibly small editorial asset ${imageSrc || "(none)"}`);
  for (const json of html.matchAll(/<script\s+type="application\/ld\+json">([\s\S]*?)<\/script>/g)) { try { JSON.parse(json[1]); } catch (error) { fail(`${rel}: invalid JSON-LD (${error.message})`); } }
  if (/[?&]tag=|amzn\.to|rel="[^"]*sponsored/i.test(html)) fail(`${rel}: unexpected affiliate/tracking markup`);
  const stem = rel.replace(/\.html$/, "").replaceAll("/", "-");
  for (const suffix of ["social.webp", "1x1.webp", "4x3.webp", "16x9.webp"]) if (!existsSync(join(root, "assets", "social", `${stem}-${suffix}`))) fail(`${rel}: missing generated social image ${suffix}`);
}

const feed = readFileSync(join(root, "feed.xml"), "utf8"), sitemap = readFileSync(join(root, "sitemap.xml"), "utf8"), credits = readFileSync(join(root, "assets", "visuals", "credits.json"), "utf8");
if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9a-f]+;)/i.test(feed)) fail("feed: contains an unescaped ampersand");
const essaysArchive = readFileSync(join(root, "essays.html"), "utf8"), guidesArchive = readFileSync(join(root, "field-guides.html"), "utf8"), home = readFileSync(join(root, "index.html"), "utf8");
if (!/>44<\/span> transmissions available/.test(essaysArchive)) fail("essays archive: stale result count");
if (!/>57<\/span> protocols available/.test(guidesArchive)) fail("field guides archive: stale result count");
if (!/>44<\/dt><dd>Essays/.test(home) || !/>57<\/dt><dd>Field guides/.test(home)) fail("homepage: stale library counts");
for (const [directory, archive, expected] of [["essays", essaysArchive, 44], ["guides", guidesArchive, 57]]) { const publishedFiles = readdirSync(join(root, directory)).filter((name) => name.endsWith(".html")); const linkedFiles = new Set([...archive.matchAll(new RegExp(`href="/${directory}/([^\"]+\\.html)"`, "g"))].map((match) => match[1])); if (publishedFiles.length !== expected) fail(`${directory} archive: expected ${expected} files, found ${publishedFiles.length}`); if (linkedFiles.size !== expected) fail(`${directory} archive: expected ${expected} unique page links, found ${linkedFiles.size}`); for (const file of publishedFiles) if (!linkedFiles.has(file)) fail(`${directory} archive: ${file} is not discoverable`); }
for (const rel of today) { const url = `https://lifeinthesimulation.com/${rel}`; if (count(feed, new RegExp(escapeRe(url), "g")) !== 2) fail(`feed: ${url} must appear exactly twice`); if (count(sitemap, new RegExp(escapeRe(url), "g")) !== 1) fail(`sitemap: ${url} must appear exactly once`); }
for (const asset of assets) if (!credits.includes(asset)) fail(`image credits: missing ${asset}`);

for (const host of ["nibib.nih.gov", "pubmed.ncbi.nlm.nih.gov", "ncbi.nlm.nih.gov"]) if (!readFileSync(join(root, today[0]), "utf8").includes(host)) fail(`${today[0]}: missing authoritative ${host} source`);
for (const host of ["nationalacademies.org", "nist.gov", "training.cochrane.org"]) if (!readFileSync(join(root, today[1]), "utf8").includes(host)) fail(`${today[1]}: missing authoritative ${host} source`);
for (const host of ["usb.org", "intel.com"]) if (!readFileSync(join(root, today[2]), "utf8").includes(host)) fail(`${today[2]}: missing official ${host} source`);
if (!/Commercial disclosure:[\s\S]*no paid product links[\s\S]*non-affiliate links/i.test(readFileSync(join(root, today[2]), "utf8"))) fail(`${today[2]}: missing non-affiliate disclosure`);
if (!/<lastBuildDate>Sat, 19 Sep 2026/.test(feed)) fail("feed: stale lastBuildDate");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]); if (sitemapUrls.length !== new Set(sitemapUrls).size) fail("sitemap: duplicate URLs");
for (const [hub, rel] of [["topics/simulation-theory.html", today[0]], ["topics/ai-knowledge.html", today[1]], ["topics/privacy-security.html", today[2]]]) if (!readFileSync(join(root, hub), "utf8").includes(`/${rel}`)) fail(`${hub}: missing ${rel}`);
for (const [rel, hub] of [[today[0], "/topics/simulation-theory.html"], [today[1], "/topics/ai-knowledge.html"], [today[2], "/topics/privacy-security.html"]]) if (!readFileSync(join(root, rel), "utf8").includes(`<aside class="topic-trail"><span>CONTINUE BY TOPIC</span><a href="${hub}">`)) fail(`${rel}: incorrect topic trail`);
for (const [source, target] of [["essays/observer-effect-does-not-mean-consciousness-creates-reality.html", today[0]], ["guides/how-to-read-a-scientific-paper.html", today[1]], ["guides/how-to-verify-an-ai-citation.html", today[1]], ["guides/usb-c-hub-vs-thunderbolt-dock-vs-monitor-dock.html", today[2]], ["guides/kvm-switch-vs-usb-switch-vs-dock.html", today[2]]]) if (!readFileSync(join(root, source), "utf8").includes(`/${target}`)) fail(`${source}: missing reciprocal link to ${target}`);

if (failures.length) { console.error(failures.map((item) => `FAIL ${item}`).join("\n")); process.exit(1); }
console.log(`PASS ${htmlFiles.length} HTML pages checked; ${titles.size} unique titles; ${canonicals.size} unique canonicals; today's substantial pages, metadata, schema, sources, editorial images, reciprocal links, RSS, sitemap and topic discovery verified.`);
