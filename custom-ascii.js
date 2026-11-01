// custom ascii background: full landscape art on desktop, a single-mountain
// crop on phones. the full art ships inside the page as
// <script type="text/plain" id="ascii-bg-text"> so there is no network fetch
// and CSP stays 'self'-only. scaling is uniform inside a 16:9-bounded stage,
// so the art never stretches wider than 16:9.

(() => {
  const holder = document.getElementById("ascii-bg-text");
  const wrap = document.querySelector(".ascii-bg");
  const pre = wrap && wrap.querySelector(".ascii-bg__pre");
  if (!holder || !wrap || !pre) return;

  // single-mountain crop: the big left peak (peak, ridge, % ground). used on
  // narrow screens only.
  const ROW_START = 3;
  const ROW_END = 20;
  const COL_START = 0;
  const COL_END = 27;

  const art = holder.textContent.replace(/^\n/, "");
  const lines = art.split("\n");

  const full = lines.map((l) => l.replace(/\s+$/, ""));
  const mountain = lines
    .slice(ROW_START, ROW_END + 1)
    .map((l) => l.slice(COL_START, COL_END).replace(/\s+$/, ""));

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  pre.textContent = "";

  const MOBILE = 700;
  const MARGIN = 0.02; // 2% inset each side

  let mode = null;
  let revealed = false;

  function setMode(next) {
    if (mode === next) return;
    mode = next;
    const src = next === "mobile" ? mountain : full;
    pre.textContent = "";
    src.forEach((line, i) => {
      const span = document.createElement("span");
      span.className = "ascii-bg__line";
      span.style.display = "block";
      span.textContent = line || " ";
      if (reduced || revealed) span.classList.add("is-in");
      pre.appendChild(span);
    });
  }

  // every viewport: uniform contain-fit inside a 16:9-capped stage, centered.
  // a 16:9 display fits the stage edge to edge; ultrawide gets side bands;
  // phones get the single mountain, width-bound.
  function fit() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    setMode(vw < MOBILE ? "mobile" : "desktop");

    const w = pre.offsetWidth;
    const h = pre.offsetHeight;
    if (!w || !h) return;

    const maxW = vw * (1 - 2 * MARGIN);
    const maxH = vh * (1 - 2 * MARGIN);

    if (vw < MOBILE) {
      // phones: contain the single mountain in the FULL viewport (the 16:9
      // stage cap is a desktop rule). the crop is portrait-ish, so on a
      // portrait phone this is width-bound: one mountain, filling the width.
      const s = Math.min(maxW / w, maxH / h);
      const ty = (vh - h * s) / 2;
      wrap.style.transform =
        "translate(0px, " + ty.toFixed(1) + "px) scale(" + s.toFixed(4) + ")";
      return;
    }

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

  fit();
  for (const delay of [300, 900, 2000]) setTimeout(fit, delay);

  if (reduced) return;

  // fast staggered reveal so the art reads before the name fade finishes
  let spans = [...pre.children];
  spans.forEach((span, i) => {
    setTimeout(() => span.classList.add("is-in"), i * 28);
  });
  revealed = true;
})();

// reduced-motion: instantly reveal all content
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("motion-ready");
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-in"));
  }
})();
