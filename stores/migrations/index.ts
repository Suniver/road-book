import { versionMigrations as mapStoreMigrations } from "./mapStoreMigrations";
import { versionOrder } from "./versionOrder";
// Import other store migrations here

export const migrations = {
  mapStore: {
    migrations: mapStoreMigrations,
    versionOrder: versionOrder,
  },
  // Add other store migrations here
};
