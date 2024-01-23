import shallow from 'zustand/shallow';
import { useCardStylesStore } from '../store';
import { CardStyles } from '../types';

type StylesWithoutPlacement = Omit<CardStyles, 'positions'>;

const useCardStyles = <
  T extends Partial<StylesWithoutPlacement>,
  // @ts-expect-error - This is right
  V extends T = { [P in keyof T]: StylesWithoutPlacement[P] },
>(
  properties: (keyof T)[],
): V => {
  const values = useCardStylesStore(
    store => ({
      ...properties.reduce<Partial<StylesWithoutPlacement>>(
        (obj, key) => ({
          ...obj,
          [key]: store.state[key as keyof StylesWithoutPlacement],
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

export default useCardStyles;
