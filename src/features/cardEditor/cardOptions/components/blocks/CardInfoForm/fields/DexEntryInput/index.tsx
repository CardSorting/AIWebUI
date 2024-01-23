import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import TextAreaInput from '@components/inputs/TextAreaInput';
import { useCardOptions } from '@cardEditor/cardOptions';

const DexEntryInput: FC = () => {
  const { hasDexEntry } = useCardLogic(['hasDexEntry']);
  const { dexEntry, setState } = useCardOptions(['dexEntry']);

  if (!hasDexEntry) return null;

  return (
    <TextAreaInput
      slug="dexEntry"
      label="Pokédex Entry"
      value={dexEntry}
      onChange={value => setState({ dexEntry: value })}
    />
  );
};

export default DexEntryInput;
