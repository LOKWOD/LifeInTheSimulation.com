import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pages } from "./content-2026-10-01.mjs";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const published = "2026-10-01";
const publishedHuman = "October 1, 2026";
const pubDate = "Thu, 01 Oct 2026 13:02:00 GMT";
const analytics = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "352a9195ed5342f9a8a9d244e13bddab"}'></script><!-- End Cloudflare Web Analytics -->`;
const visitor = `<!-- LOKWOD Website Visitor Beacon --><script defer src="https://lokwod-visitor-beacon.syracuseappraiser.workers.dev/beacon.js" data-site="life-in-the-simulation"></script><!-- End LOKWOD Website Visitor Beacon -->`;

function words(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"><span></span></div><header class="site-header" data-site-header><a class="brand" href="/" aria-label="Life in the Simulation home"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Field notes from the rendered layer</small></span></a><div class="header-actions"><nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/topics.html">Topics</a><a href="/signals.html">Signals</a><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a></nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span aria-hidden="true">◐</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span><em>Menu</em></button></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Question the defaults. Protect your attention. Live deliberately.</small></span></a><p class="footer-thesis">An independent publication about reality, consciousness, artificial intelligence, attention and the systems between us and the world.</p><div class="footer-nav"><div><strong>Read</strong><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/topics.html">Topics</a></div><div><strong>Reference</strong><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a><a href="/feed.xml">RSS Feed</a><a href="/sitemap.xml">Sitemap</a></div><div><strong>Project</strong><a href="/about.html">About</a><a href="/editorial-policy.html">Editorial Policy</a><a href="/privacy.html">Privacy</a><a href="/humans.txt">Humans.txt</a></div></div></div><div class="footer-bottom"><small>© <span data-year>2026</span> Life in the Simulation.</small><small>No certainty theater. No manufactured urgency. Built for humans.</small></div></footer><script src="/assets/site.js" defer></script>${analytics}\n${visitor}\n`;
}

function render(page) {
  const count = words(page.body);
  const minutes = Math.max(8, Math.ceil(count / 210));
  const canonical = `${siteUrl}/${page.path}`;
  const archivePath = page.type === "essay" ? "/essays.html" : "/field-guides.html";
  const archive = page.type === "essay" ? "Essays" : "Field Guides";
  const related = page.related.map(([href, tag, title, description]) => `<a class="content-card" href="${href}"><div class="card-top"><span class="tag">${tag}</span></div><h3>${title}</h3><p>${description}</p></a>`).join("");
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, articleSection: page.category, datePublished: published, dateModified: published, wordCount: count, mainEntityOfPage: canonical, image: `${siteUrl}${page.image}`, author: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl }, publisher: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl } };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.metaTitle}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}${page.image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${siteUrl}${page.image}"><link rel="stylesheet" href="/assets/style.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="ambient ambient-a" aria-hidden="true"></div><div class="ambient ambient-b" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>${header()}<main id="main"><div class="article-shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><b>/</b><a href="${archivePath}">${archive}</a><b>/</b><span aria-current="page">${page.category}</span></nav><header class="article-hero"><div class="article-code"><span>${page.code}</span><i></i><b>${page.category.toUpperCase()}</b></div><h1>${page.title}</h1><p class="article-dek">${page.dek}</p><div class="article-meta"><span>${minutes} min read</span><span>${count.toLocaleString("en-US")} words</span><span>Published ${publishedHuman}</span><span class="open-status"><i></i> Status: evidence open</span></div></header><div class="article-layout"><aside class="article-rail"><div class="toc-card"><p class="eyebrow">IN THIS ${page.type === "essay" ? "TRANSMISSION" : "FIELD GUIDE"}</p><nav data-toc aria-label="Table of contents"></nav></div></aside><article class="article-body" data-article-body>${page.body}<hr><section class="article-endnote"><p class="eyebrow">END OF ${page.code}</p><h2>Keep the question. Test the model.</h2><p>Choose the narrowest claim the evidence can carry, then leave room for revision.</p></section></article><aside class="article-actions"><div class="action-card"><span>SHARE / SAVE</span><button type="button" data-copy-link>Copy link</button><button type="button" data-print>Print page</button></div><div class="action-card quiet"><span>NEXT THREAD</span><a href="${page.nextHref}">${page.nextLabel} <b>→</b></a></div></aside></div></div><section class="related-section section-pad"><div class="section-heading"><div><p class="eyebrow">CONTINUE THE THREAD</p><h2>Related field notes.</h2></div><a class="text-link" href="${archivePath}">Full archive <span>→</span></a></div><div class="content-grid three">${related}</div></section></main>${footer()}</body></html>`;
}

