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

  if (reduced) {
    revealAll();
    return;
  }

  if (!name) {
    root.classList.add("motion-ready");
    setTimeout(() => {
      reveals.forEach((el, index) => {
        setTimeout(() => el.classList.add("is-in"), index * 45);
      });
    }, 80);
    return;
  }

  const full = name.dataset.type;
  name.textContent = "";
  root.classList.add("motion-ready");

  // if anything goes wrong mid-type, show the page instead of leaving it blank
  const failsafe = setTimeout(revealAll, 4000);

  let index = 0;

  function type() {
    name.textContent = full.slice(0, ++index);

    if (index < full.length) {
      setTimeout(type, full[index - 1] === " " ? 110 : 68);
      return;
    }

    clearTimeout(failsafe);
    if (caret) caret.classList.add("is-done");

    setTimeout(() => {
      reveals.forEach((el, i) => {
        setTimeout(() => el.classList.add("is-in"), i * 45);
      });
    }, 200);
  }

  setTimeout(type, 260);
})();
