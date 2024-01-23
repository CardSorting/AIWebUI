import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import { isAttackMove } from '@cardEditor/cardOptions/utils/isMove';
import { AttackMove } from '@cardEditor/types';
import AccordionForm from '@components/AccordionForm';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { nanoid } from 'nanoid';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';
import MoveItem from './components/MoveItem';

const MovesForm: FC = () => {
  const { moves, setState } = useCardOptions(['moves']);
  const { hasMoves, hasSpecialMove } = useCardLogic([
    'hasMoves',
    'hasSpecialMove',
  ]);
  const [windowReady, setWindowReady] = useState<boolean>(false);

  useEffect(() => {
    setWindowReady(true);
  }, []);

  const handleDrop = useCallback(
    (item: DropResult) => {
      // Ignore drop outside droppable container
      if (!item.destination) return;

      const currentIndex = item.source.index;
      const newIndex = item.destination.index;
      // No changes
      if (currentIndex === newIndex) return;

      const newList = [...(moves || [])];
      const [reorderedItem] = newList.splice(currentIndex, 1);
      newList.splice(newIndex, 0, reorderedItem);

      setState({
        moves: newList.map((m, index) => ({
          ...m,
          order: index,
        })),
      });
    },
    [moves, setState],
  );

  const specialAttackAdded = useMemo(
    () => !!moves?.some(m => isAttackMove(m) && m.type === 'special'),
    [moves],
  );

  useEffect(() => {
    // If we need a special move and there are already moves defined,
    // Make the last move as special move
    if (!!moves?.some(isAttackMove) && hasSpecialMove && !specialAttackAdded) {
      const newMoves = [...(moves || [])];
      const index = newMoves.reverse().findIndex(isAttackMove);
      if (index < 0) return;
      newMoves[index] = {
        ...newMoves[index],
        type: 'special',
      };
      setState({ moves: newMoves.reverse() });
    }
  }, [moves, specialAttackAdded, hasSpecialMove, setState]);

  const handleAddAttack = useCallback(() => {
    const move: AttackMove = {
      id: nanoid(),
      type: hasSpecialMove && !specialAttackAdded ? 'special' : 'default',
      name: '',
      description: '',
      damageAmount: '',
      energyCost: [],
      order: moves?.length || 0,
    };

    if (!hasSpecialMove || (hasSpecialMove && !specialAttackAdded)) {
      // Place new moves at the bottom by default
      setState({ moves: [...(moves || []), move] });
    } else {
      // If there's a special move present, place the new move above that
      const newMoves = [...(moves || [])];
      const specialMoveIndex = newMoves.findIndex(
        m => isAttackMove(m) && m.type === 'special',
      );
      const beforeSpecialMove = newMoves.slice(0, specialMoveIndex);
      const afterSpecialMove = newMoves.slice(specialMoveIndex);
      setState({
        moves: [
          ...beforeSpecialMove,
          {
            ...move,
            order: beforeSpecialMove.length,
          },
          ...afterSpecialMove.map(m => ({
            ...m,
            order: m.order + 1,
          })),
        ],
      });
    }
  }, [moves, setState, specialAttackAdded, hasSpecialMove]);

  const handleAddAbility = useCallback(() => {
    // Place new abilities at the top by default
    setState({
      moves: [
        {
          id: nanoid(),
          name: '',
          description: '',
          order: 0,
        },
        ...(moves || []).map(move => ({
          ...move,
          order: move.order + 1,
        })),
      ],
    });
  }, [moves, setState]);

  if (!hasMoves) return null;

  return (
    <AccordionForm slug="movesForm" header="Moves">
      <Box display="flex" gap={1}>
        <Button fullWidth variant="contained" onClick={handleAddAbility}>
          Add Ability
        </Button>
        <Button fullWidth variant="contained" onClick={handleAddAttack}>
          Add Attack
        </Button>
      </Box>
      <DragDropContext onDragEnd={handleDrop}>
        {windowReady && (
          <Droppable droppableId="movesList">
            {providedList => (
              <Box
                {...providedList.droppableProps}
                ref={providedList.innerRef}
                mt={-1}
              >
                {(moves || [])
                  .sort((a, b) => a.order - b.order)
                  .map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {providedItem => (
                        <MoveItem move={item} provided={providedItem} />
                      )}
                    </Draggable>
                  ))}
                {providedList.placeholder}
              </Box>
            )}
          </Droppable>
        )}
      </DragDropContext>
    </AccordionForm>
  );
};

export default MovesForm;
