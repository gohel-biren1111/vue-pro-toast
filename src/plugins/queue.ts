export interface QueueOptions {
  maxSize: number;
  priority: 'fifo' | 'lifo' | 'priority';
  grouping: boolean;
  dedupe: boolean;
}

export interface QueuedToast {
  id: string;
  priority: number;
  group?: string;
  timestamp: number;
  data: any;
}

export class QueueManager {
  private options: QueueOptions;
  private queue: QueuedToast[] = [];
  private processing = false;

  constructor(options: Partial<QueueOptions> = {}) {
    this.options = {
      maxSize: 100,
      priority: 'fifo',
      grouping: false,
      dedupe: true,
      ...options
    };
  }

  enqueue(toast: Omit<QueuedToast, 'timestamp'>): boolean {
    // Check for duplicates
    if (this.options.dedupe && this.queue.some(t => t.id === toast.id)) {
      return false;
    }

    // Check queue size
    if (this.queue.length >= this.options.maxSize) {
      if (this.options.priority === 'fifo') {
        this.queue.shift(); // Remove oldest
      } else {
        this.queue.pop(); // Remove newest
      }
    }

    const queuedToast: QueuedToast = {
      ...toast,
      timestamp: Date.now()
    };

    // Insert based on priority strategy
    if (this.options.priority === 'priority') {
      const insertIndex = this.queue.findIndex(t => t.priority < toast.priority);
      if (insertIndex === -1) {
        this.queue.push(queuedToast);
      } else {
        this.queue.splice(insertIndex, 0, queuedToast);
      }
    } else if (this.options.priority === 'lifo') {
      this.queue.unshift(queuedToast);
    } else {
      this.queue.push(queuedToast);
    }

    return true;
  }

  dequeue(): QueuedToast | null {
    if (this.queue.length === 0) return null;

    if (this.options.priority === 'lifo') {
      return this.queue.shift() || null;
    } else {
      return this.queue.shift() || null;
    }
  }

  peek(): QueuedToast | null {
    return this.queue[0] || null;
  }

  size(): number {
    return this.queue.length;
  }

  clear(): void {
    this.queue = [];
  }

  getByGroup(group: string): QueuedToast[] {
    return this.queue.filter(toast => toast.group === group);
  }

  removeFromGroup(group: string): void {
    this.queue = this.queue.filter(toast => toast.group !== group);
  }

  processQueue(processor: (toast: QueuedToast) => Promise<void>): void {
    if (this.processing) return;
    
    this.processing = true;
    this.processNext(processor);
  }

  private async processNext(processor: (toast: QueuedToast) => Promise<void>): Promise<void> {
    const toast = this.dequeue();
    if (!toast) {
      this.processing = false;
      return;
    }

    try {
      await processor(toast);
    } catch (error) {
      console.error('Queue processing error:', error);
    }

    // Process next item
    setTimeout(() => this.processNext(processor), 100);
  }
}