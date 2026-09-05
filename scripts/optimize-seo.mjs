import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] || ".");
const SITE = "https://lifeinthesimulation.com";
const EDITOR = "Life in the Simulation Editorial Desk";
const EDITOR_URL = `${SITE}/editorial-policy.html`;

const header = `<header class="site-header" data-site-header>
  <a class="brand" href="/" aria-label="Life in the Simulation home"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Field notes from the rendered layer</small></span></a>
  <div class="header-actions"><nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/topics.html">Topics</a><a href="/signals.html">Signals</a><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a></nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span aria-hidden="true">◐</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span><em>Menu</em></button></div>
</header>`;

const footer = `<footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Question the defaults. Protect your attention. Live deliberately.</small></span></a><p class="footer-thesis">An independent publication about reality, consciousness, artificial intelligence, attention and the systems between us and the world.</p><div class="footer-nav"><div><strong>Read</strong><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/topics.html">Topics</a></div><div><strong>Reference</strong><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a><a href="/feed.xml">RSS Feed</a><a href="/sitemap.xml">Sitemap</a></div><div><strong>Project</strong><a href="/about.html">About</a><a href="/editorial-policy.html">Editorial Policy</a><a href="/privacy.html">Privacy</a><a href="/humans.txt">Humans.txt</a></div></div></div><div class="footer-bottom"><small>© <span data-year>2026</span> Life in the Simulation.</small><small>No certainty theater. No manufactured urgency. Built for humans.</small></div></footer>`;

const metadata = {
  "start-here.html": { description: "Start with the essential essays and practical field guides for thinking clearly about simulation theory, AI, attention, consciousness and digital life." },
  "essays.html": { description: "Read evidence-aware essays about simulation theory, consciousness, artificial intelligence, attention, technology and the systems shaping modern life." },
  "field-guides.html": { description: "Practical, step-by-step field guides for protecting attention, testing claims, improving digital privacy and living more deliberately with technology." },
  "signals.html": { description: "A concise reading list of books, research and ideas for understanding artificial intelligence, consciousness, attention and mediated reality." },
  "glossary.html": { description: "Plain-language definitions for simulation theory, artificial intelligence, consciousness, attention, algorithms and the systems that mediate modern life." },
  "experiments.html": { description: "Small, repeatable experiments for testing how algorithms, screens, metrics and digital systems influence attention, judgment and daily experience." },
  "about.html": { description: "Learn how Life in the Simulation examines reality, consciousness, AI and attention with clear claims, practical methods and honest uncertainty." },
  "privacy.html": { description: "Read the privacy practices for Life in the Simulation, including analytics, visitor data, external links and the controls available to readers." },
  "essays/consciousness-is-the-weird-part.html": { description: "Why consciousness remains a hard explanatory problem even when neuroscience maps reliable links between brain activity, reports and experience." },
  "guides/attention-reset.html": { description: "A practical seven-day attention reset for reducing algorithmic capture, changing defaults and recovering deliberate control without abandoning useful technology." },
  "guides/synthetic-media-checklist.html": { description: "Use a fast, evidence-first checklist to verify suspicious images, video and audio before you believe, share or act on synthetic media." },
  "guides/personal-algorithm-audit.html": { description: "Audit what recommendation systems appear to believe about you, identify the signals shaping your feeds and deliberately retrain the outputs." },
  "guides/direct-experience-week.html": { description: "Run seven practical experiments that restore contact with places, people, physical objects and unmeasured time beyond a screen." },
  "guides/personal-data-minimization.html": { description: "Reduce unnecessary personal-data exposure with a practical account inventory, permission review, deletion plan and safer defaults—without chasing perfect anonymity." },
  "essays/memory-is-not-a-recording.html": { description: "Memory reconstructs the past from traces, context and later information. Learn what the evidence supports and how to handle disagreement without dismissing memory." },
  "essays/simulation-hypothesis-without-the-hype.html": { title: "The Simulation Hypothesis, Without the Hype" },
  "essays/real-world-is-premium.html": { title: "When the Real World Becomes a Premium Feature" },
  "essays/what-would-count-as-evidence.html": { title: "What Counts as Evidence for a Simulated Reality?" },
  "essays/attention-economy-is-a-reality-engine.html": { title: "How the Attention Economy Builds Your Reality" },
  "guides/best-books-to-understand-ai.html": { title: "Five Books for Understanding AI Without the Hype" },
  "essays/the-feeling-of-understanding-is-not-understanding.html": { title: "Why Feeling Informed Is Not the Same as Understanding" },
  "guides/password-managers-without-the-hype.html": { title: "Password Managers Compared: Four Honest Options" }
  ,"guides/personal-data-minimization.html": { title: "Personal Data Minimization: A Practical Guide", description: "Reduce unnecessary personal-data exposure with a practical account inventory, permission review, deletion plan and safer defaults—without chasing perfect anonymity." }
};

// Two early release pages used WebPage instead of Article markup. Preserve
// their original publication dates while normalizing them to Article.
const publicationDates = {
  "guides/best-books-to-understand-ai.html": "2026-08-22",
  "guides/e-ink-writing-tablets-for-focus.html": "2026-08-23"
};

