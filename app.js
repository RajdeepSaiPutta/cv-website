const sites = [
  {
    name: "mun website",
    url: "https://meridianmadhapurmun.pages.dev",
    shown: "meridianmadhapurmun.pages.dev",
    shot: "assets/meridianmun.png",
    access: "public",
    desc: "the site for the meridian madhapur mun conference. committees with background guides, registration with deadlines, and a spinning globe hero on the front page. it stayed up through registration week on cloudflare pages.",
    tags: ["web", "next.js", "react", "tailwind", "event"],
  },
  {
    name: "evaluator",
    url: "https://github.com/RajdeepSaiPutta/evaluator-gui",
    shown: "github.com/RajdeepSaiPutta/evaluator-gui",
    shot: "assets/evaluator-gui.png",
    access: "private",
    desc: "a desktop app that grades scanned answer sheets. it straightens and crops each answer, checks it against the marking scheme, and lists how each question was scored. tauri packs the whole thing into one executable.",
    tags: ["desktop", "react", "tauri", "ai"],
  },
  {
    name: "medvault",
    url: "https://github.com/RajdeepSaiPutta/medvault",
    shown: "github.com/RajdeepSaiPutta/medvault",
    shot: "assets/medvault.png",
    access: "private",
    desc: "keeps medical reports in one place. photograph a report and it reads the patient details, tests and results, then lines every visit up on a timeline with doctor's notes. ocr and parsing run on the server, so the phone app stays light.",
    tags: ["mobile", "react native", "expo", "supabase", "ai"],
  },
  {
    name: "500m llm",
    url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main",
    shown: "huggingface.co/rajdeepp11/500mWithRAG-fromscratch",
    shot: "assets/500m-llm.png",
    access: "public",
    desc: "a 500 million parameter model trained from scratch on an rtx 5070. i wrote the bpe tokenizer, the fineweb-edu pipeline with dedup and quality filters, the mixed-precision training loop and the cosine schedule. a small rag chat runs on top of the trained weights.",
    tags: ["python", "pytorch", "llm", "ai"],
  },
  {
    name: "voicr",
    url: "https://github.com/RajdeepSaiPutta/voicr",
    shown: "github.com/RajdeepSaiPutta/voicr",
    shot: "assets/voicr.png",
    access: "public",
    desc: "a voice assistant that lives in the browser. it streams mic audio over websockets, transcribes it with whisper, answers with a small llm that can search the web and keep notes, and speaks the reply back. it holds a conversation without you watching a spinner.",
    tags: ["python", "ai", "audio", "websockets", "groq"],
  },
  {
    name: "mako",
    url: "https://github.com/RajdeepSaiPutta/mako",
    shown: "github.com/RajdeepSaiPutta/mako",
    shot: "assets/mako.png",
    access: "public",
    desc: "feed it a link or a pdf and it researches the company, drafts an article, then scores its own seo with a rubric before handing the doc back. it was my first multi-step agent program.",
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

function selectSite(site, linkEl) {
  // update active state
  document.querySelectorAll(".projects-list a").forEach(a => a.classList.remove("current"));
  if (linkEl) linkEl.classList.add("current");

  // populate detail panel
  detailName.textContent = site.name;
  detailStatus.textContent = site.access === "public" ? "public repo" : "private repo";
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