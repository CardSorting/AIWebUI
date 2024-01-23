import { Rarity } from '@cardEditor/cardOptions/rarity';
import { sunAndMoon } from '../baseSet';

export const promo: Rarity = {
  id: 1,
  slug: 'promo',
  displayName: 'Promo',
  logic: {
    hasDexEntry: true,
    hasDexStats: false,
    hasBadgeIcon: false,
  },
  styles: {
    nameOutline: 'white',
    nameTextColor: 'black',
    hpOutline: 'white',
    hpTextColor: 'black',
    movesOutline: 'white',
    movesTextColor: 'black',
    cardInfoOutline: 'white',
    cardInfoTextColor: 'black',
  },
};

export const fullArt: Rarity = {
  id: 2,
  slug: 'fullArt',
  displayName: 'Full Art',
  styles: {
    nameTextColor: 'black',
    nameOutline: 'white',
    cardInfoTextColor: 'black',
    cardInfoOutline: 'white',
    rarityIconColor: 'white',
    movesTextColor: 'black',
    movesOutline: 'white',
  },
};

export const goldenFullArtPokemon: Rarity = {
  id: 3,
  slug: 'goldenFullArtPokemon',
  displayName: 'Golden Full Art',
  styles: {
    nameTextColor: 'black',
    nameOutline: 'white',
    cardInfoTextColor: 'black',
    cardInfoOutline: 'white',
    hpOutline: 'black',
    typeBarTextColor: 'black',
    specialMove: {
      background: 'gxGold',
    },
  },
  baseSetOverwrites: {
    [sunAndMoon.id]: {
      styles: {
        hpOutline: 'white',
        abilitySymbol: 'sunAndMoonGold',
      },
    },
  },
};

export const rainbow: Rarity = {
  id: 4,
  slug: 'rainbow',
  displayName: 'Rainbow',
  baseSetOverwrites: {
    [sunAndMoon.id]: {
      styles: {
        positions: {
          prevolveImg: {
            top: '7.6%',
            left: '4.7%',
          },
          prevolveName: {
            top: '9.3%',
          },
          typeBar: {
            bottom: '10.6%',
          },
          name: {
            left: '18.2%',
          },
        },
      },
    },
  },
};

export const fullArtNonPkm: Rarity = {
  id: 5,
  slug: 'fullArtNonPkm',
  displayName: 'Full Art',
  styles: {
    movesTextColor: 'black',
    movesOutline: 'white',
    cardInfoTextColor: 'black',
    cardInfoOutline: 'white',
    rarityIconColor: 'white',
    alignMovesBottom: true,
  },
};

export const gilded: Rarity = {
  id: 7,
  slug: 'gilded',
  displayName: 'Gilded',
};

export const characterRare: Rarity = {
  id: 8,
  slug: 'characterRare',
  displayName: 'Character Rare',
  logic: {
    hasDexStats: false,
    hasBadgeIcon: false,
  },
  styles: {
    nameTextColor: 'black',
    nameOutline: 'white',
    hpTextColor: 'black',
    hpOutline: 'white',
    movesTextColor: 'black',
    movesOutline: 'white',
    cardInfoTextColor: 'black',
    cardInfoOutline: 'white',
    rarityIconColor: 'white',
  },
};

export const goldenFullArtEnergy: Rarity = {
  id: 9,
  slug: 'goldenFullArtEnergy',
  displayName: 'Golden Full Art',
  styles: {
    rarityIconColor: 'white',
    movesOutline: 'white',
  },
};

export const goldenFullArtTrainer: Rarity = {
  id: 10,
  slug: 'goldenFullArtTrainer',
  displayName: 'Golden Full Art',
  styles: fullArtNonPkm.styles,
};

export const goldStarFullArt: Rarity = {
  id: 11,
  slug: 'goldStarFullArt',
  displayName: 'Full Art',
  logic: {
    hasDexEntry: true,
    hasDexStats: false,
  },
  styles: {
    nameOutline: 'white',
    nameTextColor: 'black',
    hpOutline: 'white',
    hpTextColor: 'black',
    movesOutline: 'white',
    movesTextColor: 'black',
    cardInfoOutline: 'white',
    cardInfoTextColor: 'black',
  },
};

export const rarities: Rarity[] = [
  promo,
  fullArt,
  goldenFullArtPokemon,
  rainbow,
  fullArtNonPkm,
  goldenFullArtEnergy,
  goldenFullArtTrainer,
  gilded,
  characterRare,
  goldStarFullArt,
];
