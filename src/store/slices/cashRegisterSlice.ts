import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CashEvent } from '../../types/cash';
import { getLocalDate } from '../../utils/date';

interface CashRegisterState {
  events: CashEvent[];
  isRegisterClosed: boolean;
}

const loadInitialState = (): CashRegisterState => {
  const today = getLocalDate();
  const savedEvents = localStorage.getItem(`cashEvents_${today}`);
  const registerStatus = localStorage.getItem(`registerStatus_${today}`);

  return {
    events: savedEvents ? JSON.parse(savedEvents) : [],
    isRegisterClosed: registerStatus === 'closed',
  };
};

const initialState: CashRegisterState = loadInitialState();

const saveEvents = (events: CashEvent[]) => {
  const today = getLocalDate();
  localStorage.setItem(`cashEvents_${today}`, JSON.stringify(events));
};

const cashRegisterSlice = createSlice({
  name: 'cashRegister',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Omit<CashEvent, 'id' | 'timestamp'>>) => {
      const newEvent: CashEvent = {
        ...action.payload,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      state.events.push(newEvent);
      saveEvents(state.events);
    },
    closeRegister: (state) => {
      state.isRegisterClosed = true;
      const today = getLocalDate();
      localStorage.setItem(`registerStatus_${today}`, 'closed');
    },
    openRegister: (state) => {
      state.isRegisterClosed = false;
      const today = getLocalDate();
      localStorage.removeItem(`registerStatus_${today}`);
    },
    clearAllData: (state) => {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('cashEvents_') || key.startsWith('registerStatus_')) {
          localStorage.removeItem(key);
        }
      });
      state.events = [];
      state.isRegisterClosed = false;
    },
  },
});

export const { addEvent, closeRegister, openRegister, clearAllData } = cashRegisterSlice.actions;
export default cashRegisterSlice.reducer;