import { newCash } from './money.model';
import { MoneyStore } from './money.store';

describe('Money Store', () => {
  it('is defined', () => {
    expect(MoneyStore).toBeDefined();
  });

  it('shows balance', () => {
    const store = new MoneyStore(newCash(10));
    const balance = store.getBalance();
    expect(balance).toBe(100);
  });

  it('returns money', () => {
    const store = new MoneyStore(newCash(10));
    const money = store.getMoney();
    expect(money).toBeDefined();
    expect(money.count).toBe(10);
  });

  it('deposits  balance', () => {
    const store = new MoneyStore(newCash(10));
    const deposit = newCash(2);
    store.deposit(deposit);
    const balance = store.getBalance();
    expect(balance).toBe(120);
  });

  it('withdraws balance', () => {
    const store = new MoneyStore(newCash(10));
    const withdraw = store.withdraw(2);
    expect(withdraw.count * withdraw.denomination).toEqual(20);
    const balance = store.getBalance();
    expect(balance).toBe(80);
  });

  it('overdraft is handled', () => {
    const store = new MoneyStore(newCash(10));
    const withdraw = store.withdraw(12);
    expect(withdraw.count * withdraw.denomination).toEqual(100);
    const balance = store.getBalance();
    expect(balance).toBe(0);
  });
});
