import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import { useCardOptions } from '@cardEditor/cardOptions';
import DisplayImg from '@cardEditor/cardStyles/components/atoms/DisplayImg';
import Routes from '@routes';
import { FC, memo } from 'react';
import TypeImgWrapper from '../../atoms/TypeImgWrapper';
import { Wrapper } from './styles';

const RetreatCost: FC = () => {
  const { retreatCost } = useCardOptions(['retreatCost']);
  const { baseSet } = useBaseSet();
  const imgSrc = Routes.Assets.Icons.Type(baseSet.slug, 'colorless');

  if (!retreatCost) return null;

  return (
    <Wrapper>
      {new Array(retreatCost).fill(undefined).map((_, i) => (
        <TypeImgWrapper key={i}>
          <DisplayImg src={imgSrc} />
        </TypeImgWrapper>
      ))}
    </Wrapper>
  );
};

export default memo(RetreatCost);
