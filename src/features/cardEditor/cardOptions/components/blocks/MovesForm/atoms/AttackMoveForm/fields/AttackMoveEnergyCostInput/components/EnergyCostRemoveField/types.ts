import { AttackMove, MoveType } from '@cardEditor/types';

export interface EnergyCostRemoveFieldProps {
  energyCost: MoveType;
  move: AttackMove;
  setMove: (move: AttackMove | undefined) => void;
}
