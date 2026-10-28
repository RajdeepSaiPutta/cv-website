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

// salt-desert moon: draw the ascii art as a full-viewport grid of cells
(() => {
  const pre = document.querySelector(".moon-bg");
  if (!pre) return;
  const rows = pre.textContent.split("\n");
  while (rows.length && rows[rows.length - 1].trim() === "") rows.pop();
  const cols = Math.max(...rows.map(r => r.length));
  if (!cols) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-2";
  canvas.style.pointerEvents = "none";
  canvas.style.userSelect = "none";
  document.body.insertBefore(canvas, document.body.firstChild);
  pre.remove();

  const ctx = canvas.getContext("2d");
  const shades = { "█": 0.13, "▇": 0.07 };

  function draw() {
    const dpr = window.devicePixelRatio || 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // cells cover the viewport, cropped and centered like a photo
    const aspect = 1.9; // glyph cell height vs width
    const cellW = Math.max(w / cols, h / (rows.length * aspect));
    const cellH = cellW * aspect;
    const offX = (w - cols * cellW) / 2;
    const offY = (h - rows.length * cellH) / 2;
    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < rows.length; y++) {
      const row = rows[y];
      for (let x = 0; x < row.length; x++) {
        const a = shades[row[x]];
        if (a === undefined) continue;
        ctx.fillStyle = "rgba(226, 226, 226, " + a + ")";
        ctx.fillRect(offX + x * cellW, offY + y * cellH, cellW + 0.5, cellH + 0.5);
      }
    }
  }
  draw();
  window.addEventListener("resize", draw);
})();

// Subtle monochrome ASCII background (asciiquarium-style water)
(() => {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none";
  canvas.style.opacity = "0.14";
  document.body.insertBefore(canvas, document.body.firstChild);
  document.body.style.background = "transparent";

  const ctx = canvas.getContext("2d");
  const fishChars = ["><>", "><((()>", "<)))]><", "><(((°>", "><>", "><(((°\\"];
  const bubbleChars = ["o", "O", "°", "."];
  const waterChars = ["~", "≈", "≋"];
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const fgColor = getComputedStyle(document.documentElement).getPropertyValue("--text-soft").trim();

  class Fish {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() * 0.8 + 0.3) * (Math.random() > 0.5 ? 1 : -1);
      this.vy = (Math.random() - 0.5) * 0.15;
      this.char = fishChars[Math.floor(Math.random() * fishChars.length)];
      this.fontSize = Math.random() * 10 + 14;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.vx > 0 && this.x > canvas.width) this.x = -this.fontSize * 5;
      if (this.vx < 0 && this.x < -this.fontSize * 5) this.x = canvas.width;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.font = this.fontSize + "px monospace";
      ctx.fillStyle = fgColor;
      ctx.fillText(this.char, this.x, this.y);
    }
  }

  class Bubble {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 200;
      this.vy = -(Math.random() * 0.5 + 0.15);
      this.size = Math.random() * 8 + 6;
      this.char = bubbleChars[Math.floor(Math.random() * bubbleChars.length)];
    }
    update() {
      this.y += this.vy;
      this.x += Math.sin(Date.now() / 600 + this.x) * 0.2;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.font = this.size + "px monospace";
      ctx.fillStyle = fgColor;
      ctx.globalAlpha = 0.55;
      ctx.fillText(this.char, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }

  class WaterLine {
    constructor(y) {
      this.y = y;
      this.char = waterChars[Math.floor(Math.random() * waterChars.length)];
      this.vx = (Math.random() - 0.5) * 0.3;
      this.xOffset = Math.random() * Math.PI * 2;
    }
    update() {
      this.xOffset = (this.xOffset || 0) + this.vx;
      if (this.xOffset > canvas.width) this.xOffset = 0;
    }
    draw() {
      ctx.font = "14px monospace";
      ctx.fillStyle = fgColor;
      ctx.globalAlpha = 0.25;
      const step = 20;
      for (let x = -step; x < canvas.width + step; x += step) {
        const wx = ((x + this.xOffset) % (canvas.width + step)) - step;
        ctx.fillText(this.char, wx, this.y);
      }
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 5; i++) particles.push(new Fish());
  for (let i = 0; i < 10; i++) particles.push(new Bubble());
  const waterLines = [120, 240, 360, 480, 600].map(y => new WaterLine(y));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const wl of waterLines) {
      wl.update();
      wl.draw();
    }
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
