(() => {
  const root = document.documentElement;
  const name = document.querySelector("[data-type]");
  const caret = document.querySelector(".wordmark__caret");
  const reveals = [...document.querySelectorAll(".reveal")];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function revealAll() {
    root.classList.add("motion-ready");
    for (const el of reveals) el.classList.add("is-in");
    if (caret) caret.classList.add("is-done");
  }

  if (reduced || !name) {
    revealAll();
    return;
  }

  const full = name.dataset.type;
  name.textContent = full;
  root.classList.add("motion-ready");

  // simple left-to-right fade - force reflow before animation
  name.style.opacity = "0";
  name.style.transform = "translateX(-2rem)";
  name.style.transition = "opacity 400ms ease, transform 400ms cubic-bezier(0.2, 0.7, 0.2, 1)";

  // Force reflow to ensure initial state is rendered
  name.offsetHeight;

  requestAnimationFrame(() => {
    name.style.opacity = "1";
    name.style.transform = "none";
  });

  if (caret) caret.classList.add("is-done");

  setTimeout(() => {
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("is-in"), i * 50);
    });
  }, 200);
})();
// Reduced-motion: instantly reveal all content
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    document.documentElement.classList.add("motion-ready");
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("is-in"));
  }
})();

// Update footer date dynamically
(() => {
  const footerDate = document.querySelector(".foot p");
  if (footerDate) {
    const now = new Date();
    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();
    footerDate.textContent = `Updated ${month} ${year}.`;
  }
})();

// Random project link: picks from Evaluator, Stethos, 500M LLM
(() => {
  const randomLink = document.getElementById("random-project-link");
  if (!randomLink) return;

  const projects = [
    { name: "Evaluator", url: "https://github.com/RajdeepSaiPutta/evaluator" },
    { name: "Stethos", url: "https://github.com/RajdeepSaiPutta/stethos" },
    { name: "500M LLM", url: "https://huggingface.co/rajdeepp11/500mWithRAG-fromscratch/tree/main" }
  ];

  let current = -1;

  function pick() {
    let next = Math.floor(Math.random() * projects.length);
    // never hand out the same project twice in a row
    if (projects.length > 1 && next === current) {
      next = (next + 1 + Math.floor(Math.random() * (projects.length - 1))) % projects.length;
    }
    current = next;
    randomLink.href = projects[next].url;
    randomLink.title = projects[next].name;
  }

  pick();

  // the new tab opens with the project currently shown, then the link
  // re-rolls so the next click lands somewhere else
  randomLink.addEventListener("click", () => {
    setTimeout(pick, 0);
  });
  randomLink.addEventListener("auxclick", () => {
    setTimeout(pick, 0);
  });
})();

