<template>
  <div>
    <Dialog
      v-model:visible="isVisible"
      modal
      position="top"
      header="New Version Available"
      :style="{ width: '40rem' }"
    >
      <div>
        <p class="">A new version of the app is available.</p>
        <p>
          A page refresh needed to update app. Would you like to refresh the
          page?
        </p>
        <p>
          You can cancle this warning safely and export your data before
          refreshing manually.
        </p>
        <p>
          After you have refreshed the page manually you will see this message
          again. Just click the "Reload" button when ready.
        </p>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancel"
          severity="secondary"
          @click="dismiss"
        ></Button>
        <Button
          type="button"
          label="Reload"
          severity="success"
          @click="refreshPage(latestVersion)"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
const { isVisible, latestVersion, refreshPage, dismiss } = useNewVersionModal();
</script>

<style lang="scss"></style>
