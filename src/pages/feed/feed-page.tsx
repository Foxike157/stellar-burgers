import { FC, useEffect, useCallback } from 'react';
import { useDispatch } from '../../services/store'; // ← useAppDispatch → useDispatch
import { wsConnect, wsDisconnect } from '../../services/slices/feedSlice';
import { Feed } from './feed';

export const FeedPage: FC = () => {
  const dispatch = useDispatch(); // ← правильно

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


  return <Feed />;
};