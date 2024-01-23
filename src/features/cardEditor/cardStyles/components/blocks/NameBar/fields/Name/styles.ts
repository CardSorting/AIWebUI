import CardText from '@cardEditor/cardStyles/components/atoms/CardText';
import { styled } from '@css';
import { Font } from '@utils/fonts';

export const NameText = styled(CardText)`
  font-family: '${Font.GillSansStdRegularBold}', monospace;
  font-size: 3.125em;
  /* TODO: Remove when DEFAULT_SCALING === 0.9 */
  letter-spacing: -0.05em;
`;
