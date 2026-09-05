import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pages } from "./content-2026-09-05.mjs";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const published = "2026-09-05";
const publishedHuman = "September 5, 2026";
const pubDate = "Sat, 05 Sep 2026 13:30:00 GMT";
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

// The original archive filter was scoped to the first legacy card grid, so
// JavaScript replaced the true archive totals with 12 essays or 7 guides and
// could not search later publication sections. Filter every archive card on
// archive pages; the setup block still runs only when the archive controls exist.
{
  const siteJsPath = join(root, "assets", "site.js");
  let siteJs = readFileSync(siteJsPath, "utf8");
  const scoped = "const cards = $$('.filter-card', filterContainer);";
  const global = "const cards = $$('.filter-card');";
  // A function replacement preserves the literal `$$`; replacement-string
  // syntax would collapse it to a single dollar sign.
  if (siteJs.includes(scoped)) siteJs = siteJs.replace(scoped, () => global);
  else if (!siteJs.includes(global)) throw new Error("Archive filter card scope anchor missing in assets/site.js");
  writeFileSync(siteJsPath, siteJs);
}

const [essay, citationGuide, backupGuide] = pages;
const card = (page) => `<a class="content-card filter-card" href="/${page.path}" data-category="${page.category.toLowerCase()}" data-search="${page.title.toLowerCase()} ${page.description.toLowerCase()} ${page.category.toLowerCase()}"><div class="card-top"><span class="tag">${page.category}</span><span class="transmission">${page.id}</span></div><h3>${page.title}</h3><p>${page.description}</p><div class="card-meta"><span>${page.type === "essay" ? "Evidence essay" : "Decision guide"}</span><span>${page.type === "essay" ? "Read transmission" : "Open field guide"} <b>↗</b></span></div></a>`;
upsert("essays.html", "DAILY 2026-09-05 ESSAY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST TRANSMISSION</p><h2>Keep the benchmark inside its boundary.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("field-guides.html", "DAILY 2026-09-05 GUIDES", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST FIELD GUIDES</p><h2>Verify the citation. Prove the recovery.</h2></div></div><div class="content-grid three">${card(citationGuide)}${card(backupGuide)}</div></section>`);

// Two original expansion generators created sixteen substantial pages but their
// archive blocks were later overwritten by a base-site regeneration. Restore
// those exact pages to the searchable archives so the visible totals describe
// pages a reader can actually discover, not merely files counted on disk.
const restoredEssays = [
  ["essays/friction-is-a-feature.html", "Friction Is a Feature", "Why effort, waiting, limits and inconvenience sometimes protect judgment, commitment and meaning rather than merely slowing a system down.", "Systems", "T-014"],
  ["essays/search-before-wonder.html", "Search Before Wonder", "How immediate search changes curiosity, memory and the experience of not knowing by replacing questions with answers before they can develop.", "Practice", "T-011"],
  ["essays/the-comfort-of-predictable-algorithms.html", "The Comfort of Predictable Algorithms", "Why recommendation systems feel safe, how personalization narrows surprise and what is lost when preference becomes an environment.", "Systems", "T-009"],
  ["essays/the-intimacy-of-machines.html", "The Intimacy of Machines", "Why devices can feel attentive, private and emotionally safe—and what changes when synthetic responsiveness begins competing with human relationship.", "Mind", "T-010"],
  ["essays/the-scoreboard-self.html", "The Scoreboard Self", "What happens when health, work, money, popularity and identity are experienced primarily through dashboards and performance numbers.", "Systems", "T-012"],
  ["essays/when-everything-is-content.html", "When Everything Becomes Content", "What changes when every meal, trip, argument, child, hobby and private moment is evaluated for its usefulness as content.", "Attention", "T-007"],
  ["essays/why-boredom-feels-dangerous.html", "Why Boredom Feels Dangerous Now", "How constant stimulation trains discomfort with empty moments and why boredom can reopen memory, creativity, emotion and self-direction.", "Attention", "T-013"],
  ["essays/why-time-feels-faster-online.html", "Why Time Feels Faster Online", "How infinite feeds, weak memory landmarks, context switching and compressed novelty can make hours disappear and weeks feel thin.", "Attention", "T-008"],
];
const restoredGuides = [
  ["guides/analog-saturday-protocol.html", "The Analog Saturday Protocol", "A practical one-day protocol for reducing optional screens while preserving navigation, family contact, photography and emergency access.", "Attention", "G-009"],
  ["guides/deep-work-field-manual.html", "The Deep Work Field Manual", "Create repeatable high-focus work blocks using a defined output, prepared environment, distraction capture, shutdown notes and realistic recovery.", "Attention", "G-011"],
  ["guides/digital-environment-reset.html", "The Digital Environment Reset", "A practical reset for notifications, home screens, feeds, subscriptions, files and devices that reduces noise without requiring total disconnection.", "Attention", "G-004"],
  ["guides/personal-data-minimization.html", "Personal Data Minimization for Ordinary People", "Reduce unnecessary personal data exposure by inventorying accounts, tightening permissions, deleting stale records and changing defaults without chasing perfect anonymity.", "Clarity", "G-010"],
  ["guides/personal-information-diet.html", "Build a Personal Information Diet", "Design a deliberate information diet with source tiers, scheduled news, primary documents, slow analysis and an intake limit that protects understanding.", "Clarity", "G-008"],
  ["guides/rebuild-a-private-inner-life.html", "Rebuild a Private Inner Life", "A field guide to thinking, reading, making and remembering without immediately turning the experience into a post, position or performance.", "Practice", "G-005"],
  ["guides/thirty-day-attention-experiment.html", "The 30-Day Attention Experiment", "A month-long attention experiment using measurement, notification control, bounded media, deep-work blocks and weekly review without requiring total disconnection.", "Attention", "G-007"],
  ["guides/weekly-reality-check.html", "The Weekly Reality Check", "A 30-minute weekly review that compares dashboards, intentions and online narratives with the physical facts of work, money, health, relationships and time.", "Clarity", "G-006"],
];
const restoredCard = ([path, title, description, category, id], type) => card({ path, title, description, category, id, type });
upsert("essays.html", "RESTORED COMPLETE ESSAY ARCHIVE", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">FOUNDATIONAL TRANSMISSIONS</p><h2>Earlier field notes, restored to the archive.</h2></div></div><div class="content-grid three">${restoredEssays.map((item) => restoredCard(item, "essay")).join("")}</div></section>`);
upsert("field-guides.html", "RESTORED COMPLETE GUIDE ARCHIVE", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">FOUNDATIONAL FIELD GUIDES</p><h2>Earlier protocols, restored to the archive.</h2></div></div><div class="content-grid three">${restoredGuides.map((item) => restoredCard(item, "guide")).join("")}</div></section>`);
upsert("index.html", "DAILY 2026-09-05 HOME", `<section class="latest-section section-pad"><div class="section-heading"><div><p class="eyebrow">NEW FIELD NOTES · SEP 5</p><h2>Read the test. Verify the source. Restore the copy.</h2></div><a class="text-link" href="/feed.xml">Follow via RSS <span>→</span></a></div><div class="content-grid three">${card(essay)}${card(citationGuide)}${card(backupGuide)}</div></section>`, "<section class=\"guide-spotlight\">");

for (const [file, replacements] of Object.entries({
  "index.html": [[">32</dt><dd>Essays", ">33</dt><dd>Essays"], [">33</dt><dd>Field guides", ">35</dt><dd>Field guides"], ["View all 32 essays", "View all 33 essays"]],
  "essays.html": [[">32 / Transmissions", ">33 / Transmissions"], [">32</span> transmissions available", ">33</span> transmissions available"]],
  "field-guides.html": [[">33 / Field guides", ">35 / Field guides"], [">33</span> protocols available", ">35</span> protocols available"]],
})) { const full = join(root, file); let source = readFileSync(full, "utf8"); for (const [from, to] of replacements) { if (!source.includes(from) && !source.includes(to)) throw new Error(`Count anchor ${from} missing in ${file}`); source = source.replace(from, to); } writeFileSync(full, source); }

upsert("essays/ai-accuracy-is-not-understanding.html", "DAILY 2026-09-05 BENCHMARKS", `<div class="article-callout"><strong>A score still needs a boundary</strong><span>Read <a href="/essays/ai-benchmark-is-not-the-real-world.html">An AI Benchmark Is Not the Real World</a> before turning a fixed test result into a deployment claim.</span></div>`, "</article>");
upsert("guides/how-to-read-a-scientific-paper.html", "DAILY 2026-09-05 CITATIONS", `<div class="article-callout"><strong>Verify identity before interpreting evidence</strong><span>Use <a href="/guides/how-to-verify-an-ai-citation.html">How to Verify an AI Citation Before You Use It</a> to confirm the record, claim and document status.</span></div>`, "</article>");
upsert("guides/encrypted-cloud-storage-proton-tresorit-cryptomator.html", "DAILY 2026-09-05 BACKUPS", `<div class="article-callout"><strong>The cloud copy is one layer</strong><span>Compare it with local SSD, hard-drive and NAS workflows in <a href="/guides/external-ssd-vs-hard-drive-vs-nas-backup.html">External SSD vs Hard Drive vs NAS</a>.</span></div>`, "</article>");

let feed = readFileSync(join(root, "feed.xml"), "utf8").replace(/<lastBuildDate>[^<]+<\/lastBuildDate>/, `<lastBuildDate>${pubDate}</lastBuildDate>`).replace(/<!-- DAILY 2026-09-05 FEED START -->[\s\S]*?<!-- DAILY 2026-09-05 FEED END -->\n?/g, "");
const feedItems = pages.map((page) => `<item><title>${page.title.replace(/&/g, "&amp;")}</title><link>${siteUrl}/${page.path}</link><guid isPermaLink="true">${siteUrl}/${page.path}</guid><pubDate>${pubDate}</pubDate><category>${page.category.replace(/&/g, "&amp;")}</category><description>${page.description.replace(/&/g, "&amp;")}</description></item>`).join("\n");
const feedBlock = `<!-- DAILY 2026-09-05 FEED START -->\n${feedItems}\n<!-- DAILY 2026-09-05 FEED END -->\n`;
feed = feed.includes("<!-- DAILY 2026-09-04 FEED START -->") ? feed.replace("<!-- DAILY 2026-09-04 FEED START -->", `${feedBlock}    <!-- DAILY 2026-09-04 FEED START -->`) : feed.replace(/\s*<item>/, `\n${feedBlock}<item>`);
writeFileSync(join(root, "feed.xml"), feed);

let sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const path of ["", "essays.html", "field-guides.html"]) { const url = `${siteUrl}/${path}`, re = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc><lastmod>)[^<]+`); sitemap = sitemap.replace(re, `$1${published}`); }
sitemap = sitemap.replace(/\s*<!-- DAILY 2026-09-05 SITEMAP START -->[\s\S]*?<!-- DAILY 2026-09-05 SITEMAP END -->\s*/g, "");
const urls = pages.map((page) => `<url><loc>${siteUrl}/${page.path}</loc><lastmod>${published}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `\n<!-- DAILY 2026-09-05 SITEMAP START -->\n${urls}\n<!-- DAILY 2026-09-05 SITEMAP END -->\n</urlset>`);
writeFileSync(join(root, "sitemap.xml"), sitemap);

let llms = readFileSync(join(root, "llms.txt"), "utf8").replace(/\n?## Daily publication 2026-09-05[\s\S]*?(?=\n## |$)/g, "");
llms += `\n\n## Daily publication 2026-09-05\n${pages.map((page) => `- ${page.title}: ${siteUrl}/${page.path}`).join("\n")}\n`;
writeFileSync(join(root, "llms.txt"), llms);

const creditPath = join(root, "assets", "visuals", "credits.json"), credits = existsSync(creditPath) ? JSON.parse(readFileSync(creditPath, "utf8")) : { assets: [] };
credits.generated = published;
for (const page of pages) { const item = { path: page.image, creator: "Life in the Simulation Editorial Desk with OpenAI image generation", source: "Original editorial photographic image generated for this page", license: "Copyright Life in the Simulation" }, i = credits.assets.findIndex((x) => x.path === item.path); if (i >= 0) credits.assets[i] = item; else credits.assets.push(item); }
writeFileSync(creditPath, `${JSON.stringify(credits, null, 2)}\n`);
console.log(`Published ${pages.length} pages for ${published} into ${root}.`);
