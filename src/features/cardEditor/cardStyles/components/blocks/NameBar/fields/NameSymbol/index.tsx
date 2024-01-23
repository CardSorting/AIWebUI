import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import DisplayImg from '@cardEditor/cardStyles/components/atoms/DisplayImg';
import Routes from '@routes';
import { FC, memo } from 'react';
import { Wrapper } from './styles';

const NameSymbol: FC = () => {
  const { nameSymbol } = useCardStyles(['nameSymbol']);
  const { hasNameSymbol } = useCardLogic(['hasNameSymbol']);
  const imgSrc = !!nameSymbol && Routes.Assets.Symbols.Name(nameSymbol);

  if (!hasNameSymbol || !imgSrc) return null;

  return (
    <Wrapper $symbol={nameSymbol}>
      <DisplayImg src={imgSrc} />
    </Wrapper>
  );
};

export default memo(NameSymbol);
