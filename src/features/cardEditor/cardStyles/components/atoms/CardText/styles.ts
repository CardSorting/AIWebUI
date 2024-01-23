import { TextColor } from '@cardEditor/cardStyles';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';
import PlacementBlock from '../PlacementBlock';

export const Text = styled(PlacementBlock)<{
  $color: TextColor;
  $outline?: TextColor;
}>`
  position: relative;
  margin: 0;
  color: ${({ $color }) => {
    switch ($color) {
      case 'gx':
        return '#0065B5';
      case 'ultraBeast':
        return '#EF1018';
      case 'white':
      case 'black':
      default:
        return $color;
    }
  }};
  white-space: pre;

  ${({ $outline }) =>
    !!$outline &&
    css`
      text-shadow: ${`${Array(100)
        .fill(1)
        .map(() => `0 0 1.5px ${$outline}`)
        .join(', ')}`};
    `};
`;

export const SpecialCharacter = styled('span')`
  font-family: '${Font.PkmnTCGSpecialCharacters}', monospace;
  line-height: 0;
`;

export const SmallText = styled('span')`
  font-size: 0.7em;
  line-height: 1em;
`;

export const TextWrapper = styled('span')<{ $scale?: number }>`
  ${({ $scale }) =>
    $scale &&
    css`
      [data-special] {
        transform: scaleX(${1 / $scale});
        transform-origin: center;
        display: inline-block;
      }
    `}
`;