const depth = {
  "guides/personal-algorithm-audit.html": ["Turn the audit into an intervention", "Do not judge the feed by whether individual recommendations look accurate. Judge the system by the pattern it creates over a week: what it repeats, what it omits and which emotional states it rewards.", ["Record the first twenty recommendations before interacting with anything.", "Label each item by topic, emotional pull and whether you deliberately requested it.", "Mute or unfollow one high-volume source and add two sources you chose outside the platform.", "Repeat the same sample after seven days and compare the distribution, not just memorable posts."], "The goal is not a perfectly neutral feed. It is a feed whose biases you can see and whose inputs you can change."],
  "guides/direct-experience-week.html": ["Make the week measurable without turning it into a score", "The experiment works when it increases contact with the world, not when it produces a perfect streak. Choose one direct activity each day and write a two-sentence observation afterward.", ["Name the physical place, person or object you will attend to.", "Set a clear beginning and end so the exercise remains practical.", "Keep capture tools out of reach unless they are essential to the activity.", "At the end, note one detail you would probably have missed through a screen."], "Review the observations after seven days. Keep only the practices that changed what you noticed or remembered."],
  "guides/decision-journal.html": ["Use a record that hindsight cannot rewrite", "A useful journal preserves the information available when the decision was made. It should separate process quality from outcome quality, because a good decision can lose and a careless decision can get lucky.", ["State the decision, deadline and options in one sentence.", "List the three assumptions most likely to change the result.", "Assign probabilities before the outcome is known.", "Schedule a review date and score the reasoning before judging the result."], "Over time, look for repeated calibration errors: chronic overconfidence, ignored base rates or costs that were consistently left out."],
  "guides/synthetic-media-checklist.html": ["Escalate verification with the stakes", "A visual artifact rarely proves its own origin. The right level of checking depends on the consequence of being wrong: casual curiosity needs less work than a financial, medical or public-safety decision.", ["Find the earliest available upload rather than inspecting a repost.", "Search for independent reporting that identifies the place, time and participants.", "Check whether shadows, reflections or audio timing contradict the claimed scene.", "If the claim is consequential and provenance remains unclear, do not forward it."], "Detection tools can supply clues, but their scores are not verdicts. Provenance and independent corroboration remain stronger evidence."],
  "guides/information-diet.html": ["Design the route information takes to you", "An information diet is not a list of approved opinions. It is a delivery system that separates urgent alerts, deliberate research and background reading so everything does not compete at the same intensity.", ["Keep emergency alerts narrow and tied to real action.", "Choose a small set of primary or specialist sources for active questions.", "Move commentary and discovery into scheduled reading windows.", "Remove one source that repeatedly produces urgency without useful decisions."], "Evaluate the system monthly by recall, decisions improved and time spent—not by the volume consumed."],
  "guides/reality-audit.html": ["Use a claim ledger", "The audit becomes more reliable when every important belief is assigned to an evidence layer. This prevents a confident summary, remembered impression or dashboard number from silently becoming direct observation.", ["Write the claim in language that could be proven wrong.", "Mark what you observed directly and what arrived through another person or system.", "List the transformations between the event and your current belief.", "Name one observation that would cause you to revise the claim."], "The result may be uncertainty. That is useful information: it tells you where further checking could actually change a decision."],
  "guides/rebuild-a-private-inner-life.html": ["Set boundaries before the moment arrives", "Privacy is easier to preserve with a standing rule than with a decision made while a post is already taking shape. Define categories of experience that are complete without publication.", ["Keep one relationship, place or recurring activity entirely off-platform.", "Delay sharing personal insights for twenty-four hours.", "Write privately before deciding whether an idea needs an audience.", "Ask permission when another person is part of the story, even if they are not named."], "A private inner life is not secrecy. It is room for unfinished thoughts, unmeasured affection and change without a public archive."],
  "guides/weekly-reality-check.html": ["Compare the dashboard with the week you actually lived", "A weekly check should reconcile measured outputs with physical facts and remembered experience. Metrics can reveal patterns, but they can also make whatever is easy to count feel disproportionately important.", ["Review calendar, spending, sleep and completed work before opening social feeds.", "Write one fact that improved and one that deteriorated.", "Identify a metric that concealed an important cost or benefit.", "Choose one small correction that can be completed during the next week."], "Keep the review to thirty minutes. A reality check should produce a decision, not another elaborate tracking system."],
  "essays/the-comfort-of-predictable-algorithms.html": ["A useful test for personalization", "Personalization can reduce search costs without becoming a closed world. The practical question is whether the system helps you pursue chosen interests or quietly narrows the range from which interests can form.", ["Notice whether recommendations repeat the same emotional register.", "Compare the personalized result with an unpersonalized search or public index.", "Ask what useful material the ranking system has no incentive to show.", "Deliberately choose one source that does not resemble your recent history."], "Comfort is not evidence of fit. Sometimes it means the environment has learned how to remove every productive surprise."],
  "guides/thirty-day-attention-experiment.html": ["Pre-register the experiment", "Write the rules before the first difficult day. A pre-registered plan prevents you from redefining success whenever the intervention becomes inconvenient or the early results are ambiguous.", ["Choose two outcomes: one behavioral and one experiential.", "Record a seven-day baseline before changing settings.", "Change only a few high-leverage defaults at once.", "Review weekly and preserve exceptions required for work, care or emergencies."], "At day thirty, compare the same measures with baseline and decide which changes deserve to become ordinary defaults."],
  "guides/personal-information-diet.html": ["Build source tiers around decisions", "Not every source deserves the same attention or trust. A tiered system prevents breaking commentary from outranking documents, direct observation and specialist reporting simply because it arrived first.", ["Put primary documents and direct data in the highest-evidence tier.", "Use specialist synthesis to understand context and disagreement.", "Treat feeds and commentary as discovery tools, not final evidence.", "Set a stopping rule for questions that no longer affect a decision."], "The purpose is not to consume less at any cost. It is to give better evidence a clearer route to your judgment."],
  "guides/analog-saturday-protocol.html": ["Preserve the safety layer", "An analog day should remove optional capture, not necessary access. Decide in advance how navigation, family contact, accessibility tools and emergencies will work so the experiment does not depend on avoidable risk.", ["Print or write essential directions and plans.", "Tell close contacts how to reach you for urgent matters.", "Keep one device available but physically parked and silenced.", "Choose activities with materials, places or people already prepared."], "The useful result is not purity. It is evidence about which digital conveniences genuinely serve you and which merely fill available time."],
  "guides/personal-data-minimization.html": ["Prioritize by consequence, not by account count", "Deleting dozens of trivial accounts can feel productive while high-impact exposures remain untouched. Work first on identity, money, health, location and communications, where misuse would be hardest to reverse.", ["Secure primary email and financial accounts before low-risk services.", "Remove unnecessary recovery channels and old connected applications.", "Download required records before requesting deletion.", "Record unresolved requests and verify later that access actually ended."], "Minimization is maintenance, not a one-time purge. Add a quarterly review and make deletion part of leaving any service."],
  "guides/deep-work-field-manual.html": ["Define the evidence of completion", "A focus block needs a concrete output. “Work on the project” leaves too much room for adjacent activity; a visible artifact makes it possible to prepare the environment and know when the block is finished.", ["Name the document, decision, design or problem the block must produce.", "Open only the materials required for that output.", "Capture unrelated tasks on paper instead of switching contexts.", "End with a restart note stating the next physical action."], "Track completed blocks and outputs, not heroic hours. Reliable concentration is a system you can repeat under ordinary conditions."],
  "guides/attention-reset.html": ["Separate withdrawal from improvement", "The first quiet days may feel worse because familiar stimulation is missing. That discomfort is not proof the reset failed, and temporary relief is not proof it worked. Look for behavioral change.", ["Record baseline pickups, interruptions and one meaningful output.", "Disable non-human notifications before changing every application.", "Create scheduled windows for messages and news.", "Repeat the baseline measures on day seven and keep only changes that helped."], "If an intervention creates serious work, care or accessibility costs, modify it. The purpose is agency, not austerity."],
  "essays/the-scoreboard-self.html": ["Keep the measure subordinate", "A metric is most useful when it answers a defined question and remains connected to the experience it summarizes. Trouble begins when improving the number replaces improving the underlying life.", ["State what the metric is intended to represent.", "List an important quality it cannot capture.", "Identify behavior that could raise the score while harming the real goal.", "Schedule periods in which the activity is practiced without measurement."], "A dashboard can inform judgment. It cannot supply the values that decide what counts as enough, worthwhile or alive."],
  "essays/why-boredom-feels-dangerous.html": ["Boredom carries different messages", "Not every empty moment is creative, and persistent distress deserves more than a productivity slogan. But ordinary restlessness can reveal how quickly the attention system has learned to expect novelty on demand.", ["Wait ninety seconds before filling a low-stakes pause.", "Name the sensation precisely: fatigue, anxiety, loneliness or simple restlessness.", "Choose a bounded physical activity instead of an infinite feed.", "Notice whether an unfinished thought returns when stimulation stops."], "The aim is not to worship boredom. It is to recover the ability to hear what constant input had been covering."],
  "essays/friction-is-a-feature.html": ["Distinguish protective friction from waste", "Friction deserves defense only when it protects a real value. A delay that enables reflection differs from a confusing process that merely transfers cost to the least powerful participant.", ["Name the harm the friction is meant to prevent.", "Check who pays the time, money or cognitive cost.", "Ask whether a clearer safeguard could protect the same value.", "Remove the barrier when it survives only because no one owns the inconvenience."], "Good friction makes consequential action more deliberate. Bad friction hides responsibility or turns access into endurance."],
  "essays/why-time-feels-faster-online.html": ["Restore landmarks to digital time", "Memory relies on changes in setting, task and meaning. A stream can contain intense novelty while producing few durable boundaries, leaving an hour full in the moment and strangely empty in retrospect.", ["Give a browsing session a named purpose and endpoint.", "Stop between activities instead of letting one feed lead into another.", "Write a one-line record of what was worth keeping.", "Create physical transitions—stand, walk or change rooms—between major tasks."], "These practices do not slow the clock. They make lived time easier to distinguish, remember and evaluate."],
  "essays/when-everything-is-content.html": ["Protect experiences from premature publication", "The important boundary is not between creators and everyone else. It is between an experience lived on its own terms and one shaped in advance for legibility, reaction and future reuse.", ["Choose recurring moments that will never become posts.", "Delay publishing until the people involved have had the experience for themselves.", "Keep some photographs private and some memories unphotographed.", "Ask whether sharing serves the event or whether the event was selected to serve sharing."], "An unposted life is not an invisible life. It is evidence that value can exist without distribution, measurement or audience response."],
  "essays/search-before-wonder.html": ["Let the question develop", "Search is excellent for retrieval, but immediate retrieval can end a question before you understand what you are actually asking. A brief delay makes prior knowledge, assumptions and genuine curiosity visible.", ["Write your current answer before opening a search engine.", "List the terms whose meaning would change the question.", "Predict what evidence would support competing explanations.", "Search for primary sources and compare the result with your initial model."], "The pause is not nostalgia for ignorance. It turns search from reflexive closure into a tool for testing thought."],
  "essays/the-intimacy-of-machines.html": ["Treat responsiveness and relationship as different things", "A system can be patient, available and linguistically attentive without having needs, commitments or a shared life. Those qualities can still be useful, but they should not be confused with mutual relationship.", ["Notice what the system knows because you disclosed it.", "Ask which incentives govern retention, personalization and continued use.", "Keep consequential emotional decisions connected to trusted people.", "Do not disclose information whose later storage or reuse would create serious harm."], "The humane boundary is not contempt for machines. It is clarity about where reciprocity, consent and responsibility actually exist."],
  "essays/digital-physics-and-information.html": ["Keep description and ontology separate", "Information language becomes explanatory only when a theory specifies the physical distinctions, transformations and predictions involved. The fact that a system can be encoded does not establish that code is its substance.", ["Ask what physically carries the information.", "Identify which computational mapping the theory treats as privileged.", "Separate mathematical usefulness from a claim about what exists.", "Look for a prediction that differs from non-computational alternatives."], "The information view may be profound. Clear definitions make it stronger by showing exactly where metaphor ends and testable theory begins."],
  "essays/attention-economy-is-a-reality-engine.html": ["Audit selection before persuasion", "A feed changes perceived reality before any individual post convinces you. By selecting which events are visible, frequent and emotionally vivid, it alters the sample from which ordinary judgments are made.", ["Compare feed frequency with base-rate evidence outside the platform.", "Identify subjects that appear only when they provoke strong reaction.", "Separate repeated exposure from independent corroboration.", "Use deliberate sources for decisions that matter beyond entertainment."], "The strongest defense is not perfect skepticism toward every item. It is control over the systems that choose the sample."],
  "guides/digital-environment-reset.html": ["Reset by pathway, not by application", "Digital noise often survives because the same interruption reaches you through several routes. Review the full pathway—device, operating system, browser, inbox and application—rather than toggling a single notification setting.", ["List the alerts that require immediate human response.", "Move everything else to scheduled review.", "Remove duplicate routes to the same information.", "Place high-capture tools outside the first screen and default browser tabs."], "Recheck after a week. A successful reset makes chosen work easier to begin without making essential communication unreliable."],
  "guides/rebuild-a-private-inner-life.html": ["Create spaces that do not require an audience", "A private inner life needs material conditions: time, tools and relationships where unfinished thought will not be automatically recorded, ranked or performed.", ["Keep one notebook or practice that is never published.", "Delay sharing insights until they survive a night of reflection.", "Ask consent before converting shared experiences into public stories.", "Let one hobby remain free of growth targets, metrics and monetization."], "Privacy here is developmental space. It allows contradiction, revision and meaning to exist before they are made legible to other people or systems."],
  "guides/weekly-reality-check.html": ["End with one correction", "A review that produces only observations can become another dashboard. Translate the gap between intention, measurement and direct experience into one action small enough to complete next week.", ["Check calendar, spending and completed work before opening feeds.", "Name one metric that matched reality and one that distorted it.", "Ask which relationship or responsibility received less time than claimed priorities.", "Schedule the correction in a specific place and time."], "The weekly record is valuable because it accumulates. After a month, repeated gaps reveal the defaults shaping life more clearly than any single score."],
  "guides/personal-information-diet.html": ["Give every source a job", "Information overload is partly a routing problem. Sources meant for discovery, verification, deep explanation and urgent action should not all arrive in the same continuous stream.", ["Choose one narrow channel for genuine alerts.", "Use primary documents when a claim changes an important decision.", "Schedule analysis instead of receiving it as interruption.", "Unsubscribe from sources that repeat urgency without increasing understanding."], "A good diet leaves you able to explain what changed your mind, where the evidence came from and what you decided to do."],
  "guides/analog-saturday-protocol.html": ["Plan the exceptions", "The protocol is stronger when necessary digital use is named in advance. Navigation, care, accessibility, tickets and emergencies can remain available without reopening every optional feed.", ["Write essential plans and contact numbers on paper.", "Park one charged device in a fixed place.", "Define the few uses that count as necessary.", "Prepare physical activities and materials before the day begins."], "Review what you missed, what you did not miss and what became easier to notice. Keep the distinction, not the purity test."],
  "guides/deep-work-field-manual.html": ["Make restarting part of the work", "A deep-work system fails when every session begins by reconstructing context. The final minutes should reduce the activation energy of the next block.", ["Define one concrete output before starting.", "Keep unrelated tasks on a capture sheet.", "Stop with enough time to record open questions.", "Write the next visible action and leave required materials ready."], "Judge the method by finished outputs and reliable restarts. Concentration that cannot survive an ordinary interruption is not yet a dependable system."],
  "guides/personal-data-minimization.html": ["Verify the deletion boundary", "Closing an account may not erase backups, legal records or information held by partners. Read the service's deletion language and distinguish account access, active processing and retained records.", ["Export records you must preserve before making changes.", "Revoke connected applications and sessions.", "Request deletion through the official account process.", "Return later to confirm login fails and marketing or data flows have stopped."], "Document exceptions you cannot remove. A known residual exposure is easier to manage than a false belief that everything disappeared."],
  "guides/deep-work-field-manual.html": ["Build a repeatable start and finish", "Deep work becomes dependable when the environment answers three questions in advance: what will be produced, which materials are allowed and how the next session will restart.", ["Name one visible output for the block.", "Prepare sources and close unrelated communication.", "Capture distractions without acting on them.", "End with a restart note and the next physical action."], "Track useful outputs rather than dramatic hours. The best protocol is the one that still works on an ordinary day." ]
};

