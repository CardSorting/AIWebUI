import { useCardLogic } from '@cardEditor/cardLogic';
import { useRotationIcon } from '@cardEditor/cardOptions/rotationIcon';
import DisplayImg from '@cardEditor/cardStyles/components/atoms/DisplayImg';
import Routes from '@routes';
import { FC, memo } from 'react';
import { useCardPlacements } from '@cardEditor/cardStyles/hooks';
import { Wrapper } from './styles';

const RotationIcon: FC = () => {
  const { rotationIcon: placement } = useCardPlacements(['rotationIcon']);
  const { hasRotationIcon } = useCardLogic(['hasRotationIcon']);
  const { rotationIcon, customRotationIconImgSrc } = useRotationIcon();
  const imgSrc =
    customRotationIconImgSrc ||
    (!!rotationIcon && Routes.Assets.Icons.Rotation(rotationIcon.slug));

  if (!imgSrc || !hasRotationIcon) return null;

  return (
    <Wrapper
      placement={placement}
      $shape={customRotationIconImgSrc ? undefined : rotationIcon?.shape}
    >
      <DisplayImg src={imgSrc} />
    </Wrapper>
  );
};

export default memo(RotationIcon);
