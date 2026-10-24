// Web Audio API procedural sound engine for Siberian taiga winter ambient and tactile page flips
class TaigaAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private noiseNode: AudioBufferSourceNode | null = null;
  private oscNode: OscillatorNode | null = null;
  private oscGainNode: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private gainNode: GainNode | null = null;
  private cachedNoiseBuffer: AudioBuffer | null = null;
  private stopTimeoutId: number | null = null;

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleAmbient(): boolean {
    this.init();
    if (this.isPlaying) {
      this.stopAmbient();
      return false;
    } else {
      this.startAmbient();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.init();

    if (this.stopTimeoutId !== null) {
      clearTimeout(this.stopTimeoutId);
      this.stopTimeoutId = null;
    }

    // Create pink noise buffer for winter taiga wind only once
    if (!this.cachedNoiseBuffer) {
      const bufferSize = this.ctx.sampleRate * 4;
      this.cachedNoiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = this.cachedNoiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = this.cachedNoiseBuffer;
    whiteNoise.loop = true;

    // Filter simulating soft winter wind through pine branches
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.8, this.ctx.currentTime);

    // Subtle LFO to create slow breathing of wind
    const osc = this.ctx.createOscillator();
    osc.frequency.setValueAtTime(0.15, this.ctx.currentTime);
    const oscGain = this.ctx.createGain();
    oscGain.gain.setValueAtTime(120, this.ctx.currentTime);
    osc.connect(oscGain);
    oscGain.connect(filter.frequency);
    osc.start();

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 2.5);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    whiteNoise.start();

    this.noiseNode = whiteNoise;
    this.oscNode = osc;
    this.oscGainNode = oscGain;
    this.filterNode = filter;
    this.gainNode = gain;
    this.isPlaying = true;
  }

  private stopAmbient() {
    this.isPlaying = false;
    if (!this.ctx || !this.gainNode) {
      return;
    }

    if (this.stopTimeoutId !== null) {
      clearTimeout(this.stopTimeoutId);
    }

    this.gainNode.gain.setValueAtTime(this.gainNode.gain.value, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    
    this.stopTimeoutId = window.setTimeout(() => {
      try {
        if (this.noiseNode) {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
          this.noiseNode = null;
        }
        if (this.oscNode) {
          this.oscNode.stop();
          this.oscNode.disconnect();
          this.oscNode = null;
        }
        if (this.oscGainNode) {
          this.oscGainNode.disconnect();
          this.oscGainNode = null;
        }
        if (this.filterNode) {
          this.filterNode.disconnect();
          this.filterNode = null;
        }
        if (this.gainNode) {
          this.gainNode.disconnect();
          this.gainNode = null;
        }
      } catch {
        // ignore
      }
      this.stopTimeoutId = null;
    }, 1200);
  }

  // Tactile Munken paper page flip sound with velocity dynamics
  public playPageFlip(velocity: number = 1.0) {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const speed = Math.max(0.6, Math.min(velocity, 2.0));
      // Filtered burst simulating crisp paper sliding
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.09 * (1.1 / speed));
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      const baseFreq = 1100 * speed;
      filter.frequency.setValueAtTime(baseFreq, now);
      filter.Q.setValueAtTime(2.8, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06 * Math.min(speed, 1.3), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08 * (1.1 / speed));

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start();
    } catch {
      // AudioContext might be blocked until user gesture
    }
  }

  // Soft low-frequency paper landing / settling sound when the sheet lands flat
  public playPaperLand() {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.07);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      // Low muffled thump of heavy paper settling on the block
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(240, now);
      filter.Q.setValueAtTime(1.2, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.065);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start();
    } catch {
      // AudioContext might be blocked
    }
  }

  // Subtle paper corner peel friction sound when user grabs a corner
  public playCornerPeel() {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.04);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.2));
      }

      const source = this.ctx.createBufferSource();
      source.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1600, now);
      filter.Q.setValueAtTime(4.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.035);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      source.start();
    } catch {
      // AudioContext might be blocked
    }
  }
}

export const audioEngine = new TaigaAudioEngine();
