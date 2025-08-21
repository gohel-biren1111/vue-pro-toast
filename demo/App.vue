<template>
  <div class="demo-app">
    <ToastContainer />

    <div class="demo-container">
      <h1 class="demo-title"><span>🎁</span> Vue Pro Toast</h1>
      <p class="demo-subtitle">
        Professional Toast Notifications for Vue 3 - The Most Basic to Advanced
        Package
      </p>
      <div class="demo-stats">
        <div class="stat">
          <span class="stat-number">25+</span>
          <span class="stat-label">Advanced Features</span>
        </div>
        <div class="stat">
          <span class="stat-number">🔊</span>
          <span class="stat-label">Sound Effects</span>
        </div>
        <div class="stat">
          <span class="stat-number">⌨️</span>
          <span class="stat-label">Keyboard Support</span>
        </div>
        <div class="stat">
          <span class="stat-number">📊</span>
          <span class="stat-label">Analytics Built-in</span>
        </div>
        <div class="stat">
          <span class="stat-number">🎯</span>
          <span class="stat-label">Promise Integration</span>
        </div>
        <div class="stat">
          <span class="stat-number">100%</span>
          <span class="stat-label">TypeScript</span>
        </div>
      </div>

      <!-- Toast Type Examples -->
      <div class="demo-section">
        <h2>Toast Types</h2>
        <div class="demo-buttons">
          <button @click="showSuccess" class="btn btn-success">Success</button>
          <button @click="showError" class="btn btn-error">Error</button>
          <button @click="showWarning" class="btn btn-warning">Warning</button>
          <button @click="showInfo" class="btn btn-info">Info</button>
          <button @click="showDefault" class="btn btn-default">Default</button>
        </div>
      </div>

      <!-- Position Examples -->
      <div class="demo-section">
        <h2>Positions</h2>
        <div class="demo-buttons">
          <button @click="() => showPositioned('top-left')" class="btn">
            Top Left
          </button>
          <button @click="() => showPositioned('top-center')" class="btn">
            Top Center
          </button>
          <button @click="() => showPositioned('top-right')" class="btn">
            Top Right
          </button>
          <button @click="() => showPositioned('bottom-left')" class="btn">
            Bottom Left
          </button>
          <button @click="() => showPositioned('bottom-center')" class="btn">
            Bottom Center
          </button>
          <button @click="() => showPositioned('bottom-right')" class="btn">
            Bottom Right
          </button>
          <button @click="() => showPositioned('center')" class="btn">
            Center
          </button>
        </div>
      </div>

      <!-- Animation Examples -->
      <div class="demo-section">
        <h2>Animations</h2>
        <div class="demo-buttons">
          <button @click="() => showAnimated('slide')" class="btn">
            Slide
          </button>
          <button @click="() => showAnimated('fade')" class="btn">Fade</button>
          <button @click="() => showAnimated('bounce')" class="btn">
            Bounce
          </button>
          <button @click="() => showAnimated('zoom-in')" class="btn">
            Zoom In
          </button>
          <button @click="() => showAnimated('zoom-out')" class="btn">
            Zoom Out
          </button>
          <button @click="() => showAnimated('flip')" class="btn">Flip</button>
          <button @click="() => showAnimated('elastic')" class="btn">
            Elastic
          </button>
        </div>
      </div>

      <!-- Feature Examples -->
      <div class="demo-section">
        <h2>Advanced Features</h2>
        <div class="demo-buttons">
          <button @click="showWithTitle" class="btn">With Title</button>
          <button @click="showPersistent" class="btn">Persistent</button>
          <button @click="showCustomIcon" class="btn">Custom Icon</button>
          <button @click="showSwipeable" class="btn">Swipeable</button>
          <button @click="showNonClosable" class="btn">Non-closable</button>
          <button @click="showCustomStyle" class="btn">Custom Style</button>
          <button @click="showClickAction" class="btn">Click Action</button>
          <button @click="showHTMLContent" class="btn">HTML Content</button>
          <button @click="showProgressToast" class="btn">Progress Toast</button>
          <button @click="showStacked" class="btn">Stack Multiple</button>
          <button @click="showPromiseDemo" class="btn">Promise Demo</button>
          <button @click="showSoundDemo" class="btn">Sound Demo</button>
          <button @click="showBatchDemo" class="btn">Batch Demo</button>
          <button @click="showAnalytics" class="btn">Show Analytics</button>
        </div>
      </div>

      <!-- Super Advanced Features -->
      <div class="demo-section">
        <h2>🚀 Unique Features (No Other Package Has These!)</h2>
        <div class="demo-buttons">
          <button @click="toggleSound" class="btn">Toggle Sound Effects</button>
          <button @click="showKeyboardHelp" class="btn">
            Keyboard Shortcuts
          </button>
          <button @click="showQueueDemo" class="btn">Queue Management</button>
          <button @click="exportAnalytics" class="btn">Export Analytics</button>
        </div>
      </div>

      <!-- Theme Examples -->
      <div class="demo-section">
        <h2>Themes</h2>
        <div class="demo-buttons">
          <button @click="() => showThemed('light')" class="btn">Light</button>
          <button @click="() => showThemed('dark')" class="btn">Dark</button>
          <button @click="() => showThemed('auto')" class="btn">Auto</button>
        </div>
      </div>

      <!-- Control Examples -->
      <div class="demo-section">
        <h2>Controls</h2>
        <div class="demo-buttons">
          <button @click="showUpdateExample" class="btn">Update Toast</button>
          <button @click="dismissAll" class="btn btn-warning">
            Dismiss All
          </button>
          <button @click="clear" class="btn btn-error">Clear All</button>
        </div>
      </div>

      <!-- Toast Counter -->
      <div class="demo-counter">Active Toasts: {{ toasts.length }}</div>
      <h3 class="demo-cmd">Made with ❤️ for the Vue.js community</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../src/composables/useToast";
