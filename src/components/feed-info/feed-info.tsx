import { FC } from 'react';
import { useSelector } from '../../services/store';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

const getOrdersByStatus = (orders: TOrder[], statuses: string[]): number[] =>
  orders
    .filter((order) => statuses.includes(order.status))
    .map((order) => order.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  const readyOrders = getOrdersByStatus(orders, ['done']);
  const pendingOrders = getOrdersByStatus(orders, ['pending', 'created']);

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};
