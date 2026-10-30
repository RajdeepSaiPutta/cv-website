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

  // cover the viewport whatever its aspect ratio: scale by the bigger ratio
  function fit() {
    const w = pre.offsetWidth;
    const h = pre.offsetHeight;
    if (!w || !h) return;
    const s = Math.max(window.innerWidth / w, window.innerHeight / h) + 0.04;
    wrap.style.transform = "scale(" + s.toFixed(4) + ")";
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
