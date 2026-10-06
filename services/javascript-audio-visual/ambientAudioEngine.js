/**
 * luxury.Raw Maison — High-Fidelity Web Audio Ambient Soundscape Engine
 * Language: Native JavaScript (ES6+ Web Audio API & DSP Synthesis)
 * Synthesizes cinematic harmonic drone chords calibrated to luxury fashion acoustics
 * ("Paris Runway", "Milan Atelier", "Tokyo Monolith").
 */

export class MaisonAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
    this.currentAtmosphere = "Milan Atelier";
  }

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
  }

  playAtmosphere(preset = "Milan Atelier") {
    this.init();
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.stop();
    this.isPlaying = true;
    this.currentAtmosphere = preset;

    const presets = {
      "Milan Atelier": [110.0, 164.81, 220.0, 329.63], // A2, E3, A3, E4 warm resonant drone
      "Paris Runway": [65.41, 130.81, 196.0, 261.63], // C2, C3, G3, C4 deep cinematic sub
      "Tokyo Monolith": [146.83, 220.0, 293.66, 440.0] // D3, A3, D4, A4 minimalist overtone
    };

    const freqs = presets[preset] || presets["Milan Atelier"];
    const now = this.ctx.currentTime;
    this.gainNode.gain.cancelScheduledValues(now);
    this.gainNode.gain.linearRampToValueAtTime(0.12, now + 3.0); // Gentle fade-in

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = idx % 2 === 0 ? "sine" : "triangle";
      osc.frequency.setValueAtTime(freq, now);

      // Add gentle detuned micro-chorus
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.value = 0.1 + idx * 0.05;
      lfoGain.gain.value = 1.2;
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.value = 0.25 / freqs.length;
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);
      osc.start();

      this.oscillators.push({ osc, lfo });
    });
  }

  stop() {
    if (this.ctx && this.gainNode) {
      const now = this.ctx.currentTime;
      this.gainNode.gain.cancelScheduledValues(now);
      this.gainNode.gain.linearRampToValueAtTime(0.0001, now + 1.5);
      setTimeout(() => {
        this.oscillators.forEach(({ osc, lfo }) => {
          try {
            osc.stop();
            lfo.stop();
          } catch {}
        });
        this.oscillators = [];
        this.isPlaying = false;
      }, 1600);
    }
  }

  toggle(preset) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.playAtmosphere(preset);
    }
    return this.isPlaying;
  }
}