function upsert(path, marker, block, anchor = "</main>") {
  const full = join(root, path);
  let source = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`, end = `<!-- ${marker} END -->`, wrapped = `${start}\n${block}\n${end}`;
  const re = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (re.test(source)) source = source.replace(re, wrapped);
  else if (source.includes(anchor)) source = source.replace(anchor, `${wrapped}\n${anchor}`);
  else throw new Error(`Anchor ${anchor} not found in ${path}`);
  writeFileSync(full, source);
}

for (const page of pages) {
  const relativeAsset = page.image.replace(/^\//, ""), sourceAsset = resolve(relativeAsset), targetAsset = join(root, relativeAsset);
  mkdirSync(dirname(targetAsset), { recursive: true });
  if (sourceAsset !== targetAsset) copyFileSync(sourceAsset, targetAsset);
  const full = join(root, page.path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}

const [essay, intakeGuide, mouseGuide] = pages;
const card = (page) => `<a class="content-card filter-card" href="/${page.path}" data-category="${page.category.toLowerCase()}" data-search="${page.title.toLowerCase()} ${page.description.toLowerCase()} ${page.category.toLowerCase()}"><div class="card-top"><span class="tag">${page.category}</span><span class="transmission">${page.id}</span></div><h3>${page.title}</h3><p>${page.description}</p><div class="card-meta"><span>${page.type === "essay" ? "Evidence essay" : "Decision guide"}</span><span>${page.type === "essay" ? "Read transmission" : "Open field guide"} <b>↗</b></span></div></a>`;
upsert("essays.html", "DAILY 2026-10-01 ESSAY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST TRANSMISSION</p><h2>Make disclosure usable, traceable and actionable.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("field-guides.html", "DAILY 2026-10-01 GUIDES", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST FIELD GUIDES</p><h2>Design the archive. Fit the pointing device to the workstation.</h2></div></div><div class="content-grid three">${card(intakeGuide)}${card(mouseGuide)}</div></section>`);
upsert("index.html", "DAILY 2026-10-01 HOME", `<section class="latest-section section-pad"><div class="section-heading"><div><p class="eyebrow">NEW FIELD NOTES · OCT 1</p><h2>Make systems legible. Build the paper path. Choose the right pointer.</h2></div><a class="text-link" href="/feed.xml">Follow via RSS <span>→</span></a></div><div class="content-grid three">${card(essay)}${card(intakeGuide)}${card(mouseGuide)}</div></section>`, "<section class=\"guide-spotlight\">");

for (const [file, replacements] of Object.entries({
  "index.html": [[/>\d+<\/dt><dd>Essays/, ">54</dt><dd>Essays"], [/>\d+<\/dt><dd>Field guides/, ">77</dt><dd>Field guides"], [/View all \d+ essays/, "View all 54 essays"]],
  "essays.html": [[/>\d+ \/ Transmissions/, ">54 / Transmissions"], [/>\d+<\/span> transmissions available/, ">54</span> transmissions available"]],
  "field-guides.html": [[/>\d+ \/ Field guides/, ">77 / Field guides"], [/>\d+<\/span> protocols available/, ">77</span> protocols available"]],
})) {
  const full = join(root, file);
  let source = readFileSync(full, "utf8");
  for (const [re, value] of replacements) {
    if (!re.test(source)) throw new Error(`Count anchor ${re} missing in ${file}`);
    source = source.replace(re, value);
  }
  writeFileSync(full, source);
}

