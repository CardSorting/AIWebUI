import { SetIconShape } from '@cardEditor/cardOptions/setIcon';
import PlacementBlock from '@cardEditor/cardStyles/components/atoms/PlacementBlock';
import { css, styled } from '@css';

export const Wrapper = styled(PlacementBlock)<{ $shape: SetIconShape }>`
  position: relative;

  ${({ $shape }) =>
    $shape === 'setRectangle' &&
    css`
      height: 1.8em;
      width: 3.2em;
    `}
`;
