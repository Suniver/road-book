import { defineNuxtPlugin } from "#app";
import { useMapStore } from "~/stores/map";

export default defineNuxtPlugin((nuxtApp) => {
  const mapStore = useMapStore();
  mapStore.initializeStore();
});
