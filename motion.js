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

  // simple left-to-right fade
  name.style.opacity = "0";
  name.style.transform = "translateX(-2rem)";
  name.style.transition = "opacity 600ms ease, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1)";

  requestAnimationFrame(() => {
    name.style.opacity = "1";
    name.style.transform = "none";
  });

  if (caret) caret.classList.add("is-done");

  setTimeout(() => {
    reveals.forEach((el, i) => {
      setTimeout(() => el.classList.add("is-in"), i * 70);
    });
  }, 300);
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
    // cover: grow until both dimensions clear the viewport, centered.
    // on ultrawide panels (~2.4:1) that width-driven scale blows the glyphs
    // up huge; there we show the piece at about two-thirds of the viewport
    // width, centered, and fade all four edges into the page background
    // (.framed below) instead of stretching it across the screen
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
  // the piece loads and draws asynchronously; retry until the pre has size
  for (const delay of [300, 900, 2000]) setTimeout(fit, delay);
})();

