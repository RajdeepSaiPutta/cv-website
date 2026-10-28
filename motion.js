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
// monochrome desert night: moon, sand, horse
(() => {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  canvas.style.userSelect = "none";
  document.body.insertBefore(canvas, document.body.firstChild);
  document.body.style.background = "transparent";

  const ctx = canvas.getContext("2d");

  function mulberry(seed) {
    return function() {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // standing horse, one filled silhouette, drawn in a 110 x 100 unit box
  function horse() {
    ctx.beginPath();
    ctx.moveTo(68.6, 16.8);
    ctx.lineTo(74.8, 22.4);
    ctx.lineTo(88.0, 26.0);
    ctx.lineTo(102.0, 34.0);
    ctx.lineTo(103.5, 40.5);
    ctx.lineTo(95.0, 43.0);
    ctx.lineTo(78.0, 48.0);
    ctx.lineTo(74.0, 58.0);
    ctx.lineTo(74.0, 100.0);
    ctx.lineTo(69.4, 100.0);
    ctx.lineTo(66.0, 64.0);
    ctx.lineTo(58.0, 100.0);
    ctx.lineTo(53.4, 100.0);
    ctx.lineTo(56.0, 60.0);
    ctx.lineTo(40.0, 58.5);
    ctx.lineTo(30.0, 100.0);
    ctx.lineTo(25.4, 100.0);
    ctx.lineTo(33.0, 55.0);
    ctx.bezierCurveTo(24, 50, 20, 38, 24, 30);
    ctx.lineTo(52.0, 30.4);
    ctx.bezierCurveTo(60, 27, 64, 22, 68.6, 16.8);
    ctx.closePath();
    ctx.moveTo(23.6, 30.4);
    ctx.bezierCurveTo(16.7, 34.9, 12, 44, 10.4, 56.4);
    ctx.bezierCurveTo(13.2, 47.2, 17.7, 39.6, 23.2, 36.2);
    ctx.closePath();
    ctx.fill();
  }

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const unit = Math.min(w, h);

    // moon
    const mx = w * 0.74;
    const my = h * 0.2;
    const mr = unit * 0.11;
    ctx.fillStyle = "rgba(226, 226, 226, 0.09)";
    ctx.beginPath();
    ctx.arc(mx, my, mr, 0, Math.PI * 2);
    ctx.fill();
    const craters = mulberry(7);
    ctx.fillStyle = "rgba(31, 33, 35, 0.18)";
    for (let i = 0; i < 8; i++) {
      const a = craters() * Math.PI * 2;
      const d = craters() * mr * 0.62;
      ctx.beginPath();
      ctx.arc(mx + Math.cos(a) * d, my + Math.sin(a) * d, mr * (0.06 + craters() * 0.09), 0, Math.PI * 2);
      ctx.fill();
    }

    // stars, sparse
    const stars = mulberry(3);
    ctx.fillStyle = "rgba(226, 226, 226, 0.05)";
    for (let i = 0; i < Math.floor(w / 26); i++) {
      const x = stars() * w;
      const y = stars() * h * 0.55;
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // sand: three stacked dunes, front ones lighter
    const base = h * 0.84;
    for (let d = 0; d < 3; d++) {
      const alpha = 0.05 + d * 0.03;
      const yBase = base - (2 - d) * h * 0.045;
      ctx.fillStyle = "rgba(226, 226, 226, " + alpha.toFixed(3) + ")";
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += w / 28) {
        const y = yBase + Math.sin((x / w) * Math.PI * (1.7 + d * 0.8) + d * 2.3) * (h * 0.035);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
    }

    // grain on the front dunes
    const grain = mulberry(23);
    ctx.fillStyle = "rgba(226, 226, 226, 0.05)";
    for (let i = 0; i < Math.floor(w / 10); i++) {
      const x = grain() * w;
      const y = base - h * 0.02 + grain() * (h - base + h * 0.02);
      ctx.fillRect(x, y, 1.5, 1.5);
    }

    // horse, standing on the far-left dune where the content never reaches
    const s = (unit * 0.15) / 110;
    const horseW = 103.5 * s;
    const hx = Math.max(w * 0.03, (w * 0.043) - horseW * 0.2);
    ctx.save();
    ctx.translate(hx, h * 0.985 - 100 * s);
    ctx.scale(s, s);
    ctx.fillStyle = "rgba(16, 17, 18, 0.75)";
    horse();
    ctx.restore();
  }

  draw();
  window.addEventListener("resize", draw);
})();
