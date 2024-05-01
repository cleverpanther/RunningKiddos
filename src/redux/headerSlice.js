// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
  name: 'headertitle',
  initialState: {
    headertitle: []
  },
  reducers: {
    setheadertitle: (state, action) => {
      state.headertitle = action.payload;
    }
  },
});

export const { setheadertitle } = headerSlice.actions;

export default headerSlice.reducer;
