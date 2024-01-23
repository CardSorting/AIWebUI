import { EnergyCostModifier } from '@cardEditor/types';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';
import CardText from '../../../CardText';

export const Wrapper = styled('div')`
  display: flex;
`;

export const TypeWrapper = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.75em;
  height: 2.75em;
`;

export const TypeContainer = styled('div')<{ $hasBorder: boolean }>`
  position: relative;
  ${({ $hasBorder }) =>
    $hasBorder
      ? css`
          width: 2.75em;
          height: 2.75em;
        `
      : css`
          width: 2.45em;
          height: 2.45em;
        `}
`;

export const EnergyCostModifierText = styled(CardText)<{
  $symbol: EnergyCostModifier;
}>`
  font-family: '${Font.GillSansStdBoldCondensed}', monospace;
  line-height: 0;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ $symbol }) => {
    switch ($symbol) {
      case '-':
        return css`
          transform: scale(2, 1);
          margin-bottom: 0.1em;
          font-size: 2.5em;
        `;
      default:
        return css`
          font-size: 3em;
        `;
    }
  }}
`;
