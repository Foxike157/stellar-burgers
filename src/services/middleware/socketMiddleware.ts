import { Middleware } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookie';

type TWsActions = {
  wsConnect: () => { type: string };
  wsDisconnect: () => { type: string };
  wsOpen: () => { type: string };
  wsClose: () => { type: string };
  wsError: (payload: string) => { type: string; payload: string };
  wsMessage: (payload: any) => { type: string; payload: any };
};

export const socketMiddleware =
  (wsUrl: string, actions: TWsActions, withAuth = false): Middleware =>
  (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action: any) => {
      const { dispatch } = store;

      if (action.type === actions.wsConnect().type) {
        const token = getCookie('accessToken')?.replace('Bearer ', '');

        const url = withAuth && token ? `${wsUrl}?token=${token}` : wsUrl;

        socket = new WebSocket(url);
      }

      if (action.type === actions.wsDisconnect().type) {
        socket?.close();
        socket = null;
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(actions.wsOpen());
        };

        socket.onerror = () => {
          dispatch(actions.wsError('WebSocket error'));
        };

        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          dispatch(actions.wsMessage(data));
        };

        socket.onclose = () => {
          dispatch(actions.wsClose());
        };
      }

      return next(action);
    };
  };
