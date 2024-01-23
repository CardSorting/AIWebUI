import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { DexStatsText, SCALE } from './styles';

const DexStats: FC = () => {
  const { hasDexStats } = useCardLogic(['hasDexStats']);
  const { dexStats } = useCardOptions(['dexStats']);
  const { dexStatsTextColor, dexStatsOutline } = useCardStyles([
    'dexStatsTextColor',
    'dexStatsOutline',
  ]);
  const { dexStats: placement } = useCardPlacements(['dexStats']);

  if (!hasDexStats) return null;

  return (
    <DexStatsText
      textColor={dexStatsTextColor}
      textOutline={dexStatsOutline}
      placement={placement}
      unscale={SCALE}
    >
      {dexStats}
    </DexStatsText>
  );
};

export default memo(DexStats);
