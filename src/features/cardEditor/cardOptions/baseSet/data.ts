import { BaseSet } from '@cardEditor/cardOptions/baseSet';

let id = 1;

export const swordAndShield: BaseSet = {
  id: id++,
  slug: 'swordAndShield',
  displayName: 'Sword & Shield',
  subText: 'V, VMAX, VSTAR',
  styles: {
    abilitySymbol: 'swordAndShield',
    positions: {
      name: {
        height: '6%',
      },
      prevolveName: {
        top: '9.6%',
        left: '17.6%',
        fontSize: '1.04em',
      },
      prevolveImg: {
        top: '7.9%',
        left: '4.6%',
        height: '5.2em',
        width: '5.15em',
        borderRadius: '1.3em 0.45em 1.95em',
      },
      dexStats: {
        top: '48%',
      },
      ability: {
        gap: '0.2em',
      },
      abilityTitleBar: {
        gap: '0.5em',
      },
      abilitySymbol: {
        width: '12.2em',
        height: '2.35em',
        ml: '-2%',
      },
      abilityName: {
        lineHeight: '1em',
      },
      typeBar: {
        bottom: '11.2%',
        width: '88.8%',
      },
      weakness: {
        left: '13.3%',
      },
      resistance: {
        left: '42.5%',
      },
      cardInfoContainer: {
        bottom: '3.6%',
      },
      cardInfoBar: {
        gap: '0.8em',
        alignItems: 'flex-end',
      },
      setIcon: {
        height: '2em',
        width: '2em',
      },
      cardNumber: {
        fontSize: '1.15em',
      },
      rarityIcon: {
        ml: '-0.35em',
      },
      dexEntry: {
        justifyContent: 'flex-end',
        width: '58%',
      },
    },
  },
};

export const sunAndMoon: BaseSet = {
  id: id++,
  slug: 'sunAndMoon',
  displayName: 'Sun & Moon',
  subText: 'GX, Ultra Beast, Tag Team, Prism Star',
  logic: {
    hasRotationIcon: false,
  },
  styles: {
    abilitySymbol: 'sunAndMoon',
    hasAttackCostBorder: false,
    hasTypeImgBorder: false,
    positions: {
      name: {
        height: '6%',
        width: '52.2%',
        gap: '0.5em',
      },
      hitpoints: {
        top: '3.7%',
        right: '13.6%',
      },
      typeImgContainer: {
        top: '2.4%',
        right: '5.1%',
        height: '4.2%',
      },
      typeImg: {
        width: '2.5em',
        height: '2.5em',
      },
      prevolveImg: {
        top: '7.3%',
        left: '4.2%',
        height: '5.2em',
        width: '5.2em',
        clipPath:
          'polygon(25% 0, 75% 0, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0 75%, 0 25%)',
      },
      prevolveName: {
        top: '9.1%',
        left: '17.4%',
        fontSize: '0.94em',
      },
      dexStats: {
        top: '47.9%',
      },
      abilityTitleBar: {
        gap: '1.8em',
      },
      abilitySymbol: {
        width: '10em',
        height: '3em',
      },
      abilityName: {
        lineHeight: '1.2em',
      },
      typeBar: {
        bottom: '10.8%',
        width: '91.8%',
      },
      weakness: {
        left: '13.7%',
      },
      resistance: {
        left: '45.6%',
      },
      cardInfoContainer: {
        gap: '0.3em',
        bottom: '4%',
      },
      cardInfoBar: {
        gap: '0.75em',
        alignItems: 'center',
      },
      setIcon: {
        height: '1.7em',
        width: '1.7em',
      },
      cardNumber: {
        fontSize: '1.1em',
        minWidth: '3.8em',
      },
      rarityIcon: {
        ml: '-0.15em',
      },
      dexEntry: {
        justifyContent: 'flex-start',
        width: '48%',
      },
    },
  },
};

export const scarletAndViolet: BaseSet = {
  ...swordAndShield,
  id: id++,
  slug: 'scarletAndViolet',
  displayName: 'Scarlet & Violet',
  subText: 'Basic Pokémon, not finished yet',
  styles: {
    ...swordAndShield.styles,
    hpSize: 'lg',
    abilitySymbol: 'scarletAndViolet',
    hasAttackCostBorder: false,
    positions: {
      ...swordAndShield.styles?.positions,
      typeBar: {
        bottom: '10.9%',
        width: '88.8%',
      },
      dexStats: {
        top: '47.9%',
      },
      movesAndDescription: {
        left: '7.6%',
        width: '84.5%',
      },
      abilitySymbol: {
        width: '12.2em',
        height: '2.35em',
        ml: '-0.5%',
        mt: '0.5%',
      },
      abilityDescription: {
        pl: '1%',
      },
      dexEntry: {
        justifyContent: 'flex-start',
        textAlign: 'end',
        width: '58%',
      },
      illustrator: {
        ml: 0,
      },
      rotationIcon: {
        order: -1,
      },
      cardInfoBar: {
        gap: '0.3em',
        alignItems: 'flex-end',
      },
      cardNumber: {
        fontSize: '1.15em',
        ml: 0,
        gap: '0.26em',
      },
      rarityIcon: {
        ml: '0.1em',
        mb: '0.1em',
        height: '0.9em',
        width: '0.9em',
      },
    },
  },
};

export const baseSets: BaseSet[] = [
  swordAndShield,
  sunAndMoon,
  scarletAndViolet,
];
