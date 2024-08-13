<template>
  <!-- <div style="height: 90vh; width: 80vw; position: relative; overflow: hidden"> -->
  <div class="w-full h-full relative of-hidden">
    <!-- :max-bounds="imageBounds" -->
    <!-- @mousemove="updateCoordinates" -->
    <!-- @click="copyCoordinates" -->
    <LMap
      :zoom="zoom"
      :center="center"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :use-global-leaflet="false"
      :crs="crs"
      @ready="onMapReady"
      @zoomend="calculateLabelPositions"
      @moveend="calculateLabelPositions"
    >
      <LImageOverlay :url="imageUrl" :bounds="imageBounds" />
      <LMarker
        v-for="marker in markers"
        :key="marker.name"
        :lat-lng="marker.position"
        @popupopen="onPopupOpen"
        @popupclose="onPopupClose"
      >
        <LPopup :options="{ minWidth: 300 }">
          <CityInfo :city="marker" />
        </LPopup>
      </LMarker>

      <!-- Add polyline between two markers -->
      <LPolyline
        v-if="mapStore.tripPositions.length > 0"
        v-for="item in mapStore.tripPositions"
        :lat-lngs="item"
        :color="'blue'"
      />

      <!-- Player position circle -->
      <LCircle
        v-if="mapStore.crew.currentCity"
        :lat-lng="mapStore.crew.currentCity.position"
        :radius="30"
        :color="'blue'"
      />

      <!-- City search circles -->
      <LCircle
        v-if="mapStore.citySearchMarkers.length > 0"
        v-for="item in mapStore.citySearchMarkers"
        :lat-lng="item.position"
        :radius="50"
        :color="'yellow'"
      />

      <!-- Resource search circles -->
      <LCircle
        v-if="mapStore.resourceSearchMarkers.length > 0"
        v-for="item in mapStore.resourceSearchMarkers"
        :lat-lng="item.position"
        :radius="50"
        :color="'indigo'"
      />

      <!-- Service search circles -->
      <LCircle
        v-if="mapStore.tagSearchMarkers.length > 0"
        v-for="item in mapStore.tagSearchMarkers"
        :lat-lng="item.position"
        :radius="50"
        :color="'lime'"
      />
    </LMap>

    <!-- Adding labels next to the markers -->
    <div
      v-if="showLabels"
      v-for="marker in markers"
      :key="marker.name"
      :style="marker.style"
    >
      <div class="marker-label">{{ marker.name }}</div>
    </div>

    <!-- Dev mode only div for displaying coordinates -->
    <!-- <div class="coordinates">
      Mouse Coordinates: {{ coordinates.lat.toFixed(2) }},
      {{ coordinates.lng.toFixed(2) }}
    </div> -->
  </div>
</template>

<script setup>
import { CRS } from "leaflet/dist/leaflet-src.esm";
import { ref, watch } from "vue";
import { cities } from "~/data/cities";

const mapStore = useMapStore();

const crs = CRS.Simple;

const zoom = ref(0); // Adjust for default zoom
const minZoom = ref(-1); // Adjust for more zooming out
const maxZoom = ref(1); // Adjust for more zooming in
const center = ref([904, 1280]);
const imageUrl = "/map.png";
const imageBounds = ref([
  [0, 0],
  [1808, 2560],
]);

const markers = mapStore.cities;

const popupIsOpen = ref(false);
const showLabels = computed(() => {
  if (!mapStore.showLabels) {
    return false;
  } else {
    return !popupIsOpen.value;
  }
});
// Handle popup open event
const onPopupOpen = (e) => {
  popupIsOpen.value = true;
};

// Handle popup close event
const onPopupClose = (e) => {
  popupIsOpen.value = false;
};

// Only for dev mode to display and copy coordinates on click
// const coordinates = ref({ lat: 0, lng: 0 });

// const updateCoordinates = (e) => {
//   coordinates.value = e.latlng;
// };

// const copyCoordinates = async (e) => {
//   const latLngString = `${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`;
//   try {
//     await navigator.clipboard.writeText(latLngString);
//     // alert(`Coordinates copied to clipboard: ${latLngString}`);
//   } catch (err) {
//     console.error("Failed to copy coordinates:", err);
//   }
// };

// Function to get the style for each label
const getLabelStyle = (position) => {
  if (mapStore.mapInstance) {
    const pixelPoint = mapStore.mapInstance.latLngToContainerPoint(position);
    return {
      position: "absolute",
      top: `${pixelPoint.y + 25}px`,
      left: `${pixelPoint.x}px`, // Adjust to position the label next to the marker
      transform: "translate(-50%, -100%)", // Adjust positioning relative to the marker
      zIndex: 400, // Ensure labels do not cover markers
    };
  }
  return {};
};

// Function to calculate and store the label positions in the markers array
const calculateLabelPositions = () => {
  if (mapStore.mapInstance) {
    markers.forEach((marker) => {
      marker.style = getLabelStyle(marker.position);
    });
  }
};

// Store the map instance when it's ready
const onMapReady = (map) => {
  mapStore.mapInstance = map;
  calculateLabelPositions(); // Initial calculation when the map is ready
};

// Recompute label positions when zooming or panning the map
watch([zoom, center], () => {
  calculateLabelPositions();
});
</script>

<style>
.marker-label {
  background-color: rgba(255, 255, 255, 0.8);
  padding: 2px 5px;
  border-radius: 3px;
  font-size: 14px;
  font-weight: bold;
  color: black;
  /* white-space: nowrap; */
  display: inline-block;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  pointer-events: none; /* Ensure that clicks go through to the map */
  max-width: 180px;
}

.coordinates {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 3px;
  font-family: Arial, sans-serif;
  z-index: 9999;
}
</style>
