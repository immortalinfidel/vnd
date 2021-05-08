import { IMoneyInput, IProductRequest, IVendingInput } from '@vnd/common';
import { IsArray } from 'class-validator';

export class VendingInput implements IVendingInput {
  @IsArray()
  money: IMoneyInput[];
  @IsArray()
  products: IProductRequest[];
}
