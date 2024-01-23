import { DamageModifier } from '@cardEditor';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';
import PlacementBlock from '../../atoms/PlacementBlock';

export const Block = styled(PlacementBlock)`
  display: flex;
  align-items: center;
  left: 4.2%;
  height: 3%;
`;

export const TypeWrapper = styled(PlacementBlock)`
  display: flex;
  align-items: center;
  gap: 0.35em;
  font-family: '${Font.FuturaLTMediumBold}', monospace;
`;

export const TypeText = styled('span')`
  font-size: 1.84em;
  line-height: 1.1em;
`;

export const ModifierText = styled('span')<{ $modifier: DamageModifier }>`
  line-height: 0.5em;

  ${({ $modifier }) =>
    $modifier === '-'
      ? css`
          font-size: 2.1em;
        `
      : css`
          font-size: 1.5em;
          margin-bottom: 0.165em;
        `}
`;
