import { AttackMoveDisplayProps, AttackMoveProps } from '../../types';

export type AttackMoveDescriptionProps = AttackMoveDisplayProps &
  Pick<AttackMoveProps, 'isLastAttack' | 'isOnlyMove'>;
