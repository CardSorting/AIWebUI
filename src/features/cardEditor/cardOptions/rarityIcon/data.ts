import { RarityIcon } from '@cardEditor/cardOptions/rarityIcon';

let id = 1;

export const common: RarityIcon = {
  id: id++,
  slug: 'common',
  displayName: 'Common',
  shape: 'small',
};

export const uncommon: RarityIcon = {
  id: id++,
  slug: 'uncommon',
  displayName: 'Uncommon',
  shape: 'small',
};

export const rare: RarityIcon = {
  id: id++,
  slug: 'rare',
  displayName: 'Rare',
  shape: 'small',
};

export const amazingRare: RarityIcon = {
  id: id++,
  slug: 'amazingRare',
  displayName: 'Amazing Rare',
  shape: 'big',
};

export const rarityIcons: RarityIcon[] = [common, uncommon, rare, amazingRare];
