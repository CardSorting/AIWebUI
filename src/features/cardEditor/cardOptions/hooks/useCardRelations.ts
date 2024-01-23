import shallow from 'zustand/shallow';
import { RelationsInterface } from '@cardEditor';
import { useCardOptionsStore } from '../store';

const useCardRelationsNew = <
  T extends Partial<RelationsInterface>,
  // @ts-expect-error - This is right
  V extends T = { [P in keyof T]: RelationsInterface[P] },
>(
  properties: (keyof T)[],
): V => {
  const relations = useCardOptionsStore(
    store => ({
      ...properties.reduce<Partial<RelationsInterface>>(
        (obj, key) => ({
          ...obj,
          [key]: store.relations[key as keyof RelationsInterface],
        }),
        {},
      ),
    }),
    shallow,
  );

  return {
    ...(relations as V),
  };
};

export default useCardRelationsNew;
