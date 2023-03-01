import { SortByType } from './../components/submenu/sort';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import lodash from 'lodash';
import { Product } from './basketSlice';

export type DataState = {
  data: Product[] | [];
  filter: Product[] | [];
  status: string;
};

const initialState: DataState = {
  data: [],
  filter: [],
  status: '',
};

export const startData = createAsyncThunk(
  'changeData/startData',
  async (data: Product[], { dispatch }) => {
    dispatch(setActiveData(data));
  }
);

export const changeData = createSlice({
  name: 'changeData',
  initialState,
  reducers: {
    setActiveData(state, action: PayloadAction<Product[]>) {
      state.data = action.payload;
    },

    setSort(state, action: PayloadAction<SortByType>) {
      state.filter = lodash.sortBy(state.data, [action.payload.value], [action.payload.sort]);
    },

    setFilter(state, action) {
      if (action.payload === '') state.filter = [];
      else {
        state.filter = state.data.filter((item) => {
          return item.title.toLowerCase().includes(action.payload.toLowerCase());
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(startData.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(startData.fulfilled, (state) => {
      state.status = 'fulfilled';
    });
    builder.addCase(startData.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { setActiveData, setFilter, setSort } = changeData.actions;

export default changeData.reducer;
