import { ListItemText } from '@mui/material';
import { FC } from 'react';
import Routes from '@routes';
import Image from 'next/image';
import { useRarityIcon } from '@cardEditor/cardOptions/rarityIcon';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import { CardCreatorAnalyticsEvent } from '@features/analytics';
import CustomIconSelector from '@cardEditor/cardOptions/components/atoms/CustomIconSelector';
import { useSettingsStore } from '@features/settings';

const RarityIconSelector: FC = () => {
  const themeMode = useSettingsStore(store => store.theme);
  const {
    rarityIcons,
    rarityIcon,
    setRarityIcon,
    customRarityIconImgSrc,
    setCustomRarityIconImgSrc,
  } = useRarityIcon();

  return (
    <CustomIconSelector
      displayName="Rarity Icon"
      slug="rarityIcon"
      icon={rarityIcon}
      customIconSrc={customRarityIconImgSrc}
      setIcon={setRarityIcon}
      setCustomIconSrc={setCustomRarityIconImgSrc}
      recommendedSize={32}
      trackEvent={CardCreatorAnalyticsEvent.RarityIconChange}
      hasNone
    >
      {rarityIcons.map(ri => (
        <SelectorMenuItem key={ri.slug} value={ri.id}>
          <SelectorListItemIcon>
            <Image
              src={
                themeMode === 'light'
                  ? Routes.Assets.Icons.Rarity(ri.slug)
                  : Routes.Assets.Icons.RarityWhite(ri.slug)
              }
              height={ri.shape === 'small' ? 13 : 24}
              width={ri.shape === 'small' ? 13 : 24}
              alt=""
            />
          </SelectorListItemIcon>
          <ListItemText primary={ri.displayName} secondary={ri.subText} />
        </SelectorMenuItem>
      ))}
    </CustomIconSelector>
  );
};

export default RarityIconSelector;
