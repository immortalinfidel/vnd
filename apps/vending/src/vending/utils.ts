import { IVendingResult, MoneyType, ProductType } from '@vnd/common';

export enum FormState {
  INIT = 'INIT',
  INPROGRESS = 'INPROGRESS',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const initialVendingStatus = () => {
  return {
    money: [
      { type: MoneyType.CASH, count: 0 },
      { type: MoneyType.COIN, count: 0 },
    ],
    products: [
      { type: ProductType.COKE, count: 0 },
      { type: ProductType.DEW, count: 0 },
      { type: ProductType.PEPSI, count: 0 },
    ],
  } as IVendingResult;
};
