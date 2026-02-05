import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Preloader } from '@ui';

import {
  ConstructorPage,
  FeedPage,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';

import { Modal } from '../modal';
import { OrderInfo } from '../order-info';
import { IngredientDetails } from '../ingredient-details';
import { ProtectedRoute } from '../protected-route/protected-route';

import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth } from '../../services/slices/userSlice';

const App = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as { backgroundLocation?: Location };
  const backgroundLocation = state?.backgroundLocation;

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const closeModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      {!isAuthChecked ? (
        <Preloader />
      ) : (
        <>
          {/* основные роуты */}
          <Routes location={backgroundLocation || location}>
            <Route path='/' element={<ConstructorPage />} />

            <Route path='/feed/*' element={<FeedPage />} />

            <Route path='/ingredients/:id' element={<IngredientDetails />} />

            <Route
              path='/login'
              element={<ProtectedRoute onlyUnAuth component={<Login />} />}
            />
            <Route
              path='/register'
              element={<ProtectedRoute onlyUnAuth component={<Register />} />}
            />
            <Route
              path='/forgot-password'
              element={
                <ProtectedRoute onlyUnAuth component={<ForgotPassword />} />
              }
            />
            <Route
              path='/reset-password'
              element={
                <ProtectedRoute onlyUnAuth component={<ResetPassword />} />
              }
            />

            <Route
              path='/profile'
              element={<ProtectedRoute component={<Profile />} />}
            />
            <Route
              path='/profile/orders'
              element={<ProtectedRoute component={<ProfileOrders />} />}
            />

            <Route path='*' element={<NotFound404 />} />
          </Routes>

          {/* модалки */}
          {backgroundLocation && (
            <Routes>
              <Route
                path='/feed/:number'
                element={
                  <Modal title='Детали заказа' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
              <Route
                path='/ingredients/:id'
                element={
                  <Modal title='Детали ингредиента' onClose={closeModal}>
                    <IngredientDetails />
                  </Modal>
                }
              />
              <Route
                path='/profile/orders/:number'
                element={
                  <Modal title='Детали заказа' onClose={closeModal}>
                    <OrderInfo />
                  </Modal>
                }
              />
            </Routes>
          )}
        </>
      )}
    </div>
  );
};

export default App;
