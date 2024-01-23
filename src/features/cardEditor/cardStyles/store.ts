import { TemplateRelations } from '@cardEditor/types';
import { RequiredIsh } from '@interfaces/utils';
import merge from 'lodash.merge';
import create from 'zustand';
import fallbackCard from '@assets/fallbackCard.png';
import Routes from '@routes';
import { baseEmphemeralUnit, cardImgWidth } from './constants';
import { defaultCardStyles } from './defaults';
import { CardStyles } from './types';
import { getCardImagePath } from './utils';

export interface CardStylesStore {
  state: RequiredIsh<CardStyles>;
  cardImgSrc: string | undefined;
  emphemeralUnit: number;
  setEmphemeralUnit: (cardWidth: number) => void;
  updateTemplate: (relations: TemplateRelations) => void;
}

export const useCardStylesStore = create<CardStylesStore>(set => ({
  state: defaultCardStyles,
  emphemeralUnit: baseEmphemeralUnit,
  cardImgSrc: fallbackCard.src,
  updateTemplate: ({
    baseSet,
    supertype,
    type,
    subtype,
    variation,
    rarity,
  }) => {
    const path = getCardImagePath(
      baseSet,
      supertype,
      type,
      subtype,
      variation,
      rarity,
    );

    return set({
      state: merge(
        {},
        defaultCardStyles,
        baseSet.styles,
        supertype.styles,
        supertype.baseSetOverwrites?.[baseSet.id]?.styles,
        type.styles,
        type.baseSetOverwrites?.[baseSet.id]?.styles,
        subtype?.styles,
        subtype?.baseSetOverwrites?.[baseSet.id]?.styles,
        variation?.styles,
        variation?.baseSetOverwrites?.[baseSet.id]?.styles,
        rarity?.styles,
        rarity?.baseSetOverwrites?.[baseSet.id]?.styles,
      ) as RequiredIsh<CardStyles>,
      cardImgSrc: path ? `${Routes.Assets.Cards}/${path}.png` : undefined,
    });
  },
  setEmphemeralUnit: cardWidth =>
    set({ emphemeralUnit: cardWidth / (cardImgWidth / baseEmphemeralUnit) }),
}));
