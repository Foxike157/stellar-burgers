import { FC, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { bun, ingredients } = useSelector((state) => state.burgerConstructor);
  const { order, orderRequest } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user.user);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!bun || orderRequest) return;

    if (!user) {
      navigate('/login', {
        state: { from: location }
      });
      return;
    }

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (sum: number, item: TConstructorIngredient) => sum + item.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
