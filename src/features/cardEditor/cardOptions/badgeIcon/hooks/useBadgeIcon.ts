import { CardInterface } from '@cardEditor';
import { useCallback } from 'react';
import { useCardOptionsStore, useCardRelations } from '@cardEditor/cardOptions';
import { badgeIcons } from '../data';

const useBadgeIcon = () => {
  const { setStateValues } = useCardOptionsStore();
  const { badgeIcon } = useCardRelations(['badgeIcon']);

  const setBadgeIcon = useCallback(
    (badgeIconId: CardInterface['badgeIconId']) => {
      setStateValues({ badgeIconId });
    },
    [setStateValues],
  );

  return {
    badgeIcons,
    badgeIcon,
    setBadgeIcon,
  };
};

export default useBadgeIcon;