const topicDefs = [
  { slug: "simulation-theory", name: "Simulation Theory & Reality", dek: "A grounded route through the simulation hypothesis, digital physics, evidence and the limits of computational metaphors.", links: ["essays/simulation-hypothesis-without-the-hype.html", "essays/what-would-count-as-evidence.html", "essays/digital-physics-and-information.html", "essays/dreams-are-not-evidence-of-simulation.html", "essays/predictive-processing-does-not-mean-reality-is-a-hallucination.html", "guides/reality-audit.html"] },
  { slug: "ai-knowledge", name: "AI, Knowledge & Understanding", dek: "How to reason about model performance, automation, memory, explanation and the boundary between fluent output and justified knowledge.", links: ["essays/ai-accuracy-is-not-understanding.html", "essays/ai-and-the-end-of-knowing.html", "essays/the-feeling-of-understanding-is-not-understanding.html", "essays/automation-does-not-remove-responsibility.html", "guides/ai-memory-controls-chatgpt-claude-gemini.html", "guides/local-ai-ollama-vs-lm-studio.html", "guides/best-books-to-understand-ai.html"] },
  { slug: "attention-agency", name: "Attention, Agency & Digital Life", dek: "Essays and practical protocols for understanding feeds, defaults, metrics and the systems competing to shape what you notice and choose.", links: ["essays/attention-economy-is-a-reality-engine.html", "essays/algorithmic-reality.html", "essays/the-default-is-a-decision-someone-else-made.html", "essays/the-scoreboard-self.html", "guides/attention-reset.html", "guides/personal-algorithm-audit.html", "guides/website-blockers-for-focus.html", "guides/deep-work-field-manual.html"] },
  { slug: "privacy-security", name: "Privacy, Security & Digital Boundaries", dek: "Practical, threat-model-based guidance for reducing exposure, protecting accounts and choosing tools without fear-based marketing.", links: ["guides/personal-threat-modeling-for-ordinary-people.html", "guides/personal-data-minimization.html", "guides/password-managers-without-the-hype.html", "guides/hardware-security-keys-without-the-hype.html", "guides/private-web-browsers-firefox-brave-safari.html", "guides/encrypted-cloud-storage-proton-tresorit-cryptomator.html", "guides/private-dns-quad9-cloudflare-nextdns.html"] }
];

