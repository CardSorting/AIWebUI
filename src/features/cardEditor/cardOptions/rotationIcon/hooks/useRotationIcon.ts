import { CardInterface } from '@cardEditor';
import { useCallback } from 'react';
import { useCardOptions, useCardRelations } from '@cardEditor/cardOptions';
import { rotationIcons } from '../data';

const useRotationIcon = () => {
  const { customRotationIconImgSrc, setState } = useCardOptions([
    'customRotationIconImgSrc',
  ]);
  const { rotationIcon } = useCardRelations(['rotationIcon']);

  const setRotationIcon = useCallback(
    (rotationIconId: CardInterface['rotationIconId']) => {
      setState({ rotationIconId });
    },
    [setState],
  );

  const setCustomRotationIconImgSrc = useCallback(
    (value: CardInterface['customRotationIconImgSrc']) => {
      setState({ customRotationIconImgSrc: value });
    },
    [setState],
  );

  return {
    rotationIcons,
    rotationIcon,
    setRotationIcon,
    customRotationIconImgSrc,
    setCustomRotationIconImgSrc,
  };
};

export default useRotationIcon;
