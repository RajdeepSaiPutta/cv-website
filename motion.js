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
// night desert scene: a monochrome ascii piece (moon, dunes, horse) from
// ascii-magic, scaled to cover the viewport at any aspect ratio
(() => {
  const scene = document.querySelector("ascii-art.art-scene");
  if (!scene) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    scene.setAttribute("still", "true");
    return;
  }

  function fit() {
    const root = scene.shadowRoot;
    if (!root) return;
    const cv = root.querySelector("canvas") || root.querySelector("pre");
    if (!cv) return;
    if (cv.style.maxWidth !== "none") cv.style.maxWidth = "none";
    const w = cv.offsetWidth;
    const h = cv.offsetHeight;
    if (!w || !h) return;
    const wide = window.innerWidth / window.innerHeight >= 1.9;
    let s;
    if (wide) {
      s = (window.innerWidth * 0.68) / w;
      s = Math.max(0.9, Math.min(1.8, s));
      scene.classList.add("framed");
    } else {
      s = Math.max(window.innerWidth / w, window.innerHeight / h) * 1.04;
      scene.classList.remove("framed");
    }
    scene.style.transform = "translate(-50%, -50%) scale(" + s.toFixed(4) + ")";
  }

  window.addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(scene);
  for (const delay of [300, 900, 2000]) setTimeout(fit, delay);
})();

