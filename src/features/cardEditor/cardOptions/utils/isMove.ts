import { AbilityMove, AttackMove } from '@cardEditor/types';

export const isAttackMove = (
  move: AttackMove | AbilityMove,
): move is AttackMove => !!(move as AttackMove)?.energyCost;

export const isAbilityMove = (
  move: AttackMove | AbilityMove,
): move is AttackMove => !(move as AttackMove)?.energyCost;
