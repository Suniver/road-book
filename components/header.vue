<template>
  <div class="flex justify-between items-center w-full h-full">
    <div class="flex items-center gap-2">
      <img src="/icon.svg" style="height: 30px" alt="" />
      <h3>Dustland Delivery - Road Book</h3>
    </div>

    <div class="flex items-center gap-2">
      Show city names <ToggleSwitch v-model="mapStore.showLabels" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();
</script>

<style lang="scss"></style>
