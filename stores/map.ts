import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { stringify, parse } from "flatted";
import { defineStore, acceptHMRUpdate } from "pinia";

import { migrations } from "./migrations";

import { tagList } from "~/data/tags";
import { cities } from "../data/cities";
import { resourceList } from "~/data/ressources";

import {
  type ICity,
  type ITradeAction,
  type ITripStepCity,
} from "~/types/city";
import type { ITag } from "~/types/tags";
import type { IRessource } from "~/types/ressource";
import type { MapStoreState } from "~/types/mapState";

type ImportState = MapStoreState & { appVersion?: string };

export const useMapStore = defineStore({
  id: "mapStore",
  state: (): MapStoreState => ({
    mapInstance: null,
    showLabels: false,
    selectedToolboxLayout: "Both",
    crewVirtue: undefined,
    crew: {
      currentCity: undefined,
    },
    selectedAvailability: "has",
    searchedCities: [],
    searchedResource: null,
    searchedTag: null,
    activeSearchTab: "0",
    cities: cities,
    trip: [],
    savedTrips: [],
    excludedResourcesPicker: [],
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
      const cityId = uuidv4();

      const newStep = {
        id: cityId,
        name: city.name,
        position: city.position,
        virtue: city.virtue,
        needs: city.needs,
        produces: city.produces,
        has: city.has,
        tags: city.tags,
        tradeActions: [],
      } as ITripStepCity;

      // If it's the first city added to the trip, we set the currentCity
      if (this.trip.length === 0) {
        this.crew.currentCity = newStep;
      }

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
      if (city.name === this.crew.currentCity?.name) {
        this.crew.currentCity = undefined;
      }
    },
    resetTrip() {
      this.trip = [] as ITripStepCity[];

      this.crew.currentCity = undefined;
    },
    saveTrip(saveName: string) {
      const saveId = uuidv4();

      const tripSave = {
        id: saveId,
        name: saveName,
        trip: _.cloneDeep(this.trip),
      };

      this.savedTrips.push(tripSave);
    },
    loadTripSave(tripId: string) {
      const record = this.savedTrips.find((obj) => obj.id === tripId);
      if (record) {
        this.trip = _.cloneDeep(record.trip) as unknown as ITripStepCity[];
        this.crew.currentCity = record.trip[0];
      }
    },
    deleteTripSave(tripId: string) {
      const saveIdx = this.savedTrips.findIndex((obj) => obj.id === tripId);

      if (saveIdx > -1 && saveIdx < this.savedTrips.length) {
        this.savedTrips.splice(saveIdx, 1);
      }
    },
    setCrewCurrentCity(city: ITripStepCity) {
      this.crew.currentCity = city;
    },
    resetTradeAction() {
      this.trip.forEach((city) => {
        city.tradeActions = [] as ITradeAction[];
      });
    },
    deleteTradeAction(stepCity: ITripStepCity, tradeAction: ITradeAction) {
      // Delte trade action for first city
      const stepCityOneIdx = this.trip.findIndex(
        (obj) => obj.id === stepCity.id
      );

      const stepCityOneTradeActionIdx = this.trip[
        stepCityOneIdx
      ].tradeActions.findIndex((obj) => obj.id === tradeAction.id);

      if (
        stepCityOneTradeActionIdx > -1 &&
        stepCityOneTradeActionIdx <
          this.trip[stepCityOneIdx].tradeActions.length
      ) {
        this.trip[stepCityOneIdx].tradeActions.splice(
          stepCityOneTradeActionIdx,
          1
        );
      }

      // Delte trade action for second city
      const stepCityTwoIdx = this.trip.findIndex(
        (obj) => obj.id === tradeAction.exchangeNode.id
      );

      const stepCityTwoTradeActionIdx = this.trip[
        stepCityTwoIdx
      ].tradeActions.findIndex((obj) => obj.id === tradeAction.id);

      if (
        stepCityTwoTradeActionIdx > -1 &&
        stepCityTwoTradeActionIdx <
          this.trip[stepCityTwoIdx].tradeActions.length
      ) {
        this.trip[stepCityTwoIdx].tradeActions.splice(
          stepCityTwoTradeActionIdx,
          1
        );
      }
    },
    calculateTradeActions() {
      this.resetTradeAction();

      for (let i = 0; i < this.trip.length; i++) {
        const currentCity = this.trip[i];

        // Exclude ressrouces user don't want to trade
        const currentCityProducedRessource = excludeResourcesFromArray(
          currentCity.produces,
          this.excludedResourcesPicker[1]
        );

        // Check resources that the currentCity produces
        currentCityProducedRessource.forEach((producedResource) => {
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

            // Exclude ressrouces user don't want to trade
            const nextCityNeededRessource = excludeResourcesFromArray(
              nextCity.needs,
              this.excludedResourcesPicker[1]
            );

            if (
              nextCityNeededRessource.some(
                (obj) => obj.name === producedResource.name
              )
            ) {
              // Record the trade action: Buy at currentCity, sell at nextCity
              const tradeId = uuidv4();

              currentCity.tradeActions.push({
                id: tradeId,
                action: "buy",
                ressource: producedResource,
                exchangeNode: nextCity,
              });

              nextCity.tradeActions.push({
                id: tradeId,
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
    exportStateToJson() {
      const state = this.$state;

      // Exclude specific properties from the state
      const propertiesToExclude = [
        "mapInstance",
        "showLabels",
        "selectedToolboxLayout",
        "activeSearchTab",
      ];
      const filteredState = _.omit(state, propertiesToExclude);

      // Add the app version to the exported state
      const appVersion = localStorage.getItem("app-version") || "1.0.0";
      const stateWithVersion = {
        ...filteredState,
        appVersion,
      };

      const jsonState = stringify(stateWithVersion);
      const blob = new Blob([jsonState], { type: "application/json" }); // Create a blob from the JSON string
      const url = URL.createObjectURL(blob); // Create a URL for the blob
      const a = document.createElement("a"); // Create an anchor element
      a.href = url;
      a.download = `dustland_delivery_road_book_app_${appVersion}.json`;
      a.click(); // Trigger the download
      URL.revokeObjectURL(url); // Revoke the object URL after download
    },
    importStateFromJson(file: File) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          const importedState = parse(e.target.result as string) as ImportState;
          const convertedState = this.convertImportedState(importedState);

          const propertiesToExclude = [
            "mapInstance",
            "showLabels",
            "selectedToolboxLayout",
            "activeSearchTab",
          ];
          const filteredState = _.omit(convertedState, propertiesToExclude);

          this.$patch(filteredState);
        }
      };
      reader.readAsText(file);
    },
    convertImportedState(importedState: ImportState): MapStoreState {
      const currentVersion = localStorage.getItem("app-version") || "1.0.0";
      const importedVersion = importedState.appVersion || "1.0.0";

      const { migrations: versionMigrations, versionOrder } =
        migrations.mapStore;

      let state = { ...importedState };
      let version = importedVersion;

      while (version !== currentVersion) {
        const migrate = versionMigrations[version];
        if (migrate) {
          state = migrate(state);
          version = this.getNextVersion(version, versionOrder);
        } else {
          break;
        }
      }

      return state;
    },
    getNextVersion(currentVersion: string, versionOrder: string[]): string {
      const currentIndex = versionOrder.indexOf(currentVersion);
      if (currentIndex === -1 || currentIndex === versionOrder.length - 1) {
        return currentVersion;
      }
      return versionOrder[currentIndex + 1];
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
        state.searchedCities.some((item) => item.name === city.name)
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
  persist: {
    storage: persistedState.localStorage,
    paths: [
      "crewVirtue",
      "searchedCities",
      "searchedResource",
      "selectedAvailability",
      "searchedTag",
      "activeSearchTab",
      "trip",
      "savedTrips",
      "crew",
      "excludedResourcesPicker",
    ],
    serializer: {
      deserialize: parse,
      serialize: stringify,
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
