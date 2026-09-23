import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const SITE = "https://lifeinthesimulation.com";
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
const clean = value => value.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
const attr = (tag, name) => (tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i")) || [," "])[1].trim();
const schemas = html => [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].flatMap(match => { try { return [JSON.parse(match[1])]; } catch { return []; } });
const canonicalFor = rel => rel === "index.html" ? `${SITE}/` : `${SITE}/${rel}`;
const htmlFiles = walk(root).filter(file => file.endsWith(".html") && path.relative(root, file).split(path.sep).join("/") !== "404.html");
const titles = new Map();
const descriptions = new Map();
const canonicals = new Set();

for (const file of htmlFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  const title = clean((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [,""])[1]);
  const description = attr((html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*>/i) || [""])[0], "content");
  const canonical = attr((html.match(/<link\b(?=[^>]*rel=["']canonical["'])[^>]*>/i) || [""])[0], "href");
  const h1s = [...html.matchAll(/<h1\b[^>]*>/gi)];
  const social = attr((html.match(/<meta\b(?=[^>]*property=["']og:image["'])[^>]*>/i) || [""])[0], "content");
  const twitter = attr((html.match(/<meta\b(?=[^>]*name=["']twitter:image["'])[^>]*>/i) || [""])[0], "content");

  check(/^<!doctype html>/i.test(html), `${rel}: missing doctype`);
  check(/<html\b[^>]*lang=["']en["']/i.test(html), `${rel}: missing English lang attribute`);
  check(h1s.length === 1, `${rel}: expected one H1, found ${h1s.length}`);
  check(title.length > 15 && title.length <= 65, `${rel}: title length ${title.length}`);
  check(description.length >= 110 && description.length <= 165, `${rel}: description length ${description.length}`);
  check(canonical === canonicalFor(rel), `${rel}: canonical is not the exact public URL`);
  check(!canonicals.has(canonical), `${rel}: duplicate canonical ${canonical}`);
  canonicals.add(canonical);
  check(!titles.has(title), `${rel}: duplicate title with ${titles.get(title)}`);
  titles.set(title, rel);
  check(!descriptions.has(description), `${rel}: duplicate description with ${descriptions.get(description)}`);
  descriptions.set(description, rel);
  check(attr((html.match(/<meta\b(?=[^>]*property=["']og:title["'])[^>]*>/i) || [""])[0], "content"), `${rel}: missing og:title`);
  check(attr((html.match(/<meta\b(?=[^>]*property=["']og:description["'])[^>]*>/i) || [""])[0], "content") === description, `${rel}: og:description mismatch`);
  check(attr((html.match(/<meta\b(?=[^>]*property=["']og:url["'])[^>]*>/i) || [""])[0], "content") === canonical, `${rel}: og:url mismatch`);
  check(social === twitter && social.endsWith("-social.webp"), `${rel}: social image tags are incomplete or inconsistent`);
  if (social.startsWith(SITE)) check(fs.existsSync(path.join(root, social.slice(SITE.length + 1))), `${rel}: social image file does not exist`);
  check(attr((html.match(/<meta\b(?=[^>]*name=["']twitter:card["'])[^>]*>/i) || [""])[0], "content") === "summary_large_image", `${rel}: Twitter card is not summary_large_image`);
  check(/<link\b(?=[^>]*rel=["']alternate["'])(?=[^>]*type=["']application\/rss\+xml["'])[^>]*>/i.test(html), `${rel}: missing RSS discovery link`);
  check(/href=["']\/editorial-policy\.html["']/.test(html), `${rel}: editorial policy is not linked`);
  check(!/assets\/social-card\.svg/.test(html), `${rel}: still uses generic SVG social card`);

  for (const img of html.match(/<img\b[^>]*>/gi) || []) {
    check(/\balt=["'][^"']*["']/i.test(img), `${rel}: image missing alt attribute`);
    check(/\bwidth=["']\d+["']/i.test(img) && /\bheight=["']\d+["']/i.test(img), `${rel}: image missing intrinsic dimensions`);
  }

  const pageSchemas = schemas(html);
  const article = rel.startsWith("essays/") || rel.startsWith("guides/");
  if (article) {
    const data = pageSchemas.find(item => item?.["@type"] === "Article");
    const breadcrumb = pageSchemas.find(item => item?.["@type"] === "BreadcrumbList");
    check(Boolean(data), `${rel}: missing Article schema`);
    check(Boolean(breadcrumb) && breadcrumb.itemListElement?.length === 3, `${rel}: missing full BreadcrumbList`);
    if (data) {
      for (const field of ["headline", "description", "articleSection", "datePublished", "dateModified", "wordCount", "mainEntityOfPage", "image", "author", "publisher"]) check(Boolean(data[field]), `${rel}: Article schema missing ${field}`);
      check(/[+-]\d{2}:\d{2}$/.test(data.datePublished || "") && /[+-]\d{2}:\d{2}$/.test(data.dateModified || ""), `${rel}: Article dates lack timezone`);
      check(data.wordCount >= 400, `${rel}: article is too thin (${data.wordCount} words)`);
      check(attr((html.match(/<meta\b(?=[^>]*property=["']article:published_time["'])[^>]*>/i) || [""])[0], "content") === data.datePublished, `${rel}: article:published_time mismatch`);
      check(attr((html.match(/<meta\b(?=[^>]*property=["']article:modified_time["'])[^>]*>/i) || [""])[0], "content") === data.dateModified, `${rel}: article:modified_time mismatch`);
      check(data.author?.name === "Life in the Simulation Editorial Desk" && data.author?.url === `${SITE}/editorial-policy.html`, `${rel}: author identity is incomplete`);
      check(data.publisher?.logo?.width >= 112 && data.publisher?.logo?.height >= 112, `${rel}: publisher logo is incomplete`);
      check(Array.isArray(data.image) && data.image.length === 3, `${rel}: Article image ratios are incomplete`);
      for (const image of data.image || []) if (image.startsWith(SITE)) check(fs.existsSync(path.join(root, image.slice(SITE.length + 1))), `${rel}: Article image does not exist: ${image}`);
    }
    check(/class=["'][^"']*editorial-byline/.test(html) && /rel=["']author["']/.test(html), `${rel}: visible author byline is missing`);
    check(/class=["'][^"']*topic-trail/.test(html), `${rel}: topic trail is missing`);
  }
}

for (const archive of ["essays.html", "field-guides.html"]) {
  const html = fs.readFileSync(path.join(root, archive), "utf8");
  const matches = [...html.matchAll(/<a\b[^>]*href=["']([^"']+\/(?:essays|guides)\/[^"']+|\/?(?:essays|guides)\/[^"']+)["'][^>]*>/gi)].map(match => match[1].replace(/^\.\.\//, "/").replace(/^([^/])/, "/$1"));
  const duplicates = [...new Set(matches.filter((href, index) => matches.indexOf(href) !== index))];
  check(duplicates.length === 0, `${archive}: duplicate archive links: ${duplicates.join(", ")}`);
  check(!/SIMULATION .*EXPANSION START/.test(html), `${archive}: obsolete duplicate expansion block remains`);
}

for (const file of htmlFiles) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/i.test(raw)) continue;
    const cleanUrl = raw.split(/[?#]/)[0];
    let target;
    if (cleanUrl === "/") target = path.join(root, "index.html");
    else if (cleanUrl.startsWith("/")) target = path.join(root, cleanUrl.slice(1));
    else target = path.resolve(path.dirname(file), cleanUrl);
    check(fs.existsSync(target), `${rel}: broken local reference ${raw}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
check(sitemapUrls.length === canonicals.size, `sitemap has ${sitemapUrls.length} URLs; expected ${canonicals.size}`);
for (const canonical of canonicals) check(sitemapUrls.includes(canonical), `sitemap missing ${canonical}`);
check(new Set(sitemapUrls).size === sitemapUrls.length, "sitemap contains duplicate URLs");

const llms = fs.readFileSync(path.join(root, "llms.txt"), "utf8");
for (const canonical of canonicals) check(llms.includes(`](${canonical})`), `llms.txt missing Markdown link to ${canonical}`);
check(!/^https?:\/\//m.test(llms), "llms.txt contains unlabelled raw URL lines");

const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
check(robots.includes(`${SITE}/sitemap.xml`), "robots.txt does not advertise the canonical sitemap");
const css = fs.readFileSync(path.join(root, "assets/style.css"), "utf8");
check(/--faint:#(?:7f8b9c|[89a-f][0-9a-f]{5})/i.test(css), "dark-theme faint text color has not been raised for contrast");

if (failures.length) {
  console.error(`SEO audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`SEO audit passed: ${htmlFiles.length} indexable pages, ${canonicals.size} canonicals, complete metadata/schema, no broken local references.`);
