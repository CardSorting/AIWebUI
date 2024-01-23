import { useCardLogic } from '@cardEditor/cardLogic';
import { useVariation } from '@cardEditor/cardOptions/variation';
import ControlledSelector from '@components/inputs/ControlledSelector';
import {
  CardCreatorAnalyticsEvent,
  trackCardCreatorEvent,
} from '@features/analytics';
import { ListItemText, MenuItem, SelectChangeEvent } from '@mui/material';
import { FC, useCallback } from 'react';

const VariationSelector: FC = () => {
  const { hasVariations, isVariationRequired } = useCardLogic([
    'hasVariations',
    'isVariationRequired',
  ]);
  const { variations, variation, setVariation, variationIsAvailable } =
    useVariation();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setVariation(Number(event.target.value));
      trackCardCreatorEvent(CardCreatorAnalyticsEvent.VariationChange);
    },
    [setVariation],
  );

  if (!hasVariations) return null;

  return (
    <ControlledSelector
      value={variation?.id}
      displayName="Variation"
      slug="variation"
      onChange={handleChange}
    >
      {!isVariationRequired && (
        <MenuItem value="">
          <ListItemText primary="None" />
        </MenuItem>
      )}
      {variations.map(
        v =>
          variationIsAvailable(v) && (
            <MenuItem key={v.slug} value={v.id}>
              <ListItemText primary={v.displayName} secondary={v.subText} />
            </MenuItem>
          ),
      )}
    </ControlledSelector>
  );
};

export default VariationSelector;
