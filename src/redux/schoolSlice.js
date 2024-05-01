// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from '@reduxjs/toolkit';

export const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    schools: [],
    selectedschool: null,
  },
  reducers: {
    setschools: (state, action) => {
      state.schools = action.payload;
    },
    setSelectedschool: (state, action) => {
      state.selectedschool = action.payload;
    },
  },
});

export const { setschools, setSelectedschool } = schoolSlice.actions;

export default schoolSlice.reducer;
