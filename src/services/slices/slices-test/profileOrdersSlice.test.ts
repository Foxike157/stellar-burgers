import reducer, {
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'id',
  status: 'done',
  number: 42,
  name: 'Test',
  ingredients: [],
  createdAt: '',
  updatedAt: ''
};

describe('profileOrdersSlice', () => {
  it('wsOpen -> wsConnected=true', () => {
    expect(reducer(undefined, wsOpen()).wsConnected).toBe(true);
  });

  it('wsClose -> wsConnected=false', () => {
    expect(reducer(undefined, wsClose()).wsConnected).toBe(false);
  });

  it('wsError -> error записан', () => {
    expect(reducer(undefined, wsError('err')).error).toBe('err');
  });

  it('wsMessage -> orders записаны', () => {
    const s = reducer(undefined, wsMessage({ orders: [order] }));
    expect(s.orders.length).toBe(1);
  });
});
