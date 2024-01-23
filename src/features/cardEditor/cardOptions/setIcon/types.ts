import { IdentifierInfo } from '../types';

// setRectangle = new SV standard
export type SetIconShape = 'rectangle' | 'square' | 'setRectangle';

export interface SetIcon extends IdentifierInfo {
  /**
   * The baseSet this setIcon can be grouped into
   */
  baseSet?: number;
  shape: SetIconShape;
}
