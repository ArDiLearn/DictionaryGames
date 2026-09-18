import confetti from 'canvas-confetti';

let heartShapeCache: confetti.Shape | null = null;
function getHeartShape(): confetti.Shape | 'circle' {
  if (heartShapeCache) return heartShapeCache;
  try {
    heartShapeCache = confetti.shapeFromText({ text: '💖' });
    return heartShapeCache;
  } catch {
    return 'circle';
  }
}

/**
 * Triggers the selected victory animation.
 * Returns a cleanup function that cancels any delayed bursts.
 */
export function triggerVictoryAnimation(animationId: string = 'confetti'): () => void {
  const timeouts: number[] = [];

  switch (animationId) {
    case 'stars': {
      // Golden star shower
      const launch = (x: number) => {
        confetti({
          particleCount: 35,
          spread: 80,
          ticks: 80,
          gravity: 0.85,
          decay: 0.93,
          startVelocity: 28,
          shapes: ['star'],
          colors: ['#FFE066', '#FFD700', '#FFA500', '#F59E0B', '#FDE047', '#FFFFFF'],
          origin: { x, y: 0.5 },
          scalar: 1.2,
        });
      };

      launch(0.5);
      timeouts.push(window.setTimeout(() => launch(0.3), 200));
      timeouts.push(window.setTimeout(() => launch(0.7), 400));
      timeouts.push(window.setTimeout(() => launch(0.5), 650));
      break;
    }

    case 'fireworks': {
      // High-velocity fireworks sequence
      const fireStage = (x: number, y: number, count: number, colors: string[]) => {
        confetti({
          particleCount: count,
          startVelocity: 35,
          spread: 360,
          ticks: 80,
          origin: { x, y },
          colors,
          gravity: 1.1,
          scalar: 1.1,
        });
      };

      // Burst 1: center
      fireStage(0.5, 0.4, 50, ['#ef4444', '#facc15', '#3b82f6', '#10b981']);

      // Burst 2: left & right
      timeouts.push(
        window.setTimeout(() => {
          fireStage(0.25, 0.35, 45, ['#ec4899', '#8b5cf6', '#06b6d4']);
          fireStage(0.75, 0.35, 45, ['#f97316', '#eab308', '#22c55e']);
        }, 300)
      );

      // Burst 3: grand finale
      timeouts.push(
        window.setTimeout(() => {
          fireStage(0.5, 0.3, 70, ['#ffd700', '#ff4500', '#00e5ff', '#ff007f', '#ffffff']);
        }, 650)
      );
      break;
    }

    case 'cosmic_nebula': {
      // Cosmic nebula with cyan, purple, magenta vortex
      const cosmicColors = ['#a855f7', '#6366f1', '#06b6d4', '#ec4899', '#38bdf8', '#c084fc'];
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.1, y: 0.75 },
        colors: cosmicColors,
        shapes: ['star', 'circle'],
        scalar: 1.1,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 100,
        startVelocity: 32,
        origin: { x: 0.9, y: 0.75 },
        colors: cosmicColors,
        shapes: ['star', 'circle'],
        scalar: 1.1,
      });

      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 60,
            spread: 360,
            startVelocity: 25,
            origin: { x: 0.5, y: 0.45 },
            colors: ['#38bdf8', '#e879f9', '#ffffff', '#818cf8'],
            shapes: ['star'],
            scalar: 1.3,
          });
        }, 350)
      );
      break;
    }

    case 'rainbow_hearts': {
      // Fluttering hearts and rainbow glitter
      const heartShape = getHeartShape();
      const heartColors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a', '#a855f7', '#38bdf8', '#fbbf24'];

      const burst = (x: number) => {
        confetti({
          particleCount: 35,
          spread: 90,
          startVelocity: 25,
          origin: { x, y: 0.6 },
          colors: heartColors,
          shapes: [heartShape, 'circle'],
          scalar: 1.3,
          gravity: 0.7,
        });
      };

      burst(0.5);
      timeouts.push(window.setTimeout(() => burst(0.35), 250));
      timeouts.push(window.setTimeout(() => burst(0.65), 500));
      break;
    }

    case 'confetti':
    default: {
      // Classic party confetti
      const partyColors = ['#38bdf8', '#6366f1', '#ec4899', '#facc15', '#4ade80', '#fb923c'];
      confetti({
        particleCount: 50,
        spread: 100,
        startVelocity: 30,
        origin: { x: 0.5, y: 0.55 },
        colors: partyColors,
      });

      timeouts.push(
        window.setTimeout(() => {
          confetti({
            particleCount: 35,
            angle: 60,
            spread: 60,
            origin: { x: 0.15, y: 0.6 },
            colors: partyColors,
          });
          confetti({
            particleCount: 35,
            angle: 120,
            spread: 60,
            origin: { x: 0.85, y: 0.6 },
            colors: partyColors,
          });
        }, 250)
      );
      break;
    }
  }

  return () => {
    timeouts.forEach((t) => clearTimeout(t));
  };
}
