# Rama Medicine Company Catalogue PWA

This React and TypeScript catalogue is isolated from the existing Kotlin Multiplatform Android and iOS apps.

## Run locally

Install Node.js 20 or newer, then from this directory run:

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Catalogue behavior

Product records live in `src/data/products.ts`. The sample listings and technical specifications are demonstration content and must be confirmed before real-world use. Saved products, comparison selections and recent views are stored in browser localStorage.

The PWA service worker caches the built application shell and local assets. Product photos currently use remote image URLs, so they may not be available offline unless the browser has already cached them.