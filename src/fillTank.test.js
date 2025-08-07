'use strict';

describe('fillTank', () => {
  const { fillTank } = require('./fillTank');

  it('should be a function', () => {
    expect(fillTank).toBeInstanceOf(Function);
  });

  it('completes tank refill when amount is not specified', () => {
    const customer = {
      money: 4200,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 12,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(50);
  });

  it(`should count money without 'amount'`, () => {
    const customer = {
      money: 3000,
      vehicle: {
        maxTankCapacity: 40,
        fuelRemains: 8,
      },
    };

    fillTank(customer, 10);

    const customerMoney = customer.money;

    expect(customerMoney).toBe(2680);
  });

  it('pours only what the customer can afford', () => {
    const customer = {
      money: 260,
      vehicle: {
        maxTankCapacity: 50,
        fuelRemains: 15,
      },
    };

    fillTank(customer, 10);

    expect(customer.vehicle.fuelRemains).toBe(41);
  });

  it('does not exceed tank capacity if requested amount is too high', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 60,
        fuelRemains: 20,
      },
    };

    fillTank(customer, 9, 100);

    expect(customer.vehicle.fuelRemains).toBe(60);
  });

  it('skips refueling when requested amount is less than 2 liters', () => {
    const customer = {
      money: 1000,
      vehicle: {
        maxTankCapacity: 45,
        fuelRemains: 44,
      },
    };

    fillTank(customer, 10, 1.8);

    expect(customer.vehicle.fuelRemains).toBe(44);
  });

  it('rounds total cost of fuel to two decimal places', () => {
    const customer = {
      money: 5000,
      vehicle: {
        maxTankCapacity: 55,
        fuelRemains: 30,
      },
    };

    fillTank(customer, 9.99, 13);

    expect(customer.money).toBe(4870.13);
  });
});
