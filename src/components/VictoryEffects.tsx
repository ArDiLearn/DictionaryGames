import confetti from 'canvas-confetti';

// Standard 24x24 Material Heart path
const HEART_PATH = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

// Wavy serpentine streamer curl path (60x24)
const SERPENTINE_RIBBON_PATH = 'M0,10 C6,2 14,18 20,10 C26,2 34,18 40,10 C46,2 54,18 60,10 L60,15 C54,23 46,7 40,15 C34,23 26,7 20,15 C14,23 6,7 0,15 Z';

let cachedHeartShape: confetti.Shape | null = null;
function getHeartShape(): confetti.Shape {
  if (cachedHeartShape) return cachedHeartShape;
  try {
    if (typeof confetti.shapeFromPath === 'function') {
      cachedHeartShape = confetti.shapeFromPath({
        path: HEART_PATH,
        matrix: [0.5, 0, 0, 0.5, -6, -6] as unknown as DOMMatrix,
      });
      return cachedHeartShape;
    }
  } catch {}

  cachedHeartShape = {
    type: 'path',
    path: HEART_PATH,
    matrix: [0.5, 0, 0, 0.5, -6, -6] as unknown as DOMMatrix,
  } as confetti.Shape;
  return cachedHeartShape;
}

let cachedRibbonShape: confetti.Shape | null = null;
function getSerpentineShape(): confetti.Shape {
  if (cachedRibbonShape) return cachedRibbonShape;
  try {
    if (typeof confetti.shapeFromPath === 'function') {
      cachedRibbonShape = confetti.shapeFromPath({
        path: SERPENTINE_RIBBON_PATH,
        matrix: [0.18, 0, 0, 0.18, -5.4, -2.2] as unknown as DOMMatrix,
      });
      return cachedRibbonShape;
    }
  } catch {}

  cachedRibbonShape = {
    type: 'path',
    path: SERPENTINE_RIBBON_PATH,
    matrix: [0.18, 0, 0, 0.18, -5.4, -2.2] as unknown as DOMMatrix,
  } as confetti.Shape;
  return cachedRibbonShape;
}

/**
 * Triggers the selected victory animation.
 * Returns a cleanup function that cancels any delayed bursts.
 */
