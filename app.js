const sites = [
  {
    name: "mun website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/meridianmun.png",
    access: "public",
    desc: "conference site for the meridian madhapur mun conference. includes committee pages with downloadable background guides, registration forms with deadline tracking, and a 3d cinematic hero that plays on load. deployed to cloudflare pages and remained available throughout registration week.",
  },
  {
    name: "evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator-gui",
    shown: "github.com/RajdeepSaiPutta/evaluator-gui",
    shot: "assets/evaluator-gui.png",
    access: "private",
    desc: "desktop application for grading scanned answer sheets. straightens and crops each page, aligns answers to a marking scheme, and scores every question with a written rationale. the teacher dashboard shows the class grade distribution and one-click moderation toward a target mean. packaged with tauri as a single executable for linux, windows, and macos.",
  },
  {
    name: "medvault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault.png",
    access: "private",
    desc: "medical record repository. photograph a report and the system reads patient details, tests, and results with ocr, then arranges every visit on a chronological timeline alongside doctor's notes. parsing runs on the server so the phone client stays light.",
  },
  {
    name: "500m llm",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-llm.png",
    access: "public",
    desc: "five-hundred-million parameter language model trained from scratch on an rtx 5070. i wrote the byte-pair-encoding tokenizer, the fineweb-edu ingestion pipeline with deduplication and quality filters, the mixed-precision training loop, and the cosine learning-rate schedule. a small retrieval-augmented chat interface runs on top of the trained weights.",
  },
  {
    name: "voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr.png",
    access: "public",
    desc: "browser-based voice assistant. streams microphone audio over websockets, transcribes speech with whisper, answers with a small language model that can search the web and keep notes, and speaks the reply back. holds a conversation without loading spinners.",
  },
  {
    name: "mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako.png",
    access: "public",
    desc: "multi-step research agent. feeds it a link or pdf and it researches the company, drafts an article, scores its own seo with a rubric, and returns the document. my first multi-step agent program.",
  },
];

const grid = document.getElementById("grid");
const detailName = document.querySelector(".detail-name");
const detailStatus = document.querySelector(".detail-status");
const detailDesc = document.querySelector(".detail-desc");
const detailLink = document.querySelector(".detail-link");
const detailContent = document.querySelector(".detail-content");
const detailPlaceholder = document.querySelector(".detail-placeholder");
const detailClose = document.querySelector(".detail-close");
const modal = document.querySelector(".project-modal");

function selectSite(site, linkEl) {
  // update active state
  document.querySelectorAll(".projects-list a").forEach(a => a.classList.remove("current"));
  if (linkEl) linkEl.classList.add("current");

  // populate detail panel
  detailName.textContent = site.name;
  detailStatus.textContent = site.access === "public" ? "public repo" : "private repo";
  detailDesc.textContent = site.desc;

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
  a.addEventListener("click", (e) => {
    e.preventDefault();
    selectSite(site, a);
  });
  li.appendChild(a);
  grid.appendChild(li);
}

// select the first project by default
if (sites.length && grid.firstElementChild) {
  const firstLink = grid.querySelector("a");
  if (firstLink) selectSite(sites[0], firstLink);
}

// copy the email address to the clipboard
const copyBtn = document.querySelector(".copy-email");
if (copyBtn) {
  copyBtn.addEventListener("click", async () => {
    const email = copyBtn.dataset.email;
    let ok = false;
    try {
      await navigator.clipboard.writeText(email);
      ok = true;
    } catch {
      const ta = document.createElement("textarea");
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      ok = document.execCommand("copy");
      ta.remove();
    }
    copyBtn.textContent = ok ? "copied" : "copy";
    setTimeout(() => {
      copyBtn.textContent = "copy";
    }, 1600);
  });
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