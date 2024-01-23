import TextAreaInput from '@components/inputs/TextAreaInput';
import { FC } from 'react';
import { AbilityMoveFieldProps } from '../../types';

const AbilityDescriptionInput: FC<AbilityMoveFieldProps> = ({
  slug,
  move,
  setMove,
}) => (
  <TextAreaInput
    slug={`${slug}Description`}
    label="Description"
    value={move.description}
    onChange={description =>
      setMove({
        ...move,
        description,
      })
    }
  />
);

export default AbilityDescriptionInput;
