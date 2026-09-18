import confetti from 'canvas-confetti';

// Single dedicated cannon instance running on the main thread for instant bitmap rendering & no worker transfer bugs
let mainCannon: confetti.CreateTypes | null = null;
function getCannon(): confetti.CreateTypes {
  if (mainCannon) return mainCannon;
  if (typeof window !== 'undefined' && typeof confetti.create === 'function') {
    mainCannon = confetti.create(undefined, { resize: true, useWorker: false });
    return mainCannon;
  }
  return confetti as unknown as confetti.CreateTypes;
}

// Helper to pre-render custom shapes into high-performance GPU bitmaps
function createShapeBitmap(
  draw: (ctx: CanvasRenderingContext2D, size: number) => void,
  size = 48
): confetti.Shape {
  if (typeof document === 'undefined') {
    return 'circle' as confetti.Shape;
  }
  try {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return 'circle' as confetti.Shape;

    draw(ctx, size);

    if (typeof OffscreenCanvas !== 'undefined') {
      const off = new OffscreenCanvas(size, size);
      const offCtx = off.getContext('2d');
      if (offCtx) {
        offCtx.drawImage(canvas, 0, 0);
        const bitmap = off.transferToImageBitmap();
        const scale = 0.5;
        return {
          type: 'bitmap',
          bitmap,
          matrix: [scale, 0, 0, scale, (-size * scale) / 2, (-size * scale) / 2],
        } as unknown as confetti.Shape;
      }
    }
  } catch (e) {
    console.warn('Bitmap shape fallback:', e);
  }
  return 'circle' as confetti.Shape;
}

// 1. Сатурн: 3D планета с наклонными кольцами
let cachedSaturn: confetti.Shape | null = null;
function getSaturnShape(): confetti.Shape {
  if (!cachedSaturn) {
    cachedSaturn = createShapeBitmap((ctx, s) => {
      const cx = s / 2;
      const cy = s / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.35); // наклон -20 градусов

      // Задняя дуга кольца (за сферой)
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.15, 0, Math.PI, Math.PI * 2);
      ctx.lineWidth = s * 0.09;
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();

      // Тонкая внутренняя щель кольца сзади
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.36, s * 0.12, 0, Math.PI, Math.PI * 2);
      ctx.lineWidth = s * 0.025;
      ctx.strokeStyle = '#b45309';
      ctx.stroke();

      // Тело планеты (сфера с радиальным 3D градиентом)
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.23, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(-s * 0.07, -s * 0.07, s * 0.02, 0, 0, s * 0.23);
      grad.addColorStop(0, '#fef08a');
      grad.addColorStop(0.45, '#f59e0b');
      grad.addColorStop(1, '#b45309');
      ctx.fillStyle = grad;
      ctx.fill();

      // Полосы облаков на планете
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.23, 0.2, Math.PI - 0.2);
      ctx.lineWidth = s * 0.04;
      ctx.strokeStyle = '#d97706';
      ctx.stroke();

      // Передняя дуга кольца (перед планетой)
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.15, 0, 0, Math.PI);
      ctx.lineWidth = s * 0.09;
      ctx.strokeStyle = '#fbbf24';
      ctx.stroke();

      // Светлый блик на переднем кольце
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.15, 0, 0.3, Math.PI * 0.7);
      ctx.lineWidth = s * 0.035;
      ctx.strokeStyle = '#fef08a';
      ctx.stroke();

      ctx.restore();
    }, 56);
  }
  return cachedSaturn;
}

