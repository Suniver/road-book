export default defineNuxtPlugin(async (nuxtApp) => {
  const { version } = await $fetch<{ version: string }>("/api/version");
  if (!localStorage.getItem("app-version")) {
    localStorage.setItem("app-version", version);
  }

  if (localStorage.getItem("app-version") === undefined) {
    localStorage.setItem("app-version", version);
  }

  nuxtApp.hook("app:mounted", () => {
    useRuntimeConfig().public.version = version;
  });
});
