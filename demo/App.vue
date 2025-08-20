<template>
  <div class="demo-app">
    <ToastContainer />
    
    <div class="demo-container">
      <h1 class="demo-title">🍞 Vue Pro Toast</h1>
      <p class="demo-subtitle">Advanced toast notifications for Vue 3</p>
      
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
          <button @click="() => showPositioned('top-left')" class="btn">Top Left</button>
          <button @click="() => showPositioned('top-center')" class="btn">Top Center</button>
          <button @click="() => showPositioned('top-right')" class="btn">Top Right</button>
          <button @click="() => showPositioned('bottom-left')" class="btn">Bottom Left</button>
          <button @click="() => showPositioned('bottom-center')" class="btn">Bottom Center</button>
          <button @click="() => showPositioned('bottom-right')" class="btn">Bottom Right</button>
          <button @click="() => showPositioned('center')" class="btn">Center</button>
        </div>
      </div>

      <!-- Animation Examples -->
      <div class="demo-section">
        <h2>Animations</h2>
        <div class="demo-buttons">
          <button @click="() => showAnimated('slide')" class="btn">Slide</button>
          <button @click="() => showAnimated('fade')" class="btn">Fade</button>
          <button @click="() => showAnimated('bounce')" class="btn">Bounce</button>
          <button @click="() => showAnimated('zoom-in')" class="btn">Zoom In</button>
          <button @click="() => showAnimated('zoom-out')" class="btn">Zoom Out</button>
          <button @click="() => showAnimated('flip')" class="btn">Flip</button>
          <button @click="() => showAnimated('elastic')" class="btn">Elastic</button>
        </div>
      </div>

      <!-- Feature Examples -->
      <div class="demo-section">
        <h2>Features</h2>
        <div class="demo-buttons">
          <button @click="showWithTitle" class="btn">With Title</button>
          <button @click="showPersistent" class="btn">Persistent</button>
          <button @click="showCustomIcon" class="btn">Custom Icon</button>
          <button @click="showSwipeable" class="btn">Swipeable</button>
          <button @click="showNonClosable" class="btn">Non-closable</button>
          <button @click="showCustomStyle" class="btn">Custom Style</button>
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
          <button @click="dismissAll" class="btn btn-warning">Dismiss All</button>
          <button @click="clear" class="btn btn-error">Clear All</button>
        </div>
      </div>

      <!-- Toast Counter -->
      <div class="demo-counter">
        Active Toasts: {{ toasts.length }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../src/composables/useToast';
import ToastContainer from '../src/components/ToastContainer.vue';
import type { ToastPosition, ToastAnimation, ToastTheme } from '../src/types';

const { show, success, error, warning, info, dismiss, dismissAll, clear, update, toasts } = useToast();

// Basic toast types
function showSuccess() {
  success('Operation completed successfully!', {
    title: 'Success'
  });
}

function showError() {
  error('Something went wrong. Please try again.', {
    title: 'Error',
    duration: 6000
  });
}

function showWarning() {
  warning('This action cannot be undone.', {
    title: 'Warning',
    duration: 5000
  });
}

function showInfo() {
  info('New update is available!', {
    title: 'Information'
  });
}

function showDefault() {
  show({
    message: 'This is a default toast notification.',
    type: 'default'
  });
}

// Position examples
function showPositioned(position: ToastPosition) {
  show({
    message: `Toast positioned at ${position}`,
    type: 'info',
    position,
    title: 'Position Demo'
  });
}

// Animation examples
function showAnimated(animation: ToastAnimation) {
  show({
    message: `Toast with ${animation} animation`,
    type: 'success',
    animation,
    title: 'Animation Demo'
  });
}

// Theme examples
function showThemed(theme: ToastTheme) {
  show({
    message: `Toast with ${theme} theme`,
    type: 'info',
    theme,
    title: 'Theme Demo'
  });
}

// Feature examples
function showWithTitle() {
  show({
    title: 'Important Notification',
    message: 'This toast has both a title and a message to demonstrate the layout.',
    type: 'info',
    duration: 6000
  });
}

function showPersistent() {
  show({
    message: 'This toast will stay until manually closed.',
    type: 'warning',
    duration: 0,
    title: 'Persistent Toast'
  });
}

function showCustomIcon() {
  show({
    message: 'This toast has a custom icon!',
    type: 'success',
    title: 'Custom Icon',
    icon: {
      html: '🚀'
    }
  });
}

function showSwipeable() {
  show({
    message: 'Swipe me left or right to dismiss!',
    type: 'info',
    title: 'Swipeable Toast',
    swipeable: true,
    draggable: true,
    duration: 8000
  });
}

function showNonClosable() {
  show({
    message: 'This toast cannot be manually closed.',
    type: 'default',
    title: 'Auto-close Only',
    closable: false,
    duration: 3000
  });
}

function showCustomStyle() {
  show({
    message: 'This toast has custom styling!',
    type: 'success',
    title: 'Custom Style',
    className: 'custom-toast',
    style: {
      background: 'linear-gradient(45deg, #ff6b6b, #ee5a24)',
      color: 'white',
      border: 'none',
      boxShadow: '0 8px 32px rgba(255, 107, 107, 0.3)'
    }
  });
}

// Control examples
let updateToastId: string | null = null;

function showUpdateExample() {
  if (updateToastId) {
    update(updateToastId, {
      message: 'Toast updated! 🎉',
      type: 'success'
    });
    updateToastId = null;
  } else {
    updateToastId = show({
      message: 'Click "Update Toast" again to update this message.',
      type: 'info',
      title: 'Update Demo',
      duration: 10000
    });
  }
}
</script>

<style scoped>
.demo-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
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
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
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
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  margin-top: 30px;
  font-weight: 600;
  color: #495057;
}

@media (max-width: 768px) {
  .demo-container {
    padding: 20px;
    margin: 10px;
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
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
