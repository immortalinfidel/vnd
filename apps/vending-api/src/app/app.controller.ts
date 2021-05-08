import {
  Body,
  Controller,
  Get,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IMoneyInput,
  IProductRequest,
  MoneyType,
  ProductType,
} from '@vnd/common';

import { AppService } from './app.service';
import { newCash, newCoin } from './money/money.model';
import { Coke, Dew, Pepsi } from './product/product.model';
import { VendingInput } from './vending/vending.input';
import { VendingService } from './vending/vending.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private vendingSvc: VendingService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('status')
  getStatus() {
    return this.vendingSvc.showStatus();
  }

  @Post('purchase')
  makePurchase(@Body() input: VendingInput) {
    const money = input.money.map(this.moneyInputToMoney);
    const products = input.products.map(this.productRequestToProduct);
    return this.vendingSvc.processPurchase(money, products);
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
}
