import { defaultRessource, type IRessource } from "./ressource";
import { defaultTag, type ITag } from "./tags";

export interface ICity {
  name: string;
  position: number[];
  virtue: number;
  needs: IRessource[];
  produces: IRessource[];
  has: IRessource[];
  tags: ITag[];
  style: {};
}

export interface ITradeAction {
  id: string;
  action: string; // 'buy' or 'sell'
  ressource: IRessource;
  exchangeNode: ITripStepCity; // It is the origin city if action is 'sell' or the target city if action is 'buy'
}

export interface IExcludedTrade {
  id: string;
  sellAction: ITradeAction;
  buyAction: ITradeAction;
}

export interface ITripStepCity {
  id: string;
  name: string;
  position: number[];
  virtue: number;
  needs: IRessource[];
  produces: IRessource[];
  has: IRessource[];
  tags: ITag[];
  tradeActions: ITradeAction[];
}

export interface ITripSave {
  id: string;
  name: string;
  trip: ITripStepCity[];
  excludedTrades: IExcludedTrade[];
}

export const defaultCity: ICity = {
  name: "",
  position: [],
  virtue: 0,
  needs: [defaultRessource],
  produces: [defaultRessource],
  has: [defaultRessource],
  tags: [defaultTag],
  style: {},
};

export const defaultTradeAction: ITradeAction = {
  action: "",
  ressource: defaultRessource,
  exchangeNode: Object as unknown as ITripStepCity,
};

export const defaultTripStepCity: ITripStepCity = {
  name: "",
  position: [],
  virtue: 0,
  needs: [defaultRessource],
  produces: [defaultRessource],
  has: [defaultRessource],
  tags: [defaultTag],
  tradeActions: [defaultTradeAction],
};
