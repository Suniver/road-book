<template>
  <div class="flex flex-col gap-2 justify-between">
    <span class="font-semibold">{{ title }}:</span>
    <div class="flex flex-wrap gap-1">
      <div
        v-for="item of items"
        class="p-1 border-rounded cursor-pointer"
        :class="bgColor"
        @click="mapStore.setSearchedResource(item, type)"
      >
        <span class="font-semibold">
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();

const props = defineProps<{
  items: {};
  title: string;
  type: string;
  bgColor: string;
}>();
</script>

<style lang="scss"></style>
