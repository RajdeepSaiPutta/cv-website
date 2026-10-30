// custom ascii background: the rider landscape with the confucius quote.
// the art ships inside the page as <script type="text/plain" id="ascii-bg-text">
// so there is no network fetch and CSP stays 'self'-only.

(() => {
  const holder = document.getElementById("ascii-bg-text");
  const wrap = document.querySelector(".ascii-bg");
  const pre = wrap && wrap.querySelector(".ascii-bg__pre");
  if (!holder || !wrap || !pre) return;

  // the opening tag adds one newline at the start - drop it
  const art = holder.textContent.replace(/^\n/, "");
  const lines = art.split("\n");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  pre.textContent = "";

  function build() {
    for (const line of lines) {
      const span = document.createElement("span");
      span.className = "ascii-bg__line";
      span.style.display = "block";
      span.textContent = line || " ";
      if (reduced) span.classList.add("is-in");
      pre.appendChild(span);
    }
  }

  // the stage is always a 16:9 rectangle, inset a little from the window
  // (zoomed out, bands of plain background around it). ultrawide monitors
  // get vertical full-height and side bands, so the art keeps its 16:9
  // shape everywhere. phones crop to a single mountain instead.
  const MOBILE = 700;

  function fit() {
    const w = pre.offsetWidth;
    const h = pre.offsetHeight;
    if (!w || !h) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw < MOBILE) {
      // one mountain and the rider above it: the left 30 of 79 columns,
      // rows 1-15, at a single undistorted scale
      const frac = 30 / 79;
      const s = vw / (w * frac);
      const rowsShown = 14;
      const lh = h / 22;
      const tx = 0;
      const ty = (vh - rowsShown * lh * s) / 2 - lh * s;
      wrap.style.transform = "scale(" + s.toFixed(4) + ") translate(0px, " + (ty / s).toFixed(1) + "px)";
      return;
    }

    const m = 0.06;
    let stageW, stageH;
    if (vw / vh >= 16 / 9) {
      stageH = vh * (1 - 2 * m);
      stageW = (stageH * 16) / 9;
    } else {
      stageW = vw * (1 - 2 * m);
      stageH = (stageW * 9) / 16;
    }
    const tx = (vw - stageW) / 2;
    const ty = (vh - stageH) / 2;
    wrap.style.transform =
      "translate(" + tx.toFixed(1) + "px, " + ty.toFixed(1) + "px)" +
      " scale(" + (stageW / w).toFixed(4) + ", " + (stageH / h).toFixed(4) + ")";
  }

  new ResizeObserver(fit).observe(wrap);
  window.addEventListener("resize", fit);

  build();
  fit();
  for (const delay of [300, 900, 2000]) setTimeout(fit, delay);

  if (reduced) return;

  // fast staggered reveal so the art reads before the name fade finishes
  const spans = [...pre.children];
  spans.forEach((span, i) => {
    setTimeout(() => span.classList.add("is-in"), i * 28);
  });
})();

// reduced-motion: instantly reveal all content
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-ready");
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
