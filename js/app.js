(function () {
  'use strict';

  const container = document.getElementById('particles-js');
  if (!container) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  container.appendChild(canvas);

  Object.assign(canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  });

  let W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Palette: tonalità cyan/neon + qualche bianco
  const PALETTE = [
    [0,   240, 255],  // cyan puro
    [0,   200, 255],  // cyan-blu
    [80,  230, 255],  // cyan chiaro
    [0,   255, 200],  // cyan-verde
    [255, 255, 255],  // bianco
  ];

  const NUM_STARS = 900;
  const BASE_SPEED = 0.00065;

  class Star {
    constructor(staggered) {
      this.reset(staggered);
    }

    reset(staggered) {
      // Posizione sul piano unitario (-1..1) — proiettata in 3D via z
      this.x = (Math.random() - 0.5) * 2;
      this.y = (Math.random() - 0.5) * 2;
      // z=1 lontano, z=0 vicino allo schermo
      this.z = staggered ? Math.random() : 1;
      // Velocità leggermente variabile per senso di profondità
      this.speed = BASE_SPEED * (0.6 + Math.random() * 0.8);
      // 15% delle stelle sono più grandi (primo piano)
      this.baseSize = Math.random() < 0.15
        ? Math.random() * 1.8 + 1.4
        : Math.random() * 0.9 + 0.2;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      this.r = c[0]; this.g = c[1]; this.b = c[2];
    }

    update() {
      this.z -= this.speed;
      if (this.z <= 0) { this.reset(false); return; }

      // Reset se la proiezione esce dallo schermo
      const scale = Math.max(W, H) * 0.5;
      const sx = (this.x / this.z) * scale + W / 2;
      const sy = (this.y / this.z) * scale + H / 2;
      if (sx < -60 || sx > W + 60 || sy < -60 || sy > H + 60) {
        this.reset(false);
      }
    }

    draw() {
      const scale = Math.max(W, H) * 0.5;
      const sx = (this.x / this.z) * scale + W / 2;
      const sy = (this.y / this.z) * scale + H / 2;

      // t=0 lontano (z≈1), t=1 vicino (z≈0): controlla opacità e dimensione
      const t = 1 - this.z;
      const opacity = Math.pow(t, 0.65) * 0.92;
      const size = this.baseSize * (0.08 + t * 1.5);

      if (opacity < 0.02 || size < 0.1) return;

      // Alone soffuso per stelle più grandi
      if (size > 1.0) {
        ctx.beginPath();
        ctx.arc(sx, sy, size * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${opacity * 0.1})`;
        ctx.fill();
      }

      // Punto principale
      ctx.beginPath();
      ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.r},${this.g},${this.b},${opacity})`;
      ctx.fill();
    }
  }

  const stars = Array.from({ length: NUM_STARS }, () => new Star(true));

  function animate() {
    ctx.clearRect(0, 0, W, H);
    for (const star of stars) {
      star.update();
      star.draw();
    }
    requestAnimationFrame(animate);
  }

  animate();

})();
