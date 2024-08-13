<template>
  <!-- <div class="border-solid border-1 border-rounded border-blue-300"> -->
  <div :class="cityFrameClass">
    <!-- <div class="flex flex-col gap-1 p-x-2 p-y-1 bg-blue-100 border-rounded"> -->
    <div class="flex flex-col gap-1 p-x-2 p-y-1" :class="cityClass">
      <div class="flex gap-2 items-center justify-between">
        <div class="flex items-center gap-1 truncate font-semibold">
          <span class="">#{{ index + 1 }}</span>
          <span class="i-tabler:building-skyscraper text-xl"></span>
          <span class="truncate" v-tooltip.top="city.name">
            {{ city.name }}
          </span>
        </div>
        <!-- First line button section -->
        <div class="flex items-center gap-1">
          <span
            class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
            v-ripple
            v-tooltip.left="'Move City One Up'"
            @click="mapStore.moveTripCityUp(index)"
          >
            <i class="i-tabler:chevron-up text-white text-xl"></i>
          </span>
          <span
            class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
            v-ripple
            v-tooltip.left="'Move City One Down'"
            @click="mapStore.moveTripCityDown(index)"
          >
            <i class="i-tabler:chevron-down text-white text-xl"></i>
          </span>
          <span
            class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
            v-ripple
            v-tooltip.left="'Move City To Top'"
            @click="mapStore.moveTripCityToTop(index)"
          >
            <i class="i-tabler:chevrons-up text-white text-xl"></i>
          </span>
          <span
            class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
            v-ripple
            v-tooltip.left="'Move City To Bottom'"
            @click="mapStore.moveTripCityToBottom(index)"
          >
            <i class="i-tabler:chevrons-down text-white text-xl"></i>
          </span>
        </div>
      </div>
      <!-- Second line button section -->
      <div class="flex gap-1 justify-end">
        <span
          class="flex items-center bg-sky-500 border-rounded border-1 border-solid border-sky-600 p-0.5 shadow cursor-pointer"
          v-ripple
          aria-label="Set As Current City"
          v-tooltip.left="'Set As Current City'"
          @click="mapStore.setCrewCurrentCity(city)"
        >
          <i class="i-tabler:truck text-white text-xl"></i>
        </span>
        <span
          class="flex items-center bg-red-400 border-rounded border-1 border-solid border-red-500 p-0.5 shadow cursor-pointer"
          v-ripple
          aria-label="Remove from Road Trip"
          v-tooltip.left="'Remove from  Trip'"
          @click="mapStore.removeCityFromTrip(city)"
        >
          <i class="i-tabler:road-off text-white text-xl"></i>
        </span>
        <span
          class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
          v-ripple
          aria-label="Focus View On City"
          v-tooltip.left="'Focus View On City'"
          @click="mapStore.centerViewOnPosition(city.position)"
        >
          <i class="i-tabler:focus-2 text-white text-xl"></i>
        </span>
        <span
          class="flex items-center bg-stone-500 border-rounded border-1 border-solid border-stone-600 p-0.5 shadow cursor-pointer"
          v-ripple
          aria-label="Get Info About City"
          v-tooltip.left="'More Info About City'"
          @click="toggle"
        >
          <i class="i-tabler:info-circle text-white text-xl"></i>
        </span>
        <Popover ref="popov"> <CityInfo :city="city" /> </Popover>
      </div>
    </div>
    <!-- trade book section-->
    <div class="flex flex-col gap-2 p-2">
      <Message
        v-if="checkVirtue(city.virtue, mapStore.crewVirtue)"
        severity="error"
        >Be careful, your crew virtue ({{ mapStore.crewVirtue }}) is too low for
        {{ city.name }} ({{ city.virtue }}).</Message
      >
      <div class="flex items-center gap-2 flex-wrap">
        <div v-for="action of getBuyActions(city.tradeActions)">
          <div class="px-2 py-1 bg-green-200 border-rounded">
            <span> Buy: </span>
            {{ action.ressource.name }} (for: {{ action.exchangeNode.name }})
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 flex-wrap">
        <div v-for="action of getSellActions(city.tradeActions)">
          <div class="px-2 py-1 bg-amber-200 border-rounded">
            <span> Sell: </span>
            {{ action.ressource.name }} (from: {{ action.exchangeNode.name }})
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ITradeAction, ITripStepCity } from "~/types/city";

const props = defineProps<{
  city: ITripStepCity;
  index: number;
}>();

const mapStore = useMapStore();
const popov = ref();

const toggle = (event: any) => {
  popov.value.toggle(event);
};

function getBuyActions(arr: ITradeAction[]) {
  return arr.filter((item) => item.action === "buy");
}

function getSellActions(arr: ITradeAction[]) {
  return arr.filter((item) => item.action === "sell");
}

function checkVirtue(cityVirtue: number, crewVirtue: number | undefined) {
  if (crewVirtue === undefined) return false;
  if (cityVirtue > crewVirtue) return true;
  return false;
}

const cityFrameClass = computed(() => {
  if (props.city === mapStore.crew.currentCity) {
    return "current-city-frame";
  } else {
    return "city-frame";
  }
});

const cityClass = computed(() => {
  if (props.city === mapStore.crew.currentCity) {
    return "current-city";
  } else {
    return "city";
  }
});
</script>

<style lang="scss" scoped>
.city-frame {
  --un-border-opacity: 1;
  border-color: rgb(214 211 209 / var(--un-border-opacity));
  border-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
}

.current-city-frame {
  --un-border-opacity: 1;
  border-color: rgb(147 197 253 / var(--un-border-opacity));
  border-radius: 0.25rem;
  border-width: 1px;
  border-style: solid;
}

.city {
  --un-bg-opacity: 1;
  background-color: rgb(221 225 227 / var(--un-bg-opacity));
  border-radius: 0.25rem;
}

.current-city {
  --un-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--un-bg-opacity));
  border-radius: 0.25rem;
}
</style>
