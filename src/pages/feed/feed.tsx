import { FC } from 'react';
import { useSelector } from '../../services/store';
import { FeedUI } from '@ui-pages';
import { Preloader } from '@ui';

type FeedProps = {
  handleGetFeeds: () => void;
};

export const Feed: FC<FeedProps> = ({ handleGetFeeds }) => {
  const { orders } = useSelector((state) => state.feed);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
