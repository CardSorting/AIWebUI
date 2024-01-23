import shallow from 'zustand/shallow';
import { useCardLogicStore } from '../store';
import { CardLogic } from '../types';

const useCardLogic = <
  T extends Partial<CardLogic>,
  // @ts-expect-error - This is right
  V extends T = { [P in keyof T]: CardLogic[P] },
>(
  properties: (keyof T)[],
): V => {
  const values = useCardLogicStore(
    store => ({
      ...properties.reduce<Partial<CardLogic>>(
        (obj, key) => ({
          ...obj,
          [key]: store.state[key as keyof CardLogic],
        }),
        {},
      ),
    }),
    shallow,
  );

  return {
    ...(values as V),
  };
};

export default useCardLogic;
