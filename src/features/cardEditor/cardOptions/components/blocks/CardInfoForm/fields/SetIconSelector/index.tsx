import { ListItemText, ListSubheader } from '@mui/material';
import { FC, useMemo } from 'react';
import Routes from '@routes';
import Image from 'next/image';
import { SetIcon, useSetIcon } from '@cardEditor/cardOptions/setIcon';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import { scarletAndViolet, useBaseSet } from '@cardEditor/cardOptions/baseSet';
import findById from '@utils/findById';
import { CardCreatorAnalyticsEvent } from '@features/analytics';
import CustomIconSelector from '@cardEditor/cardOptions/components/atoms/CustomIconSelector';

const SetIconSelector: FC = () => {
  const { baseSets } = useBaseSet();
  const {
    setIcons,
    setIcon,
    setSetIcon,
    customSetIconImgSrc,
    setCustomSetIconImgSrc,
  } = useSetIcon();

  const setIconGroups = useMemo(
    () =>
      setIcons.reduce<{
        [baseSetId: number]: SetIcon[];
      }>((groups, item) => {
        const groupId: number = item.baseSet || 0;
        if (!groups[groupId]) {
          groups[groupId] = [];
        }
        groups[groupId].push(item);
        return groups;
      }, {}),
    [setIcons],
  );

  return (
    <CustomIconSelector
      displayName="Set Icon"
      slug="setIcon"
      icon={setIcon}
      customIconSrc={customSetIconImgSrc}
      setIcon={setSetIcon}
      setCustomIconSrc={setCustomSetIconImgSrc}
      recommendedSize={38}
      trackEvent={CardCreatorAnalyticsEvent.SetIconChange}
    >
      {/* TODO: Better sorting */}
      {Object.entries(setIconGroups)
        .sort(([baseSetIdA], [baseSetIdB]) =>
          // eslint-disable-next-line no-nested-ternary
          baseSetIdA === '0'
            ? -1
            : // eslint-disable-next-line no-nested-ternary
            baseSetIdB === '0'
            ? 1
            : baseSetIdA === String(scarletAndViolet.id)
            ? -1
            : 1,
        )
        .map(([baseSetId, icons]) => {
          const baseSet = findById(baseSets, +baseSetId);
          return [
            ...(baseSet
              ? [
                  <ListSubheader key={baseSet.id}>
                    {baseSet.displayName}
                  </ListSubheader>,
                ]
              : []),
            ...icons.map(si => (
              <SelectorMenuItem key={si.slug} value={si.id}>
                <SelectorListItemIcon>
                  <Image
                    src={Routes.Assets.Icons.Set(si.slug)}
                    width={36}
                    height={
                      si.shape === 'square'
                        ? 36
                        : si.shape === 'setRectangle'
                        ? 21
                        : 24
                    }
                    alt=""
                  />
                </SelectorListItemIcon>
                <ListItemText primary={si.displayName} secondary={si.subText} />
              </SelectorMenuItem>
            )),
          ];
        })}
    </CustomIconSelector>
  );
};

export default SetIconSelector;
