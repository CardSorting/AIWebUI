import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import keepDoubleSpaces from '@cardEditor/cardStyles/utils/keepDoubleSpaces';
import { FC, useMemo } from 'react';
import { MoveDescriptionText, SCALE } from './styles';
import { AttackMoveDescriptionProps } from './types';

const AttackMoveDescription: FC<AttackMoveDescriptionProps> = ({
  move,
  isLastAttack: isLastMove,
  isOnlyMove,
  textColor: color,
  textOutline: outline,
}) => {
  const { hasSpecialMove } = useCardLogic(['hasSpecialMove']);
  const { alignMovesBottom, specialMove } = useCardStyles([
    'alignMovesBottom',
    'specialMove',
  ]);
  const { descriptionAddition } = specialMove || {};

  const description = useMemo(
    () => keepDoubleSpaces(move.description),
    [move.description],
  );

  return (
    <MoveDescriptionText
      textOutline={outline}
      textColor={color}
      unscale={SCALE}
      $alignBottom={alignMovesBottom}
      $isLastMove={!!isLastMove}
      $isEmpty={!move?.description}
      $isOnlyMove={!!isOnlyMove}
    >
      {hasSpecialMove && !!descriptionAddition && move.type === 'special'
        ? `${description}${descriptionAddition}`
        : description}
    </MoveDescriptionText>
  );
};

export default AttackMoveDescription;
