import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";
const published = "2026-08-24";
const publishedHuman = "August 24, 2026";
const analytics = `<!-- Cloudflare Web Analytics --><script type='module' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "352a9195ed5342f9a8a9d244e13bddab"}'></script><!-- End Cloudflare Web Analytics -->`;
const visitor = `<!-- LOKWOD Website Visitor Beacon --><script defer src="https://lokwod-visitor-beacon.syracuseappraiser.workers.dev/beacon.js" data-site="life-in-the-simulation"></script><!-- End LOKWOD Website Visitor Beacon -->`;

const pages = [
  {
    type: "essay",
    id: "T-023",
    code: "TRANSMISSION 023",
    category: "Knowledge",
    path: "essays/the-feeling-of-understanding-is-not-understanding.html",
    image: "/assets/visuals/understanding-calibration-loop.svg",
    title: "The Feeling of Understanding Is Not Understanding",
    metaTitle: "The Feeling of Understanding Is Not Understanding | Life in the Simulation",
    description: "Why fluent explanations feel like knowledge, how that confidence fails under pressure, and a practical test for whether your mental model can actually do work.",
    dek: "A clean explanation can produce the sensation of knowledge before it produces a model you can use. The cure is not more certainty. It is a better test.",
    nextHref: "/guides/reality-audit.html",
    nextLabel: "Run a reality audit",
    related: [
      ["/essays/ai-accuracy-is-not-understanding.html", "AI", "A Model Can Be Right for the Wrong Reason", "Performance is evidence of performance, not automatic proof of a correct internal model."],
      ["/guides/decision-journal.html", "Decisions", "The Decision Journal", "Record what you believed before the result rewrites the memory."],
      ["/essays/search-before-wonder.html", "Attention", "Search Before Wonder", "What instant retrieval does to curiosity, memory and the unfinished question."],
    ],
    body: `<p class="lead">There is a small, treacherous pleasure in reading an explanation that clicks. The sentences are clean. The analogy lands. The answer feels obvious in retrospect. Then somebody asks you to explain the mechanism without the source in front of you, predict what happens when one condition changes, or apply the idea to a new case. The clarity evaporates.</p>
<p>That failure is not unusual, and it is not a character flaw. It is a mismatch between two things the mind often treats as one: <em>the feeling that material is easy to process</em> and <em>the possession of a model that can survive a test</em>.</p>
<div class="article-callout"><strong>The short version</strong><span>Familiarity, fluency and recognition are useful signals, but none is sufficient evidence of understanding. If an idea matters, make it explain, predict, transfer and revise.</span></div>
<h2 id="two-claims">Two claims that should not be merged</h2>
<p>The first claim is empirical: people can substantially overestimate how well they understand ordinary mechanisms. In a classic series of experiments, Leonid Rozenblit and Frank Keil asked people to rate their understanding of devices and natural phenomena, explain them in detail, and then rate their understanding again. The attempt to explain exposed gaps. The researchers called the pattern the <a href="https://doi.org/10.1207/s15516709cog2605_1" rel="noopener">illusion of explanatory depth</a>.</p>
<p>The second claim is practical: a strong explanation should change what you can do. It should let you identify the important variables, trace a causal chain, make a bounded prediction, notice an exception and update when the world pushes back. That standard is stricter than feeling convinced, but it is also kinder. It replaces shame about not knowing with a procedure for finding the edge of what you know.</p>
<p>These claims do not imply that every subject must be reconstructed from first principles. Civilization works because knowledge is distributed across people, tools and institutions. The point is calibration: knowing which parts live in your head, which parts live in the environment and which parts are still missing.</p>
<figure><img src="/assets/visuals/understanding-calibration-loop.svg" alt="A four-stage calibration loop moving from fluency to explanation, prediction and revision" width="1200" height="620"><figcaption>Confidence becomes more trustworthy after an explanation is forced to predict and then meet a result.</figcaption></figure>
<h2 id="fluency">Fluency is a cue, not a verdict</h2>
<p>Psychologists use <em>processing fluency</em> for the subjective ease with which information is processed. A broad review by Adam Alter and Daniel Oppenheimer describes how fluency can influence judgments about truth, familiarity, risk and preference. Clear wording and a familiar frame can be genuinely helpful. They reduce friction and free working memory. But the feeling of ease is ambiguous: it may come from good structure, repetition, prior exposure, a confident speaker or a conclusion you already wanted.</p>
<p>That ambiguity matters online. Interfaces reward the answer that arrives quickly, reads smoothly and closes the tab. Search snippets, explainers and AI summaries can all compress the visible labor behind a conclusion. Compression is useful. It can also conceal assumptions, uncertainty and missing steps.</p>
<p>This does not establish that summaries or AI systems necessarily damage learning. Outcomes depend on the task, the reader and how the tool is used. The narrower inference is enough: when fluent answers become abundant, fluency becomes a less discriminating signal of understanding.</p>
<h2 id="recognition">Recognition is not recall; recall is not transfer</h2>
<p>With notes open, the vocabulary looks familiar. In a multiple-choice list, the right answer stands out. Neither condition resembles the moment when the knowledge must be produced without prompts. Aslan Koriat and Robert Bjork showed how study conditions can give people cues that will not be available at test, producing <a href="https://pubmed.ncbi.nlm.nih.gov/15755238/" rel="noopener">illusions of competence</a>.</p>
<p>There are at least four increasingly demanding tests:</p>
<ol><li><strong>Recognition:</strong> can you identify the idea when it appears?</li><li><strong>Recall:</strong> can you produce its important parts without the source?</li><li><strong>Prediction:</strong> can you say what should happen before you see the result?</li><li><strong>Transfer:</strong> can you use the model in a case with different surface details?</li></ol>
<p>A reader may pass one level and fail the next. That is useful information, not humiliation. “I recognize this” is a valid status. It is simply not the same status as “I can use this.”</p>
<h2 id="ai">AI changes the supply of explanations, not the standard</h2>
<p>An AI system can generate a coherent account in seconds. Sometimes the account is accurate and useful. Sometimes it is a polished arrangement of incorrect premises. More subtly, the account may be correct while the reader remains unable to reproduce or apply it. The output’s quality and the user’s understanding are separate variables.</p>
<p>This distinction parallels <a href="/essays/ai-accuracy-is-not-understanding.html">the difference between a model being right and a model understanding why</a>, but the object of evaluation is different. There we test the system. Here we test ourselves. Quoting a correct answer does not transfer its causal structure into the person quoting it.</p>
<p>A good use of AI is therefore adversarial in the mild, scientific sense. Ask for assumptions. Request a counterexample. Make your own prediction before requesting the answer. Compare the response with a primary source. Ask the system to challenge your explanation, then verify the challenge rather than accepting it automatically.</p>
<h2 id="test">The explanation stress test</h2>
<p>Use this protocol on one consequential concept: a policy you support, a health claim you are discussing with a professional, a financial mechanism, a technical architecture or an AI capability. Do not begin with your entire worldview.</p>
<ol><li><strong>State the question narrowly.</strong> “How does a heat pump move heat in cold weather?” is testable. “Do heat pumps work?” hides the mechanism and conditions.</li><li><strong>Rate confidence before looking anything up.</strong> Use a range, not a theatrical point estimate: “I am 60–75% confident I can explain the causal chain.”</li><li><strong>Explain from memory.</strong> Write five to ten sentences. No tabs, notes or assistant. Draw arrows if the process has stages.</li><li><strong>Circle labels pretending to be explanations.</strong> Words such as “algorithm,” “incentive,” “efficiency,” “energy” and “the market” often name a box without opening it.</li><li><strong>Make one prediction.</strong> Change a variable. What should increase, decrease or fail? Record the answer before checking.</li><li><strong>Consult a strong source.</strong> Prefer original research, official documentation or a serious textbook. Mark what was wrong, absent or too confident.</li><li><strong>Revise both model and confidence.</strong> The goal is not to restore the original number. It is to leave with a narrower, more useful claim.</li></ol>
<p>This works well beside a <a href="/guides/decision-journal.html">decision journal</a>. The dated prediction protects against hindsight. A weekly <a href="/guides/reality-audit.html">reality audit</a> can then ask whether the model improved any decision or merely decorated your vocabulary.</p>
<h2 id="distributed">The environment knows more than you do</h2>
<p>Much apparent understanding is borrowed from reliable access. You know where the manual is, which colleague to ask, which search query works or which tool will calculate the result. That is not fake knowledge. It is a form of distributed competence. The mistake is forgetting the distribution and claiming all of it as internal mastery.</p>
<p>The distinction becomes visible when access disappears. Could you detect a bad answer? Could you recover the chain from first principles? Could you name the authority on which the claim depends? Our <a href="/essays/search-before-wonder.html">habit of searching before wondering</a> is not wrong because external memory is impure. It is risky when retrieval replaces the pause in which a testable model would have formed.</p>
<h2 id="boundaries">What the evidence supports—and what it does not</h2>
<div class="field-panel"><h3>Sourced fact</h3><p>People can overrate their understanding of mechanisms, and judgments of learning can rely on cues that will not be available at test. Processing fluency influences multiple judgments.</p><h3>Open disagreement</h3><p>Researchers disagree about how metacognitive cues interact across tasks and about which interventions transfer reliably outside controlled settings.</p><h3>Reasonable inference</h3><p>Because modern systems produce fluent explanations cheaply, readers should rely more heavily on recall, prediction and transfer when a claim matters.</p><h3>Speculation</h3><p>A culture saturated with synthetic explanations may become more articulate while becoming less calibrated. That is plausible, not established.</p></div>
<h2 id="institutional">Certainty theater scales</h2>
<p>Organizations reward visible fluency: the smooth briefing, the confident roadmap, the deck without unresolved arrows. Acknowledging the missing mechanism can feel like weakness even when it is the most accurate contribution in the room. The result is certainty theater—confidence optimized for social acceptance rather than contact with the system.</p>
<p>A healthier review asks four questions: What is the mechanism? What would we expect if it were true? What result would lower our confidence? Where is the source of record? These questions do not eliminate uncertainty. They make uncertainty legible enough to manage.</p>
<h2 id="practice">A smaller daily practice</h2>
<p>Once a day, pause after an explanation that feels especially satisfying. Close it. Write the causal chain in three lines. Make one prediction. Reopen the source and compare. Most ideas do not deserve this treatment; important ones do.</p>
<p>Understanding is not a mood awarded by elegant prose. It is a model with exposed joints—a model that can be questioned, used, surprised and repaired.</p>
<h2 id="sources">Sources and boundary</h2>
<ul><li>Rozenblit, L. & Keil, F. (2002), <a href="https://doi.org/10.1207/s15516709cog2605_1" rel="noopener">The misunderstood limits of folk science: an illusion of explanatory depth</a>.</li><li>Alter, A. & Oppenheimer, D. (2009), <a href="https://journals.sagepub.com/doi/10.1177/1088868309341564" rel="noopener">Uniting the Tribes of Fluency to Form a Metacognitive Nation</a>.</li><li>Koriat, A. & Bjork, R. (2005), <a href="https://pubmed.ncbi.nlm.nih.gov/15755238/" rel="noopener">Illusions of competence in monitoring one's knowledge during study</a>.</li></ul>
<p class="small-note">This essay applies findings from cognitive psychology to a modern information environment. The application to AI-mediated explanation is editorial inference, not a claim that the cited studies tested current AI systems.</p>`,
  },
  {
    type: "guide",
    id: "G-018",
    code: "FIELD GUIDE 018",
    category: "Privacy",
    path: "guides/password-managers-without-the-hype.html",
    image: "/assets/visuals/password-manager-choice-map.svg",
    title: "Password Managers Without the Hype: Bitwarden vs 1Password vs Proton Pass vs KeePassXC",
    metaTitle: "Password Managers Without the Hype: Bitwarden vs 1Password vs Proton Pass vs KeePassXC",
    description: "A practical password-manager comparison for individuals and families, including security tradeoffs, recovery planning, migration steps and the no-buy option.",
    dek: "The best password manager is not the one with the longest feature page. It is the one your household can use, recover and keep using when something goes wrong.",
    nextHref: "/guides/personal-data-minimization.html",
    nextLabel: "Minimize the data surface",
    related: [
      ["/guides/personal-data-minimization.html", "Privacy", "The Personal Data Minimization Protocol", "Reduce what services collect before trying to optimize every privacy setting."],
      ["/guides/digital-environment-reset.html", "Systems", "The Digital Environment Reset", "Rebuild devices around intentional defaults instead of accumulated permissions."],
      ["/guides/synthetic-media-checklist.html", "Verification", "The Synthetic Media Check", "A fast protocol for pausing before you trust or share questionable media."],
    ],
    body: `<p class="lead">A password manager is an infrastructure choice disguised as an app choice. The visible features matter. The harder questions matter more: Who needs access? What happens when a phone is lost? Can another adult recover the family? Who is responsible for backups? Will the system still be maintained six months from now?</p>
<div class="article-callout"><strong>Fast answer</strong><span>Choose Bitwarden for cross-platform value and technical control, 1Password for managed family sharing and recovery, Proton Pass for privacy features and aliases, or KeePassXC when you deliberately want a local vault and accept the backup burden. Staying with Apple or Google’s built-in manager can be the correct no-buy answer for a simple, single-ecosystem household.</span></div>
<aside class="commercial-note"><strong>Commercial disclosure</strong><p>This guide contains direct links to vendors so readers can verify current features and plans. They are not affiliate links, and Life in the Simulation receives no payment if you use them. No product was hands-on tested for this guide. Features were checked against official documentation on August 24, 2026; plans can change.</p></aside>
<h2 id="baseline">The baseline is boring—and important</h2>
<p>Current <a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">NIST digital identity guidance</a> says verifiers should allow password managers and autofill, and should permit pasting passwords. That reflects the real benefit: a manager makes unique, randomly generated passwords practical at human scale. Reusing one memorable password across sites creates a shared failure point.</p>
<p>A password manager does not make passwords phishing-resistant, and NIST explicitly treats passwords as non-phishing-resistant authenticators. Use stronger multifactor authentication where accounts support it—especially for email, finance, the password manager itself and the account that controls device recovery.</p>
<figure><img src="/assets/visuals/password-manager-choice-map.svg" alt="Decision map matching password-manager choices to cross-platform, family, privacy and local-control needs" width="1200" height="680"><figcaption>Start with the operating constraint, not the brand. Every path ends with recovery, MFA and export planning.</figcaption></figure>
<h2 id="choices">What each choice is actually for</h2>
<h3>Bitwarden: cross-platform value and visible control</h3>
<p><a href="https://bitwarden.com/help/password-manager-overview/" rel="noopener">Bitwarden</a> is the strongest default for people who mix operating systems, want an open-source client and care about a functional free tier. Its official plan documentation says the free personal plan supports unlimited items across unlimited devices. Family organization features cover up to six users on the Families plan. It also offers a self-hosting path.</p>
<p><strong>Tradeoff:</strong> organizational collections, individual vaults and family sharing require a little conceptual setup. Self-hosting increases control only if somebody reliably patches, monitors, backs up and recovers the service. For most households, self-hosting is an administrative project, not a free security upgrade.</p>
<h3>1Password: family operations and recovery</h3>
<p><a href="https://support.1password.com/explore/get-started-families/" rel="noopener">1Password Families</a> is built around private vaults, shared vaults and designated family organizers. Its official documentation recommends making another trusted person an organizer so one adult is not the only recovery path. Each member has an account password, Secret Key and Emergency Kit.</p>
<p><strong>Tradeoff:</strong> it is a subscription product, and the recovery model depends on family roles being configured before the emergency. The polished workflow cannot compensate for one person remaining the sole organizer, or for Emergency Kits stored where nobody can reach them.</p>
<h3>Proton Pass: privacy ecosystem and aliases</h3>
<p><a href="https://proton.me/pass/security" rel="noopener">Proton Pass</a> combines a password vault with passkeys and email aliases. Proton states that vault contents and metadata fields are end-to-end encrypted, and that its apps are open source and independently audited. Its free plan currently advertises unlimited logins and unlimited devices; paid tiers add features such as integrated two-factor codes and additional alias controls.</p>
<p><strong>Tradeoff:</strong> integration is convenient, but putting email, aliases, recovery and password storage inside one provider increases the importance of protecting and recovering that central account. Decide whether consolidation reduces household mistakes or concentrates too much operational risk.</p>
<h3>KeePassXC: a local vault with local responsibility</h3>
<p><a href="https://keepassxc.org/" rel="noopener">KeePassXC</a> is an open-source desktop password manager that stores an encrypted database file you control. There is no required cloud account or subscription. Browser integration is available, and the database format can be synchronized using a storage system you choose.</p>
<p><strong>Tradeoff:</strong> KeePassXC does not magically solve synchronization, mobile access, version conflicts or off-site backup. You own those systems. A local-only vault without tested backups is private right up until the drive fails.</p>
<h3>The no-buy choice: use the manager already in the ecosystem</h3>
<p>Apple Passwords or Google Password Manager may be enough when every important device lives in one ecosystem, sharing needs are simple and the account-recovery process is understood. Using the built-in manager consistently is better than buying a sophisticated tool nobody adopts.</p>
<p><strong>Tradeoff:</strong> leaving the ecosystem can be awkward, household roles may be less flexible, and the platform account becomes a critical recovery dependency. Verify export support before committing years of credentials.</p>
<h2 id="matrix">Decision matrix</h2>
<div class="table-wrap"><table><thead><tr><th>Priority</th><th>Best first look</th><th>Main burden</th></tr></thead><tbody><tr><td>Mixed devices, strong free option</td><td>Bitwarden</td><td>Learn organization and collection sharing</td></tr><tr><td>Family roles and assisted recovery</td><td>1Password Families</td><td>Subscription and organizer discipline</td></tr><tr><td>Aliases and privacy-focused ecosystem</td><td>Proton Pass</td><td>Manage concentration around the Proton account</td></tr><tr><td>Local file and no required cloud</td><td>KeePassXC</td><td>You own sync, backup and mobile workflow</td></tr><tr><td>Simple, single platform</td><td>Built-in Apple or Google manager</td><td>Platform dependence and export planning</td></tr></tbody></table></div>
<h2 id="questions">Seven questions before choosing</h2>
<ol><li><strong>Which devices must work?</strong> List desktop browsers, phones, tablets and any work devices where extensions are restricted.</li><li><strong>Who needs a private vault?</strong> Shared credentials should not mean one shared master password.</li><li><strong>Who can recover whom?</strong> Draw the recovery path. If the answer is “only Dad,” the family system is not finished.</li><li><strong>What must be shared?</strong> Streaming accounts are different from tax portals, medical logins and financial credentials. Minimize shared access.</li><li><strong>Where does MFA live?</strong> Keeping codes in the same vault is convenient; separating them can reduce a single point of compromise. Choose deliberately for high-value accounts.</li><li><strong>Can you export?</strong> A usable export path reduces lock-in. An exported plaintext file is itself sensitive and must be handled briefly and removed securely.</li><li><strong>Who maintains the system?</strong> Updates, recovery reviews, dormant accounts and family onboarding need an owner.</li></ol>
<h2 id="security">What the manager cannot protect</h2>
<p>No vault protects an unlocked, compromised device from everything the user can see. A malicious browser extension, active session theft, coercive sharing or approval of a convincing phishing prompt can route around a strong stored password. The manager is one layer.</p>
<ul><li>Use a long, unique master passphrase that is not stored in another account with the same recovery dependency.</li><li>Enable strong MFA on the vault. Prefer phishing-resistant methods such as security keys or passkeys when the service and your recovery plan support them.</li><li>Keep operating systems, browsers and manager extensions current.</li><li>Review extension permissions and remove abandoned browser add-ons.</li><li>Protect the primary email and platform accounts that can trigger resets.</li><li>Store recovery materials offline in a location trusted adults can access during a real emergency.</li></ul>
<p>This is also why a <a href="/guides/personal-data-minimization.html">personal data minimization protocol</a> matters. Strong credentials reduce unauthorized access. Fewer unnecessary accounts reduce the number of doors that need credentials at all.</p>
<h2 id="migration">A migration that does not create a new mess</h2>
<ol><li><strong>Map the current system.</strong> List browsers, devices, existing vaults, paper records and people who depend on them.</li><li><strong>Create the new vault and recovery plan first.</strong> Configure MFA, emergency materials and at least one second trusted organizer where supported.</li><li><strong>Test on every required device.</strong> Confirm login, autofill, lock behavior and recovery before moving everything.</li><li><strong>Import carefully.</strong> Use the vendor’s official import instructions. Expect duplicate and malformed records; review them rather than assuming success.</li><li><strong>Handle exports as hazardous files.</strong> Many exports are plaintext CSV or JSON. Keep them only as long as necessary, avoid casual cloud folders and remove them after verifying the new vault and backup.</li><li><strong>Change the highest-value passwords.</strong> Start with primary email, financial accounts, device-platform accounts and the accounts that can reset others. Generate unique values.</li><li><strong>Move the household in stages.</strong> Teach saving, sharing, recovery and phishing checks. Do not delete the old system until required records are verified.</li><li><strong>Run a recovery drill.</strong> From a signed-out device, confirm that recovery materials and the trusted-person path actually work. Record the date in a <a href="/guides/weekly-reality-check.html">weekly reality check</a>.</li></ol>
<h2 id="avoid">What not to buy—or build</h2>
<p>Do not choose by an unverified “military-grade” label, a lifetime deal from an unmaintained vendor, an opaque browser extension with no clear support history, or an ecosystem you cannot export from. Do not self-host because the diagram feels sovereign if nobody will maintain the server. Do not put every family member into one shared account to save setup time.</p>
<p>A serious tool should publish current security documentation, explain recovery and export, support MFA, maintain clients and give you a clear place to check changes. The decision is operational, not aesthetic.</p>
<h2 id="sources">Official sources checked</h2>
<ul><li><a href="https://pages.nist.gov/800-63-4/sp800-63b.html" rel="noopener">NIST SP 800-63B-4: Authentication and Authenticator Management</a></li><li><a href="https://bitwarden.com/help/password-manager-plans/" rel="noopener">Bitwarden plan documentation</a> and <a href="https://bitwarden.com/help/what-encryption-is-used/" rel="noopener">encryption documentation</a></li><li><a href="https://support.1password.com/explore/get-started-families/" rel="noopener">1Password Families setup and recovery documentation</a></li><li><a href="https://proton.me/pass/pricing" rel="noopener">Proton Pass plan comparison</a> and <a href="https://proton.me/pass/security" rel="noopener">security documentation</a></li><li><a href="https://keepassxc.org/docs/KeePassXC_UserGuide" rel="noopener">KeePassXC user guide</a></li></ul>
<p class="small-note">This is an editorial decision framework, not a security audit or guarantee. Vendor features and plans are volatile; verify the linked official documentation before choosing. For an at-risk household or organization, get advice matched to its threat model.</p>`,
  },
];

