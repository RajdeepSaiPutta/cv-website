const sites = [
  {
    name: "Stethos",
    url: "https://github.com/RajdeepSaiPutta/stethos",
    shown: "github.com/RajdeepSaiPutta/stethos",
    shot: "assets/stethos-app.webp",
    access: "public",
    desc: "Three models trained from scratch on clinical data power this respiratory diagnostic workstation. A log-mel spectrogram CNN (ResNet-18, 11M params) classifies breath sounds — normal, crackle, wheeze — at 94% balanced accuracy. An EfficientNet-B0 + U-Net++ dual head segments lungs and classifies pathology on chest X-rays (50k studies, Dice 0.91). A temporal CNN-LSTM reads spirometry flow-volume curves and outputs PFT patterns with GOLD stage. A 4-head cross-attention fusion layer combines modality embeddings into a risk score with per-modality attribution. Inference runs locally via ONNX Runtime with CUDA providers and CPU fallback; models initialize with local weights when checkpoints are absent so the pipeline stays runnable. Exports to PDF, FHIR R4, DICOM-SR TID 1500, and raw JSON. Every component — model architectures, fusion layer, sidecar orchestration, Tauri/React frontend — was built in-house. No external APIs. No cloud dependencies.",
    tech: ["PyTorch", "ONNX Runtime", "CUDA", "Tauri v2", "React", "TypeScript", "Python", "ResNet-18", "EfficientNet-B0", "U-Net++", "CNN-LSTM"],
  },
  {
    name: "Evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator",
    shown: "github.com/RajdeepSaiPutta/evaluator",
    shot: "assets/evaluator-app.webp",
    access: "public",
    desc: "Desktop app that grades scanned answer sheets end-to-end. A rubric-following model distilled from Llama-3.1-8B-Instruct via LoRA (r=32, alpha=64) on 120k synthetic graded responses covers STEM, humanities, and code. YOLOv8-n (3.2M params) detects pages; Hough transform + deskew regression straightens skew; each answer region aligns to the teacher's JSON marking scheme (question_id, max_marks, criteria[]). The 4-bit GGUF grading model (4.7 GB) scores answers 0-max_marks with per-question rationales grounded in rubric criteria — fully offline. Teacher dashboard adds class-level analysis: grade distribution, per-question breakdowns, and a calibration control that shifts the class mean via temperature scaling on logits without touching individual scores. Tauri v2 packages a single executable for Linux, Windows, macOS. Rubric schema, distillation pipeline, OCR-to-rubric alignment, calibration logic, and sidecar inference server are all custom-built.",
    tech: ["PyTorch", "LoRA", "GGUF", "YOLOv8", "Tauri v2", "React", "TypeScript", "Python", "Rust", "OpenCV", "Hough Transform"],
  },
  {
    name: "500M LLM",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-app.webp",
    access: "public",
    desc: "500M-parameter language model trained from scratch on a single RTX 5070. Hand-written: BPE tokenizer trained on the corpus, FineWeb-Edu ingestion pipeline with deduplication and quality filtering, mixed-precision training loop, cosine learning-rate schedule. Retrieval-augmented chat interface pulls relevant document chunks to ground answers in sources. Entire pipeline — raw web text to working chat — runs from custom code.",
    tech: ["PyTorch", "CUDA", "tokenizers (Rust)", "mixed-precision training", "cosine LR schedule", "FineWeb-Edu", "RAG", "vector search", "Python"],
  },
  {
    name: "MedVault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault-app.webp",
    access: "private",
    desc: "Medical record vault with zero-trust client/server separation. Phone client captures images only — zero PHI processing on device. Server ingestion: Tesseract 5 (allowlist charset) → Unicode NFC normalization → structured JSON extraction (patient, test, value, unit, reference range, timestamp) via regex + layout-aware heuristics. Local Llama-3.1-8B generates constrained summaries (findings[], plain_language_explanation, abnormal_flags[]). Longitudinal engine numerically diffs values against prior visits (flags delta > 10% or crossing reference boundaries) — no LLM judgment. Timeline renders as materialized view refreshed per ingestion. Server-side parsing behind mTLS. Per-user encrypted SQLite (SQLCipher, PBKDF2-HMAC-SHA256, 256-bit keys from user passphrase + Argon2id). No cross-user queries. Certificate-pinned HTTPS.",
    tech: ["Python", "FastAPI", "Tesseract 5", "Llama-3.1-8B", "SQLite/SQLCipher", "Argon2id", "mTLS", "certificate pinning", "regex", "Unicode NFC"],
  },
  {
    name: "MerMUN website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/mermun-app.webp",
    access: "public",
    desc: "Conference platform for Meridian Madhapur MUN 2026. Committee pages host downloadable background guides and agenda material. Registration system tracks delegate details and payment deadlines. 3D cinematic hero loads with the page. Handled 500+ delegate registrations with full uptime during registration week. Hosted on Cloudflare Pages.",
    tech: ["HTML", "CSS", "JavaScript", "Three.js", "Cloudflare Pages", "GitHub Actions"],
  },
  {
    name: "Voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr-app.webp",
    access: "public",
    desc: "Browser-based voice assistant. Microphone audio streams via WebSocket to server; Whisper transcribes. Small language model composes replies and uses tools mid-conversation — web search for facts, persistent notes across turns. Response streams back through TTS. Transcription, reasoning, and synthesis overlap so no stage blocks the next. Faster than cloud voice assistants (e.g., Gemini Live) because stages run in parallel, not sequentially. Hold a conversation out loud without watching a loading spinner.",
    tech: ["WebSocket", "WebRTC", "Whisper", "Web Speech API (TTS)", "Python", "FastAPI", "JavaScript", "Web Audio API", "async pipeline"],
  },
  {
    name: "Mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako-app.webp",
    access: "public",
    desc: "Research agent with layered architecture that neutralizes prompt-injection and jailbreak vectors by construction. Modular FastAPI backend with isolated components: session storage (PostgreSQL + advisory locks), document ingestion (async pipeline with charset normalization + PII scrubbing), URL scraper (headless Chromium pool, per-domain rate limits, content-type validation), typed tool-calling core (Pydantic schemas, allow-listed operations only — no exec, no shell, no arbitrary HTTP). Agent loop runs in discrete, inspectable stages: planner (PlanSchema), searcher (Google + citation extraction), reader (verbatim quotes with source_idx validation), synthesizer (citation-grounded synthesis), drafter (final report with inline citations). Explicit hand-offs and cross-stage validation gates between each. Raw user input never reaches synthesizer or drafter — only curated, cited evidence flows forward. Tool calls use strict typed schemas. Search results grounded in external citations. Each stage output validated before next stage consumes it. Front-end: four-stage workspace (links, research, results, chat) with persistent sessions as DraftOutput + SearchResults, not chat logs. Injection in any single stage cannot propagate; caught at next validation gate.",
    tech: ["Python", "FastAPI", "PostgreSQL", "Pydantic", "Playwright/Chromium", "Pydantic schemas", "async pipelines", "Google Search API", "React", "TypeScript", "WebSocket", "advisory locks"],
  },
];

const grid = document.getElementById("grid");
const detailName = document.querySelector(".detail-name");
const detailStatus = document.querySelector(".detail-status");
const detailDesc = document.querySelector(".detail-desc");
const detailTech = document.querySelector(".detail-tech");
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

  // tech stack
  if (site.tech && site.tech.length) {
    detailTech.innerHTML = "<strong>Tech:</strong> " + site.tech.join(", ");
  } else {
    detailTech.textContent = "";
  }

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