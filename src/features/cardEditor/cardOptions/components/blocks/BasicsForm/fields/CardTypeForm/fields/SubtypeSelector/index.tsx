import { ListItemText, MenuItem, SelectChangeEvent } from '@mui/material';
import { FC, useCallback } from 'react';
import ControlledSelector from '@components/inputs/ControlledSelector';
import { useSubtype } from '@cardEditor/cardOptions/subtype';
import { useType } from '@cardEditor/cardOptions/type';
import {
  CardCreatorAnalyticsEvent,
  trackCardCreatorEvent,
} from '@features/analytics';
import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import { useCardLogic } from '@cardEditor/cardLogic';

const SubtypeSelector: FC = () => {
  const { baseSet } = useBaseSet();
  const { type } = useType();
  const { hasSubtypes, isSubtypeRequired } = useCardLogic([
    'hasSubtypes',
    'isSubtypeRequired',
  ]);
  const { subtypes, subtype, setSubtype } = useSubtype();

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setSubtype(Number(event.target.value) ?? undefined);
      trackCardCreatorEvent(CardCreatorAnalyticsEvent.SubtypeChange);
    },
    [setSubtype],
  );

  if (!hasSubtypes) return null;

  return (
    <ControlledSelector
      value={subtype?.id}
      displayName="Subtype"
      slug="subtype"
      onChange={handleChange}
    >
      {!isSubtypeRequired && (
        <MenuItem value="">
          <ListItemText primary="None" />
        </MenuItem>
      )}
      {subtypes.map(
        st =>
          !!st.baseSetDependencies[baseSet.id]?.find(
            r => r.type === type.id,
          ) && (
            <MenuItem key={st.slug} value={st.id}>
              <ListItemText primary={st.displayName} secondary={st.subText} />
            </MenuItem>
          ),
      )}
    </ControlledSelector>
  );
};

export default SubtypeSelector;
