import { IMoneyInput, IProductRequest, IVendingInput } from '@vnd/common';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class MoneyInput implements IMoneyInput {
  @IsNotEmpty()
  type: string;
  @IsNumber()
  count: number;
}

export class ProductRequest implements IProductRequest {
  @IsNotEmpty()
  type: string;
  @IsNumber()
  count: number;
}

export class VendingInput implements IVendingInput {
  @IsArray()
  @Type(() => MoneyInput)
  @ValidateNested({ each: true })
  money: MoneyInput[];

  @IsArray()
  @Type(() => ProductRequest)
  @ValidateNested({ each: true })
  products: ProductRequest[];
}
