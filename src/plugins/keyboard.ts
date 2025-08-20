export interface KeyboardOptions {
  enabled: boolean;
  escapeKey: boolean;
  arrowNavigation: boolean;
}

export class KeyboardManager {
  private options: KeyboardOptions;
  private onDismissAll?: () => void;
  private onFocusNext?: () => void;
  private onFocusPrev?: () => void;

  constructor(options: Partial<KeyboardOptions> = {}) {
    this.options = {
      enabled: true,
      escapeKey: true,
      arrowNavigation: true,
      ...options
    };

    this.bindEvents();
  }

  private bindEvents(): void {
    if (typeof document === 'undefined') return;

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (!this.options.enabled) return;

    switch (event.key) {
      case 'Escape':
        if (this.options.escapeKey && this.onDismissAll) {
          event.preventDefault();
          this.onDismissAll();
        }
        break;
      case 'ArrowDown':
        if (this.options.arrowNavigation && this.onFocusNext) {
          event.preventDefault();
          this.onFocusNext();
        }
        break;
      case 'ArrowUp':
        if (this.options.arrowNavigation && this.onFocusPrev) {
          event.preventDefault();
          this.onFocusPrev();
        }
        break;
    }
  }

  setDismissAllHandler(handler: () => void): void {
    this.onDismissAll = handler;
  }

  setNavigationHandlers(next: () => void, prev: () => void): void {
    this.onFocusNext = next;
    this.onFocusPrev = prev;
  }

  destroy(): void {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
  }
}