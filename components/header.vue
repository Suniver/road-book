<template>
  <div class="flex justify-between items-center w-full h-full">
    <div class="flex items-center gap-2">
      <img src="/icon.svg" style="height: 30px" alt="" />
      <h3>Dustland Delivery - Road Book</h3>
    </div>

    <div class="flex items-center gap-3">
      <div class="flex items-center gap-2">
        Show city names: <ToggleSwitch v-model="mapStore.showLabels" />
      </div>
      <div>
        <SelectButton
          v-model="mapStore.selectedToolboxLayout"
          :options="toolboxLayoutOptions"
          :pt="{ root: { class: 'my-togglebutton' } }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();

const toolboxLayout = ref("Both");
const toolboxLayoutOptions = ref(["Search", "Road Trip", "Both"]);
</script>

<style lang="scss">
.my-togglebutton button {
  background: #e7e5e4 !important;
  border-color: #a8a29e !important;
  color: #292524 !important;
}

.my-togglebutton button:hover {
  color: #1c1917 !important;
}
</style>