// 2. Золотой месяц: изящный светящийся полумесяц со звёздным сиянием
let cachedMoon: confetti.Shape | null = null;
function getMoonShape(): confetti.Shape {
  if (!cachedMoon) {
    cachedMoon = createShapeBitmap((ctx, s) => {
      const cx = s / 2;
      const cy = s / 2;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.22); // уютный наклон полумесяца

      // Контур полумесяца
      ctx.beginPath();
      ctx.moveTo(s * 0.06, -s * 0.42);
      // Внешняя дуга (левая спинка месяца)
      ctx.bezierCurveTo(-s * 0.42, -s * 0.36, -s * 0.42, s * 0.36, s * 0.06, s * 0.42);
      // Внутренний изгиб (впадина месяца)
      ctx.bezierCurveTo(-s * 0.18, s * 0.24, -s * 0.18, -s * 0.24, s * 0.06, -s * 0.42);
      ctx.closePath();

      // Градиент лунного света
      const grad = ctx.createLinearGradient(-s * 0.35, -s * 0.35, s * 0.06, s * 0.35);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.25, '#fef08a');
      grad.addColorStop(0.7, '#facc15');
      grad.addColorStop(1, '#eab308');
      ctx.fillStyle = grad;
      ctx.fill();

      // Деликатная обводка
      ctx.lineWidth = s * 0.025;
      ctx.strokeStyle = '#ca8a04';
      ctx.stroke();

      // Мягкие лунные кратеры
      ctx.beginPath();
      ctx.arc(-s * 0.2, -s * 0.07, s * 0.045, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(202, 138, 4, 0.3)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-s * 0.17, s * 0.14, s * 0.035, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(202, 138, 4, 0.3)';
      ctx.fill();

      // Сияющая искра на верхнем рожке месяца
      ctx.beginPath();
      ctx.arc(s * 0.03, -s * 0.38, s * 0.04, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      ctx.restore();
    }, 56);
  }
  return cachedMoon;
}

// 3. Королевская корона: золотой обод, 3 зубца, жемчужины на пиках и рубин
let cachedCrown: confetti.Shape | null = null;
function getCrownShape(): confetti.Shape {
  if (!cachedCrown) {
    cachedCrown = createShapeBitmap((ctx, s) => {
      const cx = s / 2;
      const rx = s * 0.16;
      const ry = s * 0.52;
      const rw = s * 0.68;
      const rh = s * 0.16;

      // Обод короны
      ctx.fillStyle = '#d97706';
      ctx.fillRect(rx, ry, rw, rh);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(rx, ry + 1.5, rw, rh - 3);

      // Зубцы короны
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx + 2, s * 0.22); // левый пик
      ctx.lineTo(cx - s * 0.12, ry - s * 0.04); // левая выемка
      ctx.lineTo(cx, s * 0.11); // центральный высокий пик
      ctx.lineTo(cx + s * 0.12, ry - s * 0.04); // правая выемка
      ctx.lineTo(rx + rw - 2, s * 0.22); // правый пик
      ctx.lineTo(rx + rw, ry);
      ctx.closePath();
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      // Золотистые жемчужины на вершинах зубцов
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(rx + 2, s * 0.2, s * 0.06, 0, Math.PI * 2);
      ctx.arc(cx, s * 0.09, s * 0.075, 0, Math.PI * 2);
      ctx.arc(rx + rw - 2, s * 0.2, s * 0.06, 0, Math.PI * 2);
      ctx.fill();

      // Рубин в центре
      ctx.beginPath();
      ctx.arc(cx, ry + rh / 2, s * 0.052, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
    }, 56);
  }
  return cachedCrown;
}

// 4. Аккуратная волнистая лента серпантина
let cachedSerpentine: confetti.Shape | null = null;
function getSerpentineShape(): confetti.Shape {
  if (!cachedSerpentine) {
    cachedSerpentine = createShapeBitmap((ctx, s) => {
      ctx.beginPath();
      ctx.moveTo(s * 0.12, s * 0.42);
      ctx.bezierCurveTo(s * 0.32, s * 0.1, s * 0.46, s * 0.76, s * 0.68, s * 0.36);
      ctx.bezierCurveTo(s * 0.78, s * 0.18, s * 0.88, s * 0.52, s * 0.94, s * 0.38);
      ctx.lineWidth = s * 0.1; // плотная заметная лента
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#f59e0b';
      ctx.stroke();
    }, 56);
  }
  return cachedSerpentine;
}

