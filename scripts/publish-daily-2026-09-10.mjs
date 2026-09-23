import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pages } from "./content-2026-09-10.mjs";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const published = "2026-09-10";
const publishedHuman = "September 10, 2026";
const pubDate = "Thu, 10 Sep 2026 13:24:00 GMT";
const analytics = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "352a9195ed5342f9a8a9d244e13bddab"}'></script><!-- End Cloudflare Web Analytics -->`;
const visitor = `<!-- LOKWOD Website Visitor Beacon --><script defer src="https://lokwod-visitor-beacon.syracuseappraiser.workers.dev/beacon.js" data-site="life-in-the-simulation"></script><!-- End LOKWOD Website Visitor Beacon -->`;

function words(html) { return html.replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").trim().split(/\s+/).filter(Boolean).length; }
function header() { return `<a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"><span></span></div><header class="site-header" data-site-header><a class="brand" href="/" aria-label="Life in the Simulation home"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Field notes from the rendered layer</small></span></a><div class="header-actions"><nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a></nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span aria-hidden="true">◐</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span><em>Menu</em></button></div></header>`; }
function footer() { return `<footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Question the defaults. Protect your attention. Live deliberately.</small></span></a><p class="footer-thesis">An independent publication about reality, consciousness, artificial intelligence, attention and the systems between us and the world.</p><div class="footer-nav"><div><strong>Read</strong><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a></div><div><strong>Reference</strong><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a><a href="/feed.xml">RSS Feed</a><a href="/sitemap.xml">Sitemap</a></div><div><strong>Project</strong><a href="/about.html">About</a><a href="/privacy.html">Privacy</a><a href="/humans.txt">Humans.txt</a></div></div></div><div class="footer-bottom"><small>© <span data-year>2026</span> Life in the Simulation.</small><small>No certainty theater. No manufactured urgency. Built for humans.</small></div></footer><script src="/assets/site.js" defer></script>${analytics}\n${visitor}\n`; }

function render(page) {
  const count = words(page.body), minutes = Math.max(8, Math.ceil(count / 210)), canonical = `${siteUrl}/${page.path}`;
  const archivePath = page.type === "essay" ? "/essays.html" : "/field-guides.html", archive = page.type === "essay" ? "Essays" : "Field Guides";
  const related = page.related.map(([href, tag, title, description]) => `<a class="content-card" href="${href}"><div class="card-top"><span class="tag">${tag}</span></div><h3>${title}</h3><p>${description}</p></a>`).join("");
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, articleSection: page.category, datePublished: published, dateModified: published, wordCount: count, mainEntityOfPage: canonical, image: `${siteUrl}${page.image}`, author: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl }, publisher: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl } };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.metaTitle}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}${page.image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${siteUrl}${page.image}"><link rel="stylesheet" href="/assets/style.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="ambient ambient-a" aria-hidden="true"></div><div class="ambient ambient-b" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>${header()}<main id="main"><div class="article-shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><b>/</b><a href="${archivePath}">${archive}</a><b>/</b><span aria-current="page">${page.category}</span></nav><header class="article-hero"><div class="article-code"><span>${page.code}</span><i></i><b>${page.category.toUpperCase()}</b></div><h1>${page.title}</h1><p class="article-dek">${page.dek}</p><div class="article-meta"><span>${minutes} min read</span><span>${count.toLocaleString("en-US")} words</span><span>Published ${publishedHuman}</span><span class="open-status"><i></i> Status: evidence open</span></div></header><div class="article-layout"><aside class="article-rail"><div class="toc-card"><p class="eyebrow">IN THIS ${page.type === "essay" ? "TRANSMISSION" : "FIELD GUIDE"}</p><nav data-toc aria-label="Table of contents"></nav></div></aside><article class="article-body" data-article-body>${page.body}<hr><section class="article-endnote"><p class="eyebrow">END OF ${page.code}</p><h2>Keep the question. Test the model.</h2><p>Choose the narrowest claim the evidence can carry, then leave room for revision.</p></section></article><aside class="article-actions"><div class="action-card"><span>SHARE / SAVE</span><button type="button" data-copy-link>Copy link</button><button type="button" data-print>Print page</button></div><div class="action-card quiet"><span>NEXT THREAD</span><a href="${page.nextHref}">${page.nextLabel} <b>→</b></a></div></aside></div></div><section class="related-section section-pad"><div class="section-heading"><div><p class="eyebrow">CONTINUE THE THREAD</p><h2>Related field notes.</h2></div><a class="text-link" href="${archivePath}">Full archive <span>→</span></a></div><div class="content-grid three">${related}</div></section></main>${footer()}</body></html>`;
}

