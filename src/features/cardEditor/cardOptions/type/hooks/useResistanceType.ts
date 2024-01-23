import { CardInterface } from '@cardEditor';
import { useCallback } from 'react';
import { useCardOptionsStore, useCardRelations } from '@cardEditor/cardOptions';

const useResistanceType = () => {
  const { setStateValues } = useCardOptionsStore();
  const { resistanceType } = useCardRelations(['resistanceType']);

  const setResistanceType = useCallback(
    (resistanceTypeId: CardInterface['resistanceTypeId']) => {
      setStateValues({ resistanceTypeId });
    },
    [setStateValues],
  );

  return {
    resistanceType,
    setResistanceType,
  };
};

export default useResistanceType;
