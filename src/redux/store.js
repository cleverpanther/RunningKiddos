// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from '@reduxjs/toolkit';

import schoolReducer from "./schoolSlice" // assuming you have a schoolSlice.js file

const store = configureStore({
  reducer: {
    school: schoolReducer,
    // ... other reducers
  },
});

export default store;