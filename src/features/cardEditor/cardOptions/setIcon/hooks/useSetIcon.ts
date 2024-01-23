import { CardInterface } from '@cardEditor';
import { useCallback } from 'react';
import { useCardOptions, useCardRelations } from '@cardEditor/cardOptions';
import { setIcons } from '../data';

const useSetIcon = () => {
  const { customSetIconImgSrc, setState } = useCardOptions([
    'customSetIconImgSrc',
  ]);
  const { setIcon } = useCardRelations(['setIcon']);

  const setSetIcon = useCallback(
    (setIconId: CardInterface['setIconId']) => {
      setState({ setIconId });
    },
    [setState],
  );

  const setCustomSetIconImgSrc = useCallback(
    (value: CardInterface['customSetIconImgSrc']) => {
      setState({ customSetIconImgSrc: value });
    },
    [setState],
  );

  return {
    setIcons,
    setIcon,
    setSetIcon,
    customSetIconImgSrc,
    setCustomSetIconImgSrc,
  };
};

export default useSetIcon;
