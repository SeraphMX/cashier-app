import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { addEvent, closeRegister, openRegister, clearAllData } from '../store/slices/cashRegisterSlice';
import { CashEvent } from '../types/cash';

export const useCashRegister = () => {
  const dispatch = useDispatch();
  const { events, isRegisterClosed } = useSelector((state: RootState) => state.cashRegister);

  const hasInitialFund = useCallback(() => {
    return events.some(event => event.type === 'initial');
  }, [events]);

  const getInitialFundAmount = useCallback(() => {
    const initialEvent = events.find(event => event.type === 'initial');
    return initialEvent?.amount || 0;
  }, [events]);

  const canWithdrawFund = useCallback(() => {
    return hasInitialFund() && !events.some(event => event.type === 'withdrawal-fund');
  }, [events, hasInitialFund]);

  const hasFundWithdrawn = useCallback(() => {
    return events.some(event => event.type === 'withdrawal-fund');
  }, [events]);

  return {
    events,
    addEvent: (event: Omit<CashEvent, 'id' | 'timestamp'>) => dispatch(addEvent(event)),
    closeRegister: () => dispatch(closeRegister()),
    openRegister: () => dispatch(openRegister()),
    clearAllData: () => dispatch(clearAllData()),
    hasInitialFund: hasInitialFund(),
    isRegisterClosed,
    getInitialFundAmount,
    canWithdrawFund: canWithdrawFund(),
    hasFundWithdrawn: hasFundWithdrawn(),
  };
};