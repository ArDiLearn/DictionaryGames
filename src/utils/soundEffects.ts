/**
 * Web Audio API synthesizer for instant, zero-latency cheerful game sound effects.
 * Works 100% offline without external audio files.
 */

class SoundEffects {
  private ctx: AudioContext | null = null;
  public enabled = true;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playClick() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  public playCorrect() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + index * 0.08;
        const duration = 0.15;

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // ignore
    }
  }

  public playWrong() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(180, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {
      // ignore
    }
  }

  public playFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + index * 0.12;
        const duration = index === notes.length - 1 ? 0.4 : 0.15;

        gain.gain.setValueAtTime(0.25, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch {
      // ignore
    }
  }

  public playUnlockFanfare(isEpic = false) {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // 1. Triumphant ascending fanfare notes
      const notes = isEpic
        ? [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98] // C5, E5, G5, C6, E6, G6
        : [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = isEpic ? 'sawtooth' : 'triangle';
        osc.frequency.value = freq;

        const startTime = ctx.currentTime + index * 0.1;
        const duration = index === notes.length - 1 ? 0.6 : 0.18;

        gain.gain.setValueAtTime(isEpic ? 0.16 : 0.22, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });

      // 2. Harmonious sustained victory chord (C Major)
      const chord = [523.25, 659.25, 783.99, 1046.5];
      const chordStart = ctx.currentTime + (notes.length - 1) * 0.1;
      const chordDuration = isEpic ? 0.9 : 0.6;

      chord.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.12, chordStart);
        gain.gain.exponentialRampToValueAtTime(0.005, chordStart + chordDuration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chordStart);
        osc.stop(chordStart + chordDuration);
      });

      // 3. Sparkling magical chimes
      const chimes = [1760, 2093, 2637, 3135.96, 3520];
      chimes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;

        const chimeStart = chordStart + 0.05 + i * 0.08;
        gain.gain.setValueAtTime(0.14, chimeStart);
        gain.gain.exponentialRampToValueAtTime(0.001, chimeStart + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(chimeStart);
        osc.stop(chimeStart + 0.35);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Magic Sparkle Fanfare (Chimes & fairy dust harp glissando)
   */
  public playSparkleFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const pentatonic = [587.33, 659.25, 783.99, 880.0, 1046.5, 1174.66, 1318.51, 1567.98];
      pentatonic.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const startTime = ctx.currentTime + index * 0.07;
        const duration = 0.35;

        gain.gain.setValueAtTime(0.2, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });

      // Shimmering high bells finish
      const bells = [1760, 2093, 2637];
      bells.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = ctx.currentTime + 0.55 + i * 0.09;
        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch {}
  }

  /**
   * 8-Bit Retro Arcade Fanfare (Chiptune square wave level-up)
   */
  public playRetroFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [
        { f: 440.0, d: 0.08 }, // A4
        { f: 554.37, d: 0.08 }, // C#5
        { f: 659.25, d: 0.08 }, // E5
        { f: 880.0, d: 0.12 }, // A5
        { f: 783.99, d: 0.08 }, // G5
        { f: 880.0, d: 0.08 }, // A5
        { f: 1108.73, d: 0.35 }, // C#6
      ];

      let curTime = ctx.currentTime;
      notes.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(note.f, curTime);

        gain.gain.setValueAtTime(0.12, curTime);
        gain.gain.exponentialRampToValueAtTime(0.005, curTime + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(curTime);
        osc.stop(curTime + note.d);

        curTime += note.d;
      });
    } catch {}
  }

  /**
   * Power Rock Fanfare (Punchy power chords with triumphant finish)
   */
  public playRockFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Powerful rock cadence: D -> F -> G -> A (with power fifths)
      const powerChords = [
        { root: 293.66, fifth: 440.0, start: 0, dur: 0.14 }, // D4 + A4
        { root: 349.23, fifth: 523.25, start: 0.15, dur: 0.14 }, // F4 + C5
        { root: 392.0, fifth: 587.33, start: 0.3, dur: 0.14 }, // G4 + D5
        { root: 440.0, fifth: 659.25, start: 0.46, dur: 0.55 }, // A4 + E5
      ];

      powerChords.forEach((chord) => {
        [chord.root, chord.fifth].forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + chord.start);

          const st = ctx.currentTime + chord.start;
          gain.gain.setValueAtTime(0.13, st);
          gain.gain.exponentialRampToValueAtTime(0.005, st + chord.dur);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(st);
          osc.stop(st + chord.dur);
        });
      });
    } catch {}
  }

  /**
   * Cosmic Odyssey Fanfare (Ethereal spatial synthesizer)
   */
  public playCosmicFanfare() {
    if (!this.enabled) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      // Deep sub-bass swell
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'triangle';
      bass.frequency.setValueAtTime(130.81, ctx.currentTime); // C3
      bass.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.8); // C4

      bassGain.gain.setValueAtTime(0.18, ctx.currentTime);
      bassGain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.9);
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start();
      bass.stop(ctx.currentTime + 0.9);

      // Ethereal arpeggio rising to stars
      const cosmicNotes = [392.0, 523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      cosmicNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.09);

        const st = ctx.currentTime + idx * 0.09;
        const dur = idx === cosmicNotes.length - 1 ? 0.6 : 0.25;

        gain.gain.setValueAtTime(0.15, st);
        gain.gain.exponentialRampToValueAtTime(0.002, st + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(st);
        osc.stop(st + dur);
      });
    } catch {}
  }

  /**
   * Play user's equipped victory theme
   */
  public playVictoryTheme(themeId: string = 'classic') {
    switch (themeId) {
      case 'sparkle':
        this.playSparkleFanfare();
        break;
      case 'retro_8bit':
        this.playRetroFanfare();
        break;
      case 'rock_star':
        this.playRockFanfare();
        break;
      case 'cosmic_synth':
        this.playCosmicFanfare();
        break;
      case 'classic':
      default:
        this.playFanfare();
        break;
    }
  }
}

export const sounds = new SoundEffects();
