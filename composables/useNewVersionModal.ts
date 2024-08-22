const isVisible = ref(false);
const latestVersion = ref("");

function showModal(newVersion: string) {
  latestVersion.value = newVersion;
  isVisible.value = true;
}

function refreshPage(latestVersion: string) {
  localStorage.setItem("app-version", latestVersion);
  window.location.reload();
}

function dismiss() {
  isVisible.value = false;
}

export function useNewVersionModal() {
  return {
    isVisible,
    latestVersion,
    showModal,
    refreshPage,
    dismiss,
  };
}
