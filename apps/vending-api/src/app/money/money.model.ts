import { IMoney, MoneyType } from '@vnd/common';
import { CASH_DENOMINATION, COIN_DENOMINATION } from './config';
export class Money implements IMoney {
  type: string;
  count: number;
  denomination: number;
}

export const newCoin = (count: number) => {
  return {
    count: count,
    type: MoneyType.COIN,
    denomination: COIN_DENOMINATION,
  } as IMoney;
};

export const newCash = (count: number) => {
  return {
    count: count,
    type: MoneyType.CASH,
    denomination: CASH_DENOMINATION,
  } as IMoney;
};
