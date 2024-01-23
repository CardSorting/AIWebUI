import { Icon, ListItemText, SelectChangeEvent } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import ControlledSelector from '@components/inputs/ControlledSelector';
import {
  CropFree as EmptyIcon,
  QuestionMark as QuestionMarkIcon,
} from '@mui/icons-material';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import FileUploader from '@components/inputs/FileUploader';
import {
  CardCreatorAnalyticsEvent,
  trackCardCreatorEvent,
} from '@features/analytics';
import { IdentifierInfo } from '@cardEditor/cardOptions';

interface CustomIconSelectorProps {
  slug: string;
  displayName: string;
  icon?: IdentifierInfo;
  setIcon: (value: number | undefined) => void;
  customIconSrc?: string;
  setCustomIconSrc: (value: string | undefined) => void;
  trackEvent?: CardCreatorAnalyticsEvent;
  recommendedSize: number;
  hasNone?: boolean;
}

const CustomIconSelector: FC<CustomIconSelectorProps> = ({
  slug,
  displayName,
  icon,
  setIcon,
  customIconSrc,
  setCustomIconSrc,
  trackEvent,
  recommendedSize,
  hasNone,
  children,
}) => {
  const [customIconActive, setCustomIconActive] = useState<boolean>(
    !!customIconSrc,
  );

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const { value } = event.target;
      if (typeof value === 'string') {
        // 'None' selected
        setIcon(undefined);
        setCustomIconSrc(undefined);
        setCustomIconActive(false);
        return;
      }
      if (value) {
        setIcon(value);
        setCustomIconActive(false);
        setCustomIconSrc(undefined);
      } else {
        setCustomIconActive(true);
      }
      if (trackEvent) {
        trackCardCreatorEvent(trackEvent);
      }
    },
    [setIcon, setCustomIconActive, setCustomIconSrc, trackEvent],
  );

  return (
    <>
      <ControlledSelector
        value={customIconActive ? 0 : icon?.id}
        displayName={displayName}
        slug={slug}
        onChange={handleChange}
      >
        {hasNone && (
          <SelectorMenuItem value="">
            <SelectorListItemIcon>
              <EmptyIcon />
            </SelectorListItemIcon>
            <ListItemText primary="None" />
          </SelectorMenuItem>
        )}
        <SelectorMenuItem value={0}>
          <SelectorListItemIcon>
            <Icon>
              <QuestionMarkIcon />
            </Icon>
          </SelectorListItemIcon>
          <ListItemText primary="Custom" />
        </SelectorMenuItem>
        {children}
      </ControlledSelector>
      {customIconActive && (
        <FileUploader
          slug={`custom${slug}Src"`}
          label={`Custom ${displayName}`}
          onChange={(_, img) => setCustomIconSrc(img)}
          tooltipProps={{
            title: `Recommended size: ${recommendedSize}×${recommendedSize} pixels`,
          }}
        />
      )}
    </>
  );
};

export default CustomIconSelector;
