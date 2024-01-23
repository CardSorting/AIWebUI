import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';
import {
  isAbilityMove,
  isAttackMove,
} from '@cardEditor/cardOptions/utils/isMove';
import { useCardPlacements, useCardStyles } from '@cardEditor/cardStyles/hooks';
import { AbilityMove, AttackMove as AttackMoveType } from '@cardEditor/types';
import { FC, memo, useCallback, useMemo } from 'react';
import Ability from '../../atoms/Ability';
import AttackMoveWrapper from './components/AttackMoveWrapper';
import { CenteredAttacksWrapper, Wrapper } from './styles';
import { AttackMoveStyleProps } from './types';

const Moves: FC = () => {
  const { hasSpecialMove } = useCardLogic(['hasSpecialMove']);
  const {
    alignMovesBottom,
    movesTextColor,
    movesOutline,
    hasAttackCostBorder,
    specialMove,
  } = useCardStyles([
    'alignMovesBottom',
    'movesTextColor',
    'movesOutline',
    'hasAttackCostBorder',
    'specialMove',
  ]);
  const { movesWrapper: placement, lastMove: lastMovePlacement } =
    useCardPlacements(['movesWrapper', 'lastMove']);
  const { moves } = useCardOptions(['moves']);

  const attackMoveCount = useMemo<number>(
    () =>
      (moves || []).reduce(
        (count, move) => (isAttackMove(move) ? count + 1 : count),
        0,
      ),
    [moves],
  );

  const sortedMoves = useMemo(
    () => [...(moves || [])].sort((a, b) => a.order - b.order),
    [moves],
  );

  const abilitiesFirst = useMemo<boolean>(
    () => !!sortedMoves.length && isAbilityMove(sortedMoves[0]),
    [sortedMoves],
  );

  const abilityMoves = useMemo<AbilityMove[]>(
    () => sortedMoves.filter(isAbilityMove),
    [sortedMoves],
  );

  const attackMoves = useMemo<AttackMoveType[]>(
    () => sortedMoves.filter(isAttackMove),
    [sortedMoves],
  );

  // Whether there's a clear divide between abilities and attacks, none are used in conjunction
  const abilityAttacksDivided = useMemo<boolean>(() => {
    if (sortedMoves.length === 1) return true;

    let abilitySeen = false;
    let attackSeen = false;
    return sortedMoves.every((move, index) => {
      if (isAttackMove(move)) {
        attackSeen = true;
        // Ability has already been iterated over and there's another ability later in the list
        if (
          abilitySeen &&
          !![...sortedMoves].slice(index).find(isAbilityMove)
        ) {
          return false;
        }
      } else {
        abilitySeen = true;
        // Attack has already been iterated over and there's another attack later in the list
        if (attackSeen && !![...sortedMoves].slice(index).find(isAttackMove)) {
          return false;
        }
      }
      return true;
    });
  }, [sortedMoves]);

  const getStyleProps = useCallback(
    (move: AttackMoveType): AttackMoveStyleProps => {
      if (!!specialMove && hasSpecialMove && move.type === 'special') {
        return {
          descriptionTextColor: specialMove.descriptionTextColor,
          descriptionOutline: specialMove.descriptionOutline,
          nameTextColor: specialMove.nameTextColor,
          nameOutline: specialMove.nameOutline,
          hasAttackCostBorder: !!specialMove.hasAttackCostBorder,
          background: specialMove.background,
        };
      }
      return {
        descriptionTextColor: movesTextColor,
        descriptionOutline: movesOutline,
        nameTextColor: movesTextColor,
        nameOutline: movesOutline,
        hasAttackCostBorder,
      };
    },
    [
      hasSpecialMove,
      specialMove,
      hasAttackCostBorder,
      movesOutline,
      movesTextColor,
    ],
  );

  if (!sortedMoves.length) return null;

  return (
    <Wrapper
      $hasMultipleAttacks={attackMoveCount > 1}
      $alignBottom={alignMovesBottom}
      placement={placement}
    >
      {!alignMovesBottom && abilityAttacksDivided ? (
        <>
          {abilityMoves.map((move, index) => (
            <Ability
              key={move.id}
              ability={move}
              placement={
                (abilitiesFirst ? 0 : attackMoves.length) + index ===
                sortedMoves.length - 1
                  ? lastMovePlacement
                  : undefined
              }
            />
          ))}
          <CenteredAttacksWrapper $orderFirst={!abilitiesFirst}>
            {attackMoves.map((move, index) => (
              <AttackMoveWrapper
                move={move}
                styleProps={getStyleProps(move)}
                index={(abilitiesFirst ? abilityMoves.length : 0) + index}
                moves={sortedMoves}
                key={move.id}
              />
            ))}
          </CenteredAttacksWrapper>
        </>
      ) : (
        sortedMoves.map((move, index) =>
          isAttackMove(move) ? (
            <AttackMoveWrapper
              move={move}
              styleProps={getStyleProps(move)}
              index={index}
              moves={sortedMoves}
              key={move.id}
            />
          ) : (
            <Ability
              key={move.id}
              ability={move}
              placement={
                index === sortedMoves.length - 1 ? lastMovePlacement : undefined
              }
            />
          ),
        )
      )}
    </Wrapper>
  );
};

export default memo(Moves);