export function triggerVictoryAnimation(animationId: string = 'confetti'): () => void {
  const timeouts: number[] = [];

  switch (animationId) {
    case 'cosmic_nebula': {
      // Космическая туманность: облако сверкающей пыльцы (мелкие частицы) и сияющие звёздочки внутри него
      const dustColors = [
        '#00f0ff', // electric cyan
        '#38bdf8', // sky blue
        '#c084fc', // lavender dust
        '#a855f7', // violet
        '#f472b6', // nebula pink
        '#6366f1', // interstellar indigo
        '#e0e7ff', // starlight white
        '#ffffff', // pure glow
      ];

      const starColors = [
        '#ffd700', // golden star
        '#facc15', // brilliant yellow
        '#ffffff', // diamond white
        '#67e8f9', // cyan star
        '#fef08a', // pale gold
      ];

      // Волна 1: Центральное рождение туманности — густое облако пыльцы и яркие звёзды в центре
      confetti({
        particleCount: 90,
        spread: 360,
        startVelocity: 24,
        origin: { x: 0.5, y: 0.45 },
        colors: dustColors,
        shapes: ['circle'],
        scalar: 0.5, // мелкая светящаяся пыльца
        gravity: 0.38, // медленно парит
        decay: 0.95,
        ticks: 140,
      });

      confetti({
        particleCount: 30,
        spread: 360,
        startVelocity: 28,
        origin: { x: 0.5, y: 0.45 },
        colors: starColors,
        shapes: ['star'],
        scalar: 1.45, // крупные мерцающие звёзды
        gravity: 0.45,
        decay: 0.94,
        ticks: 130,
      });

      // Волна 2 (+260ms): Боковые рукава туманности со звёздным шлейфом
      timeouts.push(
        window.setTimeout(() => {
          // Левый рукав
          confetti({
            particleCount: 55,
            angle: 60,
            spread: 80,
            startVelocity: 30,
            origin: { x: 0.12, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.48,
            gravity: 0.4,
            decay: 0.95,
            ticks: 130,
          });
          confetti({
            particleCount: 20,
            angle: 60,
            spread: 70,
            startVelocity: 32,
            origin: { x: 0.12, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.4,
            gravity: 0.45,
            ticks: 130,
          });

          // Правый рукав
          confetti({
            particleCount: 55,
            angle: 120,
            spread: 80,
            startVelocity: 30,
            origin: { x: 0.88, y: 0.65 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.48,
            gravity: 0.4,
            decay: 0.95,
            ticks: 130,
          });
          confetti({
            particleCount: 20,
            angle: 120,
            spread: 70,
            startVelocity: 32,
            origin: { x: 0.88, y: 0.65 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.4,
            gravity: 0.45,
            ticks: 130,
          });
        }, 260)
      );

      // Волна 3 (+550ms): Финальный мягкий дождь звёздной пыльцы и звёзд сверху
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 70,
            spread: 140,
            startVelocity: 20,
            origin: { x: 0.5, y: 0.25 },
            colors: dustColors,
            shapes: ['circle'],
            scalar: 0.55,
            gravity: 0.35,
            decay: 0.96,
            ticks: 150,
          });
          confetti({
            particleCount: 25,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.25 },
            colors: starColors,
            shapes: ['star'],
            scalar: 1.5,
            gravity: 0.4,
            ticks: 150,
          });
        }, 550)
      );
      break;
    }

    case 'rainbow_hearts': {
      // Радужные сердца: настоящие выразительные сердечки (без кругов!)
      const heartShape = getHeartShape();
      const heartColors = [
        '#ff1e56', // neon ruby red
        '#ff4d6d', // coral red
        '#ff758f', // warm pink
        '#e11d48', // deep crimson
        '#f43f5e', // rose
        '#ec4899', // bright pink
        '#c084fc', // lilac
        '#facc15', // gold
      ];

      // Запуск 1: Пышный центральный фонтан сердечек
      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.6 },
        colors: heartColors,
        shapes: [heartShape],
        scalar: 1.7, // крупные сердечки
        gravity: 0.65,
        decay: 0.93,
        ticks: 120,
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
            ticks: 130,
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
            ticks: 130,
          });
        }, 220)
      );

      // Запуск 3 (+500ms): Парящие гигантские сердечки сверху
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 40,
            spread: 120,
            startVelocity: 22,
            origin: { x: 0.5, y: 0.35 },
            colors: heartColors,
            shapes: [heartShape],
            scalar: 1.85,
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
        // Звёзды
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
        // Золотые искорки
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
      // Королевский салют: мощные ступенчатые залпы с серпантином и искрами
      const serpentineShape = getSerpentineShape();
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
          shapes: ['star', 'circle', serpentineShape],
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

    case 'confetti':
    default: {
      // Праздничное конфетти: серпантин (длинные волнистые ленты) + яркие хлопья конфетти
      const serpentineShape = getSerpentineShape();
      const fiestaColors = ['#38bdf8', '#6366f1', '#ec4899', '#facc15', '#4ade80', '#fb923c', '#a855f7'];

      // Залп 1: Центральный салют с серпантином и конфетти
      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.5, y: 0.55 },
        colors: fiestaColors,
        shapes: [serpentineShape, 'square'],
        scalar: 1.4,
      });

      // Залп 2 (+220ms): Боковые пушки выстреливают длинные завитки серпантина
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 65,
            startVelocity: 38,
            origin: { x: 0.08, y: 0.65 },
            colors: fiestaColors,
            shapes: [serpentineShape, 'square'],
            scalar: 1.5,
            gravity: 0.75,
            decay: 0.92,
            ticks: 130,
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 65,
            startVelocity: 38,
            origin: { x: 0.92, y: 0.65 },
            colors: fiestaColors,
            shapes: [serpentineShape, 'square'],
            scalar: 1.5,
            gravity: 0.75,
            decay: 0.92,
            ticks: 130,
          });
        }, 220)
      );

      // Залп 3 (+500ms): Финальный праздничный дождь
      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 45,
            spread: 120,
            startVelocity: 24,
            origin: { x: 0.5, y: 0.35 },
            colors: fiestaColors,
            shapes: [serpentineShape, 'square'],
            scalar: 1.3,
            gravity: 0.7,
            ticks: 140,
          });
        }, 500)
      );
      break;
    }
  }

  return () => {
    timeouts.forEach((t) => clearTimeout(t));
  };
}
