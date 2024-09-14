import {configureStore} from '@reduxjs/toolkit';

import userSlice from './user/slice';
export const rootReducer = {
  user: userSlice.reducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
