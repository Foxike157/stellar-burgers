import { FC, useEffect, useCallback } from 'react';

import { useDispatch } from '../../services/store';
import { wsConnect, wsDisconnect } from '../../services/slices/feedSlice';

import { Feed } from './feed';

export const FeedPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch]);

  const handleGetFeeds = useCallback(() => {
    dispatch(wsDisconnect());
    dispatch(wsConnect());
  }, [dispatch]);

  return <Feed handleGetFeeds={handleGetFeeds} />;
};
