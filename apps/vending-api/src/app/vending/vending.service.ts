import { Inject, Injectable } from '@nestjs/common';
import { IMoney, IProduct, IVendingResult, VendingErrors } from '@vnd/common';
import { CounterService, ICounterService } from '../counter/counter.service';
import {
  IInventoryService,
  InventoryService,
} from '../inventory/inventory.service';

export interface IVendingService {
  showStatus(): IVendingResult;
  processPurchase(money: IMoney[], products: IProduct[]): IVendingResult;
}

@Injectable()
export class VendingService implements IVendingService {
  constructor(
    @Inject('InventoryService') private inventory: IInventoryService,
    @Inject('CounterService') private counter: ICounterService
  ) {}

  showStatus(): IVendingResult {
    return {
      products: this.inventory.getStatus(),
      money: this.counter.getStatus(),
    } as IVendingResult;
  }

  processPurchase(money: IMoney[], products: IProduct[]): IVendingResult {
    const totalMoney = CounterService.getTotalAmount(money);
    const totalCost = InventoryService.getTotalCost(products);

    if (totalMoney < totalCost) {
      throw new Error(VendingErrors.INSUFFICIENT_CASH_PROVIDED);
    }

    if (!this.inventory.canFillOrders(products)) {
      throw new Error(VendingErrors.INSUFFICIENT_STOCK);
    }

    const changeRequired = totalMoney - totalCost;
    // deposit incoming money
    money.forEach((m) => {
      this.counter.deposit(m);
    });
    // try to make change
    const changeReturn = this.counter.makeChange(changeRequired);
    const totalChangeReturned = CounterService.getTotalAmount([
      changeReturn.cash,
      changeReturn.coin,
    ]);

    if (totalChangeReturned < changeRequired) {
      this.counter.deposit(changeReturn.cash);
      this.counter.deposit(changeReturn.coin);
      // withdraw incoming money
      money.forEach((m) => {
        this.counter.withdraw(m);
      });
      throw new Error(VendingErrors.CHANGE_UNAVAILABLE);
    }

    return {
      products: products.map((p) => this.inventory.fillOrder(p)),
      money: [changeReturn.cash, changeReturn.coin],
    } as IVendingResult;
  }
}
