import {
  MoveBackground,
  Placement,
  TextColor,
} from '@cardEditor/cardStyles/types';
import { AttackMove } from '@cardEditor/types';
import { CardTextProps } from '../CardText/types';

export type AttackMoveProps = {
  move: AttackMove;
  isLastAttack: boolean;
  isOnlyMove: boolean;
  background?: MoveBackground;
  descriptionTextColor?: TextColor;
  descriptionOutline?: TextColor;
  nameTextColor?: TextColor;
  nameOutline?: TextColor;
  hasAttackCostBorder: boolean;
  placement?: Placement;
};

export type AttackMoveDisplayProps = CardTextProps & {
  move: AttackMoveProps['move'];
};
