import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';

const SubnameInput: FC = () => {
  const { hasSubname } = useCardLogic(['hasSubname']);
  const { subname, setState } = useCardOptions(['subname']);

  if (!hasSubname) return null;

  return (
    <TextInput
      slug="subname"
      label="Subname"
      value={subname}
      onChange={value => setState({ subname: value })}
    />
  );
};

export default SubnameInput;
