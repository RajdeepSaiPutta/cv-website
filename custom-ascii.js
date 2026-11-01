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

  // desktop / ultrawide: width-fill with small margin, uniform scale, center vertically.
// ultrawide keeps the same scale as 16:9 (side bands appear naturally).
const MOBILE = 700;
const MARGIN = 0.02; // 2% inset each side

function fit() {
    const w = pre.offsetWidth;
    const h = pre.offsetHeight;
    if (!w || !h) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    if (vw < MOBILE) {
      // mobile: crop to left mountain (30/79 cols), rows 1-15, uniform scale
      const frac = 30 / 79;
      const s = vw / (w * frac);
      const rowsShown = 14;
      const lh = h / 22;
      const ty = (vh - rowsShown * lh * s) / 2 - lh * s;
      wrap.style.transform = "scale(" + s.toFixed(4) + ") translate(0px, " + (ty / s).toFixed(1) + "px)";
      return;
    }

    // desktop / ultrawide: stage capped at 16:9 so it never stretches wider
    // than 16:9. ultrawide = height-bound with side bands; 16:9/narrow =
    // width-bound with top/bottom bands. art fits stage width.
    const stageH = vh * (1 - 2 * MARGIN);
    const stageW = stageH * (16 / 9);

    let finalW, finalH;
    if (stageW > vw * (1 - 2 * MARGIN)) {
      finalW = vw * (1 - 2 * MARGIN);
      finalH = finalW / (16 / 9);
    } else {
      finalW = stageW;
      finalH = stageH;
    }

    const s = finalW / w;
    const tx = (vw - finalW) / 2;
    const ty = (vh - finalH) / 2;

    wrap.style.transform =
      "translate(" + tx.toFixed(1) + "px, " + ty.toFixed(1) + "px) scale(" + s.toFixed(4) + ")";
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
