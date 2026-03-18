import reducer, {
  wsOpen,
  wsClose,
  wsError,
  wsMessage
} from '../feedSlice';
import { TOrder } from '@utils-types';

const order: TOrder = {
  _id: 'id',
  number: 1,
  status: 'done',
  name: 'Test',
  ingredients: [],
  createdAt: '',
  updatedAt: ''
};

describe('feedSlice', () => {
  it('wsOpen ставит wsConnected=true', () => {
    const s = reducer(undefined, wsOpen());
    expect(s.wsConnected).toBe(true);
  });

  it('wsClose ставит wsConnected=false', () => {
    const s = reducer(undefined, wsClose());
    expect(s.wsConnected).toBe(false);
  });

  it('wsError ставит error', () => {
    const s = reducer(undefined, wsError('err'));
    expect(s.error).toBe('err');
  });

  it('wsMessage кладёт данные', () => {
    const s = reducer(
      undefined,
      wsMessage({ orders: [order], total: 10, totalToday: 5 })
    );
    expect(s.orders.length).toBe(1);
    expect(s.total).toBe(10);
    expect(s.totalToday).toBe(5);
  });
});
