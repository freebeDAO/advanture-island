import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    axisList: []
};

const slice = createSlice({
    name: 'axis',
    initialState,
    reducers: {
        setAxisList(state, action) {
            state.axisList = action.payload;
        },
    },
});

export default slice;
