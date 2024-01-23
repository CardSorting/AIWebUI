import { NameSymbol } from '@cardEditor/cardStyles';
import PlacementBlock from '@cardEditor/cardStyles/components/atoms/PlacementBlock';
import { styled } from '@css';
import { getNameSymbolSize } from './utils';

export const Wrapper = styled(PlacementBlock)<{ $symbol: NameSymbol }>`
  position: relative;

  ${({ $symbol }) => getNameSymbolSize($symbol)}
`;
