import { Injectable } from '@nestjs/common';
import { IProduct, ProductType } from '@vnd/common';
import { INITIAL_STOCK } from '../product/config';
import { Coke, Dew, Pepsi } from '../product/product.model';
import { IProductStore, ProductStore } from '../product/product.store';

export interface IInventoryService {
  canFillOrders(products: IProduct[]);
  fillOrder(product: IProduct);
  getStockCount(type: string): number;
}

@Injectable()
export class InventoryService implements IInventoryService {
  inventory: { [key: string]: IProductStore } = {
    [ProductType.COKE]: new ProductStore(new Coke(INITIAL_STOCK)),
    [ProductType.DEW]: new ProductStore(new Dew(INITIAL_STOCK)),
    [ProductType.PEPSI]: new ProductStore(new Pepsi(INITIAL_STOCK)),
  };

  canFillOrders(products: IProduct[]) {
    for (const product of products) {
      if (this.getStockCount(product.type) < product.count) {
        return false;
      }
    }
    return true;
  }

  fillOrder(product: IProduct) {
    if (this.productTypeExists(product.type)) {
      return this.inventory[product.type].retrieveProduct(product.count);
    }
  }

  private productTypeExists(type: string) {
    if (!this.inventory[type]) {
      throw new Error(`Product Type ${type} Not Found.`);
    }
    return true;
  }

  getStockCount(type: string): number {
    if (this.productTypeExists(type)) {
      return this.inventory[type].count();
    }
  }

  static getTotalCost(products: IProduct[]) {
    return products.reduce((prev, curr) => {
      prev = prev + curr.count * curr.rate;
      return prev;
    }, 0);
  }
}
