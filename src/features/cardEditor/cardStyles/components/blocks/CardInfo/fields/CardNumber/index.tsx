import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { CardNumberText, SCALE } from './styles';

const CardNumber: FC = () => {
  const { cardNumber, totalInSet } = useCardOptions([
    'cardNumber',
    'totalInSet',
  ]);
  const { cardInfoOutline, cardInfoTextColor } = useCardStyles([
    'cardInfoOutline',
    'cardInfoTextColor',
  ]);
  const { cardNumber: placement } = useCardPlacements(['cardNumber']);

  if (!cardNumber && !totalInSet) return null;

  return (
    <CardNumberText
      textColor={cardInfoTextColor}
      textOutline={cardInfoOutline}
      unscale={SCALE}
      placement={placement}
    >
      {cardNumber && <span>{cardNumber}</span>}
      {cardNumber && totalInSet && <span>/</span>}
      {totalInSet && <span>{totalInSet}</span>}
    </CardNumberText>
  );
};

export default memo(CardNumber);
