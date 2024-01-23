import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';

const NameInput: FC = () => {
  const { hasName } = useCardLogic(['hasName']);
  const { name, setState } = useCardOptions(['name']);

  if (!hasName) return null;

  return (
    <TextInput
      slug="name"
      label="Name"
      value={name}
      onChange={value => setState({ name: value })}
    />
  );
};

export default NameInput;