function words(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&\w+;/g, " ").trim().split(/\s+/).filter(Boolean).length;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a><div class="reading-progress" aria-hidden="true"><span></span></div><header class="site-header" data-site-header><a class="brand" href="/" aria-label="Life in the Simulation home"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Field notes from the rendered layer</small></span></a><div class="header-actions"><nav class="site-nav" id="site-nav" aria-label="Primary navigation"><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a></nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Switch color theme"><span aria-hidden="true">◐</span></button><button class="menu-toggle" type="button" data-menu-toggle aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span><em>Menu</em></button></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-top"><a class="brand footer-brand" href="/"><span class="brand-mark" aria-hidden="true"><i></i><b>L//S</b></span><span class="brand-text"><strong>Life in the Simulation</strong><small>Question the defaults. Protect your attention. Live deliberately.</small></span></a><p class="footer-thesis">An independent publication about reality, consciousness, artificial intelligence, attention and the systems between us and the world.</p><div class="footer-nav"><div><strong>Read</strong><a href="/start-here.html">Start Here</a><a href="/essays.html">Essays</a><a href="/field-guides.html">Field Guides</a><a href="/signals.html">Signals</a></div><div><strong>Reference</strong><a href="/glossary.html">Glossary</a><a href="/experiments.html">Experiments</a><a href="/feed.xml">RSS Feed</a><a href="/sitemap.xml">Sitemap</a></div><div><strong>Project</strong><a href="/about.html">About</a><a href="/privacy.html">Privacy</a><a href="/humans.txt">Humans.txt</a></div></div></div><div class="footer-bottom"><small>© <span data-year>2026</span> Life in the Simulation.</small><small>No certainty theater. No manufactured urgency. Built for humans.</small></div></footer><script src="/assets/site.js" defer></script>${analytics}\n${visitor}\n`;
}

