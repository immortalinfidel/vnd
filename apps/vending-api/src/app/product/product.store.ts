import { IProduct } from '@vnd/common';

export interface IProductStore {
  retrieveProduct(count: number): IProduct;
  addProduct(product: IProduct);
  getProduct(): IProduct;
  count(): number;
}

export class ProductStore implements IProductStore {
  store: IProduct = null;
  constructor(initialStock: IProduct) {
    this.store = initialStock;
  }

  getProduct(): IProduct {
    return this.store;
  }

  retrieveProduct(count: number) {
    if (this.store.count < count) {
      throw new Error('Unable To Fullfill Order');
    }
    const product = {
      ...this.store,
    };
    this.store.count -= count;
    product.count = count;
    return product;
  }

  addProduct(product: IProduct) {
    this.store.count += product.count;
    return this.store;
  }

  count() {
    return this.store.count;
  }
}
