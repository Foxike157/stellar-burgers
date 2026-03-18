import reducer, { createOrder, clearOrder } from '../orderSlice';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
  orderFailed: boolean;
};

const order: TOrder = {
  _id: 'id',
  status: 'done',
  number: 777,
  name: 'Test',
  ingredients: [],
  createdAt: '',
  updatedAt: ''
};

describe('orderSlice', () => {
  it('pending: orderRequest=true', () => {
    const state = reducer(undefined, createOrder.pending('', []));
    expect(state.orderRequest).toBe(true);
  });

  it('fulfilled: записывает order', () => {
    const payload = {
      success: true,
      name: 'Test order',
      order
    };

    const state = reducer(
      undefined,
      createOrder.fulfilled(payload, '', [])
    );

    expect(state.order).toEqual(order);
    expect(state.orderRequest).toBe(false);
  });

  it('rejected: orderFailed = true', () => {
    const s = reducer(undefined, createOrder.rejected(new Error(), '', []));
    expect(s.orderFailed).toBe(true);
  });

  it('clearOrder очищает order', () => {
    const filled: TOrderState = {
      order,
      orderRequest: false,
      orderFailed: false
    };

    const s = reducer(filled, clearOrder());
    expect(s.order).toBe(null);
    expect(s.orderRequest).toBe(false);
    expect(s.orderFailed).toBe(false);
  });
});
