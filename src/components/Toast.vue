<template>
  <div
    ref="toastRef"
    :class="toastClasses"
    :style="toastStyles"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Icon -->
    <div v-if="hasIcon" class="vue-toast__icon">
      <component v-if="toast.icon.component" :is="toast.icon.component" />
      <div v-else-if="toast.icon.html" v-html="toast.icon.html" />
      <div v-else :class="defaultIconClass" />
    </div>

    <!-- Content -->
    <div class="vue-toast__content">
      <div v-if="toast.title" class="vue-toast__title">
        {{ toast.title }}
      </div>
      <div class="vue-toast__message">
        {{ toast.message }}
      </div>
    </div>

    <!-- Close Button -->
    <button
      v-if="toast.closable"
      class="vue-toast__close"
      @click.stop="handleClose"
      aria-label="Close toast"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>

    <!-- Progress Bar -->
    <div
      v-if="showProgress"
      class="vue-toast__progress"
      :style="progressStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from "vue";
import type { Toast } from "../types";
import { GestureHandler, type SwipeData } from "../utils/gestures";
import { getAnimationClasses } from "../utils/animations";
import { pauseToast, resumeToast } from "../composables/useToast";

interface Props {
  toast: Toast;
  onDismiss: (id: string) => void;
}

interface Emits {
  (e: "dismiss", id: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const toastRef = ref<HTMLElement>();
const gestureHandler = ref<GestureHandler>();
const isVisible = ref(true);
const isDragging = ref(false);
const dragOffset = ref(0);
const progressWidth = ref(100);
const progressInterval = ref<number>();
const remainingTime = ref<number>();
const pausedAt = ref<number>();

// Computed properties
const toastClasses = computed(() => {
  return [
    "vue-toast",
    `vue-toast--${props.toast.type}`,
    `vue-toast--${props.toast.theme}`,
    `vue-toast--${props.toast.position}`,
    {
      "vue-toast--dragging": isDragging.value,
      "vue-toast--closable": props.toast.closable,
      [props.toast.className]: props.toast.className,
    },
    getAnimationClasses(props.toast.animation, isVisible.value),
  ];
});

const toastStyles = computed(() => {
  const styles: Record<string, string> = {
    ...props.toast.style,
  };

  if (isDragging.value) {
    styles.transform = `translateX(${dragOffset.value}px)`;
    styles.opacity = Math.max(
      0.3,
      1 - Math.abs(dragOffset.value) / 200
    ).toString();
  }

  return styles;
});

const hasIcon = computed(() => {
  return (
    props.toast.icon.component ||
    props.toast.icon.html ||
    props.toast.type !== "default"
  );
});

const defaultIconClass = computed(() => {
  const iconClasses = {
    success: "vue-toast__icon--success",
    error: "vue-toast__icon--error",
    warning: "vue-toast__icon--warning",
    info: "vue-toast__icon--info",
    default: "vue-toast__icon--default",
  };

  return [
    "vue-toast__icon--default",
    iconClasses[props.toast.type],
    props.toast.icon.class,
  ].filter(Boolean);
});

const showProgress = computed(() => {
  return props.toast.duration > 0 && !isDragging.value;
});

const progressStyle = computed(() => {
  return {
    width: `${progressWidth.value}%`,
    transition: isDragging.value ? "none" : undefined,
  };
});

// Methods
function handleClick(): void {
  if (props.toast.onClick) {
    props.toast.onClick();
  }
}

function handleClose(): void {
  dismissToast();
}

function handleMouseEnter(): void {
  if (props.toast.pauseOnHover) {
    pauseToast(props.toast.id);
    pauseProgressAnimation();
  }
}

function handleMouseLeave(): void {
  if (props.toast.pauseOnHover) {
    resumeToast(props.toast.id);
    resumeProgressAnimation();
  }
}

function dismissToast(): void {
  isVisible.value = false;
  setTimeout(() => {
    emit("dismiss", props.toast.id);
    props.onDismiss(props.toast.id);
  }, 300); // Animation duration
}

function startProgressAnimation(): void {
  if (props.toast.duration <= 0) return;

  stopProgressAnimation();

  const startTime = Date.now();
  const duration = props.toast.duration;
  remainingTime.value = duration;

  progressInterval.value = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    remainingTime.value = Math.max(0, duration - elapsed);
    progressWidth.value = (remainingTime.value / duration) * 100;

    if (remainingTime.value === 0) {
      stopProgressAnimation();
    }
  }, 16); // ~60fps
}

function pauseProgressAnimation(): void {
  if (progressInterval.value) {
    clearInterval(progressInterval.value);
    progressInterval.value = undefined;
    pausedAt.value = Date.now();
  }
}

function resumeProgressAnimation(): void {
  if (props.toast.duration <= 0 || !remainingTime.value) return;

  if (progressInterval.value) {
    clearInterval(progressInterval.value);
  }

  const startTime = Date.now();
  const duration = remainingTime.value; // Continue with remaining time

  progressInterval.value = window.setInterval(() => {
    const elapsed = Date.now() - startTime;
    remainingTime.value = Math.max(0, duration - elapsed);
    progressWidth.value = (remainingTime.value / props.toast.duration) * 100;

    if (remainingTime.value === 0) {
      stopProgressAnimation();
    }
  }, 16); // ~60fps
}

function stopProgressAnimation(): void {
  if (progressInterval.value) {
    clearInterval(progressInterval.value);
    progressInterval.value = undefined;
  }
}

// Gesture handling
function setupGestures(): void {
  if (!toastRef.value) return;

  gestureHandler.value = new GestureHandler(toastRef.value, {
    threshold: 80,
    velocityThreshold: 0.5,
  });

  if (props.toast.swipeable || props.toast.draggable) {
    gestureHandler.value.onDragGesture((data: SwipeData) => {
      if (props.toast.draggable) {
        isDragging.value = true;
        dragOffset.value = data.deltaX;
      }
    });

    gestureHandler.value.onDragEndGesture((data: SwipeData) => {
      isDragging.value = false;

      // Check if should dismiss based on drag distance or velocity
      if (Math.abs(data.deltaX) > 120 || Math.abs(data.velocity) > 0.5) {
        dismissToast();
      } else {
        // Snap back
        dragOffset.value = 0;
      }
    });

    if (props.toast.swipeable) {
      gestureHandler.value.onSwipeGesture((data: SwipeData) => {
        if (data.direction === "left" || data.direction === "right") {
          dismissToast();
        }
      });
    }
  }
}

// Lifecycle
onMounted(() => {
  setupGestures();
  startProgressAnimation();
});

onUnmounted(() => {
  gestureHandler.value?.destroy();
  stopProgressAnimation();
});

// Watchers
watch(
  () => props.toast.duration,
  () => {
    startProgressAnimation();
  }
);
</script>
