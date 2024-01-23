import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { useCardOptions } from '@cardEditor/cardOptions';

const TotalInSetInput: FC = () => {
  const { totalInSet, setState } = useCardOptions(['totalInSet']);

  return (
    <TextInput
      slug="totalInSet"
      label="Total in Set"
      value={totalInSet}
      onChange={value => setState({ totalInSet: value })}
    />
  );
};

export default TotalInSetInput;