upsert("essays/ai-explanation-is-not-the-mechanism.html", "DAILY 2026-10-01 LEGIBILITY", `<div class="article-callout"><strong>Disclosure does not guarantee comprehension</strong><span>Use the <a href="/essays/transparent-is-not-understandable.html">six-layer transparency framework</a> to connect evidence, audience, limits and recourse.</span></div>`, "</article>");
upsert("essays/automation-does-not-remove-responsibility.html", "DAILY 2026-10-01 LEGIBILITY", `<div class="article-callout"><strong>Accountability needs an intelligible path</strong><span>Trace scope, inputs, process, outcome, limits and recourse with the <a href="/essays/transparent-is-not-understandable.html">legibility audit</a>.</span></div>`, "</article>");
upsert("guides/document-scanners-without-the-hype.html", "DAILY 2026-10-01 INTAKE", `<div class="article-callout"><strong>The scanner is one step in the archive</strong><span>Connect capture to OCR, naming, quality control, backup and disposition with the <a href="/guides/paper-to-digital-intake-workflow.html">paper-to-digital intake workflow</a>.</span></div>`, "</article>");
upsert("guides/external-ssd-vs-hard-drive-vs-nas-backup.html", "DAILY 2026-10-01 INTAKE", `<div class="article-callout"><strong>A scan is not preserved until recovery works</strong><span>Use the <a href="/guides/paper-to-digital-intake-workflow.html">paper-to-digital intake protocol</a> to define the authoritative copy and verify an independent backup.</span></div>`, "</article>");
upsert("guides/keyboards-mechanical-scissor-membrane.html", "DAILY 2026-10-01 POINTER", `<div class="article-callout"><strong>The keyboard and pointer share one reach zone</strong><span>Fit both devices together with the <a href="/guides/computer-mice-standard-vertical-trackball.html">standard, vertical and trackball comparison</a>.</span></div>`, "</article>");
upsert("guides/kvm-switch-vs-usb-switch-vs-dock.html", "DAILY 2026-10-01 POINTER", `<div class="article-callout"><strong>Trace the pointer through the whole desk</strong><span>Check connection, software and fallback needs with the <a href="/guides/computer-mice-standard-vertical-trackball.html">computer-mouse buying card</a>.</span></div>`, "</article>");

upsert("topics/ai-knowledge.html", "DAILY 2026-10-01 LEGIBILITY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">SYSTEMS &amp; LEGIBILITY</p><h2>Turn disclosure into an explanation someone can use.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("topics/privacy-security.html", "DAILY 2026-10-01 INTAKE", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">INFORMATION PRACTICE</p><h2>Give every paper record a verified path.</h2></div></div><div class="content-grid three">${card(intakeGuide)}</div></section>`);
upsert("topics/attention-agency.html", "DAILY 2026-10-01 POINTER", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">USEFUL TECHNOLOGY</p><h2>Fit the pointer to the hand, desk and real task.</h2></div></div><div class="content-grid three">${card(mouseGuide)}</div></section>`);

let feed = readFileSync(join(root, "feed.xml"), "utf8")
  .replace(/<lastBuildDate>[^<]+<\/lastBuildDate>/, `<lastBuildDate>${pubDate}</lastBuildDate>`)
  .replace(/^[ \t]*<!-- DAILY 2026-10-01 FEED START -->[\s\S]*?<!-- DAILY 2026-10-01 FEED END -->\n?/gm, "");
const xml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const feedItems = pages.map((page) => `<item><title>${xml(page.title)}</title><link>${siteUrl}/${page.path}</link><guid isPermaLink="true">${siteUrl}/${page.path}</guid><pubDate>${pubDate}</pubDate><category>${xml(page.category)}</category><description>${xml(page.description)}</description></item>`).join("\n");
const feedBlock = `<!-- DAILY 2026-10-01 FEED START -->\n${feedItems}\n<!-- DAILY 2026-10-01 FEED END -->\n`;
const previousMarker = "<!-- DAILY 2026-09-30 FEED START -->";
feed = feed.includes(previousMarker) ? feed.replace(previousMarker, `${feedBlock}    ${previousMarker}`) : feed.replace(/\s*<item>/, `\n${feedBlock}<item>`);
writeFileSync(join(root, "feed.xml"), feed);

const creditPath = join(root, "assets", "visuals", "credits.json");
const credits = existsSync(creditPath) ? JSON.parse(readFileSync(creditPath, "utf8")) : { assets: [] };
credits.generated = published;
for (const page of pages) {
  const item = { path: page.image, creator: "Life in the Simulation Editorial Desk with OpenAI image generation", source: "Original AI-assisted conceptual editorial image generated specifically for this page; not documentary, measurement, archive, product or hands-on test imagery", license: "Copyright Life in the Simulation" };
  const index = credits.assets.findIndex((entry) => entry.path === item.path);
  if (index >= 0) credits.assets[index] = item; else credits.assets.push(item);
}
writeFileSync(creditPath, `${JSON.stringify(credits, null, 2)}\n`);
console.log(`Published ${pages.length} pages for ${published} into ${root}.`);
