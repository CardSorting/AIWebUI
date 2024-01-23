import useBase64Img from '@hooks/useBase64Image';
import Routes from '@routes';
import { FC } from 'react';
import AttackMoveDamageAmount from './fields/AttackMoveDamageAmount';
import AttackMoveDescription from './fields/AttackMoveDescription';
import AttackMoveEnergyCost from './fields/AttackMoveEnergyCost';
import AttackMoveName from './fields/AttackMoveName';
import { TitleBar, Wrapper } from './styles';
import { AttackMoveProps } from './types';

const AttackMove: FC<AttackMoveProps> = ({
  move,
  isLastAttack,
  isOnlyMove,
  background,
  descriptionOutline,
  descriptionTextColor,
  nameOutline,
  nameTextColor,
  hasAttackCostBorder,
  placement,
}) => {
  const backgroundImg = useBase64Img(
    background ? Routes.Assets.Symbols.MoveBackground(background) : undefined,
  );

  return (
    <Wrapper $hasBackground={!!backgroundImg} placement={placement}>
      <TitleBar $background={backgroundImg}>
        <AttackMoveEnergyCost
          move={move}
          hasAttackCostBorder={hasAttackCostBorder}
          textOutline={nameOutline}
          textColor={nameTextColor}
        />
        <AttackMoveName
          move={move}
          textOutline={nameOutline}
          textColor={nameTextColor}
        />
        <AttackMoveDamageAmount
          move={move}
          textOutline={nameOutline}
          textColor={nameTextColor}
        />
      </TitleBar>
      <AttackMoveDescription
        move={move}
        isLastAttack={isLastAttack}
        isOnlyMove={isOnlyMove}
        textOutline={descriptionOutline}
        textColor={descriptionTextColor}
      />
    </Wrapper>
  );
};

export default AttackMove;
