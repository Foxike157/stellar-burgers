import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { nanoid } from '@reduxjs/toolkit';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredient = action.payload;

        if (ingredient.type === 'bun') {
          state.bun = ingredient;
        } else {
          state.ingredients.push(ingredient);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          id: nanoid()
        }
      })
    },

    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },

    /** перемещение вверх */
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) return;

      const ingredients = state.ingredients;
      [ingredients[index - 1], ingredients[index]] = [
        ingredients[index],
        ingredients[index - 1]
      ];
    },

    /** перемещение вниз */
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= state.ingredients.length - 1) return;

      const ingredients = state.ingredients;
      [ingredients[index], ingredients[index + 1]] = [
        ingredients[index + 1],
        ingredients[index]
      ];
    },

    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
