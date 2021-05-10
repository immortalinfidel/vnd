import {
  CASH_DENOMINATION,
  COIN_DENOMINATION,
  INITIAL_CASH_BALANCE,
  INITIAL_COIN_BALANCE,
} from '../money/config';
import { Injectable } from '@nestjs/common';
import { IMoney, MoneyType } from '@vnd/common';
import { newCash, newCoin } from '../money/money.model';
import { IMoneyStore, MoneyStore } from '../money/money.store';

export interface ChangeReturn {
  cash: IMoney;
  coin: IMoney;
}

export interface ICounterService {
  deposit(money: IMoney);
  withdraw(money: IMoney);
  totalBalance(): number;
  getStatus(): IMoney[];
  checkBalance(type: string);
  makeChange(changeAmount: number): ChangeReturn;
}

@Injectable()
export class CounterService implements ICounterService {
  counter: { [key: string]: IMoneyStore } = {
    [MoneyType.COIN]: new MoneyStore(
      newCoin(INITIAL_COIN_BALANCE / COIN_DENOMINATION)
    ),
    [MoneyType.CASH]: new MoneyStore(
      newCash(INITIAL_CASH_BALANCE / CASH_DENOMINATION)
    ),
  };

  totalBalance(): number {
    return Object.keys(this.counter).reduce((prev, curr) => {
      prev = prev + this.counter[curr].getBalance();
      return prev;
    }, 0);
  }

  checkBalance(type: string) {
    if (!this.counter[type]) {
      throw new Error(`Money Type ${type} Not Found`);
    }
    return this.counter[type].getBalance();
  }

  deposit(money: IMoney) {
    if (!this.counter[money.type]) {
      throw new Error(`Money Type ${money.type} Not Found`);
    }
    return this.counter[money.type].deposit(money);
  }

  withdraw(money: IMoney) {
    if (!this.counter[money.type]) {
      throw new Error(`Money Type ${money.type} Not Found`);
    }
    return this.counter[money.type].withdraw(money.count);
  }

  makeChange(changeAmount: number): ChangeReturn {
    const cashCount = Math.floor(changeAmount / CASH_DENOMINATION);
    const cashWithdraw = this.withdraw(newCash(cashCount));
    const remaining =
      changeAmount - cashWithdraw.count * cashWithdraw.denomination;
    const coinWithdraw = this.withdraw(newCoin(remaining));
    return {
      cash: cashWithdraw,
      coin: coinWithdraw,
    } as ChangeReturn;
  }

  getStatus(): IMoney[] {
    return Object.keys(this.counter).map((k) => this.counter[k].getMoney());
  }

  static getTotalAmount(money: IMoney[]) {
    return money.reduce((prev, curr) => {
      prev = prev + curr.count * curr.denomination;
      return prev;
    }, 0);
  }
}
