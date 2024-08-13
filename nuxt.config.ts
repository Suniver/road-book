// https://nuxt.com/docs/api/configuration/nuxt-config

import { definePreset } from "@primevue/themes";
import Aura from "@primevue/themes/aura";

const MyAura = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{stone.50}",
      100: "{stone.100}",
      200: "{stone.200}",
      300: "{stone.300}",
      400: "{stone.400}",
      500: "{stone.500}",
      600: "{stone.600}",
      700: "{stone.700}",
      800: "{stone.800}",
      900: "{stone.900}",
      950: "{stone.950}",
    },
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/leaflet",
    "@primevue/nuxt-module",
    "@unocss/nuxt",
  ],
  plugins: [],
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: MyAura,
        options: {
          prefix: "p",
          darkModeSelector: ".my-app-dark",
          cssLayer: false,
        },
      },
    },
  },
});
