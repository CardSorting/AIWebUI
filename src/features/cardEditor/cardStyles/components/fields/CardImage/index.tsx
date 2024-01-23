import { FC, memo } from 'react';
import { useCardStylesStore } from '@cardEditor/cardStyles/store';
import { Wrapper } from './styles';
import DisplayImg from '../../atoms/DisplayImg';

const CardImage: FC = () => {
  const cardImgSrc = useCardStylesStore(store => store.cardImgSrc);

  if (!cardImgSrc) return null;

  return (
    <Wrapper>
      <DisplayImg src={cardImgSrc} />
    </Wrapper>
  );
};

export default memo(CardImage);
