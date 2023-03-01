import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import catalogActiveData from '../redux/toggleCardSlice';
import changeData from '../redux/changeDataSlice';
import basket from '../redux/basketSlice';
import authSlice from '../redux/authSlice';

export const store = configureStore({
  reducer: {
    catalogActiveData,
    changeData,
    basket,
    authSlice,
  },
});
type Dispath = typeof store.dispatch;
export const useAppDispath = () => useDispatch<Dispath>();
export type RootState = ReturnType<typeof store.getState>;
