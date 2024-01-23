import { styled } from '@css';
import { Font } from '@utils/fonts';
import CardText from '../../atoms/CardText';

export const StyledText = styled(CardText)`
  font-family: '${Font.FrutigerLT66BoldItalic}', monospace;
  position: absolute;
  width: 50%;
  overflow: hidden;
  transform: scaleY(0.93);
`;
