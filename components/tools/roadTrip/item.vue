<template>
  <div class="border-solid border-1 border-rounded border-stone-300">
    <div class="flex flex-col gap-1 p-x-2 p-y-1 bg-light-900 border-rounded">
      <div class="flex gap-2 citys-center justify-between">
        <div class="flex citys-center gap-1 truncate font-semibold">
          <span class="">#{{ index + 1 }}</span>
          <span class="i-tabler:building-skyscraper text-xl"></span>
          <span class="truncate" v-tooltip.top="city.name">
            {{ city.name }}
          </span>
        </div>
        <!-- button section -->
        <div class="flex citys-center gap-1">
          <Button
            size="small"
            aria-label="Move City Up"
            v-tooltip.left="'Move City Up'"
            @click="mapStore.moveTripCityUp(index)"
          >
            <span class="i-tabler:chevron-up text-lg"></span>
          </Button>
          <Button
            size="small"
            aria-label="Move City Down"
            v-tooltip.left="'Move City Down'"
            @click="mapStore.moveTripCityDown(index)"
          >
            <span class="i-tabler:chevron-down text-lg"></span>
          </Button>
          <Button
            size="small"
            aria-label="Move City To Top"
            v-tooltip.left="'Move City To Top'"
            @click="mapStore.moveTripCityToTop(index)"
          >
            <span class="i-tabler:chevrons-up text-lg"></span>
          </Button>
          <Button
            size="small"
            aria-label="Move City To Bottom"
            v-tooltip.left="'Move City To Bottom'"
            @click="mapStore.moveTripCityToBottom(index)"
          >
            <span class="i-tabler:chevrons-down text-lg"></span>
          </Button>
        </div>
      </div>
      <div class="flex gap-1 justify-end">
        <Button
          size="small"
          severity="danger"
          aria-label="Remove from Road Trip"
          v-tooltip.left="'Remove from  Trip'"
          @click="mapStore.removeCityFromTrip(city)"
        >
          <span class="i-tabler:road-off text-lg"></span>
        </Button>
        <Button
          size="small"
          severity="info"
          aria-label="Go to City"
          v-tooltip.left="'Focus View On City'"
          @click="mapStore.centerViewOnPosition(city.position)"
        >
          <span class="i-tabler:focus-2 text-lg"></span>
        </Button>
        <Button
          size="small"
          aria-label="Get Info About City"
          v-tooltip.left="'More Info About City'"
          @click="toggle"
        >
          <span class="i-tabler:info-circle text-lg"></span>
        </Button>
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
      <div class="flex citys-center gap-2 flex-wrap">
        <div v-for="action of getBuyActions(city.tradeActions)">
          <div class="px-2 py-1 bg-green-200 border-rounded">
            <span> Buy: </span>
            {{ action.ressource.name }} (for: {{ action.exchangeNode.name }})
          </div>
        </div>
      </div>
      <div class="flex citys-center gap-2 flex-wrap">
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
</script>

<style lang="scss"></style>
