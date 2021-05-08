import { Test } from '@nestjs/testing';
import { MoneyType } from '@vnd/common';
import { newCash, newCoin } from '../money/money.model';
import { CounterService } from './counter.service';

describe('CounterService', () => {
  let counterSvc: CounterService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [CounterService],
    }).compile();

    counterSvc = moduleRef.get<CounterService>(CounterService);
  });

  describe('Status Test', () => {
    it('returns counter status', () => {
      const status = counterSvc.getStatus();
      expect(Array.isArray(status)).toBe(true);
    });
  });

  describe('Balance Test', () => {
    it('returns sum of money', () => {
      const cash = newCash(10);
      const coin = newCoin(10);
      const total = CounterService.getTotalAmount([cash, coin]);
      expect(total).toBe(110);
    });
    it('should return total balance', () => {
      const balance = counterSvc.totalBalance();
      expect(balance).toBe(300);
    });
    it('should return cash balance', () => {
      const balance = counterSvc.checkBalance(MoneyType.CASH);
      expect(balance).toBe(200);
    });
    it('should return coin balance', () => {
      const balance = counterSvc.checkBalance(MoneyType.COIN);
      expect(balance).toBe(100);
    });
    it('throws on balance check of wrong money type', () => {
      expect(() => {
        counterSvc.checkBalance('random');
      }).toThrowError();
    });
  });

  describe('Deposit Test', () => {
    it('Deposits Cash', () => {
      const cashdeposit = newCash(1);
      counterSvc.deposit(cashdeposit);
      const cashbalance = counterSvc.checkBalance(MoneyType.CASH);
      expect(cashbalance).toEqual(210);
    });

    it('Deposits Coin', () => {
      const coindeposit = newCoin(10);
      counterSvc.deposit(coindeposit);
      const coinbalance = counterSvc.checkBalance(MoneyType.COIN);
      expect(coinbalance).toEqual(110);
    });

    it('throws error on wrong deposit', () => {
      const coindeposit = newCoin(10);
      coindeposit.type = 'random';
      expect(() => {
        counterSvc.deposit(coindeposit);
      }).toThrow();
    });
  });

  describe('Withdraw Test', () => {
    it('withdraws cash', () => {
      const money = newCash(1);
      const withdraw = counterSvc.withdraw(money);
      expect(withdraw.count * withdraw.denomination).toEqual(10);
      expect(counterSvc.checkBalance(MoneyType.CASH)).toEqual(190);
      expect(counterSvc.totalBalance()).toEqual(290);
    });

    it('withdraws coin', () => {
      const money = newCoin(1);
      const withdraw = counterSvc.withdraw(money);
      expect(withdraw.count * withdraw.denomination).toEqual(1);
      expect(counterSvc.checkBalance(MoneyType.COIN)).toEqual(99);
      expect(counterSvc.totalBalance()).toEqual(299);
    });

    it('throws on wrong withdraw', () => {
      const money = newCoin(1);
      money.type = 'random';
      expect(() => {
        counterSvc.withdraw(money);
      }).toThrow();
    });
  });

  describe('Make Change Test', () => {
    it('Makes Change If Sufficient', () => {
      const change = counterSvc.makeChange(25);
      expect(change.cash.count).toEqual(2);
      expect(change.coin.count).toEqual(5);
    });
    it('Returns Maximium Possible on Insufficient Fund', () => {
      const change = counterSvc.makeChange(325);
      expect(change.cash.count).toEqual(20);
      expect(change.coin.count).toEqual(100);
    });
  });
});
