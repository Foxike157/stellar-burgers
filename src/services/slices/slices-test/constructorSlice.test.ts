import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} from '../constructorSlice';
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

describe('constructorSlice', () => {
  const bun: TIngredient = {
    _id: 'bun-id',
    name: 'Булка',
    type: 'bun',
    price: 100,
    image: 'image',
    ...base
  };

  const main1: TIngredient = {
    _id: 'main-1',
    name: 'Начинка 1',
    type: 'main',
    price: 200,
    image: 'image',
    ...base
  };

  const main2: TIngredient = {
    _id: 'main-2',
    name: 'Начинка 2',
    type: 'main',
    price: 300,
    image: 'image',
    ...base
  };

  it('должен вернуть initialState', () => {
    expect(reducer(undefined, { type: '' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('добавляет булку', () => {
    const state = reducer(undefined, addIngredient(bun));
    expect(state.bun).toMatchObject({
      _id: bun._id,
      name: bun.name
    });
  });

  it('добавляет начинку', () => {
    const state = reducer(undefined, addIngredient(main1));
    expect(state.ingredients.length).toBe(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: main1._id,
      name: main1.name
    });
  });

  it('удаляет начинку по id', () => {
    const stateWithIngredient = reducer(undefined, addIngredient(main1));
    const idToRemove = stateWithIngredient.ingredients[0].id;
    const state = reducer(stateWithIngredient, removeIngredient(idToRemove));
    expect(state.ingredients.length).toBe(0);
  });

  it('перемещает ингредиент вверх', () => {
    let state = reducer(undefined, addIngredient(main1));
    state = reducer(state, addIngredient(main2));

    const id1 = state.ingredients[0].id;
    const id2 = state.ingredients[1].id;

    state = reducer(state, moveIngredientUp(1));

    expect(state.ingredients[0].id).toBe(id2);
    expect(state.ingredients[1].id).toBe(id1);
  });

  it('перемещает ингредиент вниз', () => {
    let state = reducer(undefined, addIngredient(main1));
    state = reducer(state, addIngredient(main2));

    const id1 = state.ingredients[0].id;
    const id2 = state.ingredients[1].id;

    state = reducer(state, moveIngredientDown(0));

    expect(state.ingredients[0].id).toBe(id2);
    expect(state.ingredients[1].id).toBe(id1);
  });

  it('очищает конструктор', () => {
    let state = reducer(undefined, addIngredient(bun));
    state = reducer(state, addIngredient(main1));

    const cleared = reducer(state, clearConstructor());
    expect(cleared).toEqual({ bun: null, ingredients: [] });
  });
});
