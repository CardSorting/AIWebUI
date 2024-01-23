import { styled } from '@css';
import { Font } from '@utils/fonts';
import CardText from '../../atoms/CardText';

export const SCALE = 1.02;

export const DexStatsText = styled(CardText)`
  position: absolute;
  left: 11%;
  font-family: '${Font.FrutigerLT55Roman}', monospace;
  font-size: 0.92em;
  letter-spacing: 0.01em;
  text-align: center;
  width: 77.98%;
  transform: scaleX(${SCALE});
  transform-origin: center;
`;