// 4. Сердечко: гладкое красное/розовое сердечко с бликом
let cachedHeart: confetti.Shape | null = null;
function getHeartShape(): confetti.Shape {
  if (!cachedHeart) {
    cachedHeart = createShapeBitmap((ctx, s) => {
      const cx = s / 2;
      ctx.beginPath();
      ctx.moveTo(cx, s * 0.82);
      ctx.bezierCurveTo(cx - s * 0.42, s * 0.52, cx - s * 0.44, s * 0.2, cx - s * 0.2, s * 0.16);
      ctx.bezierCurveTo(cx - s * 0.08, s * 0.14, cx, s * 0.26, cx, s * 0.3);
      ctx.bezierCurveTo(cx, s * 0.26, cx + s * 0.08, s * 0.14, cx + s * 0.2, s * 0.16);
      ctx.bezierCurveTo(cx + s * 0.44, s * 0.2, cx + s * 0.42, s * 0.52, cx, s * 0.82);
      ctx.fillStyle = '#ff2a6d';
      ctx.fill();

      // Светлый блик
      ctx.beginPath();
      ctx.arc(cx - s * 0.16, s * 0.28, s * 0.055, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fill();
    }, 48);
  }
  return cachedHeart;
}

// Active timeouts registry for clean cancellation
let activeTimeouts: number[] = [];

/**
 * Instantly stops and cancels any active victory animation particles and timeouts.
 */
export function cancelVictoryAnimation(): void {
  activeTimeouts.forEach((t) => clearTimeout(t));
  activeTimeouts = [];
  try {
    const cannon = getCannon();
    cannon.reset();
  } catch {}
}

/**
 * Triggers the selected victory animation.
 * Automatically cleans up any previously running animation so multiple clicks never freeze the app.
 */
export function triggerVictoryAnimation(animationId: string = 'confetti'): () => void {
  // Stop previous animation immediately to prevent particle overload and freezing
  cancelVictoryAnimation();

  const cannon = getCannon();

  switch (animationId) {
    case 'cosmic_nebula': {
      // Космическая туманность: сверкающая пыльца + звёздочки + 3D Сатурны + золотой месяц
      const saturn = getSaturnShape();
      const moon = getMoonShape();

      const dustColors = [
        '#00f0ff', // electric cyan
        '#38bdf8', // sky blue
        '#c084fc', // lavender
        '#a855f7', // cosmic violet
        '#f472b6', // nebula pink
        '#6366f1', // interstellar indigo
        '#ffffff', // glow
      ];

      const starColors = [
        '#ffd700', // golden star
        '#facc15', // yellow gold
        '#ffffff', // diamond white
        '#67e8f9', // cyan star
      ];

      // Залп 1: Центральное облако пыльцы, звёзды, Сатурны и полумесяцы
      cannon({
        particleCount: 45,
        spread: 360,
        startVelocity: 20,
        origin: { x: 0.5, y: 0.45 },
        colors: dustColors,
        shapes: ['circle'],
        scalar: 0.48,
        gravity: 0.35,
        decay: 0.96,
        ticks: 120,
      });

      cannon({
        particleCount: 18,
        spread: 360,
        startVelocity: 24,
        origin: { x: 0.5, y: 0.45 },
        colors: starColors,
        shapes: ['star'],
        scalar: 1.3,
        gravity: 0.4,
        decay: 0.94,
        ticks: 120,
      });

      cannon({
        particleCount: 5,
        spread: 360,
        startVelocity: 16,
        origin: { x: 0.5, y: 0.45 },
        shapes: [saturn],
        scalar: 1.8,
        gravity: 0.3,
        decay: 0.95,
        ticks: 140,
      });

      cannon({
        particleCount: 5,
        spread: 360,
        startVelocity: 17,
        origin: { x: 0.5, y: 0.45 },
        shapes: [moon],
        scalar: 1.8,
        gravity: 0.28,
        decay: 0.95,
        ticks: 140,
      });

      // Залп 2 (+240ms): Боковые рукава туманности с планетами и месяцем
      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 26,
            angle: 60,
            spread: 70,
            startVelocity: 26,
            origin: { x: 0.12, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.45,
            gravity: 0.38,
            ticks: 120,
          });
          cannon({
            particleCount: 10,
            angle: 60,
            spread: 60,
            startVelocity: 28,
            origin: { x: 0.12, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.25,
            ticks: 120,
          });
          cannon({
            particleCount: 3,
            angle: 60,
            spread: 50,
            startVelocity: 20,
            origin: { x: 0.12, y: 0.65 },
            shapes: [saturn],
            scalar: 1.75,
            gravity: 0.3,
            ticks: 130,
          });
          cannon({
            particleCount: 3,
            angle: 60,
            spread: 50,
            startVelocity: 21,
            origin: { x: 0.12, y: 0.65 },
            shapes: [moon],
            scalar: 1.75,
            gravity: 0.28,
            ticks: 130,
          });

          cannon({
            particleCount: 26,
            angle: 120,
            spread: 70,
            startVelocity: 26,
            origin: { x: 0.88, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.45,
            gravity: 0.38,
            ticks: 120,
          });
          cannon({
            particleCount: 10,
            angle: 120,
            spread: 60,
            startVelocity: 28,
            origin: { x: 0.88, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.25,
            ticks: 120,
          });
          cannon({
            particleCount: 3,
            angle: 120,
            spread: 50,
            startVelocity: 20,
            origin: { x: 0.88, y: 0.65 },
            shapes: [saturn],
            scalar: 1.75,
            gravity: 0.3,
            ticks: 130,
          });
          cannon({
            particleCount: 3,
            angle: 120,
            spread: 50,
            startVelocity: 21,
            origin: { x: 0.88, y: 0.65 },
            shapes: [moon],
            scalar: 1.75,
            gravity: 0.28,
            ticks: 130,
          });
        }, 240)
      );

      // Залп 3 (+480ms): Мягкий космический дождь
      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 35,
            spread: 120,
            startVelocity: 16,
            origin: { x: 0.5, y: 0.22 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.5,
            gravity: 0.32,
            ticks: 130,
          });
          cannon({
            particleCount: 14,
            spread: 100,
            startVelocity: 18,
            origin: { x: 0.5, y: 0.22 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.35,
            ticks: 130,
          });
          cannon({
            particleCount: 3,
            spread: 90,
            startVelocity: 14,
            origin: { x: 0.5, y: 0.22 },
            shapes: [saturn],
            scalar: 1.85,
            gravity: 0.28,
            ticks: 140,
          });
          cannon({
            particleCount: 3,
            spread: 90,
            startVelocity: 15,
            origin: { x: 0.5, y: 0.22 },
            shapes: [moon],
            scalar: 1.85,
            gravity: 0.26,
            ticks: 140,
          });
        }, 480)
      );
      break;
    }

    case 'confetti':
    default: {
      // Праздничный серпантин: аккуратные волнистые ленты + конфетти
      const serpentine = getSerpentineShape();
      const fiestaColors = ['#f59e0b', '#ec4899', '#38bdf8', '#8b5cf6', '#22c55e', '#f97316'];

      // Залп 1: Центральный салют
      cannon({
        particleCount: 20,
        spread: 90,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: [serpentine],
        scalar: 1.5,
        gravity: 0.68,
        ticks: 130,
      });

      cannon({
        particleCount: 40,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: ['square'],
        scalar: 1.0,
      });

      // Залп 2 (+200ms): Боковые пушки
      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 16,
            angle: 60,
            spread: 55,
            startVelocity: 34,
            origin: { x: 0.08, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.5,
            gravity: 0.65,
            ticks: 130,
          });
          cannon({
            particleCount: 25,
            angle: 60,
            spread: 55,
            startVelocity: 32,
            origin: { x: 0.08, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });

          cannon({
            particleCount: 16,
            angle: 120,
            spread: 55,
            startVelocity: 34,
            origin: { x: 0.92, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.5,
            gravity: 0.65,
            ticks: 130,
          });
          cannon({
            particleCount: 25,
            angle: 120,
            spread: 55,
            startVelocity: 32,
            origin: { x: 0.92, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });
        }, 200)
      );

      // Залп 3 (+450ms): Финальный дождь
      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 16,
            spread: 110,
            startVelocity: 20,
            origin: { x: 0.5, y: 0.3 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.55,
            gravity: 0.66,
            ticks: 130,
          });
          cannon({
            particleCount: 35,
            spread: 110,
            startVelocity: 20,
            origin: { x: 0.5, y: 0.3 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });
        }, 450)
      );
      break;
    }

    case 'rainbow_hearts': {
      // Радужные сердца: настоящие выразительные сердечки с бликом
      const heart = getHeartShape();
      const heartColors = ['#ff1e56', '#ff4d6d', '#ff758f', '#e11d48', '#f43f5e', '#ec4899', '#c084fc', '#facc15'];

      cannon({
        particleCount: 40,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: heartColors,
        shapes: [heart],
        scalar: 1.45,
        gravity: 0.65,
        ticks: 130,
      });

      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 22,
            angle: 65,
            spread: 65,
            startVelocity: 32,
            origin: { x: 0.12, y: 0.65 },
            colors: heartColors,
            shapes: [heart],
            scalar: 1.35,
            gravity: 0.6,
            ticks: 130,
          });
          cannon({
            particleCount: 22,
            angle: 115,
            spread: 65,
            startVelocity: 32,
            origin: { x: 0.88, y: 0.65 },
            colors: heartColors,
            shapes: [heart],
            scalar: 1.35,
            gravity: 0.6,
            ticks: 130,
          });
        }, 200)
      );

      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 30,
            spread: 110,
            startVelocity: 20,
            origin: { x: 0.5, y: 0.35 },
            colors: heartColors,
            shapes: [heart],
            scalar: 1.5,
            gravity: 0.55,
            ticks: 140,
          });
        }, 450)
      );
      break;
    }

    case 'stars': {
      // Золотой звездопад
      const starColors = ['#FFE066', '#FFD700', '#FFA500', '#F59E0B', '#FDE047', '#FFFFFF'];

      const launch = (x: number) => {
        cannon({
          particleCount: 28,
          spread: 80,
          ticks: 90,
          gravity: 0.72,
          startVelocity: 28,
          shapes: ['star'],
          colors: starColors,
          origin: { x, y: 0.5 },
          scalar: 1.4,
        });
        cannon({
          particleCount: 18,
          spread: 75,
          ticks: 80,
          gravity: 0.62,
          startVelocity: 20,
          shapes: ['circle'],
          colors: starColors,
          origin: { x, y: 0.5 },
          scalar: 0.55,
        });
      };

      launch(0.5);
      activeTimeouts.push(window.setTimeout(() => launch(0.28), 200));
      activeTimeouts.push(window.setTimeout(() => launch(0.72), 380));
      activeTimeouts.push(window.setTimeout(() => launch(0.5), 580));
      break;
    }

    case 'fireworks': {
      // Королевский салют: мощные залпы с золотыми КОРОНАМИ, серпантином и звёздами
      const crown = getCrownShape();
      const serpentine = getSerpentineShape();
      const royalColors = ['#ef4444', '#facc15', '#3b82f6', '#10b981', '#f97316', '#ffd700', '#ffffff'];

      // Залп 1: Центральный взрыв с коронами и серпантином
      cannon({
        particleCount: 35,
        startVelocity: 35,
        spread: 360,
        ticks: 90,
        origin: { x: 0.5, y: 0.4 },
        colors: royalColors,
        gravity: 0.95,
        scalar: 1.0,
        shapes: ['star', 'circle'],
      });

      cannon({
        particleCount: 15,
        startVelocity: 32,
        spread: 360,
        ticks: 110,
        origin: { x: 0.5, y: 0.4 },
        colors: royalColors,
        shapes: [serpentine],
        scalar: 1.45,
        gravity: 0.7,
      });

      cannon({
        particleCount: 10,
        startVelocity: 28,
        spread: 360,
        ticks: 130,
        origin: { x: 0.5, y: 0.4 },
        shapes: [crown],
        scalar: 1.85,
        gravity: 0.55,
        decay: 0.94,
      });

      // Залп 2 (+250ms): Двойной салют с коронами слева и справа
      activeTimeouts.push(
        window.setTimeout(() => {
          // Слева
          cannon({
            particleCount: 25,
            startVelocity: 32,
            spread: 360,
            ticks: 85,
            origin: { x: 0.25, y: 0.35 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#ffd700'],
            shapes: ['star'],
            scalar: 1.0,
          });
          cannon({
            particleCount: 10,
            startVelocity: 30,
            spread: 360,
            ticks: 110,
            origin: { x: 0.25, y: 0.35 },
            colors: ['#ec4899', '#8b5cf6', '#06b6d4', '#ffd700'],
            shapes: [serpentine],
            scalar: 1.4,
            gravity: 0.7,
          });
          cannon({
            particleCount: 6,
            startVelocity: 24,
            spread: 360,
            ticks: 120,
            origin: { x: 0.25, y: 0.35 },
            shapes: [crown],
            scalar: 1.75,
            gravity: 0.55,
          });

          // Справа
          cannon({
            particleCount: 25,
            startVelocity: 32,
            spread: 360,
            ticks: 85,
            origin: { x: 0.75, y: 0.35 },
            colors: ['#f97316', '#eab308', '#22c55e', '#a855f7'],
            shapes: ['star'],
            scalar: 1.0,
          });
          cannon({
            particleCount: 10,
            startVelocity: 30,
            spread: 360,
            ticks: 110,
            origin: { x: 0.75, y: 0.35 },
            colors: ['#f97316', '#eab308', '#22c55e', '#a855f7'],
            shapes: [serpentine],
            scalar: 1.4,
            gravity: 0.7,
          });
          cannon({
            particleCount: 6,
            startVelocity: 24,
            spread: 360,
            ticks: 120,
            origin: { x: 0.75, y: 0.35 },
            shapes: [crown],
            scalar: 1.75,
            gravity: 0.55,
          });
        }, 250)
      );

      // Залп 3 (+550ms): Королевский финал
      activeTimeouts.push(
        window.setTimeout(() => {
          cannon({
            particleCount: 40,
            startVelocity: 36,
            spread: 360,
            ticks: 100,
            origin: { x: 0.5, y: 0.28 },
            colors: ['#ffd700', '#ff4500', '#00e5ff', '#ff007f', '#ffffff', '#22c55e'],
            shapes: ['star', 'circle'],
            scalar: 1.05,
          });
          cannon({
            particleCount: 16,
            startVelocity: 32,
            spread: 360,
            ticks: 120,
            origin: { x: 0.5, y: 0.28 },
            colors: ['#ffd700', '#ff4500', '#00e5ff', '#ff007f', '#ffffff', '#22c55e'],
            shapes: [serpentine],
            scalar: 1.5,
            gravity: 0.65,
          });
          cannon({
            particleCount: 12,
            startVelocity: 26,
            spread: 130,
            ticks: 140,
            origin: { x: 0.5, y: 0.28 },
            shapes: [crown],
            scalar: 1.9,
            gravity: 0.5,
          });
        }, 550)
      );
      break;
    }
  }

  return () => {
    cancelVictoryAnimation();
  };
}
