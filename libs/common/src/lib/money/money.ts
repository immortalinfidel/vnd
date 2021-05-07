export enum MoneyType {
  CASH = 'CASH',
  COIN = 'COIN',
}
export interface IMoneyInput {
  type: string;
  count: number;
}

export interface IMoney extends IMoneyInput {
  denomination: number;
}
