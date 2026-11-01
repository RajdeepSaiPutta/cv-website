// custom ascii background: one-mountain crop of the landscape art.
// the full art ships inside the page as <script type="text/plain" id="ascii-bg-text">
// so there is no network fetch and CSP stays 'self'-only. we render only a single
// mountain (a fixed row/col crop) and scale it uniformly inside a 16:9-bounded
// stage, so it never stretches wider than 16:9 and phones just see the one mountain.

(() => {
  const holder = document.getElementById("ascii-bg-text");
  const wrap = document.querySelector(".ascii-bg");
  const pre = wrap && wrap.querySelector(".ascii-bg__pre");
  if (!holder || !wrap || !pre) return;

  // crop window: rows 3-20 (peak through ground), cols 0-27 (the big left
  // mountain and its ridge) of the embedded art.
  const ROW_START = 3;
  const ROW_END = 20;
  const COL_START = 0;
  const COL_END = 27;

  const art = holder.textContent.replace(/^\n/, "");
  const lines = art.split("\n");

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // slice out exactly one mountain
  const mountain = lines
    .slice(ROW_START, ROW_END + 1)
    .map((l) => l.slice(COL_START, COL_END).replace(/\s+$/, ""));

  pre.textContent = "";

  function build() {
    for (const line of mountain) {
      const span = document.createElement("span");
      span.className = "ascii-bg__line";
      span.style.display = "block";
      span.textContent = line || " ";
      if (reduced) span.classList.add("is-in");
      pre.appendChild(span);
    }
  }

  // every viewport: uniform contain-fit inside a 16:9-capped stage, centered.
  // a 16:9 display fills it edge to edge; ultrawide gets side bands; phones get
  // the same single mountain, width-bound.
  const MARGIN = 0.02; // 2% inset each side

  function fit() {
    const w = pre.offsetWidth;
    const h = pre.offsetHeight;
    if (!w || !h) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const maxW = vw * (1 - 2 * MARGIN);
    const maxH = vh * (1 - 2 * MARGIN);

    // stage is never wider than 16:9
    let finalW, finalH;
    if (maxW / maxH > 16 / 9) {
      finalH = maxH;
      finalW = finalH * (16 / 9); // ultrawide: side bands
    } else {
      finalW = maxW;
      finalH = finalW * (9 / 16); // 16:9 or narrower/taller: top/bottom bands
    }

    // uniform scale, never distort past the 16:9 stage
    const s = Math.min(finalW / w, finalH / h);
    const tx = (vw - w * s) / 2;
    const ty = (vh - h * s) / 2;

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
