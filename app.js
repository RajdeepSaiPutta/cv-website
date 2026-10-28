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
  const tagsHtml = site.tags.map(t => `<span style="margin-right:0.5rem;color:var(--text-faint);">${t}</span>`).join("");
  detailStack.innerHTML = `<strong>Stack:</strong> ${tagsHtml}`;

  if (site.access === "public") {
    detailLink.href = site.url;
    detailLink.style.display = "inline-block";
  } else {
    detailLink.style.display = "none";
  }

  detailPlaceholder.style.display = "none";
  detailContent.style.display = "block";
}

function closeDetail() {
  detailPlaceholder.style.display = "block";
  detailContent.style.display = "none";
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
    a.style.color = var(--text-faint) || "inherit";
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