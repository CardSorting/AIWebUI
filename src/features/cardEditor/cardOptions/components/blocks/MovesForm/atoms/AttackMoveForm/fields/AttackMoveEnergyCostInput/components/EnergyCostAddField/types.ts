import { Type } from '@cardEditor/cardOptions/type';
import { AttackMove } from '@cardEditor/types';

export interface EnergyCostAddFieldProps {
  type: Type;
  move: AttackMove;
  setMove: (move: AttackMove | undefined) => void;
}
