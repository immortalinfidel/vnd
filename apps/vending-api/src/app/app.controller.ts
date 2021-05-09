import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IMoneyInput,
  IProductRequest,
  MoneyType,
  ProductType,
  VendingErrors,
} from '@vnd/common';

import { newCash, newCoin } from './money/money.model';
import { Coke, Dew, Pepsi } from './product/product.model';
import { VendingInput } from './vending/vending.input';
import { VendingService } from './vending/vending.service';

@Controller()
export class AppController {
  constructor(private vendingSvc: VendingService) {}

  @Get('status')
  getStatus() {
    return this.vendingSvc.showStatus();
  }

  @Post('purchase')
  makePurchase(@Body() input: VendingInput) {
    try {
      const money = input.money.map(this.moneyInputToMoney);
      const products = input.products.map(this.productRequestToProduct);
      return this.vendingSvc.processPurchase(money, products);
    } catch (err) {
      this.toHttpError(err);
    }
  }

  moneyInputToMoney(moneyInput: IMoneyInput) {
    switch (moneyInput.type) {
      case MoneyType.CASH:
        return newCash(Math.abs(moneyInput.count));
      case MoneyType.COIN:
        return newCoin(Math.abs(moneyInput.count));
      default:
        throw new UnprocessableEntityException('Invalid Money Type');
    }
  }

  productRequestToProduct(productReq: IProductRequest) {
    switch (productReq.type) {
      case ProductType.COKE:
        return new Coke(Math.abs(productReq.count));
      case ProductType.DEW:
        return new Dew(Math.abs(productReq.count));
      case ProductType.PEPSI:
        return new Pepsi(Math.abs(productReq.count));
      default:
        throw new UnprocessableEntityException('Invalid Product Type');
    }
  }
  toHttpError(err: Error) {
    switch (err.message) {
      case VendingErrors.CHANGE_UNAVAILABLE:
        throw new ForbiddenException(VendingErrors.CHANGE_UNAVAILABLE);
      case VendingErrors.INSUFFICIENT_CASH_PROVIDED:
        throw new ForbiddenException(VendingErrors.INSUFFICIENT_CASH_PROVIDED);
      case VendingErrors.INSUFFICIENT_STOCK:
        throw new ForbiddenException(VendingErrors.INSUFFICIENT_STOCK);
      default:
        throw err;
    }
  }
}
