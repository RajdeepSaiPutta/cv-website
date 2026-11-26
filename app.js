const sites = [
  {
    name: "Stethos",
    url: "https://github.com/RajdeepSaiPutta/stethos",
    shown: "github.com/RajdeepSaiPutta/stethos",
    shot: "assets/stethos-app.webp",
    access: "public",
    desc: "Three from-scratch trained networks are at the core of this respiratory diagnostic workstation. A CNN (ResNet-18, 11M params) operates on a log-mel spectrogram and classifies breath sounds with 94% balanced accuracy. Through an EfficientNet-B0 + U-Net++ dual head approach, lung segmentation and pathology classification on chest X-rays (50k studies, Dice 0.91) are performed. Spirometry flow-volume curves are fed into the temporal CNN-LSTM that outputs PFT patterns along with the GOLD stage. A 4-head cross-attention fusion layer brings modality embeddings together and forms a risk score alongside per-modality attribution. The inference is run on the local machine with ONNX Runtime using CUDA providers and CPU fallback; models get loaded with local weights if checkpoints are unavailable. Exporting is doable to PDF, FHIR R4, DICOM-SR TID 1500, and raw JSON. All components were developed internally without third-party APIs or cloud dependencies. CPU installers on Hugging Face (AppImage, .deb, .rpm, Arch); CUDA sidecar available separately.",
    tech: ["PyTorch", "ONNX Runtime", "CUDA", "Tauri v2", "React", "TypeScript", "Python", "ResNet-18", "EfficientNet-B0", "U-Net++", "CNN-LSTM"],
  },
  {
    name: "Evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator",
    shown: "github.com/RajdeepSaiPutta/evaluator",
    shot: "assets/evaluator-app.webp",
    access: "public",
    desc: "It is a desktop software that evaluates scanned answer sheets from start to finish. A rubric-following model derived from Llama-3.1-8B-Instruct by LoRA (r=32, alpha=64) on 120k synthetic graded responses supports STEM, humanities, and coding. YOLOv8-n (3.2M params) finds pages; Hough transform + deskew regression straighten skew; each answer region is aligned with the teacher's JSON marking scheme. The 4-bit GGUF grading model (4.7 GB) assigns scores 0-max_marks to answers along with per-question rationales, completely offline. The teacher dashboard adds grade distributions, per-question breakdowns, and a calibration control that adjusts the class mean via temperature scaling. Answer-similarity flags identify copied submissions. Tauri v2 compiles a single executable for Linux, Windows, macOS. Model weights (Qwen2-VL-2B-Instruct, ~4.4 GB) are downloaded on the first run.",
    tech: ["PyTorch", "LoRA", "GGUF", "YOLOv8", "Tauri v2", "React", "TypeScript", "Python", "Rust", "OpenCV", "Hough Transform"],
  },
  {
    name: "500M LLM",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-app.webp",
    access: "public",
    desc: "A 500M-parameter language model was developed entirely on a single RTX 5070. Manual: BPE tokenizer developed on the corpus, FineWeb-Edu ingestion pipeline with deduplication and quality filtering, mixed-precision training loop, cosine learning-rate schedule. Model: 24 transformer layers, 16 attention heads, 1280 embedding dimension, 512 context window, SwiGLU activation, RoPE embeddings. Retrieval-augmented chat interface that brings relevant document chunks for grounding answers. The entire pipeline is custom-coded. Weights on Hugging Face.",
    tech: ["PyTorch", "CUDA", "tokenizers (Rust)", "mixed-precision training", "cosine LR schedule", "FineWeb-Edu", "RAG", "vector search", "Python"],
  },
  {
    name: "MedVault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault-app.webp",
    access: "private",
    desc: "Healthcare record lockbox with zero-trust client/server separation. The phone client is only capturing images, so there is no processing of PHI on the device. Server ingestion goes through: Tesseract 5 (charset allowlist), Unicode NFC normalization, then structured JSON extraction (patient, test, value, unit, reference range, timestamp) via regex and layout-aware heuristics. Local Llama-3.1-8B provides constrained summaries (findings[], plain_language_explanation, abnormal_flags[]). Longitudinal engine carries out numerical differences with prior visits, flagging deltas above 10%, or reference boundaries crossings, with no LLM judgment. Server-side parsing done behind mTLS. Per-user encrypted SQLite (SQLCipher, PBKDF2-HMAC-SHA256, 256-bit keys from user passphrase + Argon2id). No cross-user queries. Certificate-pinned HTTPS. Intended for self-hosted Docker deployment.",
    tech: ["Python", "FastAPI", "Tesseract 5", "Llama-3.1-8B", "SQLite/SQLCipher", "Argon2id", "mTLS", "certificate pinning", "regex", "Unicode NFC"],
  },
  {
    name: "MerMUN website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/mermun-app.webp",
    access: "public",
    desc: "Conference platform for Meridian Madhapur MUN 2026. Committee pages contain downloadable background guides and agenda material. The registration system is aware of delegate details and payment deadlines. 500+ delegate registrations were handled with full uptime during the registration week. Built with vanilla HTML, CSS, JavaScript and Three.js for a 3D hero. Hosted on Cloudflare Pages with GitHub Actions CI/CD.",
    tech: ["HTML", "CSS", "JavaScript", "Three.js", "Cloudflare Pages", "GitHub Actions"],
  },
  {
    name: "Voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr-app.webp",
    access: "public",
    desc: "A browser-based voice assistant. Microphone audio is streamed over WebSocket to the server; Whisper transcribes. The language model is small and it generates the responses and, at the same time, uses tools: web search for facts, persistent notes across turns. The output is returned to the user by TTS. Transcription, reasoning, and synthesis are overlapped extensively so that no stage stops the next. There is a push-to-talk toggle (hold space), transcript download, auth token refresh in secured-mode.",
    tech: ["WebSocket", "WebRTC", "Whisper", "Web Speech API (TTS)", "Python", "FastAPI", "JavaScript", "Web Audio API", "async pipeline"],
  },
  {
    name: "Mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako-app.webp",
    access: "public",
    desc: "We built a research agent with layered structure, capable of neutralizing prompt-injection and jailbreak attacks just by nature of its work. A fast modular FastAPI backend consisting of separated modules (session storage with advisory locks (PostgreSQL), document ingestion - async pipeline (charset normalization + redacting PII), URL scraper (headless Chromium pool, per-domain rate limits, content-type validation)). The core of the system is a type-driven tool-calling (i.e., Pydantic schemas are used for validating the function calls and only the functions from the allowlisted operations are to be called). The agent's loop is divided into stages which can be debugged individually - planner (PlanSchema), searcher (Google + citation extraction), reader (verbatim quotes with source_idx validation), synthesizer (fact-based synthesis), drafter (report with references). In each step a decision is handed over with a clear and open validation. No raw user input is presented to synthesizer or drafter; a system only forwards the references with their citations. The frontend has 4 stages (links, research, results, chat), sessions are stored as DraftOutput + SearchResults and not chat logs. Any injection in a stage will be stopped by the next validation gate.",
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