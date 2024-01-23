import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';

const IllustratorInput: FC = () => {
  const { hasIllustratorName } = useCardLogic(['hasIllustratorName']);
  const { illustrator, setState } = useCardOptions(['illustrator']);

  if (!hasIllustratorName) return null;

  return (
    <TextInput
      slug="illustrator"
      label="Illustrator"
      value={illustrator}
      onChange={value => setState({ illustrator: value })}
    />
  );
};

export default IllustratorInput;
