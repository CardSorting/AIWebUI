import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardPlacements } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import Description from '../../fields/Description';
import Moves from '../../fields/Moves';
import { Wrapper } from './styles';

const MovesAndDescription: FC = () => {
  const { hasMoves, hasDescription } = useCardLogic([
    'hasMoves',
    'hasDescription',
  ]);
  const { movesAndDescription: placement } = useCardPlacements([
    'movesAndDescription',
  ]);

  return (
    <Wrapper placement={placement}>
      {hasDescription && <Description />}
      {hasMoves && <Moves />}
    </Wrapper>
  );
};

export default memo(MovesAndDescription);