import ToastContainer from "../src/components/ToastContainer.vue";
import type { ToastPosition, ToastAnimation, ToastTheme } from "../src/types";

const {
  show,
  success,
  error,
  warning,
  info,
  dismiss,
  dismissAll,
  clear,
  update,
  promise,
  batch,
  plugins,
  toasts,
} = useToast();

// Basic toast types
function showSuccess() {
  success("Operation completed successfully!", {
    title: "Success",
  });
}

function showError() {
  error("Something went wrong. Please try again.", {
    title: "Error",
    duration: 10000,
  });
}

function showWarning() {
  warning("This action cannot be undone.", {
    title: "Warning",
    duration: 10000,
  });
}

function showInfo() {
  info("New update is available!", {
    title: "Information",
    duration: 10000,
  });
}

function showDefault() {
  show({
    message: "This is a default toast notification.",
    type: "default",
    duration: 10000,
  });
}

// Position examples
function showPositioned(position: ToastPosition) {
  show({
    message: `Toast positioned at ${position}`,
    type: "info",
    position,
    title: "Position Demo",
  });
}

// Animation examples
function showAnimated(animation: ToastAnimation) {
  show({
    message: `Toast with ${animation} animation`,
    type: "success",
    animation,
    title: "Animation Demo",
  });
}

// Theme examples
function showThemed(theme: ToastTheme) {
  show({
    message: `Toast with ${theme} theme`,
    type: "info",
    theme,
    title: "Theme Demo",
  });
}

// Feature examples
function showWithTitle() {
  show({
    title: "Important Notification",
    message:
      "This toast has both a title and a message to demonstrate the layout.",
    type: "info",
    duration: 6000,
  });
}

function showPersistent() {
  show({
    message: "This toast will stay until manually closed.",
    type: "warning",
    duration: 0,
    title: "Persistent Toast",
  });
}

function showCustomIcon() {
  show({
    message: "This toast has a custom icon!",
    type: "success",
    title: "Custom Icon",
    icon: {
      html: "🚀",
    },
  });
}

