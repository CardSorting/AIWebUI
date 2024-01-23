import { css, styled } from '@css';
import { Size } from '@cardEditor/cardStyles';
import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { Font } from '@utils/fonts';
import { scarletAndViolet } from '@cardEditor/cardOptions/baseSet';

export const Wrapper = styled(CardText)<{ $size: Size; $baseSet: number }>`
  display: block;
  position: absolute;
  text-align: right;

  ${({ $size, $baseSet }) =>
    $size === 'sm'
      ? css`
          top: 3.5%;
          right: 13.2%;
        `
      : css`
          /* TODO: remove */
          top: ${$baseSet === scarletAndViolet.id ? '2.2%' : '2.5%'};
          right: 13.8%;
        `};
`;

export const HPText = styled('span')<{ $size: Size }>`
  display: inline-block;
  transform-origin: center right;
  letter-spacing: 0.1em;
  margin-right: 0.1em;
  font-family: '${Font.GillSansStdUltraBold}', monospace;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          font-size: 1.2em;
          font-weight: bold;
          transform: scaleX(0.65);
        `
      : css`
          font-size: 1.25em;
          transform: scaleX(0.6);
        `};
`;

export const HPNumbers = styled('span')<{ $size: Size }>`
  font-family: '${Font.FuturaLTMediumBold}', monospace;
  letter-spacing: -0.025em;

  ${({ $size }) =>
    $size === 'sm'
      ? css`
          font-size: 2.7em;
        `
      : css`
          font-size: 3.55em;
        `};
`;
