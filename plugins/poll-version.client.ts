export default defineNuxtPlugin((nuxtApp) => {
  const compareVersions = (v1: string, v2: string) => {
    return v1.localeCompare(v2, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  };

  const checkForNewVersion = async () => {
    const storedVersion = localStorage.getItem("app-version");
    const { version: latestVersion } = await $fetch<{ version: string }>(
      "/api/version"
    );

    console.log("Version check:", storedVersion, latestVersion);

    if (
      storedVersion &&
      latestVersion &&
      compareVersions(storedVersion, latestVersion) < 0
    ) {
      const { showModal } = useNewVersionModal();
      showModal(latestVersion);
    }
  };

  checkForNewVersion();
  // Polling every 5 minutes
  setInterval(checkForNewVersion, 300000);
});
