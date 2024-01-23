import { AbilityMove } from '@cardEditor/types';

export interface AbilityMoveFormProps {
  slug: string;
  move: AbilityMove;
}

export type AbilityMoveFieldProps = Omit<AbilityMoveFormProps, 'label'> & {
  setMove: (newMove?: AbilityMove) => void;
};
