<template>
  <div
    class="flex gap-2 items-center justify-between p-x-2 p-y-1 bg-light-900 border-rounded"
  >
    <div class="flex items-center gap-1 truncate">
      <span class="i-tabler:building-skyscraper text-xl"></span>
      <span class="truncate" v-tooltip.top="city.name">
        {{ city.name }}
      </span>
    </div>
    <div class="flex items-center gap-1">
      <Button
        size="small"
        severity="success"
        aria-label="Add to Road Trip"
        v-tooltip.left="'Add to Trip'"
        @click="mapStore.addCityToTrip(city)"
      >
        <span class="i-tabler:road text-lg"></span>
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
</template>

<script lang="ts" setup>
import type { ICity } from "~/types/city";

const props = defineProps<{
  city: ICity;
}>();

const mapStore = useMapStore();
const popov = ref();

const toggle = (event: any) => {
  popov.value.toggle(event);
};
</script>

<style lang="scss"></style>
