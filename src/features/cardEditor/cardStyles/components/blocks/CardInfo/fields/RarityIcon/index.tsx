import { useRarityIcon } from '@cardEditor/cardOptions/rarityIcon';
import DisplayImg from '@cardEditor/cardStyles/components/atoms/DisplayImg';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import Routes from '@routes';
import { FC, memo } from 'react';
import { Wrapper } from './styles';

const RarityIcon: FC = () => {
  const { rarityIcon, customRarityIconImgSrc } = useRarityIcon();
  const { rarityIconColor } = useCardStyles(['rarityIconColor']);
  const { rarityIcon: placement } = useCardPlacements(['rarityIcon']);

  const imgSrc =
    customRarityIconImgSrc ||
    (!!rarityIcon &&
      (rarityIconColor === 'white'
        ? Routes.Assets.Icons.RarityWhite(rarityIcon.slug)
        : Routes.Assets.Icons.Rarity(rarityIcon.slug)));

  if (!imgSrc) return null;

  return (
    <Wrapper
      // TODO: Handle better
      // @ts-expect-error - Types are wrong
      placement={
        !customRarityIconImgSrc && rarityIcon?.shape === 'small'
          ? placement
          : placement && 'ml' in placement
          ? {
              ml: placement.ml,
            }
          : undefined
      }
      $shape={customRarityIconImgSrc ? undefined : rarityIcon?.shape}
    >
      <DisplayImg src={imgSrc} />
    </Wrapper>
  );
};

export default memo(RarityIcon);
