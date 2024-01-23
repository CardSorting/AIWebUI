import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';
import { AbilityMoveFieldProps } from '../../types';

const AbilityNameInput: FC<AbilityMoveFieldProps> = ({
  slug,
  move,
  setMove,
}) => (
  <TextInput
    slug={`${slug}Name`}
    label="Name"
    value={move.name}
    onChange={name =>
      setMove({
        ...move,
        name,
      })
    }
  />
);

export default AbilityNameInput;
