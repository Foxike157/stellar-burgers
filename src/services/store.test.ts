import { rootReducer } from './store';

describe('rootReducer', () => {
  it('должен возвращать корректный initialState при неизвестном экшене', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN' });

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        bun: null,
        ingredients: []
      },
      order: {
        order: null,
        orderRequest: false,
        orderFailed: false
      },
      user: {
        user: null,
        isAuthChecked: false,
        isLoading: false,
        error: null
      },
      feed: {
        orders: [],
        total: 0,
        totalToday: 0,
        wsConnected: false,
        error: null
      },
      profileOrders: {
        orders: [],
        wsConnected: false,
        error: null
      }
    });
  });
});
