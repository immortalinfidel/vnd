import { Test } from '@nestjs/testing';
import { ProductType } from '@vnd/common';
import { InventoryService } from './inventory.service';
import { Coke, Dew, Pepsi } from '../product/product.model';

describe('InventoryService', () => {
  let inventorySvc: InventoryService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [InventoryService],
    }).compile();

    inventorySvc = moduleRef.get<InventoryService>(InventoryService);
  });

  describe('Cost Test', () => {
    it('returns total cost', () => {
      const coke = new Coke(10);
      const pepsi = new Pepsi(10);
      const dew = new Dew(3);
      const total = InventoryService.getTotalCost([coke, pepsi, dew]);
      expect(total).toBe(325);
    });
  });

  describe('Status Test', () => {
    it('returns inventory status', () => {
      const status = inventorySvc.getStatus();
      expect(Array.isArray(status)).toBe(true);
    });
  });

  describe('Stock Count Test', () => {
    it('returns stock count', () => {
      const cokeCount = inventorySvc.getStockCount(ProductType.COKE);
      const pepsiCount = inventorySvc.getStockCount(ProductType.PEPSI);
      const dewCount = inventorySvc.getStockCount(ProductType.DEW);
      expect(cokeCount).toBe(10);
      expect(pepsiCount).toBe(10);
      expect(dewCount).toBe(10);
    });
    it('throws on unknown product type', () => {
      expect(() => {
        inventorySvc.getStockCount('random');
      }).toThrowError();
    });
  });

  describe('Fullfill Order Test', () => {
    it('Returns false if Out of stock', () => {
      const canfill = inventorySvc.canFillOrders([new Coke(3), new Pepsi(11)]);
      expect(canfill).toEqual(false);
    });
    it('Returns true if Stock Available', () => {
      const canfill = inventorySvc.canFillOrders([new Coke(3), new Pepsi(3)]);
      expect(canfill).toEqual(true);
    });

    it('Fill Order', () => {
      const coke = inventorySvc.fillOrder(new Coke(3));
      const pepsi = inventorySvc.fillOrder(new Pepsi(4));
      expect(coke.count).toEqual(3);
      expect(pepsi.count).toEqual(4);
      expect(inventorySvc.getStockCount(ProductType.COKE)).toEqual(7);
      expect(inventorySvc.getStockCount(ProductType.PEPSI)).toEqual(6);
    });

    it('throws error on over draw', () => {
      expect(() => {
        inventorySvc.fillOrder(new Coke(20));
      }).toThrow();
    });
  });
});
