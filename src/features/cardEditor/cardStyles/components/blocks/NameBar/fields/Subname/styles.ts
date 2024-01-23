import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';

export const SCALE_X = 0.9;
export const SCALE_Y = 1.1;
export const SCALE = 1 - Math.abs(SCALE_Y - SCALE_X);

export const SubnameText = styled(CardText)<{ $beforeName: boolean }>`
  align-self: flex-end;

  ${({ $beforeName }) =>
    $beforeName
      ? css`
          /* Pokémon's subname */
          font-family: '${Font.GillSansStdRegularBold}', monospace;
          order: -1;
          font-size: 1.7em;
          line-height: 1.85em;
          transform: scale(${SCALE_X}, ${SCALE_Y});
          transform-origin: center left;
        `
      : css`
          /* Trainer's subname */
          font-family: '${Font.FrutigerLT66BoldItalic}', monospace;
          color: #6b6c6e;
          font-size: 1.45em;
          margin-left: auto;
          line-height: 1.8em;
        `}
`;
