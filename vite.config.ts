import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "icons/favicon.ico",
        "icons/css_dictionary_icon_192x192.png",
        "icons/css_dictionary_icon_512x512.png",
      ],
      manifest: {
        name: "CSS辞書 - CSSプロパティ完全ガイド",
        short_name: "CSS辞書",
        description:
          "すべてのCSSプロパティを日本語で解説。実用的なサンプルコード、逆引き検索、最新テクニック集を収録。",
        theme_color: "#3b82f6",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "ja",
        icons: [
          {
            src: "icons/css_dictionary_icon_192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/css_dictionary_icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/css_dictionary_icon_512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        categories: ["education", "productivity", "developer"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json}"],
      },
    }),
  ],
});
