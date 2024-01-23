import shallow from 'zustand/shallow';
import { useCardStylesStore } from '../store';
import { CardStyles } from '../types';

type Placements = CardStyles['positions'];

const useCardPlacements = <
  T extends Partial<Placements>,
  // @ts-expect-error - This is right
  V extends T = { [P in keyof T]: Placements[P] },
>(
  properties: (keyof T)[],
): V => {
  const values = useCardStylesStore(
    store => ({
      ...properties.reduce<Partial<Placements>>(
        (obj, key) => ({
          ...obj,
          [key]: store.state.positions[key as keyof Placements],
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

export default useCardPlacements;
