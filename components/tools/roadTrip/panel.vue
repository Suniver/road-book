<template>
  <div class="flex flex-col">
    <div class="bg-light-500 flex justify-between items-center p-0.5">
      <h4 class="m-0 px-1 py-1">Road Trip</h4>
      <div class="flex items-center gap-1">
        <Toast position="top-center" />
        <!-- Save Road Trip button -->
        <span
          class="flex items-center bg-green-500 border-rounded border-1 border-solid border-green-500 p-0.5 shadow cursor-pointer"
          v-ripple
          v-tooltip.left="'Save Road Trip'"
          @click="toggleSaveTripPopover"
        >
          <i class="i-tabler:device-floppy text-white text-xl"></i>
        </span>
        <Popover ref="saveTripPopoverRef">
          <div class="flex flex-col gap-2">
            <h4 class="m-0">Save this Road Trip ?</h4>
            <div class="flex flex-col gap-1">
              <label :for="saveTripNameFieldId">Name:</label>
              <InputText :id="saveTripNameFieldId" v-model="saveName" />
            </div>
            <div class="flex gap-2 items-center justify-between">
              <Button
                label="Cancel"
                size="small"
                @click="toggleSaveTripPopover"
              />
              <Button
                label="Save"
                size="small"
                severity="success"
                :disabled="saveName ? false : true"
                @click="saveTrip"
              />
            </div>
          </div>
        </Popover>
        <!-- Load Road Trip button -->
        <span
          class="flex items-center bg-sky-500 border-rounded border-1 border-solid border-sky-600 p-0.5 shadow cursor-pointer"
          v-ripple
          v-tooltip.left="'Load Road Trip'"
          @click="showSavedTripsModal = true"
        >
          <i class="i-tabler:book-upload text-white text-xl"></i>
        </span>
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
          @click="showSettingsModal = true"
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
      style="width: 100%; height: 84vh"
      :dt="{
        bar: {
          background: '{stone-400}',
        },
      }"
    >
      <div class="flex flex-col gap-2 p-2">
        <div v-for="(item, index) in mapStore.trip" :key="item.id">
          <ToolsRoadTripItem :city="item" :index="index" />
        </div>
      </div>
    </ScrollPanel>

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

    <!-- Raod trip settings Modal -->
    <Dialog
      v-model:visible="showSettingsModal"
      modal
      position="top"
      header="Road Trip Settings"
      :style="{ width: '45rem' }"
    >
      <div class="flex flex-col gap-2">
        <div>
          <!-- Crew Virtue section -->
          <h4>
            Crew Virtue
            <i
              class="i-tabler:help-circle-filled text-2xl"
              v-tooltip.top="
                'If you define your crew virtue here, we will give you a warning when planning to visit a city where your virtue is too low.'
              "
            />
            :
          </h4>
          <div class="flex items-center gap-2">
            <InputNumber
              v-model="crewVirtue"
              inputId="virtue"
              mode="decimal"
              showButtons
              :min="0"
              :max="25"
            />
            <Button
              label="Reset"
              severity="danger"
              @click="crewVirtue = undefined"
            ></Button>
          </div>
          <Divider />
          <!-- Excluded ressources section -->
          <h4>
            Excluded Resources
            <i
              class="i-tabler:help-circle-filled text-2xl"
              v-tooltip.top="
                'Included and excluded resources: excluded resources will not be used by the auto-trade algorithm.'
              "
            />
            :
          </h4>
          <div class="flex flex-col gap-2">
            <div class="flex justify-around">
              <span class="font-semibold">Included</span>
              <span class="font-semibold">Excluded</span>
            </div>
            <div class="flex items-center gap-2">
              <PickList
                v-model="pickerResourceList"
                dataKey="name"
                breakpoint="1400px"
                class="w-full"
              >
                <template #option="{ option }">
                  {{ option.name }}
                </template>
              </PickList>
            </div>
          </div>
          <Divider />
          <!-- Excluded one-time trades section -->
          <h4>
            Excluded Transactions from Road Trip
            <i
              class="i-tabler:help-circle-filled text-2xl"
              v-tooltip.top="
                'List of transactions you removed from your Road Trip. Here you can restore them.'
              "
            />
            :
          </h4>
          <div class="flex flex-col gap-2">
            <div
              v-for="trade in mapStore.excludedTrades"
              class="flex items-center gap-2 border-rounded border-solid border-1 border-stone-200 bg-stone-100 p-2"
            >
              <div
                class="flex items-center gap-1 px-2 py-1 border-rounded bg-green-200"
              >
                <span class="capitalize px-2 py-1 border-rounded bg-green-100">
                  {{ trade.buyAction.action }}:
                </span>
                {{ trade.buyAction.ressource.name }} in
                {{ trade.sellAction.exchangeNode.name }}
              </div>
              <div class="flex items-center rounded-1/2 p-1 bg-stone-300">
                <i
                  class="i-tabler:arrow-narrow-right text-2xl text-stone-900"
                ></i>
              </div>
              <div
                class="flex items-center gap-1 px-2 py-1 border-rounded bg-amber-200"
              >
                <span class="capitalize px-2 py-1 border-rounded bg-amber-100"
                  >{{ trade.sellAction.action }}:</span
                >
                {{ trade.sellAction.ressource.name }} in
                {{ trade.buyAction.exchangeNode.name }}
              </div>
              <Button
                label="Restore"
                severity="info"
                @click="mapStore.removeFromExcludedTrades(trade)"
              />
            </div>
          </div>
          <Divider />
          <div class="flex justify-center">
            <Button label="Save" severity="success" @click="saveSettings" />
          </div>
        </div>
      </div>
    </Dialog>

    <!-- Saved Trips Modal -->
    <Dialog
      v-model:visible="showSavedTripsModal"
      modal
      position="top"
      header="Saved Road Trips"
      :style="{ width: '45rem' }"
    >
      <div class="flex flex-col gap-2">
        <div v-for="save in mapStore.savedTrips" :key="save.id">
          <div class="border-stone-300 border-solid border-1 border-rounded">
            <div
              class="flex items-center justify-between bg-stone-200 border-rounded p-x-2 p-y-1"
            >
              <span class="font-semibold">
                {{ save.name }}
              </span>
              <div class="flex items-center gap-2">
                <!-- Load Saved Trip Button -->
                <span
                  class="inline-flex items-center border-rounded p-1 bg-green-500 cursor-pointer"
                  v-tooltip.right="'Load Saved Road Trip'"
                  @click="loadSavedTrip(save.id)"
                >
                  <i class="i-tabler:file-download text-white text-lg"></i>
                </span>
                <!-- Delete Saved Trip Button -->
                <span
                  class="inline-flex items-center border-rounded p-1 bg-red-400 cursor-pointer"
                  v-tooltip.right="'Delete Saved Road Trip'"
                  @click="deleteSavedTrip(save.id)"
                >
                  <i class="i-tabler:trash text-white text-lg"></i>
                </span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2 items-center p-x-2 p-y-1">
              <span
                v-for="city of save.trip"
                class="bg-sky-100 border-rounded p-x-2 p-y-1"
                >{{ city.name }}</span
              >
            </div>
          </div>
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
        To date, the algorithm that calculates what you should sell is
        deterministic and simple enough to avoid confusion:
        <ul>
          <li>
            Buy a resource in a city that produces it if a future city needs it.
          </li>
          <li>
            If a second city further away also needs it, it will be ignored for
            the time being.
          </li>
          <li>
            If several cities produce a resource that you could buy for a city
            further away, it will only buy from the first city (to avoid you
            buying more than the target city can afford).
          </li>
          <li>
            For the moment, the algorithm doesn't take into account what your
            towns produce with their fields/mines/factories.
          </li>
          <li>
            For the moment, the script does not take into account what you
            already have in your truck.
          </li>
        </ul>

        In the future we plan to
        <ul>
          <li>
            To allow you to define a stock for your truck and take it into
            account for sales.
          </li>
          <li>
            To allow you to define the production and stock of your towns and
            take them into account for sales.
          </li>
          <li>
            Allow you to specify the quantity of resources you wish to buy in
            one town, and the quantity you wish to sell in another town,
            allowing the algorithm to anticipate the possibility of buying the
            same resource in several towns to the same destination, or selling
            the same resource in several towns having bought it in the same
            place.
          </li>
        </ul>

        If you have any questions or suggestions, contact me on the game's
        discord (my username is MooNoKe). Enjoy the game!
      </div>
    </Dialog>

    <!-- Confirm Reset Trip Popup -->
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script lang="ts" setup>
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import { resourceList } from "~/data/ressources";

const confirm = useConfirm();
const toast = useToast();
const mapStore = useMapStore();

const saveTripPopoverRef = ref();
const saveName = ref("");
const saveTripNameFieldId = useId();

const showTripModal = ref(false);
const showSettingsModal = ref(false);
const showSavedTripsModal = ref(false);
const showAboutModal = ref(false);

const crewVirtue = ref();
const pickerResourceList = ref();

const toggleSaveTripPopover = (event: any) => {
  saveTripPopoverRef.value.toggle(event);
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

function saveSettings() {
  mapStore.crewVirtue = crewVirtue.value;
  mapStore.excludedResourcesPicker = pickerResourceList.value;

  mapStore.calculateTradeActions();

  showSettingsModal.value = false;
  toast.add({
    severity: "success",
    summary: "Saved",
    detail: "Road Trip settings successfully saved.",
    life: 3000,
  });
}

function saveTrip(event: any) {
  mapStore.saveTrip(saveName.value);
  toggleSaveTripPopover(event);
  toast.add({
    severity: "success",
    summary: "Saved",
    detail: "Trip successfully saved.",
    life: 3000,
  });
}

function deleteSavedTrip(tripId: string) {
  mapStore.deleteTripSave(tripId);
  toast.add({
    severity: "success",
    summary: "Deleted",
    detail: "Trip successfully deleted.",
    life: 3000,
  });
}

function loadSavedTrip(tripId: string) {
  mapStore.loadTripSave(tripId);
  showSavedTripsModal.value = false;
  toast.add({
    severity: "info",
    summary: "Loaded",
    detail: "Trip successfully loaded.",
    life: 3000,
  });
}

onMounted(() => {
  crewVirtue.value = mapStore.crewVirtue;

  if (mapStore.excludedResourcesPicker[0]) {
    pickerResourceList.value = [
      mapStore.excludedResourcesPicker[0],
      mapStore.excludedResourcesPicker[1],
    ];
  } else {
    pickerResourceList.value = [resourceList, []];
  }
});

// Watch for changes in store crewVirtue and update local state
watch(
  () => mapStore.crewVirtue,
  (newValue) => {
    crewVirtue.value = newValue;
  }
);

// Watch for changes in store excludedResourcesPicker and update local state
watch(
  () => mapStore.excludedResourcesPicker,
  (newValue) => {
    if (newValue[0]) {
      pickerResourceList.value = [newValue[0], newValue[1]];
    } else {
      pickerResourceList.value = [resourceList, []];
    }
  }
);
</script>

<style lang="scss"></style>
