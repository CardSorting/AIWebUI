import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';

const PrevolveNameInput: FC = () => {
  const { hasPrevolveName } = useCardLogic(['hasPrevolveName']);
  const { prevolveName, setState } = useCardOptions(['prevolveName']);

  if (!hasPrevolveName) return null;

  return (
    <TextInput
      slug="prevolveName"
      label="Prevolve Name"
      value={prevolveName}
      onChange={value => setState({ prevolveName: value })}
    />
  );
};

export default PrevolveNameInput;
