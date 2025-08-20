export interface GestureConfig {
  threshold: number;
  velocityThreshold: number;
  timeThreshold: number;
}

export interface TouchPoint {
  x: number;
  y: number;
  time: number;
}

export interface SwipeData {
  startPoint: TouchPoint;
  currentPoint: TouchPoint;
  deltaX: number;
  deltaY: number;
  distance: number;
  duration: number;
  velocity: number;
  direction: 'left' | 'right' | 'up' | 'down' | null;
}

export class GestureHandler {
  private config: GestureConfig;
  private startPoint: TouchPoint | null = null;
  private currentPoint: TouchPoint | null = null;
  private isDragging = false;
  private element: HTMLElement;
  private onSwipe?: (data: SwipeData) => void;
  private onDrag?: (data: SwipeData) => void;
  private onDragEnd?: (data: SwipeData) => void;

  constructor(
    element: HTMLElement,
    config: Partial<GestureConfig> = {}
  ) {
    this.element = element;
    this.config = {
      threshold: 50,
      velocityThreshold: 0.3,
      timeThreshold: 300,
      ...config
    };
    
    this.bindEvents();
  }

  public onSwipeGesture(callback: (data: SwipeData) => void): void {
    this.onSwipe = callback;
  }

  public onDragGesture(callback: (data: SwipeData) => void): void {
    this.onDrag = callback;
  }

  public onDragEndGesture(callback: (data: SwipeData) => void): void {
    this.onDragEnd = callback;
  }

  private bindEvents(): void {
    // Touch events
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });
    this.element.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: false });

    // Mouse events for desktop
    this.element.addEventListener('mousedown', this.handleMouseDown.bind(this));
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
  }

  private createTouchPoint(clientX: number, clientY: number): TouchPoint {
    return {
      x: clientX,
      y: clientY,
      time: Date.now()
    };
  }

  private calculateSwipeData(): SwipeData | null {
    if (!this.startPoint || !this.currentPoint) return null;

    const deltaX = this.currentPoint.x - this.startPoint.x;
    const deltaY = this.currentPoint.y - this.startPoint.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const duration = this.currentPoint.time - this.startPoint.time;
    const velocity = distance / duration;

    let direction: SwipeData['direction'] = null;
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      direction = deltaY > 0 ? 'down' : 'up';
    }

    return {
      startPoint: this.startPoint,
      currentPoint: this.currentPoint,
      deltaX,
      deltaY,
      distance,
      duration,
      velocity,
      direction
    };
  }

  private handleTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    this.startPoint = this.createTouchPoint(touch.clientX, touch.clientY);
    this.currentPoint = this.startPoint;
    this.isDragging = true;
  }

  private handleTouchMove(event: TouchEvent): void {
    if (!this.startPoint || !this.isDragging) return;

    const touch = event.touches[0];
    this.currentPoint = this.createTouchPoint(touch.clientX, touch.clientY);

    const swipeData = this.calculateSwipeData();
    if (swipeData && this.onDrag) {
      this.onDrag(swipeData);
    }

    // Prevent scrolling when dragging
    event.preventDefault();
  }

  private handleTouchEnd(event: TouchEvent): void {
    if (!this.startPoint || !this.currentPoint || !this.isDragging) return;

    const swipeData = this.calculateSwipeData();
    this.isDragging = false;

    if (swipeData) {
      if (this.onDragEnd) {
        this.onDragEnd(swipeData);
      }

      // Check if it's a swipe gesture
      if (
        swipeData.distance > this.config.threshold ||
        (swipeData.velocity > this.config.velocityThreshold && 
         swipeData.duration < this.config.timeThreshold)
      ) {
        if (this.onSwipe) {
          this.onSwipe(swipeData);
        }
      }
    }

    this.reset();
  }

  private handleMouseDown(event: MouseEvent): void {
    this.startPoint = this.createTouchPoint(event.clientX, event.clientY);
    this.currentPoint = this.startPoint;
    this.isDragging = true;
    event.preventDefault();
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.startPoint || !this.isDragging) return;

    this.currentPoint = this.createTouchPoint(event.clientX, event.clientY);

    const swipeData = this.calculateSwipeData();
    if (swipeData && this.onDrag) {
      this.onDrag(swipeData);
    }
  }

  private handleMouseUp(event: MouseEvent): void {
    if (!this.startPoint || !this.currentPoint || !this.isDragging) return;

    const swipeData = this.calculateSwipeData();
    this.isDragging = false;

    if (swipeData) {
      if (this.onDragEnd) {
        this.onDragEnd(swipeData);
      }

      // Check if it's a swipe gesture
      if (
        swipeData.distance > this.config.threshold ||
        (swipeData.velocity > this.config.velocityThreshold && 
         swipeData.duration < this.config.timeThreshold)
      ) {
        if (this.onSwipe) {
          this.onSwipe(swipeData);
        }
      }
    }

    this.reset();
  }

  private reset(): void {
    this.startPoint = null;
    this.currentPoint = null;
    this.isDragging = false;
  }

  public destroy(): void {
    // Remove touch events
    this.element.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    this.element.removeEventListener('touchmove', this.handleTouchMove.bind(this));
    this.element.removeEventListener('touchend', this.handleTouchEnd.bind(this));

    // Remove mouse events
    this.element.removeEventListener('mousedown', this.handleMouseDown.bind(this));
    document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
    document.removeEventListener('mouseup', this.handleMouseUp.bind(this));
    
    this.reset();
  }
}
