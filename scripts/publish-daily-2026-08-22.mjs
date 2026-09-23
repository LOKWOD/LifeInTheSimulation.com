import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const published = "2026-08-22";
const publishedHuman = "August 22, 2026";
const analytics = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "352a9195ed5342f9a8a9d244e13bddab"}'></script><!-- End Cloudflare Web Analytics -->`;
const visitor = `<!-- LOKWOD Website Visitor Beacon --><script defer src="https://lokwod-visitor-beacon.syracuseappraiser.workers.dev/beacon.js" data-site="life-in-the-simulation"></script><!-- End LOKWOD Website Visitor Beacon -->`;

const pages = [
  {
    type: "essay",
    path: "essays/ai-accuracy-is-not-understanding.html",
    title: "A Model Can Be Right for the Wrong Reason",
    metaTitle: "AI Accuracy Is Not Understanding — Life in the Simulation",
    description: "Why an AI model can score well, sound convincing and still rely on shortcuts that fail when the world changes—and how to judge it more honestly.",
    category: "AI",
    code: "TRANSMISSION 021",
    id: "T-021",
    dek: "A correct answer tells you that a system produced the expected output. It does not, by itself, reveal what the system learned, whether it understands, or where it will fail.",
    body: `
<p class="article-lede">A scoreboard compresses a performance into a number. That is useful. The trouble begins when the number is treated as an X-ray of the machinery underneath.</p>

<p>An AI system can classify an image correctly, finish a sentence plausibly or pass a benchmark while relying on cues that a person would consider incidental. The result may be right. The route may be fragile. This is not a semantic complaint about the word <em>intelligence</em>; it is an operational problem. If we mistake a good score for a good model of the task, we will be surprised precisely when the environment stops looking like the test.</p>

<div class="article-callout"><strong>The central distinction</strong><span>Performance is evidence about outputs under specified conditions. Understanding is a claim about the capacities and representations that produce those outputs. The first does not automatically establish the second.</span></div>

<h2 id="one-score-three-claims">One score, three different claims</h2>

<p>Suppose a model answers 90 percent of questions in an evaluation set correctly. At least three statements may be hiding inside the celebration:</p>

<ol>
  <li><strong>Measurement claim:</strong> the model achieved 90 percent under this scoring rule, on these examples, with this prompt and tool configuration.</li>
  <li><strong>Generalization claim:</strong> it will remain useful on new examples drawn from the situations we care about.</li>
  <li><strong>Mechanism claim:</strong> it succeeded because it learned the relevant structure of the problem.</li>
</ol>

<p>The score directly supports only the first claim. The second needs evidence from varied, independent and realistic tests. The third needs deeper investigation: counterexamples, interventions, interpretability work, error analysis and sometimes a theory of the task itself.</p>

<figure class="reason-chain" aria-label="A four-stage diagram showing that a benchmark score passes through a learned signal and a changed environment before becoming dependable real-world performance">
  <div><b>01</b><strong>Benchmark</strong><span>What was measured?</span></div>
  <i aria-hidden="true">→</i>
  <div><b>02</b><strong>Learned signal</strong><span>What cue drove the answer?</span></div>
  <i aria-hidden="true">→</i>
  <div><b>03</b><strong>Changed world</strong><span>Does the cue still hold?</span></div>
  <i aria-hidden="true">→</i>
  <div><b>04</b><strong>Reliability</strong><span>What survives the shift?</span></div>
  <figcaption>A score is the beginning of an inquiry, not the final account of competence.</figcaption>
</figure>

<h2 id="shortcut-learning">The shortcut problem</h2>

<p>Researchers use <em>shortcut learning</em> for decision rules that perform well on familiar benchmarks but fail under more demanding conditions. In a 2020 perspective in <em>Nature Machine Intelligence</em>, Robert Geirhos and colleagues argued that many apparently different deep-learning failures can be understood this way: the model finds a predictive regularity, but not necessarily the regularity humans intended it to use.</p>

<p>The word <em>shortcut</em> can sound moralistic, as if the model were cheating. It is not. A learning system is rewarded for reducing error, not for reading the evaluator's mind. If background texture, formatting, source style or a recurring phrase predicts the label, using that cue can be an efficient response to the training environment.</p>

<p>Humans do this too. Students study the shape of an exam. Interviewers overvalue confident delivery. Readers use typography and institutional branding as proxies for credibility. The difference is not that machines take shortcuts and people never do. The difference is that a machine's useful cue can be invisible to its operator until conditions change.</p>

<blockquote>“It worked” is a report about a past encounter. “It works” is a forecast about a class of future encounters.</blockquote>

<h2 id="meaning-form">Fluent form is not settled meaning</h2>

<p>Language makes the confusion especially tempting. A fluent answer has the surface features through which humans usually recognize comprehension: relevance, syntax, explanation, correction and tone. But form and meaning are not identical.</p>

<p>Emily Bender and Alexander Koller made this distinction explicit in their 2020 ACL paper on natural-language understanding. Their argument is not that language models are useless, nor does it settle every philosophical question about machine understanding. It warns that success at predicting linguistic form does not by itself establish access to the communicative intent and world-grounded meaning that people often smuggle into the word <em>understanding</em>.</p>

<p>There is real expert disagreement here. Some researchers treat sufficiently broad predictive competence as evidence of increasingly general internal models. Others think reliable reference, embodiment, causal contact or social participation matter to stronger accounts of understanding. Current benchmark performance does not dissolve that disagreement. It gives the disagreement better objects to examine.</p>

<h2 id="calibration">A confident answer is not a calibrated answer</h2>

<p>Generative systems add another layer: they produce sentences, not confidence gauges. A smooth paragraph can contain a sourced fact, a reasonable inference and a fabricated detail in the same voice. The reader receives one grammatical surface even when the epistemic status underneath is mixed.</p>

<p>The U.S. National Institute of Standards and Technology treats confidently stated false content—often called confabulation—as a risk to manage in its Generative AI Profile. That framing matters. The issue is not that a model has a deceptive inner life. The issue is that a plausible output can trigger human trust without carrying a dependable warrant.</p>

<p>For low-stakes brainstorming, that may be acceptable. For medical instructions, legal obligations, financial commitments, security changes or public accusations, fluent uncertainty is not enough. The workflow needs independent verification and accountable human judgment.</p>

<h2 id="judge-model">How to judge a model without certainty theater</h2>

<p>You do not need laboratory access to ask better questions. Before relying on an AI output, inspect five layers:</p>

<h3>1. Define the decision</h3>
<p>What happens if the answer is wrong? A naming idea and a medication interaction do not deserve the same verification budget. Start with consequence, not novelty.</p>

<h3>2. Name the evidence</h3>
<p>Is the claim based on a benchmark, a controlled study, a vendor demonstration, a private test set or an anecdote? “State of the art” without the task and evaluation conditions is advertising-shaped information.</p>

<h3>3. Look for shifts</h3>
<p>Ask what could differ between the test and your situation: geography, language, time period, device, population, document style, adversarial behavior or access to tools. A capable model can still be the wrong instrument outside its operating conditions.</p>

<h3>4. Probe the route, not just the destination</h3>
<p>Change irrelevant details. Ask for sources you can inspect. Present a counterexample. Remove a tempting cue. Request an explicit separation of fact, inference and uncertainty. These probes do not prove understanding, but brittle reversals reveal dependence on the wrong signal.</p>

<h3>5. Record the miss</h3>
<p>Do not evaluate only the memorable successes. Keep representative failures, including quiet ones that produced polished but unusable work. A <a href="/guides/decision-journal.html">decision journal</a> prevents hindsight from editing the record.</p>

<h2 id="what-follows">What follows—and what does not</h2>

<div class="evidence-grid">
  <section><span>SOURCED FACT</span><p>Shortcut decision rules can score well on standard benchmarks and fail under changed testing conditions.</p></section>
  <section><span>OPEN DISAGREEMENT</span><p>Researchers and philosophers disagree about which capabilities justify the word <em>understanding</em>.</p></section>
  <section><span>INFERENCE</span><p>Operators should treat performance as conditional evidence and design workflows around consequences and distribution shift.</p></section>
  <section><span>SPECULATION</span><p>Future systems may develop richer, more stable world models. No single present-day score can establish that future—or rule it out.</p></section>
</div>

<p>The practical conclusion is neither “AI understands everything” nor “AI is only autocomplete.” Those slogans offer identity, not inspection. A system can be useful without possessing the kind of understanding a user imagines. It can also display meaningful capacities without satisfying every philosophical definition.</p>

<p>Use the narrowest claim the evidence can carry. Track provenance when synthetic output matters with the <a href="/guides/synthetic-media-checklist.html">synthetic-media checklist</a>. Read the companion essay on <a href="/essays/ai-and-the-end-of-knowing.html">knowing who made what</a>. And remember the site's standing rule from <a href="/essays/scoreboards-we-mistake-for-life.html">The Scoreboards We Mistake for Life</a>: a metric is a compressed view of a thing, not the thing itself.</p>

<h2 id="sources">Sources and boundaries</h2>
<ul class="source-list">
  <li><a href="https://www.nature.com/articles/s42256-020-00257-z" rel="noopener">Geirhos et al., “Shortcut learning in deep neural networks”</a>, <em>Nature Machine Intelligence</em> (2020). Used for the definition and transfer problem of shortcut learning.</li>
  <li><a href="https://aclanthology.org/2020.acl-main.463/" rel="noopener">Bender and Koller, “Climbing towards NLU”</a>, Association for Computational Linguistics (2020). Used for the form/meaning distinction.</li>
  <li><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence" rel="noopener">NIST AI 600-1, Generative AI Profile</a> (2024; page updated April 8, 2026). Used for current risk-management framing.</li>
</ul>

<p class="source-note"><strong>Boundary note:</strong> This essay explains how to interpret performance evidence. It does not establish a test for consciousness, settle machine understanding or assess a specific vendor model.</p>`,
    nextHref: "/guides/best-books-to-understand-ai.html",
    nextLabel: "Build an AI reading path"
  },
  {
    type: "guide",
    path: "guides/best-books-to-understand-ai.html",
    title: "The Best Books to Understand AI Without the Hype",
    metaTitle: "Best Books to Understand AI Without the Hype — Life in the Simulation",
    description: "A five-book AI reading path covering how the technology works, where it fails, alignment, power, labor and the people living with automated decisions.",
    category: "Learning",
    code: "FIELD GUIDE 016",
    id: "G-016",
    dek: "Do not build an AI worldview from one optimist, one critic or one technical textbook. Build a stack in which each book corrects the blind spots of the last.",
    body: `
<p class="article-lede">The best book about artificial intelligence does not exist. The field is too technical, political, commercial and philosophically unsettled for one author to carry the whole map.</p>

<p>A useful reading path needs several lenses: what the systems do, where competence gets overstated, how objectives and control can go wrong, what computation requires materially, and how automated decisions reach ordinary people. The five books below were selected to cover that stack—not to produce a shelf of fashionable agreement.</p>

<div class="article-callout"><strong>Buying note</strong><span>The title links below go to official publisher pages. They are not affiliate links, and Life in the Simulation earns nothing if you buy. Use a library, used copy, audiobook or ebook if that fits better; the point is the argument, not the format.</span></div>

<h2 id="choose-route">Choose the route before the books</h2>

<p>If you are new to AI, follow the full sequence. If you need to make a work decision this month, read the first book and then jump to the lens closest to the decision. If you already understand machine learning, start with power and lived consequences. The list is a path, not a ranking.</p>

<figure class="reading-route" aria-label="Five-stage AI reading route from mechanisms to limits, objectives, infrastructure and lived consequences">
  <ol>
    <li><b>01</b><strong>Mechanisms</strong><span>What can these systems do?</span></li>
    <li><b>02</b><strong>Limits</strong><span>Where does intuition overreach?</span></li>
    <li><b>03</b><strong>Objectives</strong><span>Who defines success?</span></li>
    <li><b>04</b><strong>Infrastructure</strong><span>What material system supports AI?</span></li>
    <li><b>05</b><strong>Consequences</strong><span>Who lives with the decision?</span></li>
  </ol>
  <figcaption>A strong sequence changes lenses before one lens starts pretending to be the whole world.</figcaption>
</figure>

<h2 id="mitchell">1. Start with a reality-based map</h2>
<div class="book-card">
  <p class="eyebrow">FOUNDATIONS + LIMITS</p>
  <h3><a href="https://us.macmillan.com/books/9781250404855/artificialintelligence/" rel="noopener">Artificial Intelligence: A Guide for Thinking Humans</a></h3>
  <p><strong>Melanie Mitchell</strong> · Broad introduction · Best first book</p>
</div>

<p>Mitchell gives a non-specialist enough history and technical structure to recognize what modern AI can do without treating every capability claim as destiny. The publisher's current edition includes a new preface placing the argument in the post-2022 generative-AI period.</p>

<p><strong>Read it for:</strong> a vocabulary of learning, representation, analogy and common-sense reasoning; examples of impressive capability beside surprising brittleness; a researcher’s resistance to both dismissal and spectacle.</p>

<p><strong>Tradeoff:</strong> no general-audience introduction can stay current on every product cycle. Use it for durable concepts, then check current system documentation for specific capabilities.</p>

<p><strong>Question to carry:</strong> When a model gets the answer right, what does the success show—and what are we adding from our own human intuition? Pair this section with <a href="/essays/ai-accuracy-is-not-understanding.html">A Model Can Be Right for the Wrong Reason</a>.</p>

<h2 id="griffiths">2. Learn the families of thought</h2>
<div class="book-card">
  <p class="eyebrow">COGNITION + COMPUTATION</p>
  <h3><a href="https://us.macmillan.com/books/9781250358356/thelawsofthought/" rel="noopener">The Laws of Thought</a></h3>
  <p><strong>Tom Griffiths</strong> · Intellectual history · Best bridge between minds and machines</p>
</div>

<p>Griffiths organizes a long history of attempts to formalize thought: logic, neural networks, probability and other computational ideas. That history matters because current AI discourse often presents yesterday's conceptual disputes as if they arrived with the latest model release.</p>

<p><strong>Read it for:</strong> the competing metaphors behind intelligent systems and the connection between theories of human cognition and machine design.</p>

<p><strong>Tradeoff:</strong> this is a history of ideas, not a coding manual or buyer's guide to present tools. Readers seeking implementation detail will need coursework or documentation alongside it.</p>

<p><strong>Question to carry:</strong> Which account of thought is being assumed when somebody says a machine “reasons”? The answer changes what counts as evidence.</p>

<h2 id="russell">3. Understand the objective problem</h2>
<div class="book-card">
  <p class="eyebrow">CONTROL + VALUES</p>
  <h3><a href="https://www.penguinrandomhouse.com/books/566677/human-compatible-by-stuart-russell/" rel="noopener">Human Compatible</a></h3>
  <p><strong>Stuart Russell</strong> · AI safety argument · Best for goals and uncertainty</p>
</div>

<p>Russell's central concern is not a robot suddenly becoming evil. It is the design of systems that optimize objectives which may be incomplete, misspecified or too confidently inferred. The book argues for machines that remain uncertain about human preferences instead of treating a fixed objective as the final truth.</p>

<p><strong>Read it for:</strong> the difference between intelligence and objectives, why optimization can amplify a bad specification, and one influential proposal for keeping systems responsive to human preferences.</p>

<p><strong>Tradeoff:</strong> it presents a particular research program, not a consensus solution. Human preferences are plural, changing and politically contested; uncertainty about them does not remove the question of who gets represented.</p>

<p><strong>Question to carry:</strong> Who chose the objective, which proxies stand in for it, and what happens to people who do not fit the proxy? The same question appears in <a href="/essays/scoreboards-we-mistake-for-life.html">The Scoreboards We Mistake for Life</a>.</p>

<h2 id="crawford">4. Put the cloud back on the ground</h2>
<div class="book-card">
  <p class="eyebrow">POWER + INFRASTRUCTURE</p>
  <h3><a href="https://yalebooks.yale.edu/book/9780300264630/atlas-of-ai/" rel="noopener">Atlas of AI</a></h3>
  <p><strong>Kate Crawford</strong> · Political and material analysis · Best corrective to weightless “AI”</p>
</div>

<p>Crawford examines AI as an industry built from minerals, energy, labor, data, classification and institutions—not as disembodied software floating in a cloud. Whether or not a reader accepts every interpretation, this lens corrects a persistent omission in product-centered accounts: systems have supply chains and political economies.</p>

<p><strong>Read it for:</strong> the material requirements of computation, the labor hidden in training and moderation, and the power exercised through categories and data collection.</p>

<p><strong>Tradeoff:</strong> this is a critical argument, not a balanced survey of technical capabilities. Read it as a necessary lens and compare its claims with primary data and current disclosures when making a specific decision.</p>

<p><strong>Question to carry:</strong> Which costs disappear when the interface is the only thing we look at?</p>

<h2 id="murgia">5. Finish with the people inside the system</h2>
<div class="book-card">
  <p class="eyebrow">LIVED CONSEQUENCES</p>
  <h3><a href="https://us.macmillan.com/books/9781250867391/codedependent/" rel="noopener">Code Dependent</a></h3>
  <p><strong>Madhumita Murgia</strong> · Reported case studies · Best for human impact</p>
</div>

<p>Murgia follows people encountering algorithmic systems in high-consequence settings. This changes the unit of analysis. Instead of asking only whether a model is innovative or accurate on average, the reader asks how an automated decision is experienced, contested and governed.</p>

<p><strong>Read it for:</strong> grounded reporting about power, agency and the uneven distribution of automation's benefits and harms.</p>

<p><strong>Tradeoff:</strong> reported cases illuminate consequences but do not by themselves estimate how common every failure is. Use them to find mechanisms and questions, then look for representative data.</p>

<p><strong>Question to carry:</strong> Can the affected person understand the decision, appeal it and reach somebody accountable?</p>

<h2 id="four-week">A four-week reading protocol</h2>

<p>Buying five books at once can become a decorative substitute for learning. Run a bounded sequence instead:</p>

<ol class="protocol-steps">
  <li><span>WEEK 1</span><div><strong>Build the map.</strong><p>Read Mitchell. After each chapter, write one capability you underestimated and one limitation you had been smoothing over.</p></div></li>
  <li><span>WEEK 2</span><div><strong>Change the definition.</strong><p>Read selected chapters from Griffiths and Russell. Keep separate notes for intelligence, objective, understanding and control. Do not let the words collapse into one another.</p></div></li>
  <li><span>WEEK 3</span><div><strong>Follow the infrastructure.</strong><p>Read Crawford. Pick one AI service you use and map its known inputs: hardware, energy, data, labor, vendor and institutional customer.</p></div></li>
  <li><span>WEEK 4</span><div><strong>Follow the consequence.</strong><p>Read Murgia. Choose one case and write the decision, affected person, appeal path, evidence of harm or benefit, and what remains uncertain.</p></div></li>
</ol>

<p>At the end, write a one-page position that includes: three sourced facts, two expert disagreements, one inference you now make, one speculation you refuse to promote as fact, and one practical change to how you use or evaluate AI. That structure keeps learning from turning into borrowed certainty.</p>

<h2 id="selection-rules">What did not make the list</h2>

<p>This guide excludes prompt-compilation books that age with product interfaces, breathless forecasts presented as inevitabilities, and highly technical textbooks unsuited to a general reader's first path. It also avoids ranking by popularity, retailer reviews or commission. Those signals answer different questions.</p>

<p>A missing book is not a declaration that it lacks value. Five slots force coverage choices. Add a technical course if you need implementation; add peer-reviewed papers if you need evidence on a narrow claim; add perspectives from regions and professions directly affected by the system you are studying.</p>

<h2 id="before-buying">Before you buy</h2>

<ul>
  <li>Read the publisher description and a sample; the prose has to work for you.</li>
  <li>Check your public library and interlibrary loan.</li>
  <li>Choose one starting book, not a virtue-signaling stack.</li>
  <li>For volatile technical claims, check the publication date and verify against current primary documentation.</li>
  <li>Use the site's <a href="/guides/personal-information-diet.html">personal information diet</a> to keep books, papers and news in different source tiers.</li>
</ul>

<h2 id="sources">Publisher sources and editorial boundary</h2>

<p>The descriptions and edition details were checked against the official publisher pages linked with each title on August 22, 2026. The selection, sequence and tradeoff analysis are editorial judgments by Life in the Simulation. They are not publisher claims, rankings based on sales, or reports of hands-on product testing.</p>

<p>For a complementary free route, read the primary papers cited in <a href="/essays/ai-accuracy-is-not-understanding.html">the companion essay</a>, then use the <a href="/guides/reality-audit.html">reality-audit protocol</a> on one claim from each book.</p>`,
    nextHref: "/essays/ai-accuracy-is-not-understanding.html",
    nextLabel: "Read the companion essay"
  }
];

function stripWords(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"><span></span></div>
<header class="site-header" data-site-header>
  <a class="brand" href="/" aria-label="Life in the Simulation home"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Field notes from the rendered layer</small></span></a>
  <div class="header-actions"><nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a></nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span aria-hidden="true">◐</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span><em>Menu</em></button></div>
</header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Question the defaults. Protect your attention. Live deliberately.</small></span></a><p class="footer-thesis">An independent publication about reality, consciousness, artificial intelligence, attention and the systems between us and the world.</p><div class="footer-nav"><div><strong>Read</strong><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a></div><div><strong>Reference</strong><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a><a href="/feed.xml">RSS Feed</a><a href="/sitemap.xml">Sitemap</a></div><div><strong>Project</strong><a href="/about.html">About</a><a href="/privacy.html">Privacy</a><a href="/humans.txt">Humans.txt</a></div></div></div><div class="footer-bottom"><small>© <span data-year>2026</span> Life in the Simulation.</small><small>No certainty theater. No manufactured urgency. Built for humans.</small></div></footer><script src="/assets/site.js" defer></script>${analytics}\n${visitor}\n`;
}

function render(page) {
  const canonical = `${siteUrl}/${page.path}`;
  const words = stripWords(page.body);
  const minutes = Math.max(1, Math.ceil(words / 220));
  const schema = {
    "@context": "https://schema.org",
    "@type": page.type === "essay" ? "Article" : "WebPage",
    headline: page.title,
    name: page.title,
    description: page.description,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished: published,
    dateModified: published,
    inLanguage: "en-US",
    wordCount: words,
    author: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl },
    publisher: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl },
    image: `${siteUrl}/assets/social-card.svg`
  };
  const archive = page.type === "essay" ? "Essays" : "Field Guides";
  const archivePath = page.type === "essay" ? "/essays.html" : "/field-guides.html";
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
    { "@type": "ListItem", position: 2, name: archive, item: `${siteUrl}${archivePath}` },
    { "@type": "ListItem", position: 3, name: page.title, item: canonical }
  ] };
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#090b10">
<title>${page.metaTitle}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><link rel="icon" href="/assets/favicon.svg" type="image/svg+xml"><link rel="manifest" href="/site.webmanifest"><link rel="alternate" type="application/rss+xml" title="Life in the Simulation" href="/feed.xml"><link rel="stylesheet" href="/assets/style.css">
<meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${page.metaTitle}"><meta property="og:description" content="${page.description}"><meta property="og:type" content="article"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}/assets/social-card.svg"><meta property="article:published_time" content="${published}"><meta property="article:modified_time" content="${published}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.metaTitle}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${siteUrl}/assets/social-card.svg">
<script>try{const t=localStorage.getItem('lts-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}</script><script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(crumbs)}</script>
<style>.article-body h3{margin-top:2rem}.article-body ol li,.article-body ul li{margin:.65rem 0;line-height:1.7}.reason-chain{display:grid;grid-template-columns:1fr auto 1fr auto 1fr auto 1fr;gap:.55rem;align-items:center;margin:2.5rem 0;padding:1.25rem;border:1px solid var(--line)}.reason-chain div{min-height:9rem;padding:1rem;background:rgba(127,127,127,.07);display:flex;flex-direction:column;gap:.5rem}.reason-chain div b,.reading-route b{color:var(--accent)}.reason-chain div span,.reading-route span{font-size:.85rem;opacity:.75}.reason-chain>i{font-style:normal;color:var(--accent)}.reason-chain figcaption,.reading-route figcaption{grid-column:1/-1;font-size:.82rem;opacity:.7;margin-top:.5rem}.evidence-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:2rem 0}.evidence-grid section,.book-card{border:1px solid var(--line);padding:1.2rem}.evidence-grid span,.book-card .eyebrow{font-size:.72rem;letter-spacing:.12em;color:var(--accent)}.source-list li{margin-bottom:1rem}.source-note{border-left:3px solid var(--accent);padding-left:1rem}.reading-route ol{display:grid;grid-template-columns:repeat(5,1fr);list-style:none;padding:0;margin:0;gap:.75rem}.reading-route li{min-height:8.5rem;padding:1rem;border:1px solid var(--line);display:flex;flex-direction:column;gap:.45rem}.reading-route figcaption{margin-top:1rem}.book-card{margin:1rem 0}.book-card h3{margin:.35rem 0}.book-card p:last-child{margin-bottom:0}.protocol-steps{list-style:none;padding:0}.protocol-steps li{display:grid;grid-template-columns:6rem 1fr;gap:1rem;border-top:1px solid var(--line);padding:1rem 0}.protocol-steps li>span{font-size:.75rem;letter-spacing:.1em;color:var(--accent)}.protocol-steps p{margin:.2rem 0}@media(max-width:850px){.reason-chain{grid-template-columns:1fr}.reason-chain>i{transform:rotate(90deg);justify-self:center}.evidence-grid{grid-template-columns:1fr}.reading-route ol{grid-template-columns:1fr}.reading-route li{min-height:0}}</style></head>
<body class="article-page"><div class="ambient ambient-a" aria-hidden="true"></div><div class="ambient ambient-b" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>${header()}<main id="main"><div class="article-shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><b>/</b><a href="${archivePath}">${archive}</a><b>/</b><span aria-current="page">${page.category}</span></nav><header class="article-hero"><div class="article-code"><span>${page.code}</span><i></i><b>${page.category.toUpperCase()}</b></div><h1>${page.title}</h1><p class="article-dek">${page.dek}</p><div class="article-meta"><span>${minutes} min read</span><span>${words.toLocaleString("en-US")} words</span><span>Published ${publishedHuman}</span><span class="open-status"><i></i> Status: evidence open</span></div></header><div class="article-layout"><aside class="article-rail"><div class="toc-card"><p class="eyebrow">IN THIS ${page.type === "essay" ? "TRANSMISSION" : "FIELD GUIDE"}</p><nav data-toc aria-label="Table of contents"></nav></div></aside><article class="article-body" data-article-body>${page.body}<hr><section class="article-endnote"><p class="eyebrow">END OF ${page.code}</p><h2>Keep the question. Test the model.</h2><p>Separate what is measured from what is inferred, and let better evidence revise the frame.</p></section></article><aside class="article-actions"><div class="action-card"><span>SHARE / SAVE</span><button type="button" data-copy-link>Copy link</button><button type="button" data-print>Print page</button></div><div class="action-card quiet"><span>NEXT THREAD</span><a href="${page.nextHref}">${page.nextLabel} <b>→</b></a></div></aside></div></div>
<section class="related-section section-pad"><div class="section-heading"><div><p class="eyebrow">CONTINUE THE THREAD</p><h2>Related field notes.</h2></div><a class="text-link" href="${archivePath}">Full archive <span>→</span></a></div><div class="content-grid three"><a class="content-card" href="/essays/extended-mind-is-already-here.html"><div class="card-top"><span class="tag">Mind</span></div><h3>The Extended Mind Is Already Here</h3><p>How tools participate in the loops through which people remember, decide and act.</p></a><a class="content-card" href="/guides/reality-audit.html"><div class="card-top"><span class="tag">Clarity</span></div><h3>Run a Reality Audit</h3><p>Trace an important belief back through observation, reporting and inference.</p></a><a class="content-card" href="/essays/scoreboards-we-mistake-for-life.html"><div class="card-top"><span class="tag">Systems</span></div><h3>The Scoreboards We Mistake for Life</h3><p>Why a metric can summarize a thing without becoming the thing itself.</p></a></div></section></main>${footer()}</body></html>`;
}

function upsert(path, marker, block, anchor = "</main>") {
  const full = join(root, path);
  let text = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`;
  const end = `<!-- ${marker} END -->`;
  const wrapped = `${start}\n${block}\n${end}`;
  const re = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (re.test(text)) text = text.replace(re, wrapped);
  else if (text.includes(anchor)) text = text.replace(anchor, `${wrapped}\n${anchor}`);
  else throw new Error(`Anchor ${anchor} not found in ${path}`);
  writeFileSync(full, text);
}

for (const page of pages) {
  const full = join(root, page.path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}

const essay = pages[0];
const guide = pages[1];
const card = (page) => `<a class="content-card filter-card" href="/${page.path}" data-category="${page.category.toLowerCase()}" data-search="${page.title.toLowerCase()} ${page.description.toLowerCase()} ${page.category.toLowerCase()}"><div class="card-top"><span class="tag">${page.category}</span><span class="transmission">${page.id}</span></div><h3>${page.title}</h3><p>${page.description}</p><div class="card-meta"><span>${page.type === "essay" ? "10 min read" : "Reading path"}</span><span>${page.type === "essay" ? "Read transmission" : "Open field guide"} <b>↗</b></span></div></a>`;
upsert("essays.html", "DAILY 2026-08-22 ESSAY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST TRANSMISSION</p><h2>Performance is not a theory of mind.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("field-guides.html", "DAILY 2026-08-22 GUIDE", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST FIELD GUIDE</p><h2>Build an AI reading stack that argues with itself.</h2></div></div><div class="content-grid three">${card(guide)}</div></section>`);
upsert("index.html", "DAILY 2026-08-22 HOME", `<section class="latest-section section-pad"><div class="section-heading"><div><p class="eyebrow">NEW FIELD NOTES · AUG 22</p><h2>Test the score. Then widen the map.</h2></div><a class="text-link" href="/feed.xml">Follow via RSS <span>→</span></a></div><div class="content-grid three">${card(essay)}${card(guide)}</div></section>`, "<section class=\"guide-spotlight\">");

for (const [file, replacements] of Object.entries({
  "index.html": [[">12</dt><dd>Essays", ">21</dt><dd>Essays"], [">7</dt><dd>Field guides", ">16</dt><dd>Field guides"], ["View all 12 essays", "View all 21 essays"]],
  "essays.html": [[">12 / Transmissions", ">21 / Transmissions"], [">12</span> transmissions available", ">21</span> transmissions available"]],
  "field-guides.html": [[">07 / Field guides", ">16 / Field guides"], [">7</span> protocols available", ">16</span> protocols available"]]
})) {
  const full = join(root, file);
  let text = readFileSync(full, "utf8");
  for (const [from, to] of replacements) text = text.replace(from, to);
  writeFileSync(full, text);
}

upsert("essays/extended-mind-is-already-here.html", "DAILY 2026-08-22 RELATED", `<div class="article-callout"><strong>New related transmission</strong><span>Correct outputs do not reveal the route a model took. Read <a href="/essays/ai-accuracy-is-not-understanding.html">A Model Can Be Right for the Wrong Reason</a>.</span></div>`, "<section class=\"article-endnote\">");
upsert("guides/personal-information-diet.html", "DAILY 2026-08-22 RELATED", `<section class="field-panel"><h2>Build a deeper AI source tier</h2><p>The <a href="/guides/best-books-to-understand-ai.html">five-book AI reading path</a> separates mechanisms, objectives, infrastructure and lived consequences.</p></section>`, "</article>");

