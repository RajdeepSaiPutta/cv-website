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
    scene.setAttribute("still", "");
    return;
  }

  let pauseCount = 0;
  function setPaused(paused) {
    pauseCount += paused ? 1 : -1;
    if (pauseCount > 0) scene.setAttribute("still", "");
    else scene.removeAttribute("still");
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

  // Pause animation during interactions to eliminate lag
  const projectList = document.querySelector(".projects-list");
  const detailContent = document.querySelector(".detail-content");
  const lightbox = document.querySelector(".lightbox");
  const certTrack = document.querySelector(".certs-track");

  function checkPause() {
    const hoveringProject = projectList && projectList.matches(":hover");
    const detailOpen = detailContent && !detailContent.hidden;
    const lightboxOpen = lightbox && !lightbox.hidden;
    const hoveringCerts = certTrack && certTrack.matches(":hover");
    setPaused(hoveringProject || detailOpen || lightboxOpen || hoveringCerts);
  }

  // Check on hover events
  [projectList, certTrack].forEach(el => {
    if (el) {
      el.addEventListener("mouseenter", checkPause);
      el.addEventListener("mouseleave", checkPause);
    }
  });

  // Check on detail panel open/close
  const observer = new MutationObserver(checkPause);
  if (detailContent) observer.observe(detailContent, { attributes: true, attributeFilter: ["hidden"] });
  if (lightbox) observer.observe(lightbox, { attributes: true, attributeFilter: ["hidden"] });

  // Also pause during scroll
  let scrollTimer;
  window.addEventListener("scroll", () => {
    setPaused(true);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => setPaused(false), 150);
  }, { passive: true });

  window.addEventListener("resize", fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(scene);
  for (const delay of [300, 900, 2000]) setTimeout(fit, delay);
})();

