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
          v-tooltip.left="'Reset Road Trip'"
          @click="confirmResetTrip($event)"
        >
          <i class="i-tabler:road-off text-white text-xl"></i>
        </span>
        <!-- Open Road Trip settings button -->
        <span
          class="flex items-center bg-stone-600 border-rounded border-1 border-solid border-stone-700 p-0.5 shadow cursor-pointer"
          v-ripple
          v-tooltip.left="'Road Trip Settings'"
          @click="toggle"
        >
          <i class="i-tabler:settings text-white text-xl"></i>
        </span>
        <!-- Open Road Trip in separate modal button -->
        <span
          class="flex items-center bg-stone-600 border-rounded border-1 border-solid border-stone-700 p-0.5 shadow cursor-pointer"
          v-ripple
          v-tooltip.left="'Full Screen Road Trip'"
          @click="showTripModal = true"
        >
          <i class="i-tabler:window-maximize text-white text-xl"></i>
        </span>
        <!-- About the raod trip algorithm modal button -->
        <span
          class="flex items-center bg-stone-600 border-rounded border-1 border-solid border-stone-700 p-0.5 shadow cursor-pointer"
          v-ripple
          v-tooltip.left="'More Info About Road Trip'"
          @click="showAboutModal = true"
        >
          <i class="i-tabler:help-square text-white text-xl"></i>
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

    <!-- About Modal -->
    <Dialog
      v-model:visible="showAboutModal"
      modal
      position="top"
      header="About The Road Trip Algorithm"
      :style="{ width: '45rem' }"
    >
      <div class="flex flex-col gap-2 p-2">
        <p>
          To date, the algorithm that calculates what you should sell is deterministic and simple enough to avoid confusion:
          <ul>
            <li>Buy a resource in a city that produces it if a future city needs it.</li>
            <li>If a second city further away also needs it, it will be ignored for the time being.</li>
            <li>If several cities produce a resource that you could buy for a city further away, it will only buy from the first city (to avoid you buying more than the target city can afford).</li>
            <li>For the moment, the algorithm doesn't take into account what your towns produce with their fields/mines/factories.</li>
            <li>For the moment, the script does not take into account what you already have in your truck.</li>
          </ul>

          In the future we plan to
          <ul>
            <li>Allowing you to exclude goods that you do not wish to buy/sell.</li>
            <li>To allow you to define a stock for your truck and take it into account for sales.</li>
            <li>To allow you to define the production and stock of your towns and take them into account for sales.</li>
            <li>Allow you to specify the quantity of resources you wish to buy in one town, and the quantity you wish to sell in another town, allowing the algorithm to anticipate the possibility of buying the same resource in several towns to the same destination, or selling the same resource in several towns having bought it in the same place.</li>
          </ul>

          If you have any questions or suggestions, contact me on the game's discord (my username is MooNoKe).

          Enjoy the game!
        </p>
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
const showAboutModal = ref(false);

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