function render(page) {
  const count = words(page.body);
  const minutes = Math.max(8, Math.ceil(count / 210));
  const canonical = `${siteUrl}/${page.path}`;
  const archivePath = page.type === "essay" ? "/essays.html" : "/field-guides.html";
  const archive = page.type === "essay" ? "Essays" : "Field Guides";
  const related = page.related.map(([href, tag, title, description]) => `<a class="content-card" href="${href}"><div class="card-top"><span class="tag">${tag}</span></div><h3>${title}</h3><p>${description}</p></a>`).join("");
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    articleSection: page.category,
    datePublished: published,
    dateModified: published,
    wordCount: count,
    mainEntityOfPage: canonical,
    image: `${siteUrl}${page.image}`,
    author: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl },
    publisher: { "@type": "Organization", name: "Life in the Simulation", url: siteUrl },
  };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${page.metaTitle}</title><meta name="description" content="${page.description}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${page.title}"><meta property="og:description" content="${page.description}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${siteUrl}${page.image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${page.title}"><meta name="twitter:description" content="${page.description}"><meta name="twitter:image" content="${siteUrl}${page.image}"><link rel="stylesheet" href="/assets/style.css"><script type="application/ld+json">${JSON.stringify(schema)}</script></head><body><div class="ambient ambient-a" aria-hidden="true"></div><div class="ambient ambient-b" aria-hidden="true"></div><div class="noise" aria-hidden="true"></div>${header()}<main id="main"><div class="article-shell"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><b>/</b><a href="${archivePath}">${archive}</a><b>/</b><span aria-current="page">${page.category}</span></nav><header class="article-hero"><div class="article-code"><span>${page.code}</span><i></i><b>${page.category.toUpperCase()}</b></div><h1>${page.title}</h1><p class="article-dek">${page.dek}</p><div class="article-meta"><span>${minutes} min read</span><span>${count.toLocaleString("en-US")} words</span><span>Published ${publishedHuman}</span><span class="open-status"><i></i> Status: evidence open</span></div></header><div class="article-layout"><aside class="article-rail"><div class="toc-card"><p class="eyebrow">IN THIS ${page.type === "essay" ? "TRANSMISSION" : "FIELD GUIDE"}</p><nav data-toc aria-label="Table of contents"></nav></div></aside><article class="article-body" data-article-body>${page.body}<hr><section class="article-endnote"><p class="eyebrow">END OF ${page.code}</p><h2>Keep the question. Test the model.</h2><p>Choose the narrowest claim the evidence can carry, then leave room for revision.</p></section></article><aside class="article-actions"><div class="action-card"><span>SHARE / SAVE</span><button type="button" data-copy-link>Copy link</button><button type="button" data-print>Print page</button></div><div class="action-card quiet"><span>NEXT THREAD</span><a href="${page.nextHref}">${page.nextLabel} <b>→</b></a></div></aside></div></div><section class="related-section section-pad"><div class="section-heading"><div><p class="eyebrow">CONTINUE THE THREAD</p><h2>Related field notes.</h2></div><a class="text-link" href="${archivePath}">Full archive <span>→</span></a></div><div class="content-grid three">${related}</div></section></main>${footer()}</body></html>`;
}

const visuals = {
  "understanding-calibration-loop.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 620" role="img" aria-labelledby="title desc"><title id="title">Understanding calibration loop</title><desc id="desc">A four-stage loop moves from a fluent explanation through explanation and prediction to revision, showing how confidence becomes calibrated by an external test.</desc><rect width="1200" height="620" rx="28" fill="#081417"/><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#71f5cc"/><stop offset="1" stop-color="#4cc9ff"/></linearGradient><marker id="a" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0 0L10 3L0 6Z" fill="#5edfd1"/></marker></defs><text x="72" y="75" fill="#9bb2b6" font-family="system-ui,sans-serif" font-size="19" letter-spacing="5">UNDERSTANDING CALIBRATION LOOP</text><text x="72" y="116" fill="#effdf9" font-family="system-ui,sans-serif" font-size="28" font-weight="700">Ease is the starting signal. Contact with a result is the test.</text><g font-family="system-ui,sans-serif"><g transform="translate(72 195)"><rect width="220" height="150" rx="18" fill="#10282b" stroke="#27565a"/><text x="24" y="45" fill="#71f5cc" font-size="16" letter-spacing="3">01 · FLUENCY</text><text x="24" y="82" fill="#fff" font-size="25" font-weight="700">It feels clear.</text><text x="24" y="113" fill="#a9bec1" font-size="16">A cue, not a verdict.</text></g><g transform="translate(350 195)"><rect width="220" height="150" rx="18" fill="#10282b" stroke="#27565a"/><text x="24" y="45" fill="#71f5cc" font-size="16" letter-spacing="3">02 · EXPLAIN</text><text x="24" y="82" fill="#fff" font-size="25" font-weight="700">Open the box.</text><text x="24" y="113" fill="#a9bec1" font-size="16">Name causal steps.</text></g><g transform="translate(628 195)"><rect width="220" height="150" rx="18" fill="#10282b" stroke="#27565a"/><text x="24" y="45" fill="#71f5cc" font-size="16" letter-spacing="3">03 · PREDICT</text><text x="24" y="82" fill="#fff" font-size="25" font-weight="700">Risk an outcome.</text><text x="24" y="113" fill="#a9bec1" font-size="16">Change one variable.</text></g><g transform="translate(906 195)"><rect width="220" height="150" rx="18" fill="#10282b" stroke="#27565a"/><text x="24" y="45" fill="#71f5cc" font-size="16" letter-spacing="3">04 · REVISE</text><text x="24" y="82" fill="#fff" font-size="25" font-weight="700">Meet the result.</text><text x="24" y="113" fill="#a9bec1" font-size="16">Update model + confidence.</text></g><path d="M292 270H338M570 270H616M848 270H894" stroke="url(#g)" stroke-width="4" marker-end="url(#a)"/><path d="M1016 365C1016 476 790 505 599 505C407 505 183 477 183 365" fill="none" stroke="#416d72" stroke-width="3" stroke-dasharray="9 9" marker-end="url(#a)"/><text x="600" y="474" text-anchor="middle" fill="#b7cecf" font-size="17">The loop returns with a narrower claim and better-calibrated confidence.</text></g><rect x="72" y="545" width="1054" height="1" fill="#234448"/><text x="72" y="580" fill="#6e898c" font-family="system-ui,sans-serif" font-size="15">Life in the Simulation · original editorial diagram · 2026</text></svg>`,
  "password-manager-choice-map.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc"><title id="title">Password manager choice map</title><desc id="desc">A decision map matches simple ecosystems, cross-platform use, family recovery, privacy aliases and local control with an appropriate password manager category, then routes every choice to recovery, multifactor authentication and exports.</desc><rect width="1200" height="680" rx="28" fill="#081417"/><defs><linearGradient id="g" x1="0" x2="1"><stop stop-color="#71f5cc"/><stop offset="1" stop-color="#4cc9ff"/></linearGradient></defs><text x="68" y="65" fill="#9bb2b6" font-family="system-ui,sans-serif" font-size="18" letter-spacing="5">PASSWORD MANAGER CHOICE MAP</text><text x="68" y="106" fill="#effdf9" font-family="system-ui,sans-serif" font-size="28" font-weight="700">Choose by operating constraint—not by the longest feature page.</text><g font-family="system-ui,sans-serif"><g transform="translate(68 160)"><rect width="196" height="200" rx="17" fill="#10282b" stroke="#27565a"/><text x="20" y="37" fill="#71f5cc" font-size="14" letter-spacing="2">SIMPLE ECOSYSTEM</text><text x="20" y="78" fill="#fff" font-size="22" font-weight="700">Built-in manager</text><text x="20" y="112" fill="#a9bec1" font-size="15"><tspan x="20" dy="0">One platform.</tspan><tspan x="20" dy="25">Light sharing.</tspan><tspan x="20" dy="25">Lowest setup burden.</tspan></text></g><g transform="translate(285 160)"><rect width="196" height="200" rx="17" fill="#10282b" stroke="#27565a"/><text x="20" y="37" fill="#71f5cc" font-size="14" letter-spacing="2">CROSS-PLATFORM</text><text x="20" y="78" fill="#fff" font-size="22" font-weight="700">Bitwarden</text><text x="20" y="112" fill="#a9bec1" font-size="15"><tspan x="20" dy="0">Mixed devices.</tspan><tspan x="20" dy="25">Strong free tier.</tspan><tspan x="20" dy="25">Visible control.</tspan></text></g><g transform="translate(502 160)"><rect width="196" height="200" rx="17" fill="#10282b" stroke="#27565a"/><text x="20" y="37" fill="#71f5cc" font-size="14" letter-spacing="2">FAMILY RECOVERY</text><text x="20" y="78" fill="#fff" font-size="22" font-weight="700">1Password</text><text x="20" y="112" fill="#a9bec1" font-size="15"><tspan x="20" dy="0">Shared + private vaults.</tspan><tspan x="20" dy="25">Organizer recovery.</tspan><tspan x="20" dy="25">Managed roles.</tspan></text></g><g transform="translate(719 160)"><rect width="196" height="200" rx="17" fill="#10282b" stroke="#27565a"/><text x="20" y="37" fill="#71f5cc" font-size="14" letter-spacing="2">PRIVACY + ALIASES</text><text x="20" y="78" fill="#fff" font-size="22" font-weight="700">Proton Pass</text><text x="20" y="112" fill="#a9bec1" font-size="15"><tspan x="20" dy="0">Email aliases.</tspan><tspan x="20" dy="25">Encrypted metadata.</tspan><tspan x="20" dy="25">Proton ecosystem.</tspan></text></g><g transform="translate(936 160)"><rect width="196" height="200" rx="17" fill="#10282b" stroke="#27565a"/><text x="20" y="37" fill="#71f5cc" font-size="14" letter-spacing="2">LOCAL CONTROL</text><text x="20" y="78" fill="#fff" font-size="22" font-weight="700">KeePassXC</text><text x="20" y="112" fill="#a9bec1" font-size="15"><tspan x="20" dy="0">Local vault file.</tspan><tspan x="20" dy="25">No required cloud.</tspan><tspan x="20" dy="25">You own operations.</tspan></text></g><path d="M166 382V430M383 382V430M600 382V430M817 382V430M1034 382V430" stroke="#53d9d1" stroke-width="3"/><path d="M166 430H1034" stroke="#53d9d1" stroke-width="3"/><path d="M600 430V473" stroke="#53d9d1" stroke-width="3"/><rect x="255" y="473" width="690" height="112" rx="18" fill="url(#g)" opacity=".17" stroke="#61e5d3"/><text x="600" y="515" text-anchor="middle" fill="#effdf9" font-size="23" font-weight="700">Every choice still needs an operating plan</text><text x="600" y="550" text-anchor="middle" fill="#b9d1d2" font-size="17">Strong master passphrase · MFA · recovery drill · verified export</text></g><text x="68" y="636" fill="#6e898c" font-family="system-ui,sans-serif" font-size="15">Life in the Simulation · original editorial diagram · no product logos or affiliate images · 2026</text></svg>`,
};
visuals["understanding-calibration-loop.svg"] = visuals["understanding-calibration-loop.svg"].replace("Risk an outcome.", "Test a result.");
visuals["password-manager-choice-map.svg"] = visuals["password-manager-choice-map.svg"].replace("Built-in manager", "Built-in vault");

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
for (const [name, svg] of Object.entries(visuals)) {
  const full = join(root, "assets", "visuals", name);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, svg);
}

const [essay, guide] = pages;
const card = (page) => `<a class="content-card filter-card" href="/${page.path}" data-category="${page.category.toLowerCase()}" data-search="${page.title.toLowerCase()} ${page.description.toLowerCase()} ${page.category.toLowerCase()}"><div class="card-top"><span class="tag">${page.category}</span><span class="transmission">${page.id}</span></div><h3>${page.title}</h3><p>${page.description}</p><div class="card-meta"><span>${page.type === "essay" ? "Evidence essay" : "Decision guide"}</span><span>${page.type === "essay" ? "Read transmission" : "Open field guide"} <b>↗</b></span></div></a>`;

upsert("essays.html", "DAILY 2026-08-24 ESSAY", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST TRANSMISSION</p><h2>Fluency can imitate comprehension.</h2></div></div><div class="content-grid three">${card(essay)}</div></section>`);
upsert("field-guides.html", "DAILY 2026-08-24 GUIDE", `<section class="section section-pad"><div class="section-heading"><div><p class="eyebrow">LATEST FIELD GUIDE</p><h2>Choose the vault you can actually maintain.</h2></div></div><div class="content-grid three">${card(guide)}</div></section>`);
upsert("index.html", "DAILY 2026-08-24 HOME", `<section class="latest-section section-pad"><div class="section-heading"><div><p class="eyebrow">NEW FIELD NOTES · AUG 24</p><h2>Test the explanation. Then protect the keys.</h2></div><a class="text-link" href="/feed.xml">Follow via RSS <span>→</span></a></div><div class="content-grid three">${card(essay)}${card(guide)}</div></section>`, "<section class=\"guide-spotlight\">");

for (const [file, replacements] of Object.entries({
  "index.html": [[">22</dt><dd>Essays", ">23</dt><dd>Essays"], [">17</dt><dd>Field guides", ">18</dt><dd>Field guides"], ["View all 22 essays", "View all 23 essays"]],
  "essays.html": [[">22 / Transmissions", ">23 / Transmissions"], [">22</span> transmissions available", ">23</span> transmissions available"]],
  "field-guides.html": [[">17 / Field guides", ">18 / Field guides"], [">17</span> protocols available", ">18</span> protocols available"]],
})) {
  const full = join(root, file);
  let text = readFileSync(full, "utf8");
  for (const [from, to] of replacements) text = text.replace(from, to);
  writeFileSync(full, text);
}

upsert("essays/ai-accuracy-is-not-understanding.html", "DAILY 2026-08-24 RELATED", `<div class="article-callout"><strong>New related transmission</strong><span>A fluent explanation can create confidence before it creates a usable model. Read <a href="/essays/the-feeling-of-understanding-is-not-understanding.html">The Feeling of Understanding Is Not Understanding</a>.</span></div>`, "<section class=\"article-endnote\">");
upsert("guides/personal-data-minimization.html", "DAILY 2026-08-24 RELATED", `<section class="field-panel"><h2>Ready to stop reusing passwords?</h2><p>Use the <a href="/guides/password-managers-without-the-hype.html">password-manager decision guide</a> to choose a maintained vault, migration path and recovery plan.</p></section>`, "</article>");

