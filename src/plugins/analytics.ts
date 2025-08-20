export interface AnalyticsData {
  toastId: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  action: 'show' | 'dismiss' | 'click' | 'swipe' | 'timeout';
  duration?: number;
  timestamp: number;
}

export interface AnalyticsOptions {
  enabled: boolean;
  maxEvents: number;
  onEvent?: (data: AnalyticsData) => void;
}

export class AnalyticsManager {
  private options: AnalyticsOptions;
  private events: AnalyticsData[] = [];
  private startTimes: Map<string, number> = new Map();

  constructor(options: Partial<AnalyticsOptions> = {}) {
    this.options = {
      enabled: true,
      maxEvents: 1000,
      ...options
    };
  }

  trackEvent(
    toastId: string,
    type: AnalyticsData['type'],
    action: AnalyticsData['action']
  ): void {
    if (!this.options.enabled) return;

    const timestamp = Date.now();
    let duration: number | undefined;

    if (action === 'show') {
      this.startTimes.set(toastId, timestamp);
    } else if (action === 'dismiss' || action === 'click' || action === 'swipe' || action === 'timeout') {
      const startTime = this.startTimes.get(toastId);
      if (startTime) {
        duration = timestamp - startTime;
        this.startTimes.delete(toastId);
      }
    }

    const data: AnalyticsData = {
      toastId,
      type,
      action,
      duration,
      timestamp
    };

    this.events.push(data);

    // Keep events within limit
    if (this.events.length > this.options.maxEvents) {
      this.events.shift();
    }

    // Call custom event handler
    this.options.onEvent?.(data);
  }

  getStats() {
    const stats = {
      totalEvents: this.events.length,
      byType: {} as Record<string, number>,
      byAction: {} as Record<string, number>,
      averageDuration: 0,
      dismissalRate: 0
    };

    let totalDuration = 0;
    let durationCount = 0;
    let showCount = 0;
    let dismissCount = 0;

    this.events.forEach(event => {
      stats.byType[event.type] = (stats.byType[event.type] || 0) + 1;
      stats.byAction[event.action] = (stats.byAction[event.action] || 0) + 1;

      if (event.duration) {
        totalDuration += event.duration;
        durationCount++;
      }

      if (event.action === 'show') showCount++;
      if (event.action === 'dismiss') dismissCount++;
    });

    stats.averageDuration = durationCount > 0 ? totalDuration / durationCount : 0;
    stats.dismissalRate = showCount > 0 ? (dismissCount / showCount) * 100 : 0;

    return stats;
  }

  exportData(): AnalyticsData[] {
    return [...this.events];
  }

  clearData(): void {
    this.events = [];
    this.startTimes.clear();
  }
}