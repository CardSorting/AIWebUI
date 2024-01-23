import { setLogo, trainerIcon } from '@cardEditor/cardOptions/badgeIcon';
import PlacementBlock from '@cardEditor/cardStyles/components/atoms/PlacementBlock';
import { css, styled } from '@css';

export const Wrapper = styled(PlacementBlock)<{ $type: number }>`
  pointer-events: none;
  user-select: none;

  ${({ $type }) => {
    switch ($type) {
      case trainerIcon.id:
        return css`
          top: 34.2%;
          right: -2.3%;
          height: 15em;
          width: 15em;
        `;
      case setLogo.id:
        return css`
          top: 26%;
          right: 3%;
          height: 23em;
          width: 18em;
        `;
      default:
        return undefined;
    }
  }}
`;
