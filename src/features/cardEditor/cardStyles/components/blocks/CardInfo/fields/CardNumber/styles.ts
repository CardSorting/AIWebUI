import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { styled } from '@css';
import { Font } from '@utils/fonts';

export const SCALE = 1.02;

export const CardNumberText = styled(CardText)`
  font-family: '${Font.FrutigerLT66BoldItalic}', monospace;
  line-height: 0.88em;
  margin-left: -0.2em;
  display: flex;
  justify-content: flex-end;
  transform: scaleX(${SCALE});
  transform-origin: left center;
`;
