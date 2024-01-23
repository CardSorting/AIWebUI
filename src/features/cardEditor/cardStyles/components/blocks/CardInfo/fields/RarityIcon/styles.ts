import { RarityIconShape } from '@cardEditor/cardOptions/rarityIcon';
import PlacementBlock from '@cardEditor/cardStyles/components/atoms/PlacementBlock';
import { css, styled } from '@css';

export const Wrapper = styled(PlacementBlock)<{ $shape?: RarityIconShape }>`
  position: relative;

  ${({ $shape }) => {
    switch ($shape) {
      case 'small':
        return css`
          height: 0.8em;
          width: 0.8em;
          margin-bottom: 0.2em;
        `;
      case 'big':
      default:
        return css`
          height: 1.7em;
          width: 1.7em;
        `;
    }
  }}
`;
