import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === "production";
  return {
    base: isProd ? "./" : "/",
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["favicon.svg", "icons.svg", "pwa-192.svg", "pwa-512.svg"],
        manifest: {
          name: "Dermoconsultora",
          short_name: "Dermoconsultora",
          description: "Consulta e estudo de dermocosméticos (base v1) com checklist de segurança.",
          lang: "pt-BR",
          start_url: ".",
          scope: ".",
          display: "standalone",
          background_color: "#ffffff",
          theme_color: "#aa3bff",
          icons: [
            { src: "pwa-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "any" },
            { src: "pwa-512.svg", sizes: "512x512", type: "image/svg+xml", purpose: "any" }
          ]
        },
        workbox: {
          cleanupOutdatedCaches: true,
          navigateFallback: "index.html",
          navigateFallbackDenylist: [/\/data\//, /\/assets\//],
          runtimeCaching: [
            {
              urlPattern: /\/data\/v(1|2)\/.*\.json$/,
              handler: "StaleWhileRevalidate",
              options: {
                cacheName: "dc-data",
                expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 180 }
              }
            },
            {
              urlPattern: /\/assets\/images\/.*\.(webp|png|jpg|jpeg|svg)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "dc-images",
                expiration: { maxEntries: 2000, maxAgeSeconds: 60 * 60 * 24 * 365 }
              }
            }
          ]
        }
      })
    ]
  };
});
