import { IdentifierInfo } from '../types';

export type BadgeIconShape = 'trainerIcon' | 'setLogo';

export interface BadgeIconType extends IdentifierInfo {
  slug: BadgeIconShape;
  width: number;
}

export interface BadgeIcon extends IdentifierInfo {
  /**
   * The id of the BadgeIconType
   */
  type: number;
  /**
   * The baseSet this setIcon can be grouped into
   */
  baseSet?: number;
}
