import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: '',
  username: '',
  avatar: '',
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
    setUsername(state, action) {
      state.username = action.payload
    },
    setAvatar(state, action) {
      state.avatar = action.payload
    },
  },
});

export default slice;
