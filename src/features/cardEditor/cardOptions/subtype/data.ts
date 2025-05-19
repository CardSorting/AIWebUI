import { CardLogic } from '@cardEditor/cardLogic';
import { Subtype } from '@cardEditor/cardOptions/subtype';
import { CardStyles } from '@cardEditor/cardStyles';
import { scarletAndViolet, sunAndMoon, swordAndShield } from '../baseSet';
import {
  characterRare,
  fullArt,
  gilded,
  goldenFullArtPokemon,
  goldenFullArtTrainer,
  promo,
  rainbow,
} from '../rarity';
import {
  colorless,
  dark,
  dragon,
  fairy,
  fighting,
  fire,
  grass,
  item,
  lightning,
  metal,
  psychic,
  water,
} from '../type';

const defaultPokemonTypes: number[] = [
  grass.id,
  fire.id,
  water.id,
  lightning.id,
  psychic.id,
  fighting.id,
  dark.id,
  metal.id,
  colorless.id,
];

const allPokemonTypes: number[] = [...defaultPokemonTypes, dragon.id, fairy.id];

let id = 1;

export const basic: Subtype = {
  id: id++,
  slug: 'basic',
  displayName: 'Basic',
  logic: {
    hasDexStats: true,
    hasDexEntry: true,
    hasVariations: true,
    isVariationRequired: false,
    hasBadgeIcon: true,
  },
  baseSetDependencies: {
    [swordAndShield.id]: [
      ...[...defaultPokemonTypes, dragon.id].map(t => ({
        type: t,
        rarities: [promo.id, characterRare.id],
      })),
      {
        type: fairy.id,
        rarities: [gilded.id, promo.id, characterRare.id],
      },
    ],
    [sunAndMoon.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
    [scarletAndViolet.id]: defaultPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
  },
  baseSetOverwrites: {
    [scarletAndViolet.id]: {
      logic: {
        hasVariations: false,
      },
    },
  },
};

export const stage1: Subtype = {
  id: id++,
  slug: 'stage1',
  displayName: 'Stage 1',
  logic: {
    hasPrevolveImg: true,
    hasPrevolveName: true,
    hasDexStats: true,
    hasDexEntry: true,
    hasVariations: true,
    isVariationRequired: false,
    hasBadgeIcon: true,
  },
  baseSetDependencies: {
    [swordAndShield.id]: [
      ...defaultPokemonTypes.map(t => ({
        type: t,
        rarities: [characterRare.id],
      })),
      {
        type: dragon.id,
        rarities: [characterRare.id],
      },
      {
        type: fairy.id,
        rarities: [gilded.id, characterRare.id],
      },
    ],
    [sunAndMoon.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
  },
};

export const stage2: Subtype = {
  id: id++,
  slug: 'stage2',
  displayName: 'Stage 2',
  logic: {
    hasPrevolveImg: true,
    hasPrevolveName: true,
    hasDexStats: true,
    hasDexEntry: true,
    hasVariations: true,
    isVariationRequired: false,
    hasBadgeIcon: true,
  },
  baseSetDependencies: {
    [swordAndShield.id]: [
      ...defaultPokemonTypes.map(t => ({
        type: t,
        rarities: [characterRare.id],
      })),
      {
        type: dragon.id,
        rarities: [characterRare.id],
      },
      {
        type: fairy.id,
        rarities: [gilded.id, characterRare.id],
      },
    ],
    [sunAndMoon.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
  },
};

const vStyles: Partial<CardStyles> = {
  hpTextColor: 'white',
  movesOutline: 'white',
  movesTextColor: 'black',
  typeBarTextColor: 'white',
  rarityIconColor: 'white',
  abilitySymbol: 'v',
  hpSize: 'lg',
  alignMovesBottom: true,
};

export const v: Subtype = {
  id: id++,
  slug: 'v',
  displayName: 'V',
  logic: {
    hasNameSymbol: true,
  },
  styles: {
    ...vStyles,
    nameSymbol: 'v',
  },
  baseSetDependencies: {
    [swordAndShield.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [fullArt.id, goldenFullArtPokemon.id],
    })),
  },
};

export const vmax: Subtype = {
  id: id++,
  slug: 'vmax',
  displayName: 'VMax',
  logic: {
    hasNameSymbol: true,
    hasVariations: true,
    hasPrevolveImg: true,
    hasPrevolveName: true,
    hasDexStats: false,
    hasCardInfo: true,
    hasDexEntry: false,
  },
  styles: {
    ...vStyles,
    nameOutline: 'white',
    nameTextColor: 'black',
    cardInfoOutline: 'white',
    cardInfoTextColor: 'black',
    hpOutline: 'black',
    nameSymbol: 'vmax',
  },
  baseSetDependencies: {
    [swordAndShield.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
  },
};

export const vstar: Subtype = {
  id: id++,
  slug: 'vstar',
  displayName: 'VStar',
  styles: {
    movesTextColor: 'black',
    movesOutline: 'white',
    hpTextColor: 'black',
    rarityIconColor: 'white',
    abilitySymbol: 'vstar',
    nameSymbol: 'vstar',
    hpSize: 'lg',
    alignMovesBottom: true,
    positions: {
      prevolveImg: {
        top: '7.7%',
        left: '4.4%',
      },
      movesAndDescription: {
        top: 'unset',
        bottom: '14.5%',
        height: 'unset',
      },
      lastMove: {
        marginTop: '2em',
        height: '10.8em',
      },
    },
  },
  logic: {
    hasPrevolveImg: true,
    hasPrevolveName: true,
    hasNameSymbol: true,
  },
  baseSetDependencies: {
    [swordAndShield.id]: allPokemonTypes.map(t => ({
      type: t,
      rarities: [],
    })),
  },
};

export const tool: Subtype = {
  id: id++,
  slug: 'tool',
  displayName: 'Tool',
  styles: {
    positions: {
      movesAndDescription: {
        top: '61%',
        height: '20%',
      },
      description: {},
    },
  },
  logic: {
    hasVariations: false,
    hasBadgeIcon: true,
  },
  baseSetDependencies: {
    [swordAndShield.id]: [
      {
        type: item.id,
        rarities: [],
      },
    ],
    [sunAndMoon.id]: [
      {
        type: item.id,
        rarities: [goldenFullArtTrainer.id],
      },
    ],
  },
};

const gxStyles: Partial<CardStyles> = {
  hasAttackCostBorder: true,
  hpTextColor: 'black',
  hpOutline: 'white',
  nameTextColor: 'black',
  nameOutline: 'white',
  movesOutline: 'white',
  movesTextColor: 'black',
  typeBarTextColor: 'black',
  rarityIconColor: 'white',
  nameSymbol: 'gx',
  hpSize: 'lg',
  alignMovesBottom: true,
  specialMove: {
    type: 'gx',
    background: 'gx',
    displayName: 'GX Attack',
    descriptionTextColor: 'gx',
    descriptionOutline: 'white',
    nameTextColor: 'white',
    nameOutline: undefined,
    hasAttackCostBorder: false,
    nameAddition: ' [X]',
    descriptionAddition:
      ' __==(You can’t use more than 1 [X] attack in a game.)==__',
  },
  positions: {
    hitpoints: {
      top: '2.5%',
    },
    movesAndDescription: {
      top: 'unset',
      bottom: '15%',
      height: 'unset',
    },
    movesWrapper: {
      gap: '1.5em',
    },
  },
};

const gxLogic: Partial<CardLogic> = {
  hasVariations: true,
  isVariationRequired: false,
  hasSpecialMove: true,
  hasNameSymbol: true,
};

export const gxBasic: Subtype = {
  id: id++,
  slug: 'gxBasic',
  displayName: 'GX (Basic)',
  logic: gxLogic,
  styles: gxStyles,
  baseSetDependencies: {
    [sunAndMoon.id]: [
      ...allPokemonTypes.map(t => ({
        type: t,
        rarities: [fullArt.id, goldenFullArtPokemon.id, rainbow.id],
      })),
    ],
  },
};

export const gxStage1: Subtype = {
  id: id++,
  slug: 'gxStage1',
  displayName: 'GX (Stage 1)',
  logic: {
    ...gxLogic,
    hasPrevolveImg: true,
    hasPrevolveName: true,
  },
  styles: gxStyles,
  baseSetDependencies: {
    [sunAndMoon.id]: [
      ...allPokemonTypes.map(t => ({
        type: t,
        rarities: [fullArt.id, goldenFullArtPokemon.id, rainbow.id],
      })),
    ],
  },
};

export const gxStage2: Subtype = {
  id: id++,
  slug: 'gxStage2',
  displayName: 'GX (Stage 2)',
  logic: {
    ...gxLogic,
    hasPrevolveImg: true,
    hasPrevolveName: true,
  },
  styles: gxStyles,
  baseSetDependencies: {
    [sunAndMoon.id]: [
      ...allPokemonTypes.map(t => ({
        type: t,
        rarities: [fullArt.id, goldenFullArtPokemon.id, rainbow.id],
      })),
    ],
  },
};

export const gxTagTeam: Subtype = {
  id: id++,
  slug: 'gxTagTeam',
  displayName: 'GX (Tag Team)',
  logic: gxLogic,
  styles: {
    ...gxStyles,
    positions: {
      ...gxStyles.positions,
      name: {
        top: '3.5%',
      },
      typeBar: {
        bottom: '10.9%',
      },
    },
  },
  baseSetDependencies: {
    [sunAndMoon.id]: [
      ...allPokemonTypes.map(t => ({
        type: t,
        rarities: [fullArt.id, rainbow.id],
      })),
    ],
  },
};

export const lvX: Subtype = {
  id: id++,
  slug: 'lvX',
  displayName: 'Lv. X',
  logic: {
    hasDexEntry: false,
    hasDexStats: false,
    hasNameSymbol: true,
    hasPrevolveName: true,
  },
  styles: {
    nameSymbol: 'lvX',
    prevolveText: 'Put onto',
    hpTextColor: 'black',
    positions: {
      prevolveName: {
        top: '10.1%',
        left: '7%',
        width: '43.1%',
      },
    },
  },
  baseSetDependencies: {
    [swordAndShield.id]: [
      ...allPokemonTypes.map(t => ({
        type: t,
        rarities: [],
      })),
    ],
  },
};

export const subtypes: Subtype[] = [
  basic,
  stage1,
  stage2,
  lvX,
  v,
  vmax,
  tool,
  vstar,
  gxBasic,
  gxStage1,
  gxStage2,
  gxTagTeam,
];
