import type { IRessource } from "./ressource";
import type { ITag } from "./tags";

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
  action: string; // 'buy' or 'sell'
  ressource: IRessource;
  exchangeNode: ITripStepCity; // It is the origin city if action is 'sell' or the target city if action is 'buy'
}

export interface ITripStepCity {
  name: string;
  position: number[];
  virtue: number;
  needs: IRessource[];
  produces: IRessource[];
  has: IRessource[];
  tags: ITag[];
  tradeActions: ITradeAction[];
}
