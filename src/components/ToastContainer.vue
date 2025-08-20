<template>
  <teleport to="body">
    <div
      v-for="position in positions"
      :key="position"
      :class="getContainerClasses(position)"
      :style="getContainerStyles(position)"
    >
      <transition-group
        :name="getTransitionName(position)"
        tag="div"
        class="vue-toast-container__list"
        @enter="onEnter"
        @leave="onLeave"
      >
        <Toast
          v-for="toast in getToastsForPosition(position)"
          :key="toast.id"
          :toast="toast"
          :on-dismiss="dismissToast"
          @dismiss="dismissToast"
        />
      </transition-group>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { ToastPosition } from '../types';
import { useToast, toastState } from '../composables/useToast';
import Toast from './Toast.vue';

const { dismiss } = useToast();

// Computed properties
const positions = computed<ToastPosition[]>(() => {
  return Array.from(toastState.containers.keys());
});

const getToastsForPosition = (position: ToastPosition) => {
  return toastState.containers.get(position) || [];
};

const getContainerClasses = (position: ToastPosition) => {
  return [
    'vue-toast-container',
    `vue-toast-container--${position}`,
    `vue-toast-container--${toastState.defaultOptions.theme}`
  ];
};

const getContainerStyles = (position: ToastPosition) => {
  const { offset, zIndex, gap } = toastState.defaultOptions;
  const styles: Record<string, string> = {
    zIndex: zIndex?.toString() || '9999'
  };

  // Position-specific styles
  if (position.includes('top')) {
    styles.top = `${offset?.y || 16}px`;
  }
  if (position.includes('bottom')) {
    styles.bottom = `${offset?.y || 16}px`;
  }
  if (position.includes('left')) {
    styles.left = `${offset?.x || 16}px`;
  }
  if (position.includes('right')) {
    styles.right = `${offset?.x || 16}px`;
  }
  if (position.includes('center') && !position.includes('top') && !position.includes('bottom')) {
    styles.left = '50%';
    styles.top = '50%';
    styles.transform = 'translate(-50%, -50%)';
  }
  if (position === 'top-center') {
    styles.left = '50%';
    styles.transform = 'translateX(-50%)';
  }
  if (position === 'bottom-center') {
    styles.left = '50%';
    styles.transform = 'translateX(-50%)';
  }

  // Gap between toasts
  styles['--toast-gap'] = `${gap || 8}px`;

  return styles;
};

const getTransitionName = (position: ToastPosition) => {
  return `vue-toast-list-${position}`;
};

// Methods
function dismissToast(id: string): void {
  dismiss(id);
}

function onEnter(el: Element): void {
  // Animation enter callback
  (el as HTMLElement).style.height = 'auto';
}

function onLeave(el: Element): void {
  // Animation leave callback
  (el as HTMLElement).style.height = '0';
}
</script>
