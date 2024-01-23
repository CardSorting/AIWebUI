import { styled } from '@css';
import { Font } from '@utils/fonts';
import CardText from '../CardText';
import PlacementBlock from '../PlacementBlock';

export const NAME_SCALE = 0.88;
export const DESCRIPTION_SCALE = 0.97;

export const Wrapper = styled(PlacementBlock)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SymbolContainer = styled(PlacementBlock)`
  position: relative;
`;

export const TitleBar = styled(PlacementBlock)`
  position: relative;
  display: flex;
`;

export const AbilityNameText = styled(CardText)<{
  $energyCost: number;
  $leftPercentage: number;
}>`
  font-family: '${Font.GillSansStdBoldCondensed}', monospace;
  color: #a30000;
  font-size: 2.625em;
  transform: scaleX(${NAME_SCALE});
  transform-origin: left center;
  position: absolute;
  left: ${({ $energyCost, $leftPercentage }) =>
    `${Math.max(4, $energyCost) * $leftPercentage}%`};
`;

export const AbilityDescriptionText = styled(CardText)`
  font-family: '${Font.GillSansStdRegular}', monospace;
  font-size: 1.75em;
  white-space: pre-line;
  text-align: justify;
  line-height: 1.05em;
  padding-left: 0.5%;
  width: 103%;
  transform: scaleX(${DESCRIPTION_SCALE});
  transform-origin: left;
`;