const feedPath = join(root, "feed.xml");
let feed = readFileSync(feedPath, "utf8");
feed = feed.replace(/<lastBuildDate>[^<]+<\/lastBuildDate>/, "<lastBuildDate>Sat, 22 Aug 2026 13:29:00 GMT</lastBuildDate>");
feed = feed.replace(/<!-- DAILY 2026-08-22 FEED START -->[\s\S]*?<!-- DAILY 2026-08-22 FEED END -->\n?/g, "");
const items = pages.map((page) => `<item><title>${page.title}</title><link>${siteUrl}/${page.path}</link><guid isPermaLink="true">${siteUrl}/${page.path}</guid><pubDate>Sat, 22 Aug 2026 13:29:00 GMT</pubDate><category>${page.category}</category><description>${page.description.replace(/&/g, "&amp;")}</description></item>`).join("\n");
feed = feed.replace(/\s*<item>/, `\n    <!-- DAILY 2026-08-22 FEED START -->\n${items}\n<!-- DAILY 2026-08-22 FEED END -->\n<item>`);
writeFileSync(feedPath, feed);

const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const path of ["", "essays.html", "field-guides.html"]) {
  const url = `${siteUrl}/${path}`;
  const re = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc><lastmod>)[^<]+`);
  sitemap = sitemap.replace(re, `$1${published}`);
}
sitemap = sitemap.replace(/\s*<!-- DAILY 2026-08-22 SITEMAP START -->[\s\S]*?<!-- DAILY 2026-08-22 SITEMAP END -->\s*/g, "");
const urls = pages.map((page) => `<url><loc>${siteUrl}/${page.path}</loc><lastmod>${published}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `<!-- DAILY 2026-08-22 SITEMAP START -->\n${urls}\n<!-- DAILY 2026-08-22 SITEMAP END -->\n</urlset>`);
writeFileSync(sitemapPath, sitemap);

upsert("llms.txt", "DAILY 2026-08-22 CONTENT", `## Latest additions\n- ${siteUrl}/${essay.path} — ${essay.title}\n- ${siteUrl}/${guide.path} — ${guide.title}`, "## Editorial standard");

console.log(`Published ${pages.length} pages for ${published} into ${root}.`);
