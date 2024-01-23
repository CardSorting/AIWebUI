import { CardInterface } from '@cardEditor';
import { useCallback } from 'react';
import { useCardOptions, useCardRelations } from '@cardEditor/cardOptions';
import { rarityIcons } from '../data';

const useRarityIcon = () => {
  const { customRarityIconImgSrc, setState } = useCardOptions([
    'customRarityIconImgSrc',
  ]);
  const { rarityIcon } = useCardRelations(['rarityIcon']);

  const setRarityIcon = useCallback(
    (rarityIconId: CardInterface['rarityIconId']) => {
      setState({ rarityIconId });
    },
    [setState],
  );

  const setCustomRarityIconImgSrc = useCallback(
    (value: CardInterface['customRarityIconImgSrc']) => {
      setState({ customRarityIconImgSrc: value });
    },
    [setState],
  );

  return {
    rarityIcons,
    rarityIcon,
    setRarityIcon,
    customRarityIconImgSrc,
    setCustomRarityIconImgSrc,
  };
};

export default useRarityIcon;