function upsert(path, marker, block, anchor = "</main>") {
  const full = join(root, path); let source = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`, end = `<!-- ${marker} END -->`, wrapped = `${start}\n${block}\n${end}`;
  const re = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (re.test(source)) source = source.replace(re, wrapped); else if (source.includes(anchor)) source = source.replace(anchor, `${wrapped}\n${anchor}`); else throw new Error(`Anchor ${anchor} not found in ${path}`);
  writeFileSync(full, source);
}

for (const page of pages) {
  const relativeAsset = page.image.replace(/^\//, ""), sourceAsset = resolve(relativeAsset), targetAsset = join(root, relativeAsset);
  mkdirSync(dirname(targetAsset), { recursive: true });
  if (sourceAsset !== targetAsset) copyFileSync(sourceAsset, targetAsset);
  const full = join(root, page.path); mkdirSync(dirname(full), { recursive: true }); writeFileSync(full, render(page));
}

const [essay, comparisonGuide, wifiGuide] = pages;
const card = (page) => `<a class="content-card filter-card" href="/${page.path}" data-category="${page.category.toLowerCase()}" data-search="${page.title.toLowerCase()} ${page.description.toLowerCase()} ${page.category.toLowerCase()}"><div class="card-top"><span class="tag">${page.category}</span><span class="transmission">${page.id}</span></div><h3>${page.title}</h3><p>${page.description}</p><div class="card-meta"><span>${page.type === "essay" ? "Evidence essay" : "Decision guide"}</span><span>${page.type === "essay" ? "Read transmission" : "Open field guide"} <b>↗</b></span></div></a>`;
upsert("essays.html", "DAILY 2026-09-10 ESSAY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST TRANSMISSION</p><h2>The unrealized branch is a model, not an observation.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("field-guides.html", "DAILY 2026-09-10 GUIDES", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST FIELD GUIDES</p><h2>Compare the answer. Map the network.</h2></div></div><div class="content-grid three">${card(comparisonGuide)}${card(wifiGuide)}</div></section>`);
upsert("index.html", "DAILY 2026-09-10 HOME", `<section class="latest-section section-pad"><div class="section-heading"><div><p class="eyebrow">NEW FIELD NOTES · SEP 10</p><h2>Model the road not taken. Test the AI answer. Fix the network architecture.</h2></div><a class="text-link" href="/feed.xml">Follow via RSS <span>→</span></a></div><div class="content-grid three">${card(essay)}${card(comparisonGuide)}${card(wifiGuide)}</div></section>`, "<section class=\"guide-spotlight\">");

for (const [file, replacements] of Object.entries({
  "index.html": [[">36</dt><dd>Essays", ">37</dt><dd>Essays"], [">41</dt><dd>Field guides", ">43</dt><dd>Field guides"], ["View all 36 essays", "View all 37 essays"]],
  "essays.html": [[">36 / Transmissions", ">37 / Transmissions"], [">36</span> transmissions available", ">37</span> transmissions available"]],
  "field-guides.html": [[">41 / Field guides", ">43 / Field guides"], [">41</span> protocols available", ">43</span> protocols available"]],
})) {
  const full = join(root, file); let source = readFileSync(full, "utf8");
  for (const [from, to] of replacements) { if (!source.includes(from) && !source.includes(to)) throw new Error(`Count anchor ${from} missing in ${file}`); source = source.replace(from, to); }
  writeFileSync(full, source);
}

upsert("guides/decision-journal.html", "DAILY 2026-09-10 COUNTERFACTUAL", `<div class="article-callout"><strong>Do not let the outcome write the alternate history</strong><span>Read <a href="/essays/counterfactual-is-not-an-alternate-reality.html">A Counterfactual Is Not an Alternate Reality</a> to separate observed outcomes, causal assumptions and modeled alternatives.</span></div>`, "</article>");
upsert("guides/how-to-verify-an-ai-citation.html", "DAILY 2026-09-10 COMPARE AI", `<div class="article-callout"><strong>Turn source checking into a fair comparison</strong><span>Use <a href="/guides/how-to-compare-two-ai-answers.html">How to Compare Two AI Answers Without Voting by Vibe</a> to score task completion, support, omissions and failure cost.</span></div>`, "</article>");
upsert("guides/private-dns-quad9-cloudflare-nextdns.html", "DAILY 2026-09-10 HOME WIFI", `<div class="article-callout"><strong>Fix the radio path before changing the resolver</strong><span>Use <a href="/guides/home-wifi-router-vs-mesh-vs-access-points.html">Home Wi-Fi Without the Hype</a> to choose one router, mesh or wired access points by measured coverage and wiring.</span></div>`, "</article>");

let feed = readFileSync(join(root, "feed.xml"), "utf8").replace(/<lastBuildDate>[^<]+<\/lastBuildDate>/, `<lastBuildDate>${pubDate}</lastBuildDate>`).replace(/<!-- DAILY 2026-09-10 FEED START -->[\s\S]*?<!-- DAILY 2026-09-10 FEED END -->\n?/g, "");
const xml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const feedItems = pages.map((page) => `<item><title>${xml(page.title)}</title><link>${siteUrl}/${page.path}</link><guid isPermaLink="true">${siteUrl}/${page.path}</guid><pubDate>${pubDate}</pubDate><category>${xml(page.category)}</category><description>${xml(page.description)}</description></item>`).join("\n");
const feedBlock = `<!-- DAILY 2026-09-10 FEED START -->\n${feedItems}\n<!-- DAILY 2026-09-10 FEED END -->\n`;
feed = feed.includes("<!-- DAILY 2026-09-09 FEED START -->") ? feed.replace("<!-- DAILY 2026-09-09 FEED START -->", `${feedBlock}    <!-- DAILY 2026-09-09 FEED START -->`) : feed.replace(/\s*<item>/, `\n${feedBlock}<item>`);
writeFileSync(join(root, "feed.xml"), feed);

const creditPath = join(root, "assets", "visuals", "credits.json"), credits = existsSync(creditPath) ? JSON.parse(readFileSync(creditPath, "utf8")) : { assets: [] };
credits.generated = published;
for (const page of pages) {
  const item = { path: page.image, creator: "Life in the Simulation Editorial Desk with OpenAI image generation", source: "Original AI-assisted editorial photograph generated specifically for this page", license: "Copyright Life in the Simulation" };
  const i = credits.assets.findIndex((entry) => entry.path === item.path); if (i >= 0) credits.assets[i] = item; else credits.assets.push(item);
}
writeFileSync(creditPath, `${JSON.stringify(credits, null, 2)}\n`);
console.log(`Published ${pages.length} pages for ${published} into ${root}.`);
