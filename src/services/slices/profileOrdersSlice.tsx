import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TProfileOrdersState = {
  orders: TOrder[];
  wsConnected: boolean;
  error: string | null;
};

const initialState: TProfileOrdersState = {
  orders: [],
  wsConnected: false,
  error: null
};

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
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

    wsMessage(state, action: PayloadAction<{ orders: TOrder[] }>) {
      state.orders = action.payload.orders;
    }
  }
});

export const { wsConnect, wsDisconnect, wsOpen, wsClose, wsError, wsMessage } =
  profileOrdersSlice.actions;

export default profileOrdersSlice.reducer;
