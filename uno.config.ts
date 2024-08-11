// uno.config.ts
import { defineConfig } from "unocss";
import presetUno from "@unocss/preset-uno";
import presetIcons from "@unocss/preset-icons";
import presetTagify from "@unocss/preset-tagify";
import presetWebFonts from "@unocss/preset-web-fonts";
import presetAttributify from "@unocss/preset-attributify";

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetTagify(),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: "Lato",
        mono: ["Fira Code", "Fira Mono:400,700"],
      },
    }),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
