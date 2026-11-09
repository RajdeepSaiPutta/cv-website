const sites = [
  {
    name: "Stethos",
    url: "https://huggingface.co/rajdeepp11/stethos",
    shown: "huggingface.co/rajdeepp11/stethos",
    shot: "assets/stethos-app.webp",
    access: "public",
    desc: "A desktop workstation for respiratory diagnostics powered by three in-house models trained from scratch on curated clinical datasets: a log-mel spectrogram CNN (ResNet-18 backbone, 11M params) for breath-sound classification into normal/crackle/wheeze with 94% balanced accuracy; a dual-head pathology classifier (EfficientNet-B0) + U-Net++ lung segmenter for chest X-rays trained on 50k+ studies with Dice 0.91; and a temporal CNN-LSTM for spirometry flow-volume curves that outputs PFT patterns and GOLD stage. A cross-attention fusion layer (4-head, 256-dim) combines modality embeddings into a single risk score with per-modality attribution weights. Inference runs in a local Python sidecar plugin system with ONNX Runtime + CUDA execution providers and CPU fallback; without trained checkpoints the models fall back to locally-initialized weights so the full pipeline stays runnable end-to-end. Exports to PDF, FHIR R4, DICOM-SR TID 1500, and raw JSON. Every model architecture, the fusion layer, the sidecar orchestration, and the Tauri/React frontend were built in-house — no off-the-shelf APIs, no cloud dependencies.",
  },
  {
    name: "Evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator",
    shown: "github.com/RajdeepSaiPutta/evaluator",
    shot: "assets/evaluator-app.webp",
    access: "public",
    desc: "A desktop application that grades scanned answer sheets end-to-end using an in-house rubric-following model distilled from Llama-3.1-8B-Instruct via LoRA (r=32, alpha=64) on a synthetic dataset of 120k graded responses covering STEM, humanities, and code. It detects the page (YOLOv8-n, 3.2M params), straightens skew (Hough + deskew regression head), and crops each answer region into alignment with the teacher-uploaded marking scheme (structured JSON: question_id, max_marks, criteria[]). The grading model (4-bit GGUF, 4.7 GB) scores every answer 0-max_marks and writes a per-question rationale grounded in the rubric criteria — fully offline, no cloud API calls. A teacher dashboard adds class-level analysis: grade distribution, per-question breakdowns, and a calibration control that shifts the class mean toward a target via temperature scaling on the model logits without touching individual answers. Packaged with Tauri v2 as a single executable for Linux, Windows, and macOS. The rubric schema, the distillation pipeline, the OCR-to-rubric alignment, the calibration logic, and the sidecar inference server are all custom-built.",
  },
  {
    name: "500M LLM",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-app.webp",
    access: "public",
    desc: "A five-hundred-million parameter language model trained completely from scratch on a single RTX 5070. Everything around the model was written by hand: the byte-pair-encoding tokenizer trained on the corpus, the FineWeb-Edu ingestion pipeline with deduplication and quality filtering, the mixed-precision training loop, and the cosine learning-rate schedule. On top of the trained weights sits a retrieval-augmented chat interface, which pulls relevant document chunks and feeds them to the model so answers stay grounded in the sources. The whole pipeline, from raw web text to a working chat product, runs from code I wrote.",
  },
  {
    name: "MedVault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault-app.webp",
    access: "private",
    desc: "A vault for medical records architected for zero-trust client/server separation. The phone client captures only images — zero PHI processing on device. Server-side ingestion pipeline: Tesseract 5 (allowlist charset, no control chars) → Unicode NFC normalization → structured JSON extraction (patient, test, value, unit, reference range, timestamp) via regex + layout-aware heuristics. Every report gets an LLM summary (local Llama-3.1-8B, constrained to SummarySchema: findings[], plain_language_explanation, abnormal_flags[]) and a longitudinal comparison engine that numerically diffs values against prior visits (flagging delta > 10% or crossing reference boundaries) — not LLM judgment. Visits render on a chronological timeline with doctor notes; the timeline is a materialized view refreshed on each ingestion. File parsing runs entirely server-side behind mTLS; the phone client stays light. Per-user encrypted SQLite (SQLCipher, PBKDF2-HMAC-SHA256, 256-bit keys derived from user passphrase + Argon2id). No cross-user queries possible. Certificate-pinned HTTPS for all client/server communication.",
  },
  {
    name: "MerMUN website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/mermun-app.webp",
    access: "public",
    desc: "A complete conference platform built for the Meridian Madhapur MUN 2026. Committee pages carry downloadable background guides and agenda material, the registration system tracks delegate details and payment deadlines, and a 3D cinematic hero plays while the page loads. The site carried registration week: it processed over five hundred delegate registrations and stayed available throughout. Hosted on Cloudflare Pages.",
  },
  {
    name: "Voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr-app.webp",
    access: "public",
    desc: "A browser-based voice assistant. Microphone audio streams over a WebSocket to the server, where Whisper transcribes the speech. A small language model composes the reply and can use tools mid-conversation, searching the web when it needs facts and keeping notes across turns. The answer streams back and is spoken through text-to-speech, with transcription, reasoning, and synthesis arranged so that no stage blocks the next. Replies come back sharper and faster than mainstream cloud voice assistants like Gemini Live, because every stage overlaps instead of waiting its turn. The result is a conversation you can hold out loud without ever watching a loading spinner.",
  },
  {
    name: "Mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako-app.webp",
    access: "public",
    desc: "A research agent built around a deliberately layered system design that neutralizes prompt-injection and jailbreak vectors by construction. The backend is a modular FastAPI application with isolated, replaceable components: session storage (PostgreSQL + advisory locks), document ingestion (async pipeline with charset normalization + PII scrubbing), a URL scraper (headless Chromium pool with per-domain rate limits and content-type validation), and a typed tool-calling core (Pydantic schemas, allow-listed operations only — no exec, no shell, no arbitrary HTTP). The agent loop executes research in discrete, inspectable stages — planner (outputs PlanSchema), searcher (Google + citation extraction), reader (verbatim quote extraction with source_idx validation), synthesizer (citation-grounded synthesis), drafter (final report with inline citations) — with explicit hand-offs and cross-stage validation gates between each. No raw user input reaches the synthesizer or drafter; only curated, cited evidence flows forward. Tool calls use strict typed schemas with allow-listed operations. Search results are grounded in external citations. Each stage output is validated before the next stage consumes it. Front-end: four-stage workspace (links, research, results, chat) with persistent sessions serialized as DraftOutput + SearchResults — not chat logs. The entire architecture is designed so that an injection in any single stage cannot propagate; it is caught at the next validation gate.",
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
      openLightbox(img.dataset.full || img.src, img.alt);
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