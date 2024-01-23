import { useCardLogicStore } from '@cardEditor/cardLogic';
import { useCardStylesStore } from '@cardEditor/cardStyles';
import { CardInterface, RelationsInterface } from '@cardEditor/types';
import create from 'zustand';
import { defaultCardOptions, defaultRelations } from './defaults';
import createNewRelations from './utils/createNewRelations';

export interface CardOptionsStore {
  state: CardInterface;
  relations: RelationsInterface;
  setState: (state: CardInterface) => void;
  setStateValues: (values: Partial<CardInterface>) => void;
}

export const useCardOptionsStore = create<CardOptionsStore>(set => ({
  state: defaultCardOptions,
  relations: defaultRelations,
  setState: state => set({ state }),
  setStateValues: values =>
    set(store => {
      const newRelations = createNewRelations(values);
      const relations: RelationsInterface = {
        ...store.relations,
        ...newRelations,
      };
      if (Object.keys(newRelations).length > 0) {
        useCardLogicStore.getState().updateTemplate(relations);
        useCardStylesStore.getState().updateTemplate(relations);
      }
      if (values.hasOwnProperty('moves')) {
        useCardLogicStore
          .getState()
          .updateGreatestEnergyCost(values.moves || []);
      }
      return {
        state: { ...store.state, ...values },
        relations,
      };
    }),
}));
