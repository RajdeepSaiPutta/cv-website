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
// night desert scene: a monochrome ascii piece (moon, dunes, horse) from
// ascii-magic, scaled to cover the viewport at any aspect ratio
(() => {
  const scene = document.querySelector("ascii-art.art-scene");
  if (!scene) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scene.setAttribute("still", "");
  }

  function fit() {
    const root = scene.shadowRoot;
    if (!root) return;
    // the player paints into a canvas next to the pre; the pre is empty
    const cv = root.querySelector("canvas") || root.querySelector("pre");
    if (!cv) return;
    // the player caps the canvas at 100% host width; a cover-fit background
    // needs the natural pixel size, so release the cap once
    if (cv.style.maxWidth !== "none") cv.style.maxWidth = "none";
    const w = cv.offsetWidth;
    const h = cv.offsetHeight;
    if (!w || !h) return;
    // cover: grow until both dimensions clear the viewport, centered
    const s = Math.max(window.innerWidth / w, window.innerHeight / h) * 1.04;
    scene.style.transform = "translate(-50%, -50%) scale(" + s.toFixed(4) + ")";
  }

  window.addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(scene);
  // the piece loads and draws asynchronously; retry until the pre has size
  for (const delay of [300, 900, 2000, 4000, 7000]) setTimeout(fit, delay);
})();

