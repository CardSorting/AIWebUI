import { useCardLogic } from '@cardEditor/cardLogic';
import AttackMoveForm from '@cardEditor/cardOptions/components/blocks/MovesForm/atoms/AttackMoveForm';
import { useCardOptions } from '@cardEditor/cardOptions';
import { isAttackMove } from '@cardEditor/cardOptions/utils/isMove';
import { AbilityMove, AttackMove } from '@cardEditor/types';
import {
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { Button, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC, useCallback, useMemo } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import AbilityMoveForm from '../atoms/AbilityMoveForm';

interface MoveItemProps {
  provided: DraggableProvided;
  move: AttackMove | AbilityMove;
}

const MoveItem: FC<MoveItemProps> = ({ move, provided }) => {
  const { moves, setState } = useCardOptions(['moves']);
  const { hasSpecialMove } = useCardLogic(['hasSpecialMove']);
  const { specialMove } = useCardStyles(['specialMove']);

  const label = useMemo<string>(
    () =>
      isAttackMove(move)
        ? (hasSpecialMove && move.type === 'special'
            ? specialMove?.displayName
            : 'Attack') || 'Attack'
        : 'Ability',
    [move, hasSpecialMove, specialMove],
  );

  const handleDelete = useCallback(() => {
    const newMoves = [...(moves || [])];
    const index = newMoves.findIndex(m => m.id === move.id);
    if (index < 0) return;
    newMoves.splice(index, 1);
    setState({ moves: newMoves });
  }, [move, moves, setState]);

  return (
    <Paper {...provided.draggableProps} ref={provided.innerRef} sx={{ mt: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        p={0.25}
        {...provided.dragHandleProps}
      >
        <IconButton sx={{ pointerEvents: 'none' }} color="inherit">
          <DragIcon />
        </IconButton>
        <Typography fontWeight={700} px={1}>
          {label}
        </Typography>
        <Box ml="auto" pr={0.75} pt={0.75}>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{ pl: 10 }}
          >
            Delete
          </Button>
        </Box>
      </Box>
      <Box px={1} pb={1}>
        {isAttackMove(move) ? (
          <AttackMoveForm move={move} slug={`move${move.id}`} />
        ) : (
          <AbilityMoveForm move={move} slug={`move${move.id}`} />
        )}
      </Box>
    </Paper>
  );
};

export default MoveItem;
