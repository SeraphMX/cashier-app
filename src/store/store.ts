import { configureStore } from '@reduxjs/toolkit';
import cashRegisterReducer from './slices/cashRegisterSlice';

export const store = configureStore({
  reducer: {
    cashRegister: cashRegisterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;