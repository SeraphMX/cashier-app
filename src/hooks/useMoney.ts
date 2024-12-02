import { useState, useCallback } from 'react';
import { DenominationCount, MoneyState } from '../types/money';

const INITIAL_BILLS = [
  { value: 1000, count: 0 },
  { value: 500, count: 0 },
  { value: 200, count: 0 },
  { value: 100, count: 0 },
  { value: 50, count: 0 },
  { value: 20, count: 0 },
];

export const useMoney = () => {
  const [state, setState] = useState<MoneyState>({
    bills: INITIAL_BILLS,
    coins: 0,
  });

  const updateBillCount = useCallback((denomination: number, count: number) => {
    setState((prev) => ({
      ...prev,
      bills: prev.bills.map((bill) =>
        bill.value === denomination ? { ...bill, count } : bill
      ),
    }));
  }, []);

  const updateCoins = useCallback((amount: number) => {
    setState((prev) => ({
      ...prev,
      coins: amount,
    }));
  }, []);

  const calculateTotal = useCallback((state: MoneyState): number => {
    const billsTotal = state.bills.reduce(
      (sum, bill) => sum + bill.value * bill.count,
      0
    );
    return billsTotal + state.coins;
  }, []);

  const resetCounts = useCallback(() => {
    setState({
      bills: INITIAL_BILLS,
      coins: 0,
    });
  }, []);

  return {
    state,
    updateBillCount,
    updateCoins,
    calculateTotal,
    resetCounts,
  };
};