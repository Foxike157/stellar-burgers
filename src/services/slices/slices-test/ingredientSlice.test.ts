import reducer, { fetchIngredients } from '../ingredientSlice';
import { TIngredient } from '@utils-types';

const base = {
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  image_mobile: '',
  image_large: '',
  __v: 0
};

const ingredient: TIngredient = {
  _id: '1',
  name: 'Булка',
  type: 'bun',
  price: 100,
  image: 'image',
  ...base
};

describe('ingredientSlice', () => {
  it('pending устанавливает isLoading = true', () => {
    const state = reducer(undefined, fetchIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('fulfilled кладёт данные и isLoading = false', () => {
    const payload = [ingredient];
    const state = reducer(
      undefined,
      fetchIngredients.fulfilled(payload, '', undefined)
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(payload);
  });

  it('rejected кладёт ошибку и isLoading = false', () => {
    const action = fetchIngredients.rejected(new Error('Ошибка'), '', undefined);
    const state = reducer(undefined, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
