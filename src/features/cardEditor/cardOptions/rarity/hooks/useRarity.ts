import { useCallback, useEffect, useMemo } from 'react';
import { useCardOptionsStore, useCardRelations } from '@cardEditor/cardOptions';
import { CardInterface } from '@cardEditor/types';
import { rarities } from '../data';

const useRarity = () => {
  const { setStateValues } = useCardOptionsStore();
  const { rarity, baseSet, type, subtype, variation } = useCardRelations([
    'rarity',
    'baseSet',
    'type',
    'subtype',
    'variation',
  ]);

  const setRarity = useCallback(
    (rarityId: CardInterface['rarityId']) => {
      setStateValues({ rarityId });
    },
    [setStateValues],
  );

  const typeRarities = useMemo(
    () => type.baseSetDependencies[baseSet.id]?.rarities,
    [type, baseSet],
  );

  const variationTypeRarities = useMemo(
    () =>
      variation?.baseSetDependencies[baseSet.id]?.types?.[type.id]?.rarities,
    [variation, type, baseSet],
  );

  const variationSubtypeRarities = useMemo(
    () =>
      subtype
        ? variation?.baseSetDependencies[baseSet.id]?.subtypes?.[subtype.id]
            ?.rarities
        : undefined,
    [variation, subtype, baseSet],
  );

  const subtypeRarities = useMemo(
    () =>
      subtype?.baseSetDependencies[baseSet.id]?.find(r => r.type === type.id)
        ?.rarities,
    [subtype, baseSet, type],
  );

  const rarityIsAvailable = useCallback(
    (id: number) => {
      const typeIncludesRarity = typeRarities.includes(id);
      const variationTypeIncludesRarity =
        variation && variationTypeRarities?.includes(id);
      const variationSubtypeIncludesRarity =
        variation && subtype && variationSubtypeRarities?.includes(id);
      const subtypeIncludesRarity = subtypeRarities?.includes(id);

      if (variationTypeIncludesRarity) return true;
      if (
        variation && subtype
          ? variationSubtypeIncludesRarity
          : subtype && subtypeIncludesRarity
      )
        return true;
      if (!variation && !subtype && typeIncludesRarity) return true;
      return false;
    },
    [
      typeRarities,
      variationTypeRarities,
      variationSubtypeRarities,
      subtypeRarities,
      variation,
      subtype,
    ],
  );

  const anyRarityAvailable = useMemo<boolean>(() => {
    const typeHasRarities = !!typeRarities?.length;
    const variationTypeHasRarities = variation && variationTypeRarities?.length;
    const variationSubtypeHasRarities =
      variation && subtype && variationSubtypeRarities?.length;
    const subtypeHasRarities = !!subtypeRarities?.length;

    if (variationTypeHasRarities) return true;
    if (!variation && !subtype && typeHasRarities) return true;
    if (
      variation && subtype
        ? variationSubtypeHasRarities
        : subtype && subtypeHasRarities
    )
      return true;
    return false;
  }, [
    typeRarities,
    variation,
    subtype,
    variationTypeRarities,
    variationSubtypeRarities,
    subtypeRarities,
  ]);

  useEffect(() => {
    if (!rarity?.id) return;
    if (!rarityIsAvailable(rarity.id)) {
      setStateValues({ rarityId: undefined });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtype, type, variation, baseSet, setStateValues, rarityIsAvailable]);

  return {
    rarities,
    rarity,
    anyRarityAvailable,
    setRarity,
    rarityIsAvailable,
  };
};

export default useRarity;
