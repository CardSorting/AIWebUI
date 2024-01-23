import { IdentifierInfo } from '../types';

export type RarityIconShape = 'big' | 'small';

export type RarityIcon = IdentifierInfo & {
  shape: RarityIconShape;
};
