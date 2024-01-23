import { CardInterface, RelationsInterface } from '@cardEditor';
import findById from '@utils/findById';
import { useCallback, useMemo } from 'react';
import { defaultRelations, useCardOptions } from '@cardEditor/cardOptions';
import useType from './useType';

const useTypeImg = () => {
  const { typeImgId, customTypeImgSrc, typeImgAmount, setState } =
    useCardOptions(['typeImgId', 'customTypeImgSrc', 'typeImgAmount']);
  const { pokemonTypes } = useType();

  const setTypeImg = useCallback(
    (value: CardInterface['typeImgId']) => {
      setState({ typeImgId: value });
    },
    [setState],
  );

  const setCustomTypeImgSrc = useCallback(
    (value: CardInterface['customTypeImgSrc']) => {
      setState({ customTypeImgSrc: value });
    },
    [setState],
  );

  const typeImg = useMemo<RelationsInterface['typeImg']>(
    () => findById(pokemonTypes, typeImgId, defaultRelations.typeImg),
    [pokemonTypes, typeImgId],
  );

  const setTypeImgAmount = useCallback(
    (value: CardInterface['typeImgAmount']) => {
      setState({ typeImgAmount: value });
    },
    [setState],
  );

  return {
    typeImg,
    setTypeImg,
    customTypeImgSrc,
    setCustomTypeImgSrc,
    typeImgAmount,
    setTypeImgAmount,
  };
};

export default useTypeImg;
