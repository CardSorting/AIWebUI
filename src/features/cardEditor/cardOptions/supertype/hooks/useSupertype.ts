import { CardInterface } from '@cardEditor';
import { useCallback, useEffect } from 'react';
import { useCardOptionsStore, useCardRelations } from '@cardEditor/cardOptions';
import { scarletAndViolet } from '@cardEditor/cardOptions/baseSet';
import { energy, pokemon, supertypes, trainer } from '../data';

const useSupertype = () => {
  const { setStateValues } = useCardOptionsStore();
  const { supertype, baseSet } = useCardRelations(['supertype', 'baseSet']);

  const setSupertype = useCallback(
    (supertypeId: CardInterface['supertypeId']) => {
      setStateValues({ supertypeId });
    },
    [setStateValues],
  );

  // TODO: Remove
  useEffect(() => {
    if (
      baseSet.id === scarletAndViolet.id &&
      [trainer.id, energy.id].includes(supertype.id)
    ) {
      setStateValues({ supertypeId: pokemon.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supertype, baseSet]);

  return {
    supertypes,
    supertype,
    setSupertype,
  };
};

export default useSupertype;