let feed = readFileSync(join(root, "feed.xml"), "utf8")
  .replace(/<lastBuildDate>[^<]+<\/lastBuildDate>/, "<lastBuildDate>Mon, 24 Aug 2026 13:23:00 GMT</lastBuildDate>")
  .replace(/<!-- DAILY 2026-08-24 FEED START -->[\s\S]*?<!-- DAILY 2026-08-24 FEED END -->\n?/g, "");
const feedItems = pages.map((page) => `<item><title>${page.title}</title><link>${siteUrl}/${page.path}</link><guid isPermaLink="true">${siteUrl}/${page.path}</guid><pubDate>Mon, 24 Aug 2026 13:23:00 GMT</pubDate><category>${page.category}</category><description>${page.description.replace(/&/g, "&amp;")}</description></item>`).join("\n");
const feedBlock = `<!-- DAILY 2026-08-24 FEED START -->\n${feedItems}\n<!-- DAILY 2026-08-24 FEED END -->\n`;
if (feed.includes("<!-- DAILY 2026-08-23 FEED START -->")) feed = feed.replace("<!-- DAILY 2026-08-23 FEED START -->", `${feedBlock}    <!-- DAILY 2026-08-23 FEED START -->`);
else feed = feed.replace(/\s*<item>/, `\n${feedBlock}<item>`);
writeFileSync(join(root, "feed.xml"), feed);

let sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
for (const path of ["", "essays.html", "field-guides.html"]) {
  const url = `${siteUrl}/${path}`;
  const re = new RegExp(`(<loc>${url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}<\\/loc><lastmod>)[^<]+`);
  sitemap = sitemap.replace(re, `$1${published}`);
}
sitemap = sitemap.replace(/\s*<!-- DAILY 2026-08-24 SITEMAP START -->[\s\S]*?<!-- DAILY 2026-08-24 SITEMAP END -->\s*/g, "");
const urls = pages.map((page) => `<url><loc>${siteUrl}/${page.path}</loc><lastmod>${published}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`).join("\n");
sitemap = sitemap.replace("</urlset>", `\n<!-- DAILY 2026-08-24 SITEMAP START -->\n${urls}\n<!-- DAILY 2026-08-24 SITEMAP END -->\n</urlset>`);
writeFileSync(join(root, "sitemap.xml"), sitemap);

let llms = readFileSync(join(root, "llms.txt"), "utf8").replace(/\n?## Daily publication 2026-08-24[\s\S]*?(?=\n## |$)/g, "");
llms += `\n\n## Daily publication 2026-08-24\n- ${essay.title}: ${siteUrl}/${essay.path}\n- ${guide.title}: ${siteUrl}/${guide.path}\n`;
writeFileSync(join(root, "llms.txt"), llms);

const creditPath = join(root, "assets", "visuals", "credits.json");
const credits = {
  generated: published,
  assets: [
    { path: "/assets/visuals/dream-evidence-filter.svg", creator: "Life in the Simulation Editorial Desk", source: "Original editorial illustration", license: "Copyright Life in the Simulation" },
    { path: "/assets/visuals/eink-tablet-choice-map.svg", creator: "Life in the Simulation Editorial Desk", source: "Original editorial illustration", license: "Copyright Life in the Simulation" },
    { path: essay.image, creator: "Life in the Simulation Editorial Desk", source: "Original editorial illustration", license: "Copyright Life in the Simulation" },
    { path: guide.image, creator: "Life in the Simulation Editorial Desk", source: "Original editorial illustration", license: "Copyright Life in the Simulation" },
  ],
};
writeFileSync(creditPath, `${JSON.stringify(credits, null, 2)}\n`);

console.log(`Published ${pages.length} pages for ${published} into ${root}.`);
