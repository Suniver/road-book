<template>
  <div class="flex flex-col gap-3" style="max-width: 40vw">
    <h3 class="m-0">
      {{ city.name }}
    </h3>
    <h4 class="m-0">Required Virtue: {{ city.virtue }}</h4>
    <!-- Needs list -->
    <MapPopupInfoList
      :items="city.needs"
      title="Needs"
      type="needs"
      bg-color="bg-red-300"
    />
    <!-- Produces list -->
    <MapPopupInfoList
      :items="city.produces"
      title="Produces"
      type="produces"
      bg-color="bg-green-300"
    />
    <!-- Has list -->
    <MapPopupInfoList
      :items="city.has"
      title="Tradable resources"
      type="has"
      bg-color="bg-stone-300"
    />
    <!-- Services list -->
    <MapPopupInfoList
      :items="city.tags"
      title="Services"
      type="tag"
      bg-color="bg-blue-300"
    />
    <div class="flex justify-center gap-2 mt-2">
      <Button
        size="small"
        severity="success"
        aria-label="Add to Road Trip"
        @click="mapStore.addCityToTrip(city as ICity)"
      >
        <span class="i-tabler:road text-xl"></span>
        <span>Add to Trip</span>
      </Button>
      <Button
        size="small"
        severity="info"
        aria-label="Go to City"
        @click="mapStore.centerViewOnPosition(city.position)"
      >
        <span class="i-tabler:focus-2 text-xl"></span>
        <span>Focus View On</span>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ICity, ITripStepCity } from "~/types/city";

const props = defineProps<{
  city: ICity | ITripStepCity;
}>();

const mapStore = useMapStore();
</script>

<style lang="scss"></style>
