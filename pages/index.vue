<template>
  <div>
    <ClientOnly>
      <NewVersionModal />
      <Splitter style="height: 90vh">
        <SplitterPanel
          class="flex items-center justify-center"
          :size="60"
          :minSize="40"
        >
          <Map />
        </SplitterPanel>
        <SplitterPanel class="" :size="40" :minSize="30">
          <ToolsPanels />
        </SplitterPanel>
      </Splitter>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
