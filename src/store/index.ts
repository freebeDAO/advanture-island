import {configureStore} from '@reduxjs/toolkit';
import axisSLice from './axis/slice'
import userSlice from './user/slice';
export const rootReducer = {
  user: userSlice.reducer,
  axis: axisSLice.reducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
