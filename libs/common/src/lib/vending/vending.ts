import { IMoney, IMoneyInput } from '../money';
import { IProduct, IProductRequest } from '../product';

export interface IVendingResult {
  money: IMoney[];
  products: IProduct[];
}

export enum VendingErrors {
  INSUFFICIENT_CASH_PROVIDED = 'Cash Provided Is Insufficient To Fullfill Order',
  CHANGE_UNAVAILABLE = 'Required Change Not Available.',
  INSUFFICIENT_STOCK = 'Stock Insufficient To Fullfill Order.',
}

export interface IVendingInput {
  money: IMoneyInput[];
  products: IProductRequest[];
}
