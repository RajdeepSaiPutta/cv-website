const sites = [
  {
    name: "Evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator-gui",
    shown: "github.com/RajdeepSaiPutta/evaluator-gui",
    shot: "assets/evaluator-app.png",
    access: "private",
    desc: "A desktop application that grades scanned answer sheets end to end. It detects the page, straightens skew, and crops each answer region into alignment with the marking scheme; a language model then scores every answer and writes the rationale for that score. Grading runs on a small model installed on the machine itself, so a full batch of sheets can be scored offline. A teacher dashboard adds class-level analysis: grade distribution, per-question breakdowns, and a moderation control that moves the class mean toward a target without touching individual answers. Packaged with Tauri as a single executable for Linux, Windows, and macOS.",
  },
  {
    name: "500M LLM",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-app.png",
    access: "public",
    desc: "A five-hundred-million parameter language model trained completely from scratch on a single RTX 5070. Everything around the model was written by hand: the byte-pair-encoding tokenizer trained on the corpus, the FineWeb-Edu ingestion pipeline with deduplication and quality filtering, the mixed-precision training loop, and the cosine learning-rate schedule. On top of the trained weights sits a retrieval-augmented chat interface, which pulls relevant document chunks and feeds them to the model so answers stay grounded in the sources. The whole pipeline, from raw web text to a working chat product, runs from code I wrote.",
  },
  {
    name: "MedVault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault-app.png",
    access: "private",
    desc: "A vault for medical records. Photograph a report and the app reads the patient details, test names, and results with OCR, turns them into a structured record, and files the report under the correct visit. Every report also gets LLM-written summaries and explanations in plain language, and an explanation screen discusses the reports directly: what a value means and how it compares to the previous visit. Visits line up on a chronological timeline next to doctor's notes, so a full history can be read top to bottom. The file parsing runs on the server, so the phone client stays light.",
  },
  {
    name: "MerMUN website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/mermun-app.png",
    access: "public",
    desc: "A complete conference platform built for the Meridian Madhapur MUN 2026. Committee pages carry downloadable background guides and agenda material, the registration system tracks delegate details and payment deadlines, and a 3D cinematic hero plays while the page loads. The site carried registration week: it processed over five hundred delegate registrations and stayed available throughout. Hosted on Cloudflare Pages.",
  },
  {
    name: "Voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr-app.png",
    access: "public",
    desc: "A browser-based voice assistant. Microphone audio streams over a WebSocket to the server, where Whisper transcribes the speech. A small language model composes the reply and can use tools mid-conversation, searching the web when it needs facts and keeping notes across turns. The answer streams back and is spoken through text-to-speech, with transcription, reasoning, and synthesis arranged so that no stage blocks the next. Replies come back sharper and faster than mainstream cloud voice assistants like Gemini Live, because every stage overlaps instead of waiting its turn. The result is a conversation you can hold out loud without ever watching a loading spinner.",
  },
  {
    name: "Mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako-app.png",
    access: "public",
    desc: "A research agent built around a deliberately layered system design. The backend is a FastAPI application split into independent modules: session storage, document ingestion, a URL scraper, and a tool-calling core, each replaceable on its own. Inside the agent loop, a Groq language model plans and executes research steps, while Google search supplies citations and raw information; the model decides when to search, reads the results, and calls back into itself until the material is enough. The writing is done in Groq passes over the gathered sources, and the browser front-end runs a four-stage workspace (links, research, results, chat) with saved sessions so a research run can be resumed. Every stage runs through explicit hand-offs rather than one large prompt, which keeps the research inspectable and the drafting rerunnable.",
  },
  {
    name: "StethOS",
    url: "https://github.com/RajdeepSaiPutta/stethos",
    shown: "github.com/RajdeepSaiPutta/stethos",
    shot: "assets/stethos-app.png",
    access: "public",
    desc: "A desktop workstation for respiratory diagnostics that fuses three modalities into one assessment. Breath-sound recordings are classified as normal, crackle or wheeze through a log-mel spectrogram CNN; chest X-rays go through pathology classification and lung segmentation; spirometry files are read for PFT patterns and GOLD staging. A cross-attention fusion layer combines the evidence into a single risk level with per-modality contributions, and the report view ties it together with export to PDF, FHIR, DICOM-SR or raw JSON. The interface is Tauri and React, inference runs in a local Python sidecar plugin system, and without trained checkpoints the models fall back to locally-initialized weights so the full pipeline stays runnable end to end.",
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
const detailShot = document.querySelector(".detail-shot");
const modal = document.querySelector(".project-modal");

function selectSite(site, linkEl) {
  // update active state
  document.querySelectorAll(".projects-list a").forEach(a => a.classList.remove("current"));
  if (linkEl) linkEl.classList.add("current");

  // populate detail panel
  detailName.textContent = site.name;
  detailStatus.textContent = site.access === "public" ? "public repo" : "private repo";
  detailDesc.textContent = site.desc;
  detailShot.src = site.shot;
  detailShot.alt = site.name + " app screenshot";

  if (site.access === "public") {
    detailLink.href = site.url;
    detailLink.target = "_blank";
    detailLink.rel = "noopener";
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

// certificate lightbox: expand in place, never navigate away
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lbImg = lightbox.querySelector(".lightbox__img");

  function openLightbox(src, alt) {
    lbImg.src = src;
    lbImg.alt = alt || "certificate";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".cert--thumb a").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const img = a.querySelector("img");
      openLightbox(img.src, img.alt);
    });
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !lightbox.hidden) closeLightbox();
  });
}