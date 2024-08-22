import type { MapStoreState } from "./mapState";

export type VersionMigrations = {
  [version: string]: (state: MapStoreState) => MapStoreState;
};

export interface MigrationModule {
  migrations: VersionMigrations;
  versionOrder: string[];
}
