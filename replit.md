# Vue Pro Toast - Toast Notification Component Library

## Overview

Vue Pro Toast is a comprehensive Vue 3 toast notification library designed for modern web applications. The project provides a feature-rich, TypeScript-enabled toast system with advanced animations, gesture support, theming capabilities, and flexible positioning. Built using Vue 3 Composition API, it offers a complete solution for displaying toast notifications with extensive customization options including themes (light/dark/auto), multiple positioning options, various animation effects, and touch gesture support for dismissal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Vue 3 with Composition API and TypeScript for type safety and modern development patterns
- **Component Structure**: Modular design with separate components for ToastContainer and individual Toast items
- **Plugin System**: Vue plugin architecture for easy integration with global installation and configuration
- **State Management**: Reactive state management using Vue's reactive API for toast queue and container management

### Build and Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Full TypeScript support with strict type checking and declaration file generation
- **Code Quality**: ESLint configuration with Vue and TypeScript rules for consistent code style
- **Module System**: ES modules with tree-shaking support for optimized bundle sizes

### Styling and Theming
- **CSS Architecture**: CSS custom properties (variables) for dynamic theming support
- **Theme System**: Light, dark, and auto theme detection with CSS variable-based implementation
- **Animation Framework**: CSS-based animations with multiple effects (slide, fade, bounce, zoom, flip, elastic)
- **Responsive Design**: Touch-friendly design with gesture support for mobile devices

### Gesture and Interaction System
- **Touch Gestures**: Custom gesture handler class for swipe and drag interactions
- **Animation Control**: Programmatic animation management with enter/exit transitions
- **Event Handling**: Comprehensive event system for click, hover, and gesture-based interactions
- **Auto-dismiss Logic**: Smart timing system with pause-on-hover functionality

### Component Design Patterns
- **Composable Architecture**: useToast composable for state management and toast operations
- **Global State**: Centralized toast state with multiple container support
- **Type Safety**: Comprehensive TypeScript interfaces for all configuration options and data structures
- **Plugin Integration**: Vue plugin pattern with global component registration and provide/inject

## External Dependencies

### Core Dependencies
- **vue**: ^3.5.18 - Core Vue 3 framework for reactive components and Composition API
- **typescript**: ^5.9.2 - TypeScript compiler for type checking and declaration generation

### Development and Build Tools
- **vite**: ^7.1.3 - Fast build tool and development server with ES modules support
- **@vitejs/plugin-vue**: ^6.0.1 - Vite plugin for Vue single-file component processing

### Code Quality Tools
- **eslint**: ^9.33.0 - JavaScript/TypeScript linting for code quality enforcement
- **@typescript-eslint/eslint-plugin**: ^8.40.0 - TypeScript-specific ESLint rules
- **@typescript-eslint/parser**: ^8.40.0 - TypeScript parser for ESLint
- **@vue/eslint-config-typescript**: ^14.6.0 - Vue-specific TypeScript ESLint configuration

### Configuration Dependencies
- **@vue/tsconfig**: ^0.8.1 - Shared TypeScript configuration for Vue projects

### Browser APIs
- **DOM APIs**: Native browser APIs for element manipulation, event handling, and CSS custom properties
- **Touch Events**: Native touch event APIs for gesture recognition and mobile interaction support
- **CSS Animations**: Browser-native CSS animation and transition support for smooth visual effects