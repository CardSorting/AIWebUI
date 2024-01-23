import { isAttackMove } from '@cardEditor/cardOptions/utils/isMove';
import { AbilityMove, AttackMove, TemplateRelations } from '@cardEditor/types';
import merge from 'lodash.merge';
import create from 'zustand';
import { defaultCardLogic } from './defaults';
import { CardLogic } from './types';

export interface CardLogicStore {
  state: Required<CardLogic>;
  greatestEnergyCost: number;
  updateTemplate: (relations: TemplateRelations) => void;
  updateGreatestEnergyCost: (moves: (AttackMove | AbilityMove)[]) => void;
}

export const useCardLogicStore = create<CardLogicStore>(set => ({
  state: defaultCardLogic,
  greatestEnergyCost: 0,
  updateTemplate: ({ baseSet, supertype, type, subtype, variation, rarity }) =>
    set({
      state: merge(
        {},
        defaultCardLogic,
        baseSet.logic,
        supertype.logic,
        supertype.baseSetOverwrites?.[baseSet.id]?.logic,
        type.logic,
        type.baseSetOverwrites?.[baseSet.id]?.logic,
        subtype?.logic,
        subtype?.baseSetOverwrites?.[baseSet.id]?.logic,
        variation?.logic,
        variation?.baseSetOverwrites?.[baseSet.id]?.logic,
        rarity?.logic,
        rarity?.baseSetOverwrites?.[baseSet.id]?.logic,
      ) as Required<CardLogic>,
    }),
  updateGreatestEnergyCost: moves =>
    set({
      greatestEnergyCost: moves
        ?.filter(isAttackMove)
        .reduce<number>((greatestCost, move) => {
          let moveCost = (move?.energyCost ?? []).reduce(
            (acc, cost) => acc + cost.amount,
            0,
          );
          moveCost += Number(!!move?.energyCostModifier);
          if (moveCost > greatestCost) {
            return moveCost;
          }
          return greatestCost;
        }, 0),
    }),
}));
