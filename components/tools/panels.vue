<template>
  <div>
    <!-- <Splitter style="height: 90vh" layout="vertical"> -->
    <Splitter style="height: 90vh">
      <SplitterPanel :size="40" :minSize="30" class="">
        <ToolsSearchPanel />
      </SplitterPanel>
      <SplitterPanel :size="60" :minSize="40" class="">
        <ToolsRoadTripPanel />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss"></style>
