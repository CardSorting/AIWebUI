import { FC } from 'react';
import Routes from '@routes';
import Image from 'next/image';
import { useRotationIcon } from '@cardEditor/cardOptions/rotationIcon';
import { useCardLogic } from '@cardEditor/cardLogic';
import { CardCreatorAnalyticsEvent } from '@features/analytics';
import CustomIconSelector from '@cardEditor/cardOptions/components/atoms/CustomIconSelector';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import { ListItemText } from '@mui/material';

const RotationIconSelector: FC = () => {
  const { hasRotationIcon } = useCardLogic(['hasRotationIcon']);
  const {
    rotationIcons,
    rotationIcon,
    setRotationIcon,
    customRotationIconImgSrc,
    setCustomRotationIconImgSrc,
  } = useRotationIcon();

  if (!hasRotationIcon) return null;

  return (
    <CustomIconSelector
      displayName="Rotation Icon"
      slug="rotationIcon"
      icon={rotationIcon}
      customIconSrc={customRotationIconImgSrc}
      setIcon={setRotationIcon}
      setCustomIconSrc={setCustomRotationIconImgSrc}
      recommendedSize={32}
      trackEvent={CardCreatorAnalyticsEvent.RotationIconChange}
      hasNone
    >
      {rotationIcons.map(ri => (
        <SelectorMenuItem key={ri.slug} value={ri.id}>
          <SelectorListItemIcon>
            <Image
              src={Routes.Assets.Icons.Rotation(ri.slug)}
              width={19}
              height={ri.shape === 'square' ? 19 : 28}
              alt=""
            />
          </SelectorListItemIcon>
          <ListItemText primary={ri.displayName} secondary={ri.subText} />
        </SelectorMenuItem>
      ))}
    </CustomIconSelector>
  );
};

export default RotationIconSelector;
