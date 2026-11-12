/**
 * Lightweight, zero-dependency confetti burst for workout completion.
 * Respects 'prefers-reduced-motion'.
 */

const COLORS = ['#ea580c', '#f97316', '#22c55e', '#3b82f6', '#eab308', '#a855f7', '#ec4899'];

export function triggerConfettiBurst() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Respect user preference for reduced motion
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);

  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }
  ctx.scale(dpr, dpr);

  const particles = [];
  const particleCount = 80;
  const startX = width / 2;
  const startY = height * 0.7;

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.random() * 120 - 150) * (Math.PI / 180); // Upward cone
    const speed = 7 + Math.random() * 9;
    particles.push({
      x: startX + (Math.random() * 60 - 30),
      y: startY,
      vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.5),
      vy: Math.sin(angle) * speed,
      size: 5 + Math.random() * 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1,
      drag: 0.96,
      gravity: 0.28
    });
  }

  const startTime = performance.now();
  const maxDuration = 2200; // 2.2 seconds

  function render(now) {
    const elapsed = now - startTime;
    if (elapsed > maxDuration) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    let activeCount = 0;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= p.drag;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      if (elapsed > 1200) {
        p.opacity = Math.max(0, 1 - (elapsed - 1200) / 1000);
      }

      if (p.opacity > 0 && p.y < height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      }
    }

    if (activeCount > 0) {
      requestAnimationFrame(render);
    } else if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  }

  requestAnimationFrame(render);
}
