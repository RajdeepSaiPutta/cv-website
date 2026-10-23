const sites = [
  {
    name: "meridian madhapur mun",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/meridianmun.png",
    access: "private",
    desc: "the website for the meridian madhapur mun 2026 conference. committees, background guides, registration, and a hero that spins as you scroll.",
    tags: ["web", "next.js", "react", "tailwind", "event"],
  },
  {
    name: "evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator-gui",
    shown: "github.com/RajdeepSaiPutta/evaluator-gui",
    shot: "assets/evaluator-gui.png",
    access: "private",
    desc: "a desktop app for grading exam answer sheets. it reads the answer, marks each question against the marking scheme, and shows the teacher where every mark came from.",
    tags: ["desktop", "react", "tauri", "ai"],
  },
  {
    name: "medvault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault.png",
    access: "private",
    desc: "keeps medical reports in one place. you photograph a report, it reads and sorts it, and the reports build up a timeline of your history with notes from your doctor.",
    tags: ["mobile", "react native", "expo", "supabase", "ai"],
  },
  {
    name: "500m llm",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-llm.png",
    access: "public",
    desc: "a 500 million parameter language model trained from scratch on fineweb edu, with a small rag chat on top of it. the repo with the training code is on github.",
    tags: ["python", "pytorch", "llm", "ai"],
  },
  {
    name: "voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr.png",
    access: "public",
    desc: "a voice assistant that runs in the browser. press the mic, talk, and it answers out loud. it can search the web and keep notes for you.",
    tags: ["python", "ai", "audio", "websockets", "groq"],
  },
  {
    name: "mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako.png",
    access: "public",
    desc: "a marketing and journalling pipeline. give it a link or a pdf and it researches the company, writes an article and scores the seo.",
    tags: ["python", "ai", "web", "groq"],
  },
];

const grid = document.getElementById("grid");

function card(site) {
  const el = document.createElement("article");
  el.className = "entry";

  const shot = document.createElement("a");
  shot.className = "entry__shot";
  shot.href = site.url;
  const img = document.createElement("img");
  img.src = site.shot;
  img.alt = "screenshot of " + site.name;
  img.loading = "lazy";
  const badge = document.createElement("span");
  badge.className = "entry__badge entry__badge--" + site.access;
  badge.textContent = site.access;
  shot.append(img, badge);

  const foot = document.createElement("div");
  foot.className = "entry__foot";
  const name = document.createElement("a");
  name.className = "entry__name";
  name.href = site.url;
  name.textContent = site.name;
  const open = document.createElement("a");
  open.className = "entry__open";
  open.href = site.url;
  open.textContent = "open ↗";
  foot.append(name, open);

  const desc = document.createElement("p");
  desc.className = "entry__desc";
  desc.textContent = site.desc;

  const meta = document.createElement("p");
  meta.className = "entry__meta";
  const code = document.createElement("code");
  code.textContent = site.shown;
  meta.append(code);

  const tags = document.createElement("ul");
  tags.className = "entry__tags";
  for (const tag of site.tags) {
    const li = document.createElement("li");
    li.textContent = tag;
    tags.append(li);
  }

  el.append(shot, foot, desc, meta, tags);
  return el;
}

for (const site of sites) grid.append(card(site));

document.getElementById("random").addEventListener("click", () => {
  const site = sites[Math.floor(Math.random() * sites.length)];
  window.open(site.url, "_blank", "noopener");
});
