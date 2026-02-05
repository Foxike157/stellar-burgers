import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

import { useSelector } from '../../services/store';
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  const { ingredients } = useSelector((state) => state.ingredients);
  const { bun, ingredients: constructorIngredients } = useSelector(
    (state) => state.burgerConstructor
  );

  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    constructorIngredients.forEach((item) => {
      counters[item._id] = (counters[item._id] || 0) + 1;
    });

    if (bun) {
      counters[bun._id] = 2;
    }

    return counters;
  }, [constructorIngredients, bun]);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);

    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
      ingredientsCounters={ingredientsCounters}
    />
  );
};
