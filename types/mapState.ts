import type { ITripStepCity, ICity, ITripSave } from "./city";
import type { IRessource } from "./ressource";
import type { ITag } from "./tags";

export interface MapStoreState {
  mapInstance: any | null;
  showLabels: boolean;
  selectedToolboxLayout: string;
  crewVirtue?: number;
  crew: {
    currentCity?: ITripStepCity;
  };
  selectedAvailability: string;
  searchedCities: ICity[];
  searchedResource: IRessource | null;
  searchedTag: ITag | null;
  activeSearchTab: string;
  cities: ICity[];
  trip: ITripStepCity[];
  savedTrips: ITripSave[];
  excludedResourcesPicker: IRessource[][];
}
