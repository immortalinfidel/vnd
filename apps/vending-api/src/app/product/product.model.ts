import { IProduct, ProductType } from '@vnd/common';
import { COKE_RATE, DEW_RATE, PEPSI_RATE } from './config';
export class Product implements IProduct {
  type: string;
  rate: number;
  count: number;
  constructor(type: string, rate: number, count: number) {
    this.type = type;
    this.rate = rate;
    this.count = count;
  }
}

export class Coke extends Product {
  constructor(count) {
    super(ProductType.COKE, COKE_RATE, count);
  }
}

export class Pepsi extends Product {
  constructor(count) {
    super(ProductType.PEPSI, PEPSI_RATE, count);
  }
}

export class Dew extends Product {
  constructor(count) {
    super(ProductType.DEW, DEW_RATE, count);
  }
}
