import { Supertype } from '@cardEditor/cardOptions/supertype';
import { scarletAndViolet, sunAndMoon, swordAndShield } from '../baseSet';

let id = 1;

export const pokemon: Supertype = {
  id: id++,
  slug: 'pokemon',
  displayName: 'Pok\u00e9mon',
  logic: {
    hasHitpoints: true,
    hasMoves: true,
    hasTypeBar: true,
    hasSubname: true,
  },
  styles: {
    moveNameLeftPercentage: 7.35,
    hasSubnameBeforeName: true,
    positions: {
      name: {
        width: '53%',
      },
    },
  },
  baseSetOverwrites: {
    [swordAndShield.id]: {
      styles: {
        positions: {
          name: {
            top: '3.3%',
            left: '19%',
          },
        },
      },
    },
    [sunAndMoon.id]: {
      styles: {
        positions: {
          name: {
            top: '3%',
            left: '18.3%',
          },
        },
      },
    },
    [scarletAndViolet.id]: {
      styles: {
        positions: {
          name: {
            top: '3.3%',
            left: '19%',
          },
        },
      },
      logic: {
        hasVariations: false,
      },
    },
  },
};

export const trainer: Supertype = {
  id: id++,
  slug: 'trainer',
  displayName: 'Trainer',
  styles: {
    moveNameLeftPercentage: 8.25,
    positions: {
      name: {
        width: '87.3%',
      },
      movesAndDescription: {
        top: '54%',
        left: '11.9%',
        height: '31.7%',
      },
      description: {
        lineHeight: '2.2em',
      },
    },
  },
  baseSetOverwrites: {
    [swordAndShield.id]: {
      styles: {
        positions: {
          name: {
            top: '6.7%',
            left: '6.3%',
          },
          movesAndDescription: {
            width: '76%',
          },
        },
      },
    },
    [sunAndMoon.id]: {
      styles: {
        positions: {
          name: {
            top: '7.2%',
            left: '6.6%',
          },
          movesAndDescription: {
            width: '75%',
          },
        },
      },
    },
  },
};

export const energy: Supertype = {
  id: id++,
  slug: 'energy',
  displayName: 'Energy',
  styles: {
    positions: {
      name: {
        top: '6.7%',
        left: '6.3%',
        width: '62.5%',
      },
      movesAndDescription: {
        top: '65.6%',
        left: '8.9%',
        height: '25.1%',
        width: '83%',
      },
      description: {
        lineHeight: '1.66em',
      },
    },
  },
  baseSetOverwrites: {
    [sunAndMoon.id]: {
      styles: {
        positions: {
          movesAndDescription: {
            top: '66.4%',
            height: '23.5%',
          },
          description: {
            lineHeight: '1.86em',
          },
        },
      },
    },
  },
};

export const supertypes: Supertype[] = [pokemon, trainer, energy];
