import {
  Divider,
  ListItemText,
  ListSubheader,
  SelectChangeEvent,
} from '@mui/material';
import { FC, Fragment, useCallback, useMemo } from 'react';
import Routes from '@routes';
import Image from 'next/image';
import ControlledSelector from '@components/inputs/ControlledSelector';
import {
  BadgeIcon,
  badgeIconTypes,
  useBadgeIcon,
} from '@cardEditor/cardOptions/badgeIcon';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import { useCardLogic } from '@cardEditor/cardLogic';
import {
  CardCreatorAnalyticsEvent,
  trackCardCreatorEvent,
} from '@features/analytics';
import findById from '@utils/findById';
import { baseSets, scarletAndViolet } from '@cardEditor/cardOptions/baseSet';
import { CropFree as EmptyIcon } from '@mui/icons-material';

const BadgeIconSelector: FC = () => {
  const { hasBadgeIcon } = useCardLogic(['hasBadgeIcon']);
  const { badgeIcons, badgeIcon, setBadgeIcon } = useBadgeIcon();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setBadgeIcon(Number(event.target.value));
      trackCardCreatorEvent(CardCreatorAnalyticsEvent.BadgeIconChange);
    },
    [setBadgeIcon],
  );

  const badgeIconGroups = useMemo(
    () =>
      badgeIcons.reduce<{
        [iconTypeId: number]: {
          [baseSetId: number]: BadgeIcon[];
        };
      }>((groups, item) => {
        const iconType: number = item.type || 0;
        if (!groups[iconType]) {
          groups[iconType] = [];
        }
        const baseSet: number = item.baseSet || 0;
        if (!groups[iconType][baseSet]) {
          groups[iconType][baseSet] = [];
        }
        groups[iconType][baseSet].push(item);
        return groups;
      }, {}),
    [badgeIcons],
  );

  if (!hasBadgeIcon) return null;

  return (
    <>
      {/* Display a selector per group */}
      {Object.entries(badgeIconGroups).map(
        ([iconTypeId, iconBaseSetGroups], i) => {
          const iconType = findById(badgeIconTypes, +iconTypeId)!;
          return (
            <Fragment key={iconTypeId}>
              <ControlledSelector
                // Display "None" when the selected badge icon is not in this group
                value={badgeIcon?.type === +iconTypeId ? badgeIcon.id : ''}
                displayName={`${iconType.displayName} Badge Icon`}
                slug={`badgeIcon${iconType.slug}`}
                onChange={handleChange}
              >
                <SelectorMenuItem value="">
                  <SelectorListItemIcon>
                    <EmptyIcon />
                  </SelectorListItemIcon>
                  <ListItemText primary="None" />
                </SelectorMenuItem>
                {/* TODO: Better sorting */}
                {Object.entries(iconBaseSetGroups)
                  .sort(([baseSetId]) =>
                    baseSetId === String(scarletAndViolet.id) ? -1 : 1,
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
                      ...icons.map(bi => (
                        <SelectorMenuItem key={bi.slug} value={bi.id}>
                          <SelectorListItemIcon>
                            <Image
                              src={Routes.Assets.Icons.Badge(bi.slug)}
                              height={36}
                              width={iconType.width}
                              objectFit="cover"
                              alt=""
                            />
                          </SelectorListItemIcon>
                          <ListItemText
                            primary={bi.displayName}
                            secondary={bi.subText}
                          />
                        </SelectorMenuItem>
                      )),
                    ];
                  })}
              </ControlledSelector>
              {i !== Object.keys(badgeIconGroups).length - 1 && (
                <Divider sx={{ my: -4 }}>or</Divider>
              )}
            </Fragment>
          );
        },
      )}
    </>
  );
};

export default BadgeIconSelector;
