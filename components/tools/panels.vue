<template>
  <div>
    <div
      v-if="mapStore.selectedToolboxLayout === 'Search'"
      style="height: 90vh"
    >
      <ToolsSearchPanel />
    </div>
    <div
      v-else-if="mapStore.selectedToolboxLayout === 'Road Trip'"
      style="height: 90vh"
    >
      <ToolsRoadTripPanel />
    </div>
    <Splitter
      v-else="mapStore.selectedToolboxLayout === 'Both'"
      style="height: 90vh"
    >
      <SplitterPanel :size="40" :minSize="30" class="">
        <ToolsSearchPanel />
      </SplitterPanel>
      <SplitterPanel :size="60" :minSize="40" class="">
        <ToolsRoadTripPanel />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();
</script>

<style lang="scss"></style>
