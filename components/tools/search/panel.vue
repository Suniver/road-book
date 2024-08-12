<template>
  <div class="flex flex-col">
    <div class="bg-light-500">
      <h4 class="m-0 px-1 py-1">Search</h4>
    </div>
    <div>
      <Tabs :value="mapStore.activeSearchTab">
        <TabList>
          <Tab value="0">City</Tab>
          <Tab value="1">Resource</Tab>
          <Tab value="2">Service</Tab>
        </TabList>
        <TabPanels>
          <!-- Search a city tab -->
          <TabPanel value="0">
            <div class="flex flex-col gap-2">
              <MultiSelect
                v-model="mapStore.searchedCities"
                display="chip"
                :options="mapStore.citySearchOptions"
                optionLabel="name"
                filter
                resetFilterOnHide
                placeholder="Select Cities"
                :maxSelectedLabels="3"
              />
              <ToolsSearchResults
                :cities="mapStore.citySearchMarkers"
                height="74vh"
              />
            </div>
          </TabPanel>
          <!-- Search a ressource tab -->
          <TabPanel value="1">
            <div class="flex flex-col gap-2">
              <Select
                v-model="mapStore.searchedResource"
                :options="mapStore.resourceSearchOptions"
                optionLabel="name"
                placeholder="Select a Resource"
                filter
                showClear
                resetFilterOnHide
                class="w-full"
              />
              <SelectButton
                v-model="mapStore.selectedAvailability"
                :options="availabilitySelectOptions"
                optionLabel="name"
                optionValue="value"
                aria-labelledby="multiple"
              />
              <ToolsSearchResults
                :cities="mapStore.resourceSearchMarkers"
                height="70vh"
              />
            </div>
          </TabPanel>
          <!-- Search a service tab -->
          <TabPanel value="2">
            <div class="flex flex-col gap-2">
              <Select
                v-model="mapStore.searchedTag"
                :options="mapStore.tagSearchOptions"
                optionLabel="name"
                placeholder="Select a Service"
                filter
                showClear
                resetFilterOnHide
                class="w-full"
              />
              <ToolsSearchResults
                :cities="mapStore.tagSearchMarkers"
                height="74vh"
              />
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
const mapStore = useMapStore();

const availabilitySelectOptions = ref([
  { name: "Has", value: "has" },
  { name: "Needs", value: "needs" },
  { name: "Produces", value: "produces" },
]);
</script>

<style lang="scss"></style>
