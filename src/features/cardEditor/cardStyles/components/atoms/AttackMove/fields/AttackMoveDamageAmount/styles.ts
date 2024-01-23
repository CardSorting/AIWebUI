import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { DamageModifier } from '@cardEditor/types';
import { css, styled } from '@css';
import { Font } from '@utils/fonts';

export const Wrapper = styled('div')`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.2em;
  font-family: '${Font.FuturaStdHeavy}', monospace;
  margin-left: auto;
`;

export const MoveDamageAmountText = styled(CardText)`
  line-height: 1.1em;
  font-size: 2.2em;
`;

export const MoveDamageModifierText = styled(CardText)<{
  $symbol?: DamageModifier;
}>`
  position: absolute;
  font-size: 2em;
  transform: translate(-50%, -50%);

  ${({ $symbol }) => {
    switch ($symbol) {
      case '-':
        return css`
          transform: scale(2, 1);
          top: -16%;
          right: -0.5em;
        `;
      default:
        return css`
          top: 38%;
          right: -0.9em;
        `;
    }
  }}
`;
