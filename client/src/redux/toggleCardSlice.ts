import { createSlice } from '@reduxjs/toolkit';

interface ActiveData {
  toggleView: number;
}

const initialState: ActiveData = {
  toggleView: 1,
};

const catalogActiveData = createSlice({
  name: 'toggleCard',
  initialState,
  reducers: {
    setToggleCard(state, action) {
      state.toggleView = action.payload;
    },
  },
});

export const { setToggleCard } = catalogActiveData.actions;

export default catalogActiveData.reducer;
