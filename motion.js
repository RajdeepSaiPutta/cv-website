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

// Subtle monochrome ASCII background (asciiquarium-style, very restrained)
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
  canvas.style.opacity = "0.04";
  document.body.insertBefore(canvas, document.body.firstChild);
  document.body.style.background = "transparent";

  const ctx = canvas.getContext("2d");
  const fishes = ["><>", "><((()>", "<)))]><", "><(((°>", "><(((°\\", "><>"];
  const bubbles = ["o", "O", "°"];
  const particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const fgColor = getComputedStyle(document.documentElement).getPropertyValue("--text-faint").trim();

  class Fish {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() * 0.6 + 0.2) * (Math.random() > 0.5 ? 1 : -1);
      this.vy = (Math.random() - 0.5) * 0.1;
      this.fish = fishes[Math.floor(Math.random() * fishes.length)];
      this.fontSize = Math.random() * 10 + 12;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.vx > 0 && this.x > canvas.width) this.x = -this.fontSize * 4;
      if (this.vx < 0 && this.x < -this.fontSize * 4) this.x = canvas.width;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
    }
    draw() {
      ctx.font = this.fontSize + "px monospace";
      ctx.fillStyle = fgColor;
      ctx.fillText(this.fish, this.x, this.y);
    }
  }

  class Bubble {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 100;
      this.vy = -(Math.random() * 0.4 + 0.1);
      this.size = Math.random() * 6 + 4;
      this.char = bubbles[Math.floor(Math.random() * bubbles.length)];
    }
    update() {
      this.y += this.vy;
      if (this.y < -20) this.reset();
    }
    draw() {
      ctx.font = this.size + "px monospace";
      ctx.fillStyle = fgColor;
      ctx.globalAlpha = 0.5;
      ctx.fillText(this.char, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }

  for (let i = 0; i < 6; i++) particles.push(new Fish());
  for (let i = 0; i < 8; i++) particles.push(new Bubble());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();
