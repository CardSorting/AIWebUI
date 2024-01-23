import { useCardOptions } from '@cardEditor/cardOptions';
import { AbilityMove } from '@cardEditor/types';
import { Box } from '@mui/system';
import { FC, useCallback } from 'react';
import AbilityDescriptionInput from './fields/AbilityDescriptionInput';
import AbilityNameInput from './fields/AbilityNameInput';
import { AbilityMoveFormProps } from './types';

const AbilityMoveForm: FC<AbilityMoveFormProps> = props => {
  const { move } = props;
  const { moves, setState } = useCardOptions(['moves']);

  const handleChange = useCallback(
    (newMove?: AbilityMove) => {
      if (!newMove) return;
      const newMoves = [...(moves || [])];
      const index = newMoves.findIndex(m => m.id === move.id);
      if (index < 0) return;
      newMoves[index] = newMove;
      setState({ moves: newMoves });
    },
    [moves, setState, move],
  );

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <AbilityNameInput {...props} setMove={handleChange} />
      <AbilityDescriptionInput {...props} setMove={handleChange} />
    </Box>
  );
};

export default AbilityMoveForm;
