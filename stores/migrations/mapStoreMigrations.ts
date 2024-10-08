import type { IExcludedTrade } from "~/types/city";
import type { MapStoreState } from "~/types/mapState";
import type { VersionMigrations } from "~/types/migrations";

export const versionMigrations: VersionMigrations = {
  "1.5.0": (state: MapStoreState): MapStoreState => {
    // Migration logic from version 1.5.0 to 1.6.0

    console.log("Migrating from version 1.5.0 to 1.6.0");
    // if (!state.newProperty) {
    //   state.newProperty = "defaultValue"; // Example new property
    // }

    // if (state.oldProperty) {
    //   state.renamedProperty = state.oldProperty;
    //   delete state.oldProperty;
    // }

    return state;
  },
  "1.6.0": (state: MapStoreState): MapStoreState => {
    // Migration logic from version 1.6.0 to 1.7.0

    console.log("Migrating from version 1.6.0 to 1.7.0");
    if (!state.excludedTrades) {
      state.excludedTrades = [] as IExcludedTrade[];
    }

    if (state.savedTrips) {
      state.savedTrips.forEach((trip) => {
        if (!trip.excludedTrades) {
          trip.excludedTrades = [] as IExcludedTrade[];
        }
      });
    }

    return state;
  },
};
