const sites = [
  {
    name: "meridian madhapur mun",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/meridianmun.png",
    access: "private",
    desc: "the full site for the meridian madhapur mun 2026 conference. built the committee matrix with downloadable background guides, a registration flow with deadline tracking, and a scroll-driven hero with a spinning globe. deployed on cloudflare pages and pressure-tested when registration actually opened for 200+ delegates.",
    tags: ["web", "next.js", "react", "tailwind", "event"],
  },
  {
    name: "evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator-gui",
    shown: "github.com/RajdeepSaiPutta/evaluator-gui",
    shot: "assets/evaluator-gui.png",
    access: "private",
    desc: "a desktop app that grades scanned exam answer sheets. the pipeline deskews and crops each answer region, then a small local model compares the handwriting against the marking scheme and writes a per-question breakdown so the teacher sees exactly where every mark came from. built with tauri so it ships as one small binary.",
    tags: ["desktop", "react", "tauri", "ai"],
  },
  {
    name: "medvault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault.png",
    access: "private",
    desc: "keeps a person's entire medical history in one place. photograph a report and the app parses it into structured fields - patient block, tests, results - then stitches every visit into one timeline with doctor notes attached. ocr and parsing run server-side so the phone stays light. built with react native and expo, backed by supabase.",
    tags: ["mobile", "react native", "expo", "supabase", "ai"],
  },
  {
    name: "500m llm",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-llm.png",
    access: "public",
    desc: "a 500 million parameter decoder-only transformer trained completely from scratch on a single rtx 5070 - my own bpe tokenizer, a fineweb-edu data pipeline with dedup and quality filtering, mixed-precision training under a cosine lr schedule, and checkpoints evaluated on the way. on top sits a small rag chat layer over the trained weights. the project where scaling laws stopped being abstract.",
    tags: ["python", "pytorch", "llm", "ai"],
  },
  {
    name: "voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr.png",
    access: "public",
    desc: "a voice assistant living in the browser. it streams mic audio over websockets, transcribes with whisper, answers with a small llm that can search the web and keep notes across sessions, then speaks the reply back - all near real-time. taught me audio chunking, backpressure, and why latency budgets aren't optional.",
    tags: ["python", "ai", "audio", "websockets", "groq"],
  },
  {
    name: "mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako.png",
    access: "public",
    desc: "a research-to-content pipeline. feed it a link or a pdf and it crawls the company, extracts the claims worth making, drafts an article from them, then scores its own seo with a rubric before sending the doc back. my first multi-step agent, and the reason i learned to love structured outputs.",
    tags: ["python", "ai", "web", "groq"],
  },
];

const grid = document.getElementById("grid");
const detailName = document.querySelector(".detail-name");
const detailStatus = document.querySelector(".detail-status");
const detailDesc = document.querySelector(".detail-desc");
const detailStack = document.querySelector(".detail-stack");
const detailLink = document.querySelector(".detail-link");
const detailContent = document.querySelector(".detail-content");
const detailPlaceholder = document.querySelector(".detail-placeholder");
const detailClose = document.querySelector(".detail-close");
const modal = document.querySelector(".project-modal");

function isLocked(site) {
  return site.access === "private" && site.name !== "meridian madhapur mun";
}

function selectSite(site, linkEl) {
  // update active state
  document.querySelectorAll(".projects-list a").forEach(a => a.classList.remove("current"));
  if (linkEl) linkEl.classList.add("current");

  // populate detail panel
  detailName.textContent = site.name;
  detailStatus.textContent = site.access === "public" ? "Open source" : "Closed source";
  detailDesc.textContent = site.desc;
  const tagsHtml = site.tags.map(t => `<span class="detail-tag">${t}</span>`).join("");
  detailStack.innerHTML = `<strong>Stack:</strong> ${tagsHtml}`;

  if (site.access === "public") {
    detailLink.href = site.url;
    detailLink.style.display = "inline-block";
  } else {
    detailLink.style.display = "none";
  }

  detailPlaceholder.style.display = "none";
  detailContent.hidden = false;
}

function closeDetail() {
  const placeholder = document.querySelector(".detail-placeholder");
  const detailContent = document.querySelector(".detail-content");
  placeholder.style.display = "";
  detailContent.hidden = true;
  document.querySelectorAll(".projects-list a").forEach(a => a.classList.remove("current"));
}

if (detailClose) {
  detailClose.addEventListener("click", closeDetail);
}

for (const site of sites) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = site.name;
  if (isLocked(site)) {
    a.style.pointerEvents = "none";
    a.style.opacity = "0.6";
    a.style.color = "#b8b8b8";
    a.style.textDecoration = "none";
  } else {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      selectSite(site, a);
    });
  }
  li.appendChild(a);
  grid.appendChild(li);
}

// select the first non-locked project by default
const firstPublic = sites.find(s => !isLocked(s));
if (firstPublic && grid.firstElementChild) {
  // find the corresponding link element
  const links = grid.querySelectorAll("a");
  const targetLink = [...links].find(l => l.textContent.trim() === firstPublic.name);
  if (targetLink) selectSite(firstPublic, targetLink);
}

// Cert slider arrows
const track = document.querySelector(".certs-track");
const prevBtn = document.querySelector(".certs-arrow--prev");
const nextBtn = document.querySelector(".certs-arrow--next");

if (track && prevBtn && nextBtn) {
  const step = 220;
  prevBtn.addEventListener("click", () => {
    track.scrollBy({ left: -step, behavior: "smooth" });
  });
  nextBtn.addEventListener("click", () => {
    track.scrollBy({ left: step, behavior: "smooth" });
  });
}