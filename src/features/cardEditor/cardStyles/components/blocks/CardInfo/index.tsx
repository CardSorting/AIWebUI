import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardPlacements } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import CardNumber from './fields/CardNumber';
import DexEntry from './fields/DexEntry';
import Illustrator from './fields/Illustrator';
import RarityIcon from './fields/RarityIcon';
import RotationIcon from './fields/RotationIcon';
import SetIcon from './fields/SetIcon';
import { CardInfoBar, Wrapper } from './styles';

const CardInfo: FC = () => {
  const {
    cardInfoContainer: containerPlacement,
    cardInfoBar: infoBarPlacement,
  } = useCardPlacements(['cardInfoContainer', 'cardInfoBar']);
  const { hasCardInfo } = useCardLogic(['hasCardInfo']);

  if (!hasCardInfo) return null;

  return (
    <>
      <Wrapper placement={containerPlacement}>
        <Illustrator />
        <CardInfoBar placement={infoBarPlacement}>
          <SetIcon />
          <RotationIcon />
          <CardNumber />
          <RarityIcon />
        </CardInfoBar>
      </Wrapper>
      <DexEntry />
    </>
  );
};

export default memo(CardInfo);
