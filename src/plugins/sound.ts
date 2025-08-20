export interface SoundOptions {
  enabled: boolean;
  volume: number;
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

export class SoundManager {
  private options: SoundOptions;
  private audioContext?: AudioContext;

  constructor(options: Partial<SoundOptions> = {}) {
    this.options = {
      enabled: true,
      volume: 0.3,
      ...options
    };
    
    if (typeof window !== 'undefined' && window.AudioContext) {
      this.audioContext = new AudioContext();
    }
  }

  private createBeep(frequency: number, duration: number): void {
    if (!this.audioContext || !this.options.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    gainNode.gain.setValueAtTime(this.options.volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  playSound(type: 'success' | 'error' | 'warning' | 'info'): void {
    if (!this.options.enabled) return;

    const sounds = {
      success: () => this.createBeep(800, 0.2),
      error: () => {
        this.createBeep(300, 0.1);
        setTimeout(() => this.createBeep(250, 0.1), 100);
      },
      warning: () => {
        this.createBeep(600, 0.15);
        setTimeout(() => this.createBeep(600, 0.15), 200);
      },
      info: () => this.createBeep(500, 0.2)
    };

    sounds[type]?.();
  }

  setVolume(volume: number): void {
    this.options.volume = Math.max(0, Math.min(1, volume));
  }

  toggle(): void {
    this.options.enabled = !this.options.enabled;
  }
}