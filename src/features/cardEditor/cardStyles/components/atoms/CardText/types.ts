import { TextColor } from '@cardEditor/cardStyles';
import { PlacementBlockProps } from '../PlacementBlock/types';

export type CardTextProps = PlacementBlockProps & {
  textOutline?: TextColor;
  textColor?: TextColor;
  /**
   * The original scale percentile of the text which will be used to
   * unscale special characters to the original 100% scale
   */
  unscale?: number;
};
