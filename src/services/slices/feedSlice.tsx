import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  wsConnected: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  wsConnected: false,
  error: null
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    wsConnect() {},

    wsDisconnect() {},

    wsOpen(state) {
      state.wsConnected = true;
      state.error = null;
    },

    wsClose(state) {
      state.wsConnected = false;
    },

    wsError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.wsConnected = false;
    },

    wsMessage(
      state,
      action: PayloadAction<{
        orders: TOrder[];
        total: number;
        totalToday: number;
      }>
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
  feedSlice.actions;

export default feedSlice.reducer;
