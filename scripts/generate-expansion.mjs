import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const root = resolve(process.argv[2] || ".");
const siteUrl = "https://lifeinthesimulation.com";

const pages = [
  {
    path: "essays/when-everything-is-content.html",
    type: "essay",
    signal: "CULTURE • TRANSMISSION 007",
    title: "When Everything Becomes Content",
    description: "What changes when every meal, trip, argument, child, hobby and private moment is evaluated for its usefulness as content.",
    lead: "The camera used to arrive after the experience. Now the possibility of an audience often arrives first, quietly changing what we choose, notice and remember.",
    sections: [
      ["The invisible second room", ["A private moment has one room: the people who are actually there. A content-shaped moment has a second room filled with imagined viewers, future reactions, captions and metrics. The second room may be silent, but it changes the first.", "A meal becomes a photograph before it becomes a taste. A family trip becomes evidence of a successful family. An opinion becomes a position that must remain consistent because the archive can be searched."]],
      ["Performance is not always dishonesty", ["People have always told stories about themselves. Clothing, manners, letters and family albums were forms of presentation. The problem is not that presentation exists; it is that presentation can become continuous.", "When every experience is potentially publishable, the mind starts choosing moments for legibility. The strange, unfinished and personally meaningful lose ground to the immediately recognizable."]],
      ["Metrics reorganize desire", ["A number feels like feedback even when it measures only distribution. Views can reward outrage, novelty, beauty, certainty or intimacy without telling us whether the underlying experience was good.", "Over time, the system teaches creators and ordinary users alike to want what performs. This can happen without a conscious decision. Desire is trained by repetition."]],
      ["The cost of permanent explainability", ["A life optimized for an audience must be easy to summarize. Complicated loyalties, slow projects, changing beliefs and unphotogenic responsibilities become harder to value.", "But much of a worthwhile life is illegible from the outside: repairing trust, learning a craft badly for years, caring for someone, changing your mind and doing work that receives no applause."]],
      ["Recovering the unposted", ["The simplest resistance is not deleting every platform. It is preserving experiences that are deliberately complete without publication.", "Take the photograph and keep it. Write the thought and do not post it. Visit the place without producing a review. Allow some memories to belong only to the people who made them."]]
    ],
    reflection: ["What did I do recently that I would still value if no one knew?", "Which parts of my life have become easier to display than to inhabit?", "What deserves to remain unmeasured?"],
    faq: [
      ["Is sharing experiences always harmful?", "No. Sharing can create connection, memory and useful information. The issue is whether publication serves the experience or begins directing it."],
      ["Why does content creation change memory?", "Planning a post can shift attention toward recordable details and audience response, which may alter what is encoded and later recalled."],
      ["Can creators maintain a private life?", "Yes, but it usually requires explicit boundaries about people, places, conflicts and experiences that will not be turned into material."],
      ["What is a practical first step?", "Choose one recurring part of life—a meal, walk, family event or hobby—and keep it entirely off-platform for a month."]
    ]
  },
  {
    path: "essays/why-time-feels-faster-online.html",
    type: "essay",
    signal: "ATTENTION • TRANSMISSION 008",
    title: "Why Time Feels Faster Online",
    description: "How infinite feeds, weak memory landmarks, context switching and compressed novelty can make hours disappear and weeks feel thin.",
    lead: "Online time can feel full while it is happening and strangely empty afterward. The hour disappears because attention was occupied; memory finds little structure with which to rebuild it.",
    sections: [
      ["Occupied is not the same as memorable", ["A feed supplies constant micro-events: a joke, a headline, a face, an argument, a product, a tragedy. Each item briefly captures attention, but few become durable landmarks.", "When the mind later reconstructs the period, it finds many fragments with similar shape and weak connection. The hour feels compressed."]],
      ["Infinite systems remove endings", ["Books have pages, films have credits and walks have a return path. A feed is designed without a natural completion point. There is no moment when the activity announces that enough has happened.", "Without an ending, the user must create one while the system continues offering novelty. That is a difficult decision to repeat hundreds of times."]],
      ["Context switching creates motion without distance", ["Moving rapidly between messages, video, news and shopping feels active. Yet each switch resets context, leaving less sustained attention for any one thread.", "The day acquires the sensation of speed because the mind is constantly arriving somewhere new, even though little has been carried forward."]],
      ["Memory needs shape", ["Distinct places, conversations, physical tasks and periods of boredom give time texture. Repeated screen sessions often share the same posture, lighting and interface, so separate days resemble one another.", "This is one reason a short trip can feel longer in memory than a routine month: novelty is organized into scenes rather than dissolved into a stream."]],
      ["Slow time by creating edges", ["Use beginnings and endings that the platform does not provide. Decide what the session is for, set a stopping condition and physically change location when it ends.", "Replace some streams with bounded objects: one article, one episode, one playlist, one conversation. Time becomes easier to remember when activity has form."]]
    ],
    reflection: ["Which online sessions have a clear purpose and ending?", "What parts of last week can I reconstruct without checking a device?", "Where could I replace a stream with a bounded activity?"],
    faq: [
      ["Does novelty make time feel slower or faster?", "Novelty can make time feel fast in the moment but rich in retrospect when it forms distinct memories. Rapid low-context novelty may instead blur together."],
      ["Why can two hours of scrolling feel like twenty minutes?", "Attention remains occupied while natural stopping cues are absent, and memory may encode few durable landmarks."],
      ["Will a timer solve the problem?", "A timer can create an edge, but it works better when paired with a defined purpose and a planned next activity."],
      ["What is the best replacement for scrolling?", "Use something bounded and embodied: a walk, a chapter, a call, a small repair, a meal or one selected piece of media."]
    ]
  },
  {
    path: "essays/the-comfort-of-predictable-algorithms.html",
    type: "essay",
    signal: "SYSTEMS • TRANSMISSION 009",
    title: "The Comfort of Predictable Algorithms",
    description: "Why recommendation systems feel safe, how personalization narrows surprise and what is lost when preference becomes an environment.",
    lead: "A good recommendation system removes friction. It also removes encounters we did not know how to request—and those encounters are often where taste, friendship and identity change.",
    sections: [
      ["Prediction feels like recognition", ["When a system recommends the exact song, video or product we want, it feels attentive. The machine appears to understand us because it predicts behavior from traces we left behind.", "That recognition can be comforting, especially when the physical world feels noisy or demanding. The feed is adjusted to us; the room is not."]],
      ["Preference becomes infrastructure", ["At first, personalization responds to taste. Later, it helps produce taste by determining what is repeatedly available. Familiarity becomes liking, and liking generates more familiarity.", "The resulting environment may feel natural because alternatives are simply absent rather than explicitly rejected."]],
      ["Friction has developmental value", ["A difficult book, unfamiliar neighborhood, friend's odd recommendation or radio song chosen by someone else can interrupt the existing self. Not every interruption is valuable, but without interruption preference becomes self-sealing.", "Taste grows partly through misprediction: the thing we expected to dislike but stayed with long enough to understand."]],
      ["Personalization can make disagreement feel defective", ["When interfaces adapt continuously, other people may seem unusually inconvenient. They do not filter themselves to our interests, pace or emotional state.", "Human relationship requires exposure to repeated irrelevance, ambiguity and negotiation. Those are not bugs that can be optimized away."]],
      ["Design for chosen surprise", ["Do not wait for an algorithm to diversify itself. Borrow books from a person with different taste, visit a physical shelf, subscribe to a publication with an editorial point of view and occasionally choose by rule or chance.", "The goal is not random consumption. It is preserving a route by which the unknown can still enter."]]
    ],
    reflection: ["Which preferences are mine, and which are simply repeated exposures?", "Who regularly recommends things outside my pattern?", "What part of my media life could include deliberate surprise?"],
    faq: [
      ["Are recommendation algorithms inherently bad?", "No. They are useful tools for navigating abundance. The concern is allowing prediction to become the only route to discovery."],
      ["Why does personalization feel comfortable?", "It reduces decision effort and increases the probability of familiar reward, which can feel like being understood."],
      ["How can a filter bubble be tested?", "Compare recommendations across logged-out sessions, different accounts, physical sources and people with different habits."],
      ["What is chosen surprise?", "It is a deliberate practice of encountering material outside your predicted preferences while retaining enough structure to pay attention."]
    ]
  },
  {
    path: "guides/digital-environment-reset.html",
    type: "guide",
    signal: "FIELD GUIDE 004",
    title: "The Digital Environment Reset",
    description: "A practical reset for notifications, home screens, feeds, subscriptions, files and devices that reduces noise without requiring total disconnection.",
    lead: "Do not begin by promising yourself more willpower. Change the environment so the useful action is visible, the distracting action has friction and every alert must justify its interruption.",
    sections: [
      ["Inventory the entrances", ["List the devices, inboxes, feeds, messaging apps, browser tabs and notification channels that can claim your attention. Note which ones are essential for work or family and which exist mostly from habit.", "The goal is not purity. It is knowing where interruption enters."]],
      ["Turn off unearned alerts", ["Keep notifications for people and events that require timely action. Remove badges, promotional alerts, breaking-news noise and engagement prompts that can wait until you choose to open the app.", "An alert should represent an obligation, not merely available content."]],
      ["Rebuild the first screen", ["Place communication, navigation, camera, calendar and tools where they are easy to reach. Move feeds, shopping and entertainment off the first screen or require search.", "Set the browser's opening page to something neutral rather than a portal designed to start a session."]],
      ["Reduce repeated decisions", ["Unsubscribe from low-value mail, leave dead group threads, consolidate notes and choose one default place for tasks. Archive aggressively enough that current work is visible.", "Every unresolved channel creates a small background question about whether something important is hiding there."]],
      ["Create scheduled windows", ["Choose times for news, social feeds and non-urgent messages instead of allowing continuous checking. A schedule turns restriction into a plan: the information is not forbidden; it has an appointment.", "After a week, adjust around real responsibilities rather than abandoning the system after one imperfect day."]]
    ],
    checklist: ["List every notification source", "Disable promotional and engagement alerts", "Remove feeds from the first screen", "Set a neutral browser start page", "Unsubscribe from ten low-value emails", "Choose one task system", "Schedule two or three message windows", "Create a device-free charging location", "Review after seven days"],
    faq: [
      ["Should all notifications be disabled?", "No. Keep alerts that represent genuine time-sensitive obligations. The reset is about earning interruption."],
      ["What if work requires constant availability?", "Separate true availability channels from optional streams, and use status, priority contacts or device modes to protect the remaining attention."],
      ["How long should the reset take?", "The first pass can take an hour. The more important step is a short review after one week of real use."],
      ["Will deleting apps help?", "Sometimes. Moving, logging out or limiting an app can provide enough friction without removing a tool you still need."]
    ]
  },
  {
    path: "guides/rebuild-a-private-inner-life.html",
    type: "guide",
    signal: "FIELD GUIDE 005",
    title: "Rebuild a Private Inner Life",
    description: "A field guide to thinking, reading, making and remembering without immediately turning the experience into a post, position or performance.",
    lead: "Privacy is not only secrecy from institutions. It is also the ability to have a thought before it becomes a statement, a hobby before it becomes a brand and a memory before it becomes evidence.",
    sections: [
      ["Create an unpublished place", ["Keep a paper notebook, local document or private voice memo where thoughts do not need context, polish or consistency. Do not use it as a staging area for posts.", "The value is permission to be incomplete, wrong, repetitive and changed by tomorrow."]],
      ["Practice non-reporting", ["Choose one recurring activity that will not be announced, photographed for an audience or summarized afterward. Let the event end where it happened.", "At first this may feel like losing proof. That discomfort shows how tightly experience and display have become linked."]],
      ["Read beyond quotation", ["Stay with material long enough to absorb its structure rather than scanning for a sentence to share. Mark passages for yourself and wait before deciding what you think.", "A private encounter with a difficult idea can change you without producing a public position."]],
      ["Make something badly and keep it", ["Draw, repair, cook, build, learn an instrument or write without monetizing the process. Beginner work is especially valuable when it is protected from immediate judgment.", "Competence grows in the space where embarrassment does not have an audience."]],
      ["Protect relationships from extraction", ["Not every conversation is source material. Ask permission before sharing stories involving others, and establish areas of family life that remain outside publication.", "Trust deepens when people know they are speaking to you rather than to your future audience."]]
    ],
    checklist: ["Choose one private notebook or file", "Keep one weekly experience unposted", "Read one long work without excerpting it", "Start a non-monetized practice", "Ask before sharing another person's story", "Leave some photographs private", "Delay public opinions for 24 hours", "Review what privacy made possible"],
    faq: [
      ["Is a private inner life the same as isolation?", "No. It supports relationship by allowing reflection and experience that are not continuously mediated by an audience."],
      ["Can private writing be digital?", "Yes. The key is that it is not automatically published, optimized or connected to engagement metrics."],
      ["Why delay posting an opinion?", "Delay creates room to gather facts, notice emotional momentum and separate an immediate reaction from a considered view."],
      ["What if sharing is part of my work?", "Use explicit boundaries: certain people, topics, places and stages of the creative process remain private even when publication is professional."]
    ]
  },
  {
    path: "guides/weekly-reality-check.html",
    type: "guide",
    signal: "FIELD GUIDE 006",
    title: "The Weekly Reality Check",
    description: "A 30-minute weekly review that compares dashboards, intentions and online narratives with the physical facts of work, money, health, relationships and time.",
    lead: "Modern life produces representations faster than understanding. A weekly reality check asks what actually happened, what changed in the physical world and which numbers or stories are hiding the truth.",
    sections: [
      ["Review the calendar, not the feeling", ["Look at where time was actually spent. Identify work delivered, travel, appointments, exercise, family time and unplanned screen sessions.", "Memory tends to exaggerate the dramatic and erase the repeated. The calendar provides a rough external record."]],
      ["Translate money into decisions", ["Check major spending, recurring charges and obligations due next week. Ask which purchases solved a real problem and which were attempts to change mood or identity.", "A balance is a scoreboard; the useful question is what options, risks and responsibilities it represents."]],
      ["Inspect the physical systems", ["Walk through the home, vehicle, equipment and workspace. Note maintenance, clutter, supplies and small failures before they become urgent.", "Digital task lists often hide the condition of the actual environment they are supposed to manage."]],
      ["Name the relationship facts", ["Who did you speak with? Who is waiting for a response? Where did you avoid a necessary conversation or fail to express appreciation?", "Do not score relationships by message count. Look for attention, reliability, repair and shared time."]],
      ["Choose one corrective action", ["The review is not a ceremony of guilt. Select one change that makes the next week more real: schedule the appointment, repair the leak, cancel the subscription, take the walk or call the person.", "A small physical action closes the loop between reflection and life."]]
    ],
    checklist: ["Open last week's calendar", "Review major spending and subscriptions", "Walk the home and workspace", "Check vehicle and equipment needs", "List people awaiting a response", "Compare screen time with intention", "Write one sentence about what mattered", "Schedule one corrective action", "Choose one thing to ignore deliberately"],
    faq: [
      ["Why weekly instead of daily?", "A week is long enough to reveal patterns and short enough to correct them before they become a month."],
      ["Should the review use an app?", "It can, but paper or a simple document often reduces the temptation to turn the review into another optimization project."],
      ["What if the week went badly?", "Record the facts without building an identity from them. Choose the smallest corrective action with the highest practical value."],
      ["How long should the review take?", "Thirty minutes is enough for a useful pass. Stop before the review becomes a substitute for doing the work."]
    ]
  }
];

