import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import { useType } from '@cardEditor/cardOptions/type';

import Routes from '@routes';
import findById from '@utils/findById';
import Image from 'next/image';
import { FC, useCallback, useMemo } from 'react';
import EnergyTypeButton from '../../atoms/EnergyTypeButton';
import { EnergyCostRemoveFieldProps } from './types';

const EnergyCostRemoveField: FC<EnergyCostRemoveFieldProps> = ({
  energyCost,
  move,
  setMove,
}) => {
  const { baseSet } = useBaseSet();
  const { attackCostTypes } = useType();

  const type = useMemo(
    () => findById(attackCostTypes, energyCost.typeId),
    [attackCostTypes, energyCost.typeId],
  );

  const remove = useCallback(() => {
    const newCost = [...move.energyCost];
    const energyCostIndex = newCost.findIndex(
      ec => ec.typeId === energyCost?.typeId,
    );

    // Cost amount for this type is 0, do nothing
    if (energyCostIndex === -1) return;

    if (newCost[energyCostIndex].amount === 1) {
      // Cost amount for this type is 1, remove it from the array
      newCost.splice(energyCostIndex, 1);
    } else {
      // Cost amount greater than 1, remove 1
      newCost[energyCostIndex] = {
        ...newCost[energyCostIndex],
        amount: newCost[energyCostIndex].amount - 1,
      };
    }

    setMove({
      ...move,
      energyCost: newCost,
    });
  }, [energyCost, setMove, move]);

  if (!type) return null;

  return (
    <EnergyTypeButton
      label={`remove ${type.displayName} energy cost`}
      title={type.displayName}
      small
      onClick={remove}
    >
      <Image
        alt={type.displayName}
        layout="fill"
        objectFit="contain"
        src={Routes.Assets.Icons.Type(baseSet.slug, type.slug, true)}
      />
    </EnergyTypeButton>
  );
};

export default EnergyCostRemoveField;
