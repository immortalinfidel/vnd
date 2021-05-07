import { ProductStore } from './product.store';
import { Coke } from './product.model';

describe('Product Store', () => {
  it('is defined', () => {
    expect(ProductStore).toBeDefined();
  });

  it('shows balance', () => {
    const store = new ProductStore(new Coke(10));
    const balance = store.count();
    expect(balance).toBe(10);
  });
  it('deposits balance', () => {
    const store = new ProductStore(new Coke(10));
    const product = new Coke(2);
    store.addProduct(product);
    const balance = store.count();
    expect(balance).toBe(12);
  });

  it('withdraws balance', () => {
    const store = new ProductStore(new Coke(10));

    const product = store.retrieveProduct(2);
    expect(product.count).toEqual(2);
    const balance = store.count();
    expect(balance).toBe(8);
  });

  it('overdraft is thrown', () => {
    const store = new ProductStore(new Coke(10));

    expect(() => {
      store.retrieveProduct(12);
    }).toThrowError();
  });
});
