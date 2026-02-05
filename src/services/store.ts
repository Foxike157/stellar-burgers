import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware/socketMiddleware';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import ingredientReducer from './slices/ingredientSlice';
import constructorReducer from './slices/constructorSlice';
import orderReducer from './slices/orderSlice';
import userReducer from './slices/userSlice';
import feedReducer, * as feedActions from './slices/feedSlice';
import profileOrdersReducer, * as profileOrdersActions from './slices/profileOrdersSlice';

const feedUrl = 'wss://norma.education-services.ru/orders/all';
const profileOrdersUrl = 'wss://norma.education-services.ru/orders';

const rootReducer = combineReducers({
  ingredients: ingredientReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(feedUrl, feedActions),
      socketMiddleware(profileOrdersUrl, profileOrdersActions, true)
    ),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
