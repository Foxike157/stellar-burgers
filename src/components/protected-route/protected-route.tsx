import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store'; // ← useAppSelector → useSelector

type TProtectedRouteProps = {
  component: JSX.Element;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  component,
  onlyUnAuth = false
}) => {
  // Указываем тип для state через RootState (уже есть в store)
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return component;
};