import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { StyledText } from './styles';

const PrevolveName: FC = () => {
  const { prevolveName } = useCardOptions(['prevolveName']);
  const { hasPrevolveName } = useCardLogic(['hasPrevolveName']);
  const { prevolveText } = useCardStyles(['prevolveText']);
  const { prevolveName: placement } = useCardPlacements(['prevolveName']);

  if (!hasPrevolveName || !prevolveName) return null;

  return (
    <StyledText placement={placement}>
      {prevolveText} {prevolveName}
    </StyledText>
  );
};

export default memo(PrevolveName);
