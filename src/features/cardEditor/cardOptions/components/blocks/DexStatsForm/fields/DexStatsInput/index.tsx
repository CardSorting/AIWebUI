import TextInput from '@components/inputs/TextInput';
import { FC, useEffect, useState } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { Box } from '@mui/system';
import { useCardOptions } from '@cardEditor/cardOptions';

const DexStatsInput: FC = () => {
  const { hasDexStats } = useCardLogic(['hasDexStats']);
  const { dexStats, setState } = useCardOptions(['dexStats']);
  const [number, setNumber] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  useEffect(() => {
    if (number || category || height || weight) {
      setState({
        dexStats: `NO. ${number}  ${category} Pokémon  HT: ${height}  WT: ${weight} lbs.`,
      });
    }
  }, [number, category, height, weight, setState]);

  if (!hasDexStats) return null;

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={1}>
      <Box display="flex" gap={2}>
        <TextInput
          value={number}
          onChange={setNumber}
          slug="dexStatsPresetNumber"
          label="Number"
        />
        <TextInput
          value={category}
          onChange={setCategory}
          slug="dexStatsPresetCategory"
          label="Category"
        />
      </Box>
      <Box display="flex" gap={2}>
        <TextInput
          value={height}
          onChange={setHeight}
          slug="dexStatsPresetHeight"
          label="Height"
        />
        <TextInput
          value={weight}
          onChange={setWeight}
          slug="dexStatsPresetWeight"
          label="Weight"
        />
      </Box>
      <TextInput
        slug="dexStatsCustom"
        label="Custom"
        value={dexStats}
        onChange={value => setState({ dexStats: value })}
      />
    </Box>
  );
};

export default DexStatsInput;
