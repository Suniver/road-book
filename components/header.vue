<template>
  <div class="flex justify-between items-center w-full h-full">
    <Toast position="top-center" />
    <div class="flex items-center gap-2">
      <img src="/icon.svg" style="height: 30px" alt="" />
      <h3>Dustland Delivery - Road Book</h3>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        Show city names: <ToggleSwitch v-model="mapStore.showLabels" />
      </div>
      <div>
        <SelectButton
          v-model="mapStore.selectedToolboxLayout"
          :options="toolboxLayoutOptions"
          :pt="{ root: { class: 'my-togglebutton' } }"
        />
      </div>
      <div>
        <Button type="button" @click="showExportModal = true">
          <span class="flex items-center gap-2">
            <i class="i-tabler:database-import text-xl"></i> Export/Import
          </span>
        </Button>
      </div>
    </div>

    <!-- Export/Import Modal -->
    <Dialog
      v-model:visible="showExportModal"
      modal
      position="top"
      header="Export/Import App Data"
      :style="{ width: '30rem' }"
    >
      <div class="flex flex-col gap-2 p-2">
        <div class="flex flex-col gap-2">
          <span class="text-lg font-semibold">Export Data:</span>
          <span
            >You can export app data as a JSON file to import in a new version
            of the app or for use in another browser.</span
          >
          <Button type="button" @click="exportState">
            <span class="flex items-center gap-2">
              <i class="i-tabler:database-export text-xl"></i> Export Data
            </span>
          </Button>
        </div>
        <Divider />
        <div class="flex flex-col gap-2">
          <span class="text-lg font-semibold">Import Data:</span>
          <span
            >You can import data from a previously exporter JSON file. The app
            should handle data migration if the data is of an older version of
            the app.</span
          >
          <FileUpload
            name="storeFile"
            customUpload
            accept=".json"
            @uploader="onFileUpload"
            chooseLabel="Choose JSON File"
            uploadLabel="Upload"
            cancelLabel="Cancel"
            :maxFileSize="1000000"
          >
            <template #empty>
              <span>Drag and drop file here to upload.</span>
            </template>
          </FileUpload>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";

const toast = useToast();
const mapStore = useMapStore();

const toolboxLayoutOptions = ref(["Search", "Road Trip", "Both"]);
const showExportModal = ref(false);

const closeExportModal = () => {
  showExportModal.value = false;
};

const exportState = () => {
  mapStore.exportStateToJson();
  closeExportModal();
  toast.add({
    severity: "success",
    summary: "Exported",
    detail: "Data Successfully Exported!",
    life: 3000,
  });
};

const onFileUpload = (event: any) => {
  const file = event.files[0];
  mapStore.importStateFromJson(file);
  closeExportModal();
  toast.add({
    severity: "success",
    summary: "Imported",
    detail: "Data Successfully Imported!",
    life: 3000,
  });
};
</script>

<style lang="scss">
.my-togglebutton button {
  background: #e7e5e4 !important;
  border-color: #a8a29e !important;
  color: #292524 !important;
}

.my-togglebutton button:hover {
  color: #1c1917 !important;
}
</style>
