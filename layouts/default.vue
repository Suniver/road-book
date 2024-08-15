<template>
  <div class="flex flex-col">
    <div
      style="height: 5vh"
      class="p-2 bg-stone-200 border-0 border-b-1 border-dark-200 border-solid shadow-lg z-500"
    >
      <Header />
    </div>
    <div style="height: 88vh">
      <slot />
    </div>
    <div
      style="height: 7vh"
      class="p-2 bg-stone-200 border-0 border-t-1 border-dark-200 border-solid z-500"
    >
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();
</script>

<style lang="scss"></style>
