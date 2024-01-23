import { useCardLogic } from '@cardEditor/cardLogic';
import { useBadgeIcon } from '@cardEditor/cardOptions/badgeIcon';
import DisplayImg from '@cardEditor/cardStyles/components/atoms/DisplayImg';
import Routes from '@routes';
import { FC, memo } from 'react';
import { Wrapper } from './styles';

const BadgeIcon: FC = () => {
  const { hasBadgeIcon } = useCardLogic(['hasBadgeIcon']);
  const { badgeIcon } = useBadgeIcon();
  const imgSrc = !!badgeIcon && Routes.Assets.Icons.Badge(badgeIcon.slug);

  if (!hasBadgeIcon || !imgSrc) return null;

  return (
    <Wrapper $type={badgeIcon.type}>
      <DisplayImg src={imgSrc} />
    </Wrapper>
  );
};

export default memo(BadgeIcon);
