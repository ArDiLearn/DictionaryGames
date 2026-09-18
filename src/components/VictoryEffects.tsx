import confetti from 'canvas-confetti';

// 1. Сердечко (Material Heart 24x24)
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

// 2. Аккуратная волнистая лента серпантина (умеренный размер ~30-35px, толщина 4px)
const SERPENTINE_PATH = 'M0,10 C10,2 20,18 30,10 C40,2 50,18 60,10 L60,14 C50,22 40,6 30,14 C20,22 10,6 0,14 Z';

// 3. Сатурн с наклонными кольцами и прозрачным космическим зазором (76x36)
const SATURN_PLANET_PATH = 'M 12,32 A 42,14 -25 1,0 88,68 A 42,14 -25 1,0 12,32 Z M 26,38 A 27,8 -25 1,1 74,62 A 27,8 -25 1,1 26,38 Z M 50,32 A 18,18 0 1,0 50.01,32 Z';

// 4. Луна / планета-спутник (64x64)
const CRESCENT_MOON_PATH = 'M 50 18 A 32 32 0 1 0 82 50 A 25 25 0 1 1 50 18 Z';

function createPathShape(path: string, scale: number, cx: number, cy: number): confetti.Shape {
  const matrix = [scale, 0, 0, scale, -cx * scale, -cy * scale];
  if (typeof window !== 'undefined' && typeof confetti.shapeFromPath === 'function') {
    try {
      return confetti.shapeFromPath({
        path,
        matrix: matrix as unknown as DOMMatrix,
      });
    } catch {}
  }
  return {
    type: 'path',
    path,
    matrix,
  } as unknown as confetti.Shape;
}

let cachedHeart: confetti.Shape | null = null;
function getHeartShape(): confetti.Shape {
  if (!cachedHeart) {
    cachedHeart = createPathShape(HEART_PATH, 1.4, 12, 12);
  }
  return cachedHeart;
}

let cachedSerpentine: confetti.Shape | null = null;
function getSerpentineShape(): confetti.Shape {
  if (!cachedSerpentine) {
    cachedSerpentine = createPathShape(SERPENTINE_PATH, 0.38, 30, 10);
  }
  return cachedSerpentine;
}

let cachedSaturn: confetti.Shape | null = null;
function getSaturnShape(): confetti.Shape {
  if (!cachedSaturn) {
    cachedSaturn = createPathShape(SATURN_PLANET_PATH, 0.38, 50, 50);
  }
  return cachedSaturn;
}

let cachedMoon: confetti.Shape | null = null;
function getMoonShape(): confetti.Shape {
  if (!cachedMoon) {
    cachedMoon = createPathShape(CRESCENT_MOON_PATH, 0.45, 50, 50);
  }
  return cachedMoon;
}

/**
 * Triggers the selected victory animation.
 * Returns a cleanup function that cancels any delayed bursts.
 */
export function triggerVictoryAnimation(animationId: string = 'confetti'): () => void {
  const timeouts: number[] = [];

  switch (animationId) {
    case 'cosmic_nebula': {
      // Космическая туманность: облако сверкающей пыльцы + сияющие звёздочки + планеты (Сатурн с кольцами и Луна)
      const saturn = getSaturnShape();
      const moon = getMoonShape();

      const dustColors = [
        '#00f0ff', // electric cyan
        '#38bdf8', // sky blue
        '#c084fc', // lavender
        '#a855f7', // cosmic violet
        '#f472b6', // nebula pink
        '#6366f1', // interstellar indigo
        '#e0e7ff', // starlight white
        '#ffffff', // glow
      ];

      const starColors = [
        '#ffd700', // golden star
        '#facc15', // yellow gold
        '#ffffff', // diamond white
        '#67e8f9', // cyan star
        '#fef08a', // pale gold
      ];

      const planetColors = [
        '#f59e0b', // saturn amber gold
        '#fbbf24', // luminous ring
        '#06b6d4', // cyan ice planet
        '#ec4899', // nebula planet
        '#a855f7', // purple planet
        '#e0e7ff', // silver moon
      ];

      // Залп 1: Центральное облако пыльцы, мерцающие звёзды и планеты
      confetti({
        particleCount: 110,
        spread: 360,
        startVelocity: 22,
        origin: { x: 0.5, y: 0.45 },
        colors: dustColors,
        shapes: ['circle'],
        scalar: 0.5,
        gravity: 0.35,
        decay: 0.96,
        ticks: 150,
      });

      confetti({
        particleCount: 35,
        spread: 360,
        startVelocity: 26,
        origin: { x: 0.5, y: 0.45 },
        colors: starColors,
        shapes: ['star'],
        scalar: 1.35,
        gravity: 0.42,
        decay: 0.94,
        ticks: 140,
      });

      confetti({
        particleCount: 14,
        spread: 360,
        startVelocity: 18,
        origin: { x: 0.5, y: 0.45 },
        colors: planetColors,
        shapes: [saturn, moon],
        scalar: 1.3,
        gravity: 0.32,
        decay: 0.95,
        ticks: 160,
      });

      // Залп 2 (+280ms): Боковые рукава туманности с планетами и звёздами
      timeouts.push(
        window.setTimeout(() => {
          // Слева
          confetti({
            particleCount: 65,
            angle: 60,
            spread: 80,
            startVelocity: 28,
            origin: { x: 0.1, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.48,
            gravity: 0.38,
            decay: 0.95,
            ticks: 140,
          });
          confetti({
            particleCount: 20,
            angle: 60,
            spread: 70,
            startVelocity: 30,
            origin: { x: 0.1, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.3,
            gravity: 0.42,
            ticks: 140,
          });
          confetti({
            particleCount: 8,
            angle: 60,
            spread: 60,
            startVelocity: 22,
            origin: { x: 0.1, y: 0.65 },
            colors: planetColors,
            shapes: [saturn, moon],
            scalar: 1.35,
            gravity: 0.32,
            ticks: 150,
          });

          // Справа
          confetti({
            particleCount: 65,
            angle: 120,
            spread: 80,
            startVelocity: 28,
            origin: { x: 0.9, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.48,
            gravity: 0.38,
            decay: 0.95,
            ticks: 140,
          });
          confetti({
            particleCount: 20,
            angle: 120,
            spread: 70,
            startVelocity: 30,
            origin: { x: 0.9, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.3,
            gravity: 0.42,
            ticks: 140,
          });
          confetti({
            particleCount: 8,
            angle: 120,
            spread: 60,
            startVelocity: 22,
            origin: { x: 0.9, y: 0.65 },
            colors: planetColors,
            shapes: [saturn, moon],
            scalar: 1.35,
            gravity: 0.32,
            ticks: 150,
          });
        }, 280)
      );

      // Залп 3 (+600ms): Мягкий космический дождь звёздной пыльцы, звёзд и планет
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 80,
            spread: 140,
            startVelocity: 18,
            origin: { x: 0.5, y: 0.2 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.52,
            gravity: 0.34,
            decay: 0.96,
            ticks: 160,
          });
          confetti({
            particleCount: 25,
            spread: 120,
            startVelocity: 20,
            origin: { x: 0.5, y: 0.2 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.4,
            gravity: 0.38,
            ticks: 150,
          });
          confetti({
            particleCount: 10,
            spread: 110,
            startVelocity: 16,
            origin: { x: 0.5, y: 0.2 },
            colors: planetColors,
            shapes: [saturn, moon],
            scalar: 1.4,
            gravity: 0.3,
            ticks: 170,
          });
        }, 600)
      );
      break;
    }

    case 'confetti':
    default: {
      // Праздничный серпантин: умеренные волнистые ленты + конфетти (спирали убраны)
      const serpentine = getSerpentineShape();
      const fiestaColors = [
        '#f59e0b', // amber gold
        '#ec4899', // bright pink
        '#38bdf8', // sky blue
        '#8b5cf6', // purple
        '#22c55e', // emerald green
        '#f97316', // orange
        '#e11d48', // crimson
        '#facc15', // yellow
      ];

      // Залп 1: Центральный салют с волнистыми лентами и конфетти
      confetti({
        particleCount: 30,
        spread: 90,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: [serpentine],
        scalar: 1.15, // аккуратный лёгкий серпантин ~30px
        gravity: 0.7,
        decay: 0.93,
        ticks: 140,
      });

      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: ['square'],
        scalar: 1.0,
      });

      // Залп 2 (+220ms): Боковые пушки запускают ленты серпантина навесом
      timeouts.push(
        window.setTimeout(() => {
          // Пушка слева
          confetti({
            particleCount: 25,
            angle: 60,
            spread: 55,
            startVelocity: 36,
            origin: { x: 0.08, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.2,
            gravity: 0.65,
            decay: 0.93,
            ticks: 150,
          });
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 55,
            startVelocity: 34,
            origin: { x: 0.08, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });

          // Пушка справа
          confetti({
            particleCount: 25,
            angle: 120,
            spread: 55,
            startVelocity: 36,
            origin: { x: 0.92, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.2,
            gravity: 0.65,
            decay: 0.93,
            ticks: 150,
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 55,
            startVelocity: 34,
            origin: { x: 0.92, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });
        }, 220)
      );

      // Залп 3 (+500ms): Плавный праздничный дождь из конфетти и серпантина
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 25,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.3 },
            colors: fiestaColors,
            shapes: [serpentine],
            scalar: 1.15,
            gravity: 0.68,
            decay: 0.94,
            ticks: 150,
          });
          confetti({
            particleCount: 45,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.3 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.0,
          });
        }, 500)
      );
      break;
    }

    case 'rainbow_hearts': {
      // Радужные сердца: настоящие выразительные сердечки
      const heartShape = getHeartShape();
      const heartColors = [
        '#ff1e56', // neon ruby
        '#ff4d6d', // coral red
        '#ff758f', // warm pink
        '#e11d48', // crimson
        '#f43f5e', // rose
        '#ec4899', // bright pink
        '#c084fc', // lilac
        '#facc15', // gold
      ];

      confetti({
        particleCount: 55,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
        colors: heartColors,
        shapes: [heartShape],
        scalar: 1.5,
        gravity: 0.65,
        decay: 0.93,
        ticks: 130,
      });

      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 35,
            angle: 65,
            spread: 70,
            startVelocity: 34,
            origin: { x: 0.12, y: 0.65 },
            colors: heartColors,
            shapes: [heartShape],
            scalar: 1.4,
            gravity: 0.6,
            decay: 0.94,
            ticks: 140,
          });
          confetti({
            particleCount: 35,
            angle: 115,
            spread: 70,
            startVelocity: 34,
            origin: { x: 0.88, y: 0.65 },
            colors: heartColors,
            shapes: [heartShape],
            scalar: 1.4,
            gravity: 0.6,
            decay: 0.94,
            ticks: 140,
          });
        }, 220)
      );

      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 45,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.35 },
            colors: heartColors,
            shapes: [heartShape],
            scalar: 1.6,
            gravity: 0.55,
            decay: 0.95,
            ticks: 150,
          });
        }, 500)
      );
      break;
    }

    case 'stars': {
      // Золотой звездопад: сияющие золотые звёзды и золотая пыльца
      const starColors = ['#FFE066', '#FFD700', '#FFA500', '#F59E0B', '#FDE047', '#FFFFFF'];

      const launch = (x: number) => {
        confetti({
          particleCount: 35,
          spread: 85,
          ticks: 100,
          gravity: 0.75,
          decay: 0.93,
          startVelocity: 30,
          shapes: ['star'],
          colors: starColors,
          origin: { x, y: 0.5 },
          scalar: 1.5,
        });
        confetti({
          particleCount: 25,
          spread: 80,
          ticks: 90,
          gravity: 0.65,
          decay: 0.94,
          startVelocity: 22,
          shapes: ['circle'],
          colors: starColors,
          origin: { x, y: 0.5 },
          scalar: 0.6,
        });
      };

      launch(0.5);
      timeouts.push(window.setTimeout(() => launch(0.28), 220));
      timeouts.push(window.setTimeout(() => launch(0.72), 420));
      timeouts.push(window.setTimeout(() => launch(0.5), 650));
      break;
    }

    case 'fireworks': {
      // Королевский салют: мощные залпы с золотыми искрами и серпантином
      const serpentine = getSerpentineShape();
      const fireStage = (x: number, y: number, count: number, colors: string[]) => {
        confetti({
          particleCount: count,
          startVelocity: 38,
          spread: 360,
          ticks: 90,
          origin: { x, y },
          colors,
          gravity: 1.05,
          scalar: 1.15,
          shapes: ['star', 'circle', serpentine],
        });
      };

      fireStage(0.5, 0.4, 60, ['#ef4444', '#facc15', '#3b82f6', '#10b981', '#f97316']);

      timeouts.push(
        window.setTimeout(() => {
          fireStage(0.25, 0.35, 50, ['#ec4899', '#8b5cf6', '#06b6d4', '#ffd700']);
          fireStage(0.75, 0.35, 50, ['#f97316', '#eab308', '#22c55e', '#a855f7']);
        }, 300)
      );

      timeouts.push(
        window.setTimeout(() => {
          fireStage(0.5, 0.28, 80, ['#ffd700', '#ff4500', '#00e5ff', '#ff007f', '#ffffff', '#22c55e']);
        }, 650)
      );
      break;
    }
  }

  return () => {
    timeouts.forEach((t) => clearTimeout(t));
  };
}
