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
// const MyAura = definePreset(Aura, {
//   semantic: {
//     primary: {
//       50: "{amber.50}",
//       100: "{amber.100}",
//       200: "{amber.200}",
//       300: "{amber.300}",
//       400: "{amber.400}",
//       500: "{amber.500}",
//       600: "{amber.600}",
//       700: "{amber.700}",
//       800: "{amber.800}",
//       900: "{amber.900}",
//       950: "{amber.950}",
//     },
//   },
// });

export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/leaflet",
    "@primevue/nuxt-module",
    "@unocss/nuxt",
  ],
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
