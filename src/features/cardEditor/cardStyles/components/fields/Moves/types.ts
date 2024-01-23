import { AttackMoveProps } from '../../atoms/AttackMove/types';

export type AttackMoveStyleProps = Pick<
  AttackMoveProps,
  | 'descriptionTextColor'
  | 'descriptionOutline'
  | 'nameTextColor'
  | 'nameOutline'
  | 'background'
  | 'hasAttackCostBorder'
>;
