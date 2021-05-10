import { IMoney } from '@vnd/common';

export interface IMoneyStore {
  deposit(money: IMoney): IMoney;
  withdraw(count: number): IMoney;
  getMoney(): IMoney;
  getBalance(): number;
}

export class MoneyStore implements IMoneyStore {
  store: IMoney = null;
  constructor(initialBalance: IMoney) {
    this.store = initialBalance;
  }

  deposit(money: IMoney) {
    this.store.count = this.store.count + money.count;
    return this.store;
  }

  withdraw(count: number) {
    const withdraw = {
      ...this.store,
    };
    if (this.store.count < count) {
      this.store.count = 0;
      return withdraw;
    }
    this.store.count -= count;
    withdraw.count = count;
    return withdraw;
  }

  getMoney(): IMoney {
    return this.store;
  }

  getBalance(): number {
    return this.store.count * this.store.denomination;
  }
}