const esc = (value) => String(value).replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));

function render(page) {
  const canonical = `${siteUrl}/${page.path}`;
  const sections = page.sections.map(([heading, paragraphs]) => `<h2>${esc(heading)}</h2>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
  const listTitle = page.type === "guide" ? "Field checklist" : "Questions to keep";
  const listItems = (page.type === "guide" ? page.checklist : page.reflection).map((item) => `<li>${esc(item)}</li>`).join("");
  const faq = page.faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  const schema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: canonical, dateModified: "2026-08-17", author: { "@type": "Organization", name: "Life in the Simulation" }, publisher: { "@type": "Organization", name: "Life in the Simulation" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  const back = page.type === "guide" ? "../field-guides.html" : "../essays.html";
  const backLabel = page.type === "guide" ? "field guides" : "essays";
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)} | Life in the Simulation</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}"><meta property="og:type" content="article"><meta property="og:site_name" content="Life in the Simulation"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="stylesheet" href="../assets/style.css"><style>.expansion-list{padding:1.2rem 1.4rem;border:1px solid var(--line,#29313c);margin:2rem 0}.expansion-list li{margin:.7rem 0;line-height:1.6}.article details{padding:1rem 0;border-bottom:1px solid var(--line,#29313c)}.article summary{cursor:pointer;font-weight:700}.article .lead{font-size:1.25rem;line-height:1.7}</style><script type="application/ld+json">${JSON.stringify(schema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><header class="site-header"><a class="brand" href="../index.html"><span class="mark">L//S</span><span>Life in the Simulation</span></a><nav><a href="../essays.html">Essays</a><a href="../field-guides.html">Field Guides</a><a href="../about.html">About</a></nav></header><main><article class="article"><p class="eyebrow">${esc(page.signal)}</p><h1>${esc(page.title)}</h1><p class="meta">Updated August 17, 2026 · ${page.type === "guide" ? "Practical field guide" : "Long-form essay"}</p><p class="lead">${esc(page.lead)}</p>${sections}<section class="expansion-list"><h2>${listTitle}</h2><ul>${listItems}</ul></section><section><h2>Frequently asked questions</h2>${faq}</section><hr><p><a class="button ghost" href="${back}">← Back to ${backLabel}</a></p></article></main></body></html>`;
}

function upsert(path, marker, block) {
  const full = join(root, path);
  let html = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`;
  const end = `<!-- ${marker} END -->`;
  const wrapped = `${start}${block}${end}`;
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (pattern.test(html)) html = html.replace(pattern, wrapped);
  else if (html.includes("</main>")) html = html.replace("</main>", `${wrapped}</main>`);
  else html = html.replace("</body>", `${wrapped}</body>`);
  writeFileSync(full, html);
}

for (const page of pages) {
  const full = join(root, page.path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}

const essays = pages.filter((page) => page.type === "essay");
const guides = pages.filter((page) => page.type === "guide");
const essayBlock = `<section class="section"><div class="wrap"><p class="eyebrow">NEW TRANSMISSIONS</p><h2>More essays from inside the machine.</h2><div class="card-grid">${essays.map((page) => `<a class="card" href="${page.path}"><span>${esc(page.signal)}</span><h3>${esc(page.title)}</h3><p>${esc(page.description)}</p></a>`).join("")}</div></div></section>`;
const guideBlock = `<section class="section"><div class="wrap"><p class="eyebrow">NEW FIELD GUIDES</p><h2>Practical ways to recover attention and reality.</h2><div class="card-grid">${guides.map((page) => `<a class="card" href="${page.path}"><span>${esc(page.signal)}</span><h3>${esc(page.title)}</h3><p>${esc(page.description)}</p></a>`).join("")}</div></div></section>`;
upsert("essays.html", "SIMULATION ESSAY EXPANSION", essayBlock);
upsert("field-guides.html", "SIMULATION GUIDE EXPANSION", guideBlock);

const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const page of pages) {
  const loc = `${siteUrl}/${page.path}`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>\\s*`, "g"), "");
}
const entries = pages.map((page) => `<url><loc>${siteUrl}/${page.path}</loc><lastmod>2026-08-17</lastmod><changefreq>monthly</changefreq><priority>0.72</priority></url>`).join("");
sitemap = sitemap.replace("</urlset>", `${entries}</urlset>`);
writeFileSync(sitemapPath, sitemap);

console.log(`Generated ${pages.length} Life in the Simulation pages in ${root}.`);
