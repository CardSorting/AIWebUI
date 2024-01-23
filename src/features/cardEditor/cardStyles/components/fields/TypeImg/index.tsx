import { useCardLogic } from '@cardEditor/cardLogic';
import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import { useTypeImg } from '@cardEditor/cardOptions/type';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import Routes from '@routes';
import { FC, memo, useMemo } from 'react';
import { StyledImg, Wrapper } from './styles';

const TypeImg: FC = () => {
  const { hasTypeImgBorder } = useCardStyles(['hasTypeImgBorder']);
  const { typeImgContainer: containerPlacement, typeImg: imgPlacement } =
    useCardPlacements(['typeImgContainer', 'typeImg']);
  const { hasTypeImage, hasMultipleTypeImages } = useCardLogic([
    'hasTypeImage',
    'hasMultipleTypeImages',
  ]);
  const { baseSet } = useBaseSet();
  const { typeImg, customTypeImgSrc, typeImgAmount } = useTypeImg();

  const imgSrc = useMemo<string | undefined>(
    () =>
      customTypeImgSrc ||
      (typeImg
        ? Routes.Assets.Icons.Type(baseSet.slug, typeImg.slug, true)
        : undefined),
    [customTypeImgSrc, typeImg, baseSet],
  );

  if (!hasTypeImage || !imgSrc) return null;

  return (
    <Wrapper
      $multiple={hasMultipleTypeImages}
      $custom={!!customTypeImgSrc}
      placement={containerPlacement}
    >
      {new Array(hasMultipleTypeImages ? typeImgAmount : 1)
        .fill(undefined)
        .map((_, i) => (
          <StyledImg
            key={`${typeImg?.slug}-${i}`}
            $multiple={hasMultipleTypeImages}
            $custom={!!customTypeImgSrc}
            $hasBorder={!!hasTypeImgBorder}
            as="img"
            // @ts-expect-error `as="img"` allows for the `src` prop
            src={imgSrc}
            alt=""
            placement={imgPlacement}
          />
        ))}
    </Wrapper>
  );
};

export default memo(TypeImg);
