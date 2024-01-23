import { useCardLogic, useCardLogicStore } from '@cardEditor/cardLogic';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC } from 'react';
import { AttackMoveDisplayProps } from '../../types';
import { MoveNameText, SCALE } from './styles';

const AttackMoveName: FC<AttackMoveDisplayProps> = ({
  move,
  textColor: color,
  textOutline: outline,
}) => {
  const greatestEnergyCost = useCardLogicStore(
    store => store.greatestEnergyCost,
  );
  const { hasSpecialMove } = useCardLogic(['hasSpecialMove']);
  const { specialMove, moveNameLeftPercentage } = useCardStyles([
    'specialMove',
    'moveNameLeftPercentage',
  ]);
  const { nameAddition } = specialMove || {};

  return (
    <MoveNameText
      $energyCost={greatestEnergyCost}
      $leftPercentage={moveNameLeftPercentage}
      textOutline={outline}
      textColor={color}
      unscale={SCALE}
    >
      {hasSpecialMove && !!nameAddition && move.type === 'special'
        ? `${move.name}${nameAddition}`
        : move.name}
    </MoveNameText>
  );
};

export default AttackMoveName;
