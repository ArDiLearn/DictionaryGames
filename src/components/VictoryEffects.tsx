import confetti from 'canvas-confetti';

// 1. Сердечко (Material Heart 24x24)
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

// 2. Длинная волнистая лента серпантина (135x43, толщина 13px)
const SERPENTINE_PATH = 'M0,15 C15,0 30,30 45,15 C60,0 75,30 90,15 C105,0 120,30 135,15 L135,28 C120,43 105,13 90,28 C75,43 60,13 45,28 C30,43 15,13 0,28 Z';

// 3. Спиральный завиток серпантина (колечко/пружинка 38x42)
const SPIRAL_CURL_PATH = 'M 8,2 C 22,-4 38,12 34,26 C 30,40 12,42 6,28 C 0,14 18,6 30,12 L 32,20 C 22,14 12,20 14,28 C 16,34 26,34 28,26 C 30,18 20,8 10,13 Z';

// 4. Планета Сатурн с орбитальными кольцами (96x44)
const SATURN_PLANET_PATH = 'M 2 50 C 2 38, 25 32, 42 32 A 22 22 0 0 1 58 32 C 75 32, 98 38, 98 50 C 98 62, 75 68, 58 68 A 22 22 0 0 1 42 68 C 25 68, 2 62, 2 50 Z M 50 28 A 22 22 0 0 0 28 50 A 22 22 0 0 0 50 72 A 22 22 0 0 0 72 50 A 22 22 0 0 0 50 28 Z';

// 5. Полумесяц / спутник (70x70)
const CRESCENT_MOON_PATH = 'M 50 15 A 35 35 0 1 0 85 50 A 28 28 0 1 1 50 15 Z';

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
    cachedHeart = createPathShape(HEART_PATH, 1.5, 12, 12);
  }
  return cachedHeart;
}

let cachedSerpentine: confetti.Shape | null = null;
function getSerpentineShape(): confetti.Shape {
  if (!cachedSerpentine) {
    cachedSerpentine = createPathShape(SERPENTINE_PATH, 0.55, 67.5, 21.5);
  }
  return cachedSerpentine;
}

let cachedSpiralCurl: confetti.Shape | null = null;
function getSpiralCurlShape(): confetti.Shape {
  if (!cachedSpiralCurl) {
    cachedSpiralCurl = createPathShape(SPIRAL_CURL_PATH, 1.1, 19, 21);
  }
  return cachedSpiralCurl;
}

let cachedSaturn: confetti.Shape | null = null;
function getSaturnShape(): confetti.Shape {
  if (!cachedSaturn) {
    cachedSaturn = createPathShape(SATURN_PLANET_PATH, 0.65, 50, 50);
  }
  return cachedSaturn;
}

let cachedMoon: confetti.Shape | null = null;
function getMoonShape(): confetti.Shape {
  if (!cachedMoon) {
    cachedMoon = createPathShape(CRESCENT_MOON_PATH, 0.65, 50, 50);
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
      // Космическая туманность: облако сверкающей пыльцы + сияющие звёздочки + парящие планеты
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
        '#f59e0b', // saturn gold
        '#fbbf24', // amber ring
        '#06b6d4', // cyan ice planet
        '#ec4899', // magenta planet
        '#a855f7', // purple planet
        '#e0e7ff', // silver moon
      ];

      // Залп 1: Центральное облако пыльцы, мерцающие звёзды и выплывающие планеты
      // 1. Мелкая светящаяся пыльца (густое облако)
      confetti({
        particleCount: 100,
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

      // 2. Сияющие звёздочки внутри пыльцы
      confetti({
        particleCount: 35,
        spread: 360,
        startVelocity: 26,
        origin: { x: 0.5, y: 0.45 },
        colors: starColors,
        shapes: ['star'],
        scalar: 1.4,
        gravity: 0.42,
        decay: 0.94,
        ticks: 140,
      });

      // 3. Парящие планеты (Сатурн с кольцами и спутники)
      confetti({
        particleCount: 16,
        spread: 360,
        startVelocity: 20,
        origin: { x: 0.5, y: 0.45 },
        colors: planetColors,
        shapes: [saturn, moon],
        scalar: 1.6, // крупные чёткие планеты
        gravity: 0.32,
        decay: 0.95,
        ticks: 160,
      });

      // Залп 2 (+280ms): Боковые рукава туманности с планетами
      timeouts.push(
        window.setTimeout(() => {
          // Левый сектор
          confetti({
            particleCount: 60,
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
            particleCount: 22,
            angle: 60,
            spread: 70,
            startVelocity: 30,
            origin: { x: 0.1, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.35,
            gravity: 0.42,
            ticks: 140,
          });
          confetti({
            particleCount: 8,
            angle: 60,
            spread: 60,
            startVelocity: 24,
            origin: { x: 0.1, y: 0.65 },
            colors: planetColors,
            shapes: [saturn, moon],
            scalar: 1.7,
            gravity: 0.32,
            ticks: 150,
          });

          // Правый сектор
          confetti({
            particleCount: 60,
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
            particleCount: 22,
            angle: 120,
            spread: 70,
            startVelocity: 30,
            origin: { x: 0.9, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.35,
            gravity: 0.42,
            ticks: 140,
          });
          confetti({
            particleCount: 8,
            angle: 120,
            spread: 60,
            startVelocity: 24,
            origin: { x: 0.9, y: 0.65 },
            colors: planetColors,
            shapes: [saturn, moon],
            scalar: 1.7,
            gravity: 0.32,
            ticks: 150,
          });
        }, 280)
      );

      // Залп 3 (+600ms): Финальный дождь звёздной пыльцы, звёзд и планет сверху
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 75,
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
            scalar: 1.45,
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
            scalar: 1.8,
            gravity: 0.3,
            ticks: 170,
          });
        }, 600)
      );
      break;
    }

    case 'confetti':
    default: {
      // Праздничный серпантин: длинные волнистые ленты + спиральные завитки + конфетти
      const serpentine = getSerpentineShape();
      const spiral = getSpiralCurlShape();
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

      // Залп 1: Центральный фонтан с серпантином и спиральными завитками
      confetti({
        particleCount: 45,
        spread: 90,
        startVelocity: 34,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: [serpentine, spiral],
        scalar: 1.5, // длинные крупные ленты
        gravity: 0.65,
        decay: 0.93,
        ticks: 150,
      });

      confetti({
        particleCount: 35,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.6 },
        colors: fiestaColors,
        shapes: ['square'],
        scalar: 1.1,
      });

      // Залп 2 (+220ms): Боковые пушки выстреливают длинные серпантинные ленты над сценой
      timeouts.push(
        window.setTimeout(() => {
          // Пушка слева
          confetti({
            particleCount: 35,
            angle: 58,
            spread: 60,
            startVelocity: 42,
            origin: { x: 0.05, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine, spiral],
            scalar: 1.6,
            gravity: 0.6,
            decay: 0.92,
            ticks: 160,
          });
          confetti({
            particleCount: 25,
            angle: 58,
            spread: 55,
            startVelocity: 38,
            origin: { x: 0.05, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.1,
          });

          // Пушка справа
          confetti({
            particleCount: 35,
            angle: 122,
            spread: 60,
            startVelocity: 42,
            origin: { x: 0.95, y: 0.7 },
            colors: fiestaColors,
            shapes: [serpentine, spiral],
            scalar: 1.6,
            gravity: 0.6,
            decay: 0.92,
            ticks: 160,
          });
          confetti({
            particleCount: 25,
            angle: 122,
            spread: 55,
            startVelocity: 38,
            origin: { x: 0.95, y: 0.7 },
            colors: fiestaColors,
            shapes: ['square'],
            scalar: 1.1,
          });
        }, 220)
      );

      // Залп 3 (+500ms): Финальный каскад парящего серпантина сверху
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 130,
            startVelocity: 24,
            origin: { x: 0.5, y: 0.3 },
            colors: fiestaColors,
            shapes: [serpentine, spiral, 'square'],
            scalar: 1.5,
            gravity: 0.62,
            decay: 0.94,
            ticks: 160,
          });
        }, 500)
      );
      break;
    }

    case 'rainbow_hearts': {
      // Радужные сердца: настоящие крупные выразительные сердечки
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

      // Запуск 1: Пышный центральный фонтан сердечек
      confetti({
        particleCount: 55,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
        colors: heartColors,
        shapes: [heartShape],
        scalar: 1.6,
        gravity: 0.65,
        decay: 0.93,
        ticks: 130,
      });

      // Запуск 2 (+220ms): Полёт сердечек навстречу с двух сторон
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
            scalar: 1.5,
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
            scalar: 1.5,
            gravity: 0.6,
            decay: 0.94,
            ticks: 140,
          });
        }, 220)
      );

      // Запуск 3 (+500ms): Парящие сердечки сверху
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 45,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.35 },
            colors: heartColors,
            shapes: [heartShape],
            scalar: 1.8,
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
      // Королевский салют: мощные ступенчатые залпы со спиралями серпантина и искрами
      const serpentine = getSerpentineShape();
      const spiral = getSpiralCurlShape();
      const fireStage = (x: number, y: number, count: number, colors: string[]) => {
        confetti({
          particleCount: count,
          startVelocity: 38,
          spread: 360,
          ticks: 90,
          origin: { x, y },
          colors,
          gravity: 1.05,
          scalar: 1.2,
          shapes: ['star', 'circle', serpentine, spiral],
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
