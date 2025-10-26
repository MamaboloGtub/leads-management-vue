# leads-management-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Environment Configuration

This project uses environment variables for configuration. Before running the application:

1. Copy the example environment file:
   ```sh
   copy .env.example .env
   ```

2. Update the `.env` file with your specific configuration:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8888/api
   
   # App Configuration
   VITE_APP_NAME=Leads Management System
   VITE_APP_VERSION=1.0.0
   
   # Development Features
   VITE_DEBUG_MODE=true
   ```

### Available Environment Variables

- `VITE_API_BASE_URL`: Base URL for your API endpoints
- `VITE_APP_NAME`: Application name displayed in the UI
- `VITE_APP_VERSION`: Application version
- `VITE_DEBUG_MODE`: Enable/disable debug features

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
