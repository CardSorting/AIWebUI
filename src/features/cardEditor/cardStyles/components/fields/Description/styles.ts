import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';
import PlacementBlock from '../../atoms/PlacementBlock';

export const SCALE = 0.97;

export const Wrapper = styled(PlacementBlock)<{ $hasMoves: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  ${({ $hasMoves }) =>
    !$hasMoves &&
    css`
      height: 100%;
    `}
`;

export const DescriptionText = styled(CardText)`
  font-family: '${Font.GillSansStdRegular}', monospace;
  font-size: 1.75em;
  white-space: pre-line;
  text-align: justify;
  line-height: inherit;
  transform: scaleX(${SCALE});
  transform-origin: left;
  width: 103%;
`;
