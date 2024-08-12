import { defineStore, acceptHMRUpdate } from "pinia";
import { cities } from "../data/cities";
import { resourceList } from "~/data/ressources";
import type { ICity, ITradeAction, ITripStepCity } from "~/types/city";
import { tagList } from "~/data/tags";
import type { IRessource } from "~/types/ressource";
import type { ITag } from "~/types/tags";

export const useMapStore = defineStore({
  id: "mapStore",
  state: () => ({
    mapInstance: null,
    showLabels: false,
    crewVirtue: undefined as number | undefined,
    selectedAvailability: "has",
    searchedCities: [],
    searchedResource: null as unknown as IRessource,
    searchedTag: null,
    activeSearchTab: "0",
    cities: cities as ICity[],
    trip: [] as ITripStepCity[],
  }),
  actions: {
    toggleShowLabels(value: boolean) {
      this.showLabels = value;
    },
    centerViewOnPosition(position: number[]) {
      if (this.mapInstance) {
        this.mapInstance.setView(position, 0);
      }
    },
    setSearchedResource(item: IRessource | ITag, type: string) {
      if (type === "tag") {
        this.searchedTag = item as ITag;
        this.activeSearchTab = "2";
      } else {
        this.searchedResource = item as IRessource;
        this.selectedAvailability = type;
        this.activeSearchTab = "1";
      }
    },
    addCityToTrip(city: ICity) {
      const newStep = {
        name: city.name,
        position: city.position,
        virtue: city.virtue,
        needs: city.needs,
        produces: city.produces,
        has: city.has,
        tags: city.tags,
        tradeActions: [],
      } as ITripStepCity;
      this.trip.push(newStep);
      this.calculateTradeActions();
    },
    moveTripCityUp(idx: number) {
      this.trip = moveObjectInArrayUp(this.trip, idx);
      this.calculateTradeActions();
    },
    moveTripCityDown(idx: number) {
      this.trip = moveObjectInArrayDown(this.trip, idx);
      this.calculateTradeActions();
    },
    moveTripCityToTop(idx: number) {
      this.trip = moveObjectInArrayToFirstPosition(this.trip, idx);
      this.calculateTradeActions();
    },
    moveTripCityToBottom(idx: number) {
      this.trip = moveObjectInArrayToLastPosition(this.trip, idx);
      this.calculateTradeActions();
    },
    removeCityFromTrip(city: ITripStepCity) {
      const idx = this.trip.indexOf(city);
      this.trip.splice(idx, 1);
      this.calculateTradeActions();
    },
    resetTrip() {
      this.trip = [] as ITripStepCity[];
    },
    resetTradeAction() {
      this.trip.forEach((city) => {
        city.tradeActions = [] as ITradeAction[];
      });
    },
    calculateTradeActions() {
      this.resetTradeAction();

      for (let i = 0; i < this.trip.length; i++) {
        const currentCity = this.trip[i];

        // Check resources that the currentCity produces
        currentCity.produces.forEach((producedResource) => {
          // Look ahead in the trip to find cities that need this resource
          for (let j = i + 1; j < this.trip.length; j++) {
            const nextCity = this.trip[j];

            // Check if nextCity already has a trade action for the producedResource
            const alreadyHasTradeAction = nextCity.tradeActions.some(
              (tradeAction) => {
                return (
                  tradeAction.ressource.name === producedResource.name &&
                  tradeAction.action === "sell"
                );
              }
            );

            // If the nextCity already has a trade action for this resource, skip adding a new one
            if (alreadyHasTradeAction) {
              continue;
            }

            if (nextCity.needs.includes(producedResource)) {
              // Record the trade action: Buy at currentCity, sell at nextCity
              currentCity.tradeActions.push({
                action: "buy",
                ressource: producedResource,
                exchangeNode: nextCity,
              });

              nextCity.tradeActions.push({
                action: "sell",
                ressource: producedResource,
                exchangeNode: currentCity,
              });
              break; // Exit the loop after finding the first matching city
            }
          }
        });
      }
    },
  },
  getters: {
    citySearchOptions: (state) => {
      return state.cities
        .map((city) => ({
          name: city.name,
          code: city.name,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    resourceSearchOptions: (state) => {
      return resourceList.sort((a, b) => a.name.localeCompare(b.name));
    },
    tagSearchOptions: (state) => {
      return tagList.sort((a, b) => a.name.localeCompare(b.name));
    },
    citySearchMarkers: (state) => {
      return state.cities.filter((city) =>
        state.searchedCities.some((item) => item.code === city.name)
      );
    },
    resourceSearchMarkers: (state) => {
      if (!state.searchedResource) return [] as ICity[];
      switch (state.selectedAvailability) {
        case "has":
          return state.cities
            .filter((city) =>
              city.has.some(
                (resource) => resource.name === state.searchedResource.name
              )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
        case "needs":
          return state.cities
            .filter((city) =>
              city.needs.some(
                (resource) => resource.name === state.searchedResource.name
              )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
        case "produces":
          return state.cities
            .filter((city) =>
              city.produces.some(
                (resource) => resource.name === state.searchedResource.name
              )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
        default:
          return state.cities
            .filter((city) =>
              city.has.some(
                (resource) => resource.name === state.searchedResource.name
              )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
      }
    },
    tagSearchMarkers: (state) => {
      if (!state.searchedTag) return [] as ICity[];
      return state.cities
        .filter((city) =>
          city.tags.some((tag) => tag.name === state.searchedTag.name)
        )
        .sort((a, b) => a.name.localeCompare(b.name));
    },
    tripPositions: (state) => {
      const positions = [];
      for (let i = 0; i < state.trip.length - 1; i++) {
        positions.push([state.trip[i].position, state.trip[i + 1].position]);
      }
      return positions;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
