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

function isLocked(site) {
  return site.access === "private" && site.name !== "meridian madhapur mun";
}

function row(site) {
  const tr = document.createElement("tr");
  tr.className = "project-row" + (isLocked(site) ? " locked" : "");

  const tdName = document.createElement("td");
  const nameLink = document.createElement(isLocked(site) ? "span" : "a");
  nameLink.className = "project-name";
  if (!isLocked(site)) nameLink.href = site.url;
  nameLink.textContent = site.name;
  tdName.appendChild(nameLink);

  const tdDesc = document.createElement("td");
  tdDesc.className = "project-desc";
  tdDesc.textContent = site.desc;

  const tdStatus = document.createElement("td");
  tdStatus.className = "project-status";
  tdStatus.textContent = site.access === "public" ? "Open source" : "Closed source";

  tr.append(tdName, tdDesc, tdStatus);

  if (!isLocked(site)) {
    tr.addEventListener("click", () => openModal(site));
  }

  return tr;
}

function openModal(site) {
  const modal = document.querySelector(".project-modal");
  const content = document.querySelector(".modal-content");
  const statusText = site.access === "public" ? "Open source" : "Closed source";
  content.innerHTML = `
    <h3>${site.name}</h3>
    <p>${site.desc}</p>
    <p><strong>Stack:</strong> ${site.tags.join(", ")}</p>
    <p><strong>Status:</strong> ${statusText}</p>
    ${site.access === "public" ? `<a href="${site.url}" target="_blank" rel="noopener">View project →</a>` : ""}
  `;
  modal.showModal();
}

const modalClose = document.querySelector(".modal-close");
if (modalClose) {
  modalClose.addEventListener("click", () => {
    document.querySelector(".project-modal").close();
  });
}

for (const site of sites) grid.append(row(site));

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