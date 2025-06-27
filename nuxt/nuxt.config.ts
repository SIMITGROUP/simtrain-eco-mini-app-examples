import Aura from "@primeuix/themes/aura";
import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  devServer: {
    port: 8100,
  },

  modules: ["@primevue/nuxt-module"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: "light",
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
  },
});
