import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { styled } from '@css';
import { Font } from '@utils/fonts';

export const SCALE = 0.88;

export const MoveNameText = styled(CardText)<{
  $energyCost: number;
  $leftPercentage: number;
}>`
  font-family: '${Font.GillSansStdBoldCondensed}', monospace;
  font-size: 2.625em;
  line-height: 0.95em;
  position: absolute;
  left: ${({ $energyCost, $leftPercentage }) =>
    `${Math.max(4, $energyCost) * $leftPercentage}%`};
  transform: scaleX(${SCALE});
  transform-origin: left center;
`;
