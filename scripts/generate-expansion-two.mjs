import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { pagesA } from "./expansion-two-pages-a.mjs";
import { pagesB } from "./expansion-two-pages-b.mjs";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const pages = [...pagesA, ...pagesB];
const esc = (value) => String(value).replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));

function render(page) {
  const canonical = `${siteUrl}/${page.path}`;
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: canonical, dateModified: "2026-08-17", author: { "@type": "Organization", name: "Life in the Simulation" }, publisher: { "@type": "Organization", name: "Life in the Simulation" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const sections = page.sections.map(([heading, paragraphs]) => `<h2>${esc(heading)}</h2>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
  const items = (page.type === "guide" ? page.checklist : page.reflection).map((item) => `<li>${esc(item)}</li>`).join("");
  const faq = page.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  const back = page.type === "guide" ? "../field-guides.html" : "../essays.html";
  const listTitle = page.type === "guide" ? "Field checklist" : "Questions to keep";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)} | Life in the Simulation</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="../assets/style.css"><style>.article .lead{font-size:1.25rem;line-height:1.75}.field-panel{padding:1.2rem 1.4rem;border:1px solid var(--line,#29313c);margin:2rem 0}.field-panel li{margin:.65rem 0;line-height:1.6}.article details{padding:1rem 0;border-bottom:1px solid var(--line,#29313c)}.article summary{cursor:pointer;font-weight:700}</style><script type="application/ld+json">${JSON.stringify(articleSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><header class="site-header"><a class="brand" href="../index.html"><span class="mark">L//S</span><span>Life in the Simulation</span></a><nav><a href="../essays.html">Essays</a><a href="../field-guides.html">Field Guides</a><a href="../about.html">About</a></nav></header><main><article class="article"><p class="eyebrow">${esc(page.signal)}</p><h1>${esc(page.title)}</h1><p class="meta">Updated August 17, 2026 · ${page.type === "guide" ? "Practical field guide" : "Long-form essay"}</p><p class="lead">${esc(page.lead)}</p>${sections}<section class="field-panel"><h2>${listTitle}</h2><ul>${items}</ul></section><section><h2>Frequently asked questions</h2>${faq}</section><hr><p><a class="button ghost" href="${back}">← Back to ${page.type === "guide" ? "field guides" : "essays"}</a></p></article></main></body></html>`;
}

function upsert(path, marker, block) {
  const full = join(root, path);
  let html = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`;
  const end = `<!-- ${marker} END -->`;
  const wrapped = `${start}${block}${end}`;
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  html = pattern.test(html) ? html.replace(pattern, wrapped) : html.replace("</main>", `${wrapped}</main>`);
  writeFileSync(full, html);
}

for (const page of pages) {
  const full = join(root, page.path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}
const essays = pages.filter((page) => page.type === "essay");
const guides = pages.filter((page) => page.type === "guide");
const cards = (group) => group.map((page) => `<a class="card" href="${page.path}"><span>${esc(page.signal)}</span><h3>${esc(page.title)}</h3><p>${esc(page.description)}</p></a>`).join("");
upsert("essays.html", "SIMULATION EXPANSION TWO ESSAYS", `<section class="section"><div class="wrap"><p class="eyebrow">NEW TRANSMISSIONS</p><h2>Five more essays about life inside systems.</h2><div class="card-grid">${cards(essays)}</div></div></section>`);
upsert("field-guides.html", "SIMULATION EXPANSION TWO GUIDES", `<section class="section"><div class="wrap"><p class="eyebrow">NEW FIELD PROTOCOLS</p><h2>Five practical ways to recover agency.</h2><div class="card-grid">${cards(guides)}</div></div></section>`);
const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const page of pages) {
  const loc = `${siteUrl}/${page.path}`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>\\s*`, "g"), "");
}
sitemap = sitemap.replace("</urlset>", `${pages.map((page) => `<url><loc>${siteUrl}/${page.path}</loc><lastmod>2026-08-17</lastmod><changefreq>monthly</changefreq><priority>0.72</priority></url>`).join("")}</urlset>`);
writeFileSync(sitemapPath, sitemap);
console.log(`Generated ${pages.length} additional Life in the Simulation pages in ${root}.`);
