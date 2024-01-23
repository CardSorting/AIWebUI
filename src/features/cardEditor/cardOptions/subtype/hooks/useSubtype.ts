import { CardInterface } from '@cardEditor';
import { useCallback, useEffect } from 'react';
import {
  defaultTypeSubtypes,
  useCardOptionsStore,
  useCardRelations,
} from '@cardEditor/cardOptions';
import { subtypes } from '../data';

const useSubtype = () => {
  const { setStateValues } = useCardOptionsStore();
  const { baseSet, type, subtype } = useCardRelations([
    'baseSet',
    'type',
    'subtype',
  ]);

  const setSubtype = useCallback(
    (subtypeId: CardInterface['subtypeId']) => {
      setStateValues({ subtypeId });
    },
    [setStateValues],
  );

  useEffect(() => {
    if (
      !subtype ||
      !subtype.baseSetDependencies[baseSet.id]?.find(r => r.type === type.id)
    ) {
      setSubtype(defaultTypeSubtypes[type.id]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setSubtype, type, baseSet]);

  return {
    subtypes,
    subtype,
    setSubtype,
  };
};

export default useSubtype;
