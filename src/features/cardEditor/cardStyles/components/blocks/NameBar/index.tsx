import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardPlacements } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import Name from './fields/Name';
import NameSymbol from './fields/NameSymbol';
import Subname from './fields/Subname';
import { Block } from './styles';

const NameBar: FC = () => {
  const { hasName } = useCardLogic(['hasName']);
  const { name: placement } = useCardPlacements(['name']);

  if (!hasName) return null;

  return (
    <Block placement={placement}>
      <Name />
      <NameSymbol />
      <Subname />
    </Block>
  );
};

export default memo(NameBar);
