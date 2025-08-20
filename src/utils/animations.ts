import type { ToastAnimation } from '../types';

export interface AnimationConfig {
  enter: string;
  exit: string;
  duration: number;
}

export const animations: Record<ToastAnimation, AnimationConfig> = {
  slide: {
    enter: 'vue-toast-slide-enter',
    exit: 'vue-toast-slide-exit',
    duration: 300
  },
  fade: {
    enter: 'vue-toast-fade-enter',
    exit: 'vue-toast-fade-exit',
    duration: 250
  },
  bounce: {
    enter: 'vue-toast-bounce-enter',
    exit: 'vue-toast-bounce-exit',
    duration: 400
  },
  'zoom-in': {
    enter: 'vue-toast-zoom-in-enter',
    exit: 'vue-toast-zoom-in-exit',
    duration: 250
  },
  'zoom-out': {
    enter: 'vue-toast-zoom-out-enter',
    exit: 'vue-toast-zoom-out-exit',
    duration: 250
  },
  flip: {
    enter: 'vue-toast-flip-enter',
    exit: 'vue-toast-flip-exit',
    duration: 400
  },
  elastic: {
    enter: 'vue-toast-elastic-enter',
    exit: 'vue-toast-elastic-exit',
    duration: 500
  }
};

export function getAnimationClasses(animation: ToastAnimation, isEntering: boolean): string {
  const config = animations[animation];
  return isEntering ? config.enter : config.exit;
}

export function getAnimationDuration(animation: ToastAnimation): number {
  return animations[animation].duration;
}

// CSS Animation keyframes generator
export function generateAnimationCSS(): string {
  return `
    /* Slide Animations */
    .vue-toast-slide-enter {
      animation: slideIn 0.3s ease-out forwards;
    }
    .vue-toast-slide-exit {
      animation: slideOut 0.3s ease-in forwards;
    }

    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }

    /* Fade Animations */
    .vue-toast-fade-enter {
      animation: fadeIn 0.25s ease-out forwards;
    }
    .vue-toast-fade-exit {
      animation: fadeOut 0.25s ease-in forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    /* Bounce Animations */
    .vue-toast-bounce-enter {
      animation: bounceIn 0.4s ease-out forwards;
    }
    .vue-toast-bounce-exit {
      animation: bounceOut 0.4s ease-in forwards;
    }

    @keyframes bounceIn {
      0% {
        transform: scale(0.3) translateY(-50px);
        opacity: 0;
      }
      50% {
        transform: scale(1.1) translateY(0);
        opacity: 1;
      }
      100% {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
    }

    @keyframes bounceOut {
      0% {
        transform: scale(1);
        opacity: 1;
      }
      100% {
        transform: scale(0.3);
        opacity: 0;
      }
    }

    /* Zoom In Animations */
    .vue-toast-zoom-in-enter {
      animation: zoomIn 0.25s ease-out forwards;
    }
    .vue-toast-zoom-in-exit {
      animation: zoomInOut 0.25s ease-in forwards;
    }

    @keyframes zoomIn {
      from {
        transform: scale(0);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes zoomInOut {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(0);
        opacity: 0;
      }
    }

    /* Zoom Out Animations */
    .vue-toast-zoom-out-enter {
      animation: zoomOut 0.25s ease-out forwards;
    }
    .vue-toast-zoom-out-exit {
      animation: zoomOutExit 0.25s ease-in forwards;
    }

    @keyframes zoomOut {
      from {
        transform: scale(1.5);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }

    @keyframes zoomOutExit {
      from {
        transform: scale(1);
        opacity: 1;
      }
      to {
        transform: scale(1.5);
        opacity: 0;
      }
    }

    /* Flip Animations */
    .vue-toast-flip-enter {
      animation: flipIn 0.4s ease-out forwards;
    }
    .vue-toast-flip-exit {
      animation: flipOut 0.4s ease-in forwards;
    }

    @keyframes flipIn {
      from {
        transform: rotateY(90deg);
        opacity: 0;
      }
      to {
        transform: rotateY(0);
        opacity: 1;
      }
    }

    @keyframes flipOut {
      from {
        transform: rotateY(0);
        opacity: 1;
      }
      to {
        transform: rotateY(90deg);
        opacity: 0;
      }
    }

    /* Elastic Animations */
    .vue-toast-elastic-enter {
      animation: elasticIn 0.5s ease-out forwards;
    }
    .vue-toast-elastic-exit {
      animation: elasticOut 0.5s ease-in forwards;
    }

    @keyframes elasticIn {
      0% {
        transform: scale(0) rotateZ(-180deg);
        opacity: 0;
      }
      60% {
        transform: scale(1.2) rotateZ(-90deg);
        opacity: 1;
      }
      80% {
        transform: scale(0.9) rotateZ(-45deg);
      }
      100% {
        transform: scale(1) rotateZ(0);
        opacity: 1;
      }
    }

    @keyframes elasticOut {
      0% {
        transform: scale(1) rotateZ(0);
        opacity: 1;
      }
      40% {
        transform: scale(1.1) rotateZ(45deg);
      }
      100% {
        transform: scale(0) rotateZ(180deg);
        opacity: 0;
      }
    }
  `;
}
