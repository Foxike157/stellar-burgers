import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';

import {
  wsConnect,
  wsDisconnect
} from '../../services/slices/profileOrdersSlice';

import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const orders = useSelector((state) => state.profileOrders.orders ?? []);

  useEffect(() => {
    if (!user) return;

    dispatch(wsConnect());

    return () => {
      dispatch(wsDisconnect());
    };
  }, [dispatch, user]);

  return <ProfileOrdersUI orders={orders} />;
};
