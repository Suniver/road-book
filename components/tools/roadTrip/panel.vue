<template>
  <div class="flex flex-col">
    <div class="bg-light-500 flex justify-between items-center p-0.5">
      <h4 class="m-0 px-1 py-1">Road Trip</h4>
      <div class="flex items-center gap-1">
        <Toast position="top-center" />
        <!-- Open Road Trip reset button -->
        <span
          class="flex items-center bg-red-400 border-rounded border-1 border-solid border-red-500 p-0.5 shadow cursor-pointer"
          v-ripple
          @click="confirmResetTrip($event)"
        >
          <i class="i-tabler:road-off text-white text-xl"></i>
        </span>
        <!-- Open Road Trip settings button -->
        <span
          class="flex items-center bg-stone-600 border-rounded border-1 border-solid border-stone-700 p-0.5 shadow cursor-pointer"
          v-ripple
          @click="toggle"
        >
          <i class="i-tabler:settings text-white text-xl"></i>
        </span>
        <!-- Open Road Trip in separate modal button -->
        <span
          class="flex items-center bg-stone-600 border-rounded border-1 border-solid border-stone-700 p-0.5 shadow cursor-pointer"
          v-ripple
          @click="showTripModal = true"
        >
          <i class="i-tabler:window-maximize text-white text-xl"></i>
        </span>
      </div>
    </div>
    <ScrollPanel
      style="width: 100%; height: 85vh"
      :dt="{
        bar: {
          background: '{stone-400}',
        },
      }"
    >
      <div class="flex flex-col gap-2 p-2">
        <div v-for="(item, index) in mapStore.trip">
          <ToolsRoadTripItem :city="item" :index="index" />
        </div></div
    ></ScrollPanel>

    <!-- Road Trip Modal -->
    <Dialog
      v-model:visible="showTripModal"
      maximizable
      modal
      position="top"
      header="Road Trip"
      :style="{ width: '50rem' }"
    >
      <div class="flex flex-col gap-2 p-2">
        <div v-for="(item, index) in mapStore.trip">
          <ToolsRoadTripItem :city="item" :index="index" />
        </div>
      </div>
    </Dialog>

    <!-- Road Trip Settings Popover -->
    <Popover ref="popov">
      <div class="flex flex-col gap-2" style="max-width: 150px">
        <label for="virtue" class="font-bold block"> Crew Virtue </label>
        <InputNumber
          v-model="mapStore.crewVirtue"
          inputId="virtue"
          mode="decimal"
          showButtons
          :min="0"
          :max="25"
          fluid
        />
        <Button
          label="Reset"
          severity="danger"
          @click="mapStore.crewVirtue = undefined"
        ></Button>
      </div>
    </Popover>

    <!-- Confirm Reset Trip Popup -->
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script lang="ts" setup>
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const mapStore = useMapStore();

const popov = ref();
const showTripModal = ref(false);

const toggle = (event: any) => {
  popov.value.toggle(event);
};

const confirmResetTrip = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: "Are you sure you want to reset the road trip?",
    icon: "i-tabler:alert-triangle",
    rejectProps: {
      label: "Cancel",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Reset",
      severity: "danger",
    },
    accept: () => {
      mapStore.resetTrip();
      toast.add({
        severity: "success",
        summary: "Confirmed",
        detail: "Road Trip Reseted",
        life: 3000,
      });
    },
    reject: () => {
      toast.add({
        severity: "info",
        summary: "Cancelled",
        detail: "Road Trip Preserved!",
        life: 3000,
      });
    },
  });
};
</script>

<style lang="scss"></style>
