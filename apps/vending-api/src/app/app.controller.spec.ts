import { AppController } from './app.controller';
import { MoneyType, ProductType } from '@vnd/common';
import { Test, TestingModule } from '@nestjs/testing';
import { VendingInput } from './vending/vending.input';
import { VendingModule } from './vending/vending.module';
import { VendingService } from './vending/vending.service';

describe('AppController', () => {
  let app: TestingModule;
  let vendingSvc: VendingService;
  let appController: AppController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [VendingModule],
      controllers: [AppController],
      providers: [],
    }).compile();
    vendingSvc = app.get<VendingService>(VendingService);
    appController = app.get<AppController>(AppController);
  });

  describe('converts moneyInput to Money', () => {
    it('should correctly convert to right money', () => {
      const coin = appController.moneyInputToMoney({
        count: -3,
        type: MoneyType.COIN,
      });

      const cash = appController.moneyInputToMoney({
        count: 3,
        type: MoneyType.CASH,
      });

      expect(coin.count).toEqual(3);
      expect(coin.type).toEqual(MoneyType.COIN);
      expect(cash.count).toEqual(3);
      expect(cash.type).toEqual(MoneyType.CASH);
      expect(() => {
        appController.moneyInputToMoney({ count: 5, type: 'random' });
      }).toThrowError();
    });
  });

  describe('converts productRequest to Product', () => {
    it('should correctly convert to right product', () => {
      const coke = appController.productRequestToProduct({
        count: -3,
        type: ProductType.COKE,
      });

      const pepsi = appController.productRequestToProduct({
        count: 3,
        type: ProductType.PEPSI,
      });

      const dew = appController.productRequestToProduct({
        count: 5,
        type: ProductType.DEW,
      });

      expect(coke.count).toEqual(3);
      expect(coke.type).toEqual(ProductType.COKE);
      expect(pepsi.count).toEqual(3);
      expect(pepsi.type).toEqual(ProductType.PEPSI);
      expect(dew.count).toEqual(5);
      expect(dew.type).toEqual(ProductType.DEW);
      expect(() => {
        appController.productRequestToProduct({ count: 5, type: 'random' });
      }).toThrowError();
    });
  });

  describe('Processes Purchase', () => {
    it('should process purchase', () => {
      const result = { money: [], products: [] };
      const vendingInput = new VendingInput();
      vendingInput.money = [];
      vendingInput.products = [];
      jest
        .spyOn(vendingSvc, 'processPurchase')
        .mockImplementation(() => result);
      expect(appController.makePurchase(vendingInput)).toBe(result);
    });
  });

  describe('Should show status', () => {
    it('should call show status', () => {
      const result = { money: [], products: [] };
      jest.spyOn(vendingSvc, 'showStatus').mockImplementation(() => result);
      expect(appController.getStatus()).toBe(result);
    });
  });
});