function esc(value) { return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }
function textOnly(value) { return value.replace(/<[^>]+>/g, " ").replace(/&(?:amp|#38);/g, "&").replace(/&(?:quot|#34);/g, '"').replace(/\s+/g, " ").trim(); }
function pageUrl(rel) { return rel === "index.html" ? `${SITE}/` : `${SITE}/${rel}`; }
function socialStem(rel) { return rel === "index.html" ? "home" : rel.replace(/\.html$/, "").replaceAll("/", "-"); }
function setMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\b(?=[^>]*\\b${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["'])[^>]*>`, "i");
  const tag = `<meta ${attr}="${key}" content="${esc(value)}">`;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}
function setLink(html, rel, attrs) {
  const re = new RegExp(`<link\\b(?=[^>]*\\brel=["']${rel}["'])[^>]*>`, "i");
  const tag = `<link rel="${rel}" ${attrs}>`;
  return re.test(html) ? html.replace(re, tag) : html.replace(/<\/head>/i, `  ${tag}\n</head>`);
}
function jsonScript(data) { return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, "\\u003c")}</script>`; }
function dateTime(value) {
  if (!value) return "2026-09-04T12:00:00-04:00";
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return `${value}T12:00:00-04:00`;
  return value;
}
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);
}
function existingSchema(html) {
  const objects = [];
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { objects.push(JSON.parse(match[1])); } catch {}
  }
  return objects;
}
function titleFromFile(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return rel;
  const html = fs.readFileSync(file, "utf8");
  return textOnly((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [,"Untitled"])[1]);
}
function topicFor(rel, category, title) {
  const hay = `${rel} ${category} ${title}`.toLowerCase();
  if (/privacy|security|password|browser|dns|cloud-storage|data-minimization|threat-model/.test(hay)) return topicDefs[3];
  if (/\bai\b|artificial|knowledge|understanding|automation|model|scientific-paper|information-diet/.test(hay)) return topicDefs[1];
  if (/attention|focus|algorithm|boredom|content|scoreboard|default|deep-work|analog|rss|time-feels/.test(hay)) return topicDefs[2];
  return topicDefs[0];
}

function pageShell({ rel, title, description, eyebrow, intro, body, schemaType = "CollectionPage" }) {
  const canonical = pageUrl(rel);
  const schema = { "@context": "https://schema.org", "@type": schemaType, name: title, description, url: canonical, inLanguage: "en-US", isPartOf: { "@type": "WebSite", name: "Life in the Simulation", url: SITE } };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: title, item: canonical }] };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#080a0f"><title>${esc(title)} | Life in the Simulation</title><meta name="description" content="${esc(description)}"><link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="alternate" type="application/rss+xml" title="Life in the Simulation" href="/feed.xml"><link rel="stylesheet" href="/assets/style.css"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:type" content="website"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image">${jsonScript(schema)}${jsonScript(crumbs)}</head><body><div class="ambient ambient-a" aria-hidden="true"></div><div class="ambient ambient-b" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div><a class="skip-link" href="#main">Skip to content</a>${header}<main id="main"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><b>/</b><span aria-current="page">${esc(title)}</span></nav><section class="page-hero"><div class="page-hero-meta"><p class="eyebrow">${esc(eyebrow)}</p><span>CURATED PATH</span></div><h1>${esc(title)}</h1><p class="page-dek">${esc(intro)}</p></section>${body}</main>${footer}<script src="/assets/site.js" defer></script></body></html>`;
}

function buildNewPages() {
  for (const topic of topicDefs) {
    const rel = `topics/${topic.slug}.html`;
    const cards = topic.links.filter(link => fs.existsSync(path.join(root, link))).map(link => {
      const name = titleFromFile(link);
      const kind = link.startsWith("guides/") ? "Field guide" : "Essay";
      return `<a class="content-card" href="/${link}"><div class="card-top"><span class="tag">${kind}</span><span class="transmission">READ</span></div><h3>${esc(name)}</h3><p>Open this ${kind.toLowerCase()} in the curated ${esc(topic.name)} reading path.</p><div class="card-meta"><span>Life in the Simulation</span><span>Read <b>↗</b></span></div></a>`;
    }).join("");
    const body = `<section class="archive-section section-pad"><div class="section-heading"><div><p class="eyebrow">ESSENTIAL READING</p><h2>A useful sequence, not an endless feed.</h2></div></div><div class="content-grid three">${cards}</div></section><section class="topic-method section-pad"><div><p class="eyebrow">HOW TO USE THIS PATH</p><h2>Move from claim to evidence to practice.</h2></div><div class="principle-list"><p><span>01</span><strong>Begin with the framing.</strong><em>Identify the claim before accepting the metaphor.</em></p><p><span>02</span><strong>Inspect the evidence.</strong><em>Separate observation, inference and speculation.</em></p><p><span>03</span><strong>Run the practice.</strong><em>Keep what improves judgment or agency.</em></p></div></section>`;
    fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    fs.writeFileSync(path.join(root, rel), pageShell({ rel, title: topic.name, description: topic.dek, eyebrow: "TOPIC PATH", intro: topic.dek, body }), "utf8");
  }

  const overviewCards = topicDefs.map(topic => `<a class="content-card" href="/topics/${topic.slug}.html"><div class="card-top"><span class="tag">Topic path</span><span class="transmission">${topic.links.length} READS</span></div><h2>${esc(topic.name)}</h2><p>${esc(topic.dek)}</p><div class="card-meta"><span>Curated sequence</span><span>Explore <b>↗</b></span></div></a>`).join("");
  fs.writeFileSync(path.join(root, "topics.html"), pageShell({ rel: "topics.html", title: "Topics", description: "Explore curated reading paths on simulation theory, artificial intelligence, attention, agency, privacy and security from Life in the Simulation.", eyebrow: "READ BY QUESTION", intro: "Four focused routes through the archive, designed to move from a clear claim to evidence and practical action.", body: `<section class="archive-section section-pad"><div class="content-grid two">${overviewCards}</div></section>` }), "utf8");

  const policyBody = `<section class="section-pad legal-layout"><aside class="legal-summary"><p class="eyebrow">QUICK STANDARD</p><ul><li>Claims sized to evidence</li><li>Sources linked where material</li><li>Commercial tradeoffs disclosed</li><li>AI output is never a source</li><li>Corrections are made visibly</li></ul></aside><article class="legal-copy"><h2>Who publishes this site</h2><p>Life in the Simulation is an independent publication produced by the Life in the Simulation Editorial Desk. The byline identifies the responsible editorial function without inventing a public persona. The publication is not a university, laboratory, medical provider or financial adviser.</p><h2>How claims are handled</h2><p>Essays separate established findings, reasonable inference and speculation. When a claim depends on research, a product feature or a current policy, the article should link to primary documentation or clearly identify the evidence boundary. Strong language requires strong evidence; uncertainty is reported as part of the result.</p><h2>Reviews and buying guides</h2><p>Product guides begin with the reader's job, constraints and threat model. They include a no-buy option when an existing tool or simpler practice may solve the problem. The site does not accept payment for favorable conclusions. Any affiliate relationship or supplied product will be disclosed on the relevant page before links or recommendations.</p><h2>AI-assisted work</h2><p>Drafting, research organization, code and production may use AI-assisted tools. AI-generated output is not treated as evidence. Material claims, linked sources, comparisons and final conclusions are reviewed by the Editorial Desk before publication. Generated editorial imagery is labeled in the site's image credits.</p><h2>Updates and corrections</h2><p>Dates in article markup distinguish first publication from substantive revision. Errors are corrected when identified; a change that materially alters a conclusion should be noted on the page. Readers can inspect the cited source and the stated evidence boundary rather than being asked to trust certainty theater.</p><h2>Editorial purpose</h2><p>The purpose is to make difficult questions more legible and useful: define the claim, inspect the evidence, preserve uncertainty and translate insight into a practical choice. The site favors durable explanation over manufactured urgency.</p><p><em>Last reviewed September 4, 2026.</em></p></article></section>`;
  fs.writeFileSync(path.join(root, "editorial-policy.html"), pageShell({ rel: "editorial-policy.html", title: "Editorial Policy", description: "How Life in the Simulation researches, reviews, updates and discloses its essays, product guides, sources and use of AI-assisted tools.", eyebrow: "EDITORIAL STANDARD", intro: "Who is responsible for the work, how claims are sized to evidence and what readers should expect from every page.", body: policyBody, schemaType: "AboutPage" }), "utf8");
}

function normalizePage(file) {
  const rel = path.relative(root, file).split(path.sep).join("/");
  if (rel === "404.html") return;
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<!--\s*SEO DEPTH START\s*-->[\s\S]*?<!--\s*SEO DEPTH END\s*-->/gi, "");
  html = html.replace(/<!--\s*SEO TOPIC START\s*-->[\s\S]*?<!--\s*SEO TOPIC END\s*-->/gi, "");
  if (rel === "essays.html") {
    html = html.replace(/<!-- SIMULATION ESSAY EXPANSION START -->[\s\S]*?<!-- SIMULATION ESSAY EXPANSION END -->/g, "").replace(/<!-- SIMULATION EXPANSION TWO ESSAYS START -->[\s\S]*?<!-- SIMULATION EXPANSION TWO ESSAYS END -->/g, "");
  }
  if (rel === "field-guides.html") {
    html = html.replace(/<!-- SIMULATION GUIDE EXPANSION START -->[\s\S]*?<!-- SIMULATION GUIDE EXPANSION END -->/g, "").replace(/<!-- SIMULATION EXPANSION TWO GUIDES START -->[\s\S]*?<!-- SIMULATION EXPANSION TWO GUIDES END -->/g, "");
  }

  const canonical = pageUrl(rel);
  const schemas = existingSchema(html);
  const oldArticle = schemas.find(item => item && (item["@type"] === "Article" || item["@type"] === "NewsArticle"));
  const oldArticlePage = schemas.find(item => item?.["@type"] === "WebPage" && (item.datePublished || item.headline));
  const articleRecord = oldArticle || oldArticlePage;
  const article = rel.startsWith("essays/") || rel.startsWith("guides/");
  const h1 = textOnly((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [,articleRecord?.headline || "Life in the Simulation"])[1]);
  const override = metadata[rel] || {};
  const oldTitle = textOnly((html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i) || [,h1])[1]);
  const title = override.title || oldTitle;
  const oldDescription = (html.match(/<meta\b(?=[^>]*name=["']description["'])[^>]*content=["']([^"']*)["'][^>]*>/i) || [,articleRecord?.description || ""])[1];
  const description = override.description || oldDescription;
  const stem = socialStem(rel);
  const social = `${SITE}/assets/social/${stem}-social.webp`;

  html = html.replace(/<title\b[^>]*>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = setMeta(html, "name", "description", description);
  html = setLink(html, "canonical", `href="${canonical}"`);
  html = setLink(html, "icon", `href="/assets/favicon.svg" type="image/svg+xml"`);
  html = setLink(html, "manifest", `href="/site.webmanifest"`);
  html = setLink(html, "alternate", `type="application/rss+xml" title="Life in the Simulation" href="/feed.xml"`);
  html = setLink(html, "stylesheet", `href="/assets/style.css"`);
  html = setMeta(html, "name", "theme-color", "#080a0f");
  html = setMeta(html, "property", "og:locale", "en_US");
  html = setMeta(html, "property", "og:site_name", "Life in the Simulation");
  html = setMeta(html, "property", "og:type", article ? "article" : "website");
  html = setMeta(html, "property", "og:title", h1);
  html = setMeta(html, "property", "og:description", description);
  html = setMeta(html, "property", "og:url", canonical);
  html = setMeta(html, "property", "og:image", social);
  html = setMeta(html, "property", "og:image:width", "1200");
  html = setMeta(html, "property", "og:image:height", "630");
  html = setMeta(html, "property", "og:image:alt", `${h1} — Life in the Simulation`);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", h1);
  html = setMeta(html, "name", "twitter:description", description);
  html = setMeta(html, "name", "twitter:image", social);
  html = setMeta(html, "name", "twitter:image:alt", `${h1} — Life in the Simulation`);

  html = html.replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, match => {
    try {
      const data = JSON.parse((match.match(/>([\s\S]*?)<\/script>/i) || [,"{}"]) [1]);
      const type = data?.["@type"];
      if (["Article", "NewsArticle", "BreadcrumbList", "WebSite", "Organization", "CollectionPage", "AboutPage"].includes(type) || (article && type === "WebPage")) return "";
    } catch {}
    return match;
  });

  const breadcrumbItems = [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }];
  if (article) breadcrumbItems.push({ "@type": "ListItem", position: 2, name: rel.startsWith("guides/") ? "Field Guides" : "Essays", item: `${SITE}/${rel.startsWith("guides/") ? "field-guides" : "essays"}.html` });
  else if (rel.startsWith("topics/")) breadcrumbItems.push({ "@type": "ListItem", position: 2, name: "Topics", item: `${SITE}/topics.html` });
  if (rel !== "index.html") breadcrumbItems.push({ "@type": "ListItem", position: breadcrumbItems.length + 1, name: h1, item: canonical });

  const inserts = [];
  if (article) {
    const category = articleRecord?.articleSection || textOnly((html.match(/<p class=["']eyebrow["'][^>]*>([\s\S]*?)<\/p>/i) || [,rel.startsWith("guides/") ? "Practice" : "Ideas"])[1]).split(/[•·]/)[0].trim();
    const rawPublished = publicationDates[rel] || articleRecord?.datePublished || articleRecord?.dateModified || "2026-09-04";
    const rawModified = depth[rel] ? "2026-09-04" : publicationDates[rel] || articleRecord?.dateModified || rawPublished;
    const bodyMatch = html.match(/<article\b[^>]*(?:data-article-body|class=["'][^"']*(?:article-body|article)[^"']*)[^>]*>([\s\S]*?)<\/article>/i);
    const extra = depth[rel];
    const extraWords = extra ? textOnly([extra[0], extra[1], ...extra[2], extra[3]].join(" ")).split(/\s+/).filter(Boolean).length : 0;
    const wordCount = textOnly(bodyMatch?.[1] || "").split(/\s+/).filter(Boolean).length + extraWords;
    html = setMeta(html, "property", "article:published_time", dateTime(rawPublished));
    html = setMeta(html, "property", "article:modified_time", dateTime(rawModified));
    inserts.push(jsonScript({ "@context": "https://schema.org", "@type": "Article", headline: h1, description, articleSection: category, datePublished: dateTime(rawPublished), dateModified: dateTime(rawModified), wordCount, inLanguage: "en-US", mainEntityOfPage: { "@type": "WebPage", "@id": canonical }, image: [`${SITE}/assets/social/${stem}-1x1.webp`, `${SITE}/assets/social/${stem}-4x3.webp`, `${SITE}/assets/social/${stem}-16x9.webp`], author: { "@type": "Organization", name: EDITOR, url: EDITOR_URL }, publisher: { "@type": "Organization", name: "Life in the Simulation", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/assets/publisher-logo.png`, width: 512, height: 512 } } }));
    inserts.push(jsonScript({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems }));

    html = html.replace(/<span\b[^>]*class=["'][^"']*editorial-byline[^"']*["'][^>]*>[\s\S]*?<\/span>/gi, "").replace(/<p\b[^>]*class=["'][^"']*editorial-byline[^"']*["'][^>]*>[\s\S]*?<\/p>/gi, "");
    const byline = `<span class="editorial-byline">By <a rel="author" href="/editorial-policy.html">${EDITOR}</a></span>`;
    if (/class=["'][^"']*article-meta/.test(html)) html = html.replace(/(<div\b[^>]*class=["'][^"']*article-meta[^"']*["'][^>]*>)([\s\S]*?)(<\/div>)/i, `$1$2${byline}$3`);
    else if (/<p\b[^>]*class=["']meta["'][^>]*>[\s\S]*?<\/p>/i.test(html)) html = html.replace(/(<p\b[^>]*class=["']meta["'][^>]*>[\s\S]*?<\/p>)/i, `$1<p class="editorial-byline">By <a rel="author" href="/editorial-policy.html">${EDITOR}</a></p>`);

    if (extra) {
      const [heading, intro, bullets, close] = extra;
      const block = `<!-- SEO DEPTH START --><section class="seo-depth"><h2>${esc(heading)}</h2><p>${esc(intro)}</p><ul>${bullets.map(item => `<li>${esc(item)}</li>`).join("")}</ul><p>${esc(close)}</p></section><!-- SEO DEPTH END -->`;
      html = html.replace(/<\/article>(?![\s\S]*<\/article>)/i, `${block}</article>`);
    }
    const topic = topicFor(rel, category, h1);
    const trail = `<!-- SEO TOPIC START --><aside class="topic-trail"><span>CONTINUE BY TOPIC</span><a href="/topics/${topic.slug}.html">${esc(topic.name)} <b>→</b></a></aside><!-- SEO TOPIC END -->`;
    html = html.replace(/<\/article>(?![\s\S]*<\/article>)/i, `${trail}</article>`);
  } else {
    const mainSchema = rel === "index.html" ? { "@context": "https://schema.org", "@type": "WebSite", name: "Life in the Simulation", url: SITE, description, inLanguage: "en-US", publisher: { "@id": `${SITE}/#organization` } } : { "@context": "https://schema.org", "@type": ["about.html", "editorial-policy.html"].includes(rel) ? "AboutPage" : "CollectionPage", name: h1, description, url: canonical, inLanguage: "en-US", isPartOf: { "@type": "WebSite", name: "Life in the Simulation", url: SITE } };
    inserts.push(jsonScript(mainSchema));
    if (rel === "index.html") inserts.push(jsonScript({ "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE}/#organization`, name: "Life in the Simulation", url: SITE, logo: { "@type": "ImageObject", url: `${SITE}/assets/publisher-logo.png`, width: 512, height: 512 }, publishingPrinciples: EDITOR_URL }));
    if (rel !== "index.html") inserts.push(jsonScript({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: breadcrumbItems }));
  }
  // Removing the previous JSON-LD must not leave another blank line on every
  // optimization pass. Normalize only the whitespace immediately before the
  // closing head, then install the deterministic schema block.
  html = html.replace(/\s*<\/head>/i, "\n</head>");
  html = html.replace(/<\/head>/i, `${inserts.join("\n")}\n</head>`);

  html = html.replace(/<header\b[^>]*class=["'][^"']*site-header[^"']*["'][^>]*>[\s\S]*?<\/header>/i, header);
  html = /<footer\b[^>]*class=["'][^"']*site-footer/.test(html) ? html.replace(/<footer\b[^>]*class=["'][^"']*site-footer[^"']*["'][^>]*>[\s\S]*?<\/footer>/i, footer) : html.replace(/<\/body>/i, `${footer}</body>`);
  if (!/class=["']skip-link["']/.test(html)) html = html.replace(/<body([^>]*)>/i, `<body$1><a class="skip-link" href="#main">Skip to content</a>`);
  html = html.replace(/<main(?![^>]*\bid=)[^>]*>/i, match => match.replace(/>$/, ' id="main">'));
  if (!/src=["']\/assets\/site\.js["']/.test(html)) html = html.replace(/<\/body>/i, `<script src="/assets/site.js" defer></script></body>`);
  fs.writeFileSync(file, html.replace(/[ \t]+$/gm, ""), "utf8");
}

function addDiscoverySections() {
  const section = `<!-- SEO TOPICS INDEX START --><section class="section-pad topic-index"><div class="section-heading"><div><p class="eyebrow">EXPLORE BY QUESTION</p><h2>Follow a topic, not a feed.</h2></div><a class="text-link" href="/topics.html">All topics <span>→</span></a></div><div class="content-grid two">${topicDefs.map(topic => `<a class="content-card" href="/topics/${topic.slug}.html"><div class="card-top"><span class="tag">Topic path</span></div><h3>${esc(topic.name)}</h3><p>${esc(topic.dek)}</p></a>`).join("")}</div></section><!-- SEO TOPICS INDEX END -->`;
  for (const rel of ["index.html", "start-here.html"]) {
    const file = path.join(root, rel);
    let html = fs.readFileSync(file, "utf8").replace(/<!-- SEO TOPICS INDEX START -->[\s\S]*?<!-- SEO TOPICS INDEX END -->/g, "");
    html = html.replace(/<\/main>/i, `${section}</main>`);
    fs.writeFileSync(file, html, "utf8");
  }
}

function buildSitemapAndLlms() {
  const htmlFiles = walk(root).filter(file => file.endsWith(".html") && path.relative(root, file).split(path.sep).join("/") !== "404.html");
  const rows = htmlFiles.map(file => {
    const rel = path.relative(root, file).split(path.sep).join("/");
    const html = fs.readFileSync(file, "utf8");
    const schema = existingSchema(html).find(item => item?.["@type"] === "Article");
    const modified = String(schema?.dateModified || "2026-09-04").slice(0, 10);
    return { rel, url: pageUrl(rel), title: textOnly((html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [,"Life in the Simulation"])[1]), modified };
  }).sort((a, b) => a.url.localeCompare(b.url));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.map(row => `  <url><loc>${row.url}</loc><lastmod>${row.modified}</lastmod></url>`).join("\n")}\n</urlset>\n`;
  fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
  const groups = [
    ["Core pages", rows.filter(row => !row.rel.includes("/"))],
    ["Topic paths", rows.filter(row => row.rel.startsWith("topics/"))],
    ["Essays", rows.filter(row => row.rel.startsWith("essays/"))],
    ["Field guides", rows.filter(row => row.rel.startsWith("guides/"))]
  ];
  const llms = [`# Life in the Simulation`, ``, `> Evidence-aware essays and practical field guides about simulation theory, consciousness, artificial intelligence, attention, privacy and modern digital life.`, ``, `Canonical site: ${SITE}/`, `Editorial policy: ${EDITOR_URL}`, ``];
  for (const [name, items] of groups) {
    llms.push(`## ${name}`, "", ...items.map(item => `- [${item.title}](${item.url})`), "");
  }
  fs.writeFileSync(path.join(root, "llms.txt"), `${llms.join("\n").trim()}\n`, "utf8");
}

buildNewPages();
for (const file of walk(root).filter(file => file.endsWith(".html"))) normalizePage(file);
addDiscoverySections();
buildSitemapAndLlms();
console.log(`SEO normalization complete for ${walk(root).filter(file => file.endsWith(".html")).length} HTML pages.`);