function showSwipeable() {
  show({
    message: "Swipe me left or right to dismiss!",
    type: "info",
    title: "Swipeable Toast",
    swipeable: true,
    draggable: true,
    duration: 8000,
  });
}

function showNonClosable() {
  show({
    message: "This toast cannot be manually closed.",
    type: "default",
    title: "Auto-close Only",
    closable: false,
    duration: 3000,
  });
}

function showCustomStyle() {
  show({
    message: "This toast has custom styling!",
    type: "success",
    title: "Custom Style",
    className: "custom-toast",
    style: {
      background: "linear-gradient(45deg, #ff6b6b, #ee5a24)",
      color: "white",
      border: "none",
      boxShadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
    },
  });
}

// New advanced features
function showClickAction() {
  show({
    message: "Click me to perform an action!",
    type: "info",
    title: "Interactive Toast",
    duration: 8000,
    onClick: () => {
      alert("Toast clicked! You can perform any action here.");
    },
  });
}

function showHTMLContent() {
  show({
    message:
      "This toast supports <strong>HTML content</strong> and <em>formatting</em>!",
    type: "info",
    title: "Rich Content",
    duration: 6000,
    icon: {
      html: "🎨",
    },
  });
}

function showProgressToast() {
  const toastId = show({
    message: "Upload in progress...",
    type: "info",
    title: "File Upload",
    duration: 5000,
  });

  // Simulate progress updates
  setTimeout(() => {
    update(toastId, {
      message: "Upload 50% complete...",
      type: "warning",
    });
  }, 1500);

  setTimeout(() => {
    update(toastId, {
      message: "Upload completed successfully!",
      type: "success",
      icon: { html: "🎉" },
    });
  }, 3000);
}

function showStacked() {
  // Show multiple toasts quickly to demonstrate stacking
  success("First notification", { title: "Stack Demo 1" });
  setTimeout(
    () => warning("Second notification", { title: "Stack Demo 2" }),
    200
  );
  setTimeout(() => error("Third notification", { title: "Stack Demo 3" }), 400);
  setTimeout(() => info("Fourth notification", { title: "Stack Demo 4" }), 600);
  setTimeout(
    () =>
      show({
        message: "Fifth notification with custom icon",
        title: "Stack Demo 5",
        type: "default",
        icon: { html: "🚀" },
      }),
    800
  );
}

// Super Advanced Features
function showPromiseDemo() {
  const mockApiCall = new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3
        ? resolve("Data loaded successfully!")
        : reject("Network error occurred");
    }, 3000);
  });

  promise(mockApiCall, {
    loading: { message: "Loading data from API...", title: "Promise Demo" },
    success: (data) => ({ message: data, title: "Success!" }),
    error: (error) => ({ message: error, title: "Failed!" }),
  })
    .then(() => {
      console.log("Promise resolved");
    })
    .catch(() => {
      console.log("Promise rejected");
    });
}

function showSoundDemo() {
  // Test different sound types
  setTimeout(() => {
    success("Success sound! 🎉", { title: "Sound Demo" });
  }, 0);

  setTimeout(() => {
    error("Error sound! ❌", { title: "Sound Demo" });
  }, 500);

  setTimeout(() => {
    warning("Warning sound! ⚠️", { title: "Sound Demo" });
  }, 1000);

  setTimeout(() => {
    info("Info sound! ℹ️", { title: "Sound Demo" });
  }, 1500);
}

function showBatchDemo() {
  batch([
    () => success("Batch operation 1"),
    () => warning("Batch operation 2"),
    () => info("Batch operation 3"),
    () => error("Batch operation 4"),
  ]);
}

function showAnalytics() {
  const stats = plugins.analytics.getStats();
  show({
    message: `Total events: ${stats.totalEvents}, Avg duration: ${Math.round(
      stats.averageDuration
    )}ms`,
    title: "Analytics Report",
    type: "info",
    duration: 8000,
  });
}

function toggleSound() {
  plugins.sound.toggle();
  show({
    message: "Sound effects toggled!",
    type: "info",
    duration: 2000,
  });
}

function showKeyboardHelp() {
  show({
    message: "Press ESC to dismiss all toasts, Arrow keys to navigate",
    title: "Keyboard Shortcuts",
    type: "info",
    duration: 6000,
    icon: { html: "⌨️" },
  });
}

function showQueueDemo() {
  // Add multiple toasts to queue
  for (let i = 1; i <= 5; i++) {
    plugins.queue.enqueue({
      id: `queue-${i}`,
      priority: i,
      data: {
        message: `Queued toast #${i}`,
        type: "info",
        title: "Queue Demo",
      },
    });
  }

  show({
    message: `${plugins.queue.size()} toasts added to queue!`,
    type: "success",
    duration: 3000,
  });
}

function exportAnalytics() {
  const data = plugins.analytics.exportData();
  console.log("Analytics Data:", data);
  show({
    message: `Analytics exported! Check console (${data.length} events)`,
    type: "success",
    duration: 4000,
  });
}

// Control examples
let updateToastId: string | null = null;

function showUpdateExample() {
  if (updateToastId) {
    update(updateToastId, {
      message: "Toast updated! 🎉",
      type: "success",
    });
    updateToastId = null;
  } else {
    updateToastId = show({
      message: 'Click "Update Toast" again to update this message.',
      type: "info",
      title: "Update Demo",
      duration: 10000,
    });
  }
}
</script>

<style scoped>
.demo-app {
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(
    45deg,
    #667eea,
    #764ba2,
    #ff7e5f,
    #feb47b,
    #ff4b2b,
    #f5a623,
    #50c878,
    #2d9cdb,
    #fc5c7d,
    #c7c9cb,
    #ff416c,
    #50c878
  );
  background-size: 300% 300%;
  animation: gradientAnimation 20s ease-in-out infinite;
  background-position: 0% 50%;
  box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.1);
}
/* Background Animation with Smooth Gradient */
@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 25% 50%;
  }
  50% {
    background-position: 50% 50%;
  }
  75% {
    background-position: 75% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.demo-container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
}

.demo-title {
  font-size: 3em;
  margin: 0 0 10px 0;
  color: #667eea;
  text-align: center;
}

.demo-subtitle {
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin: 0 0 40px 0;
}

.demo-section {
  margin-bottom: 30px;
}

.demo-section h2 {
  font-size: 1.5em;
  margin: 0 0 15px 0;
  color: #333;
  border-bottom: 2px solid #eee;
  padding-bottom: 8px;
}

.demo-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-success {
  background: #28a745;
  color: white;
  border-color: #28a745;
}

.btn-error {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
  border-color: #ffc107;
}

.btn-info {
  background: #17a2b8;
  color: white;
  border-color: #17a2b8;
}

.btn-default {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
}

.demo-counter {
  text-align: center;
  padding: 20px 20px 0 20px;
  border-radius: 8px;
  margin-top: 30px;
  font-weight: 600;
  color: #000;
}

.demo-cmd {
  text-align: center;
  background: #f8f9fa;
  font-weight: 700;
  padding: 12px 16px;
  color: #495057;
}

@media (max-width: 768px) {
  .demo-container {
    padding: 20px;
    margin: 10px;
  }

  .demo-cmd {
    font-size: 0.9em;
  }
  .demo-title {
    font-size: 2em;
  }

  .demo-buttons {
    justify-content: center;
  }

  .btn {
    flex: 1;
    min-width: 120px;
  }
}

/* Custom toast styling for demo */
:global(.custom-toast) {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.demo-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px 0 40px 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2em;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9em;
  color: #666;
  font-weight: 500;
}

@media (max-width: 768px) {
  .demo-stats {
    flex-wrap: wrap;
    gap: 20px;
  }

  .stat {
    flex: 1;
    min-width: 80px;
  }
}
</style>
