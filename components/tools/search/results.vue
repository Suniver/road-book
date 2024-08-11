<template>
  <div>
    <ScrollPanel
      :style="computedStyle"
      style="width: 100%"
      :dt="{
        bar: {
          background: '{stone-400}',
        },
      }"
    >
      <div class="flex flex-col gap-1 pr-3">
        <div v-for="city in cities">
          <ToolsSearchResult :city="city" />
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" setup>
import type { ICity } from "~/types/city";

const props = defineProps<{
  cities: ICity[];
  height: string;
}>();

const mapStore = useMapStore();

const computedStyle = computed(() => ({
  height: props.height,
}));
</script>

<style lang="scss"></style>
