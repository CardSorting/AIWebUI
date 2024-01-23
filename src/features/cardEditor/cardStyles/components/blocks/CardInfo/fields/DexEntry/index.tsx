import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { DexEntryText } from './styles';

const DexEntry: FC = () => {
  const { dexEntry } = useCardOptions(['dexEntry']);
  const { hasDexEntry } = useCardLogic(['hasDexEntry']);
  const { cardInfoOutline, cardInfoTextColor } = useCardStyles([
    'cardInfoOutline',
    'cardInfoTextColor',
  ]);
  const { dexEntry: placement } = useCardPlacements(['dexEntry']);

  if (!hasDexEntry || !dexEntry) return null;

  return (
    <DexEntryText
      textColor={cardInfoTextColor}
      textOutline={cardInfoOutline}
      placement={placement}
    >
      {dexEntry}
    </DexEntryText>
  );
};

export default memo(DexEntry);
