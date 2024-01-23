import { useCardOptions } from '@cardEditor/cardOptions';
import {
  cardId,
  cardImgAspect,
  cardImgHeight,
} from '@cardEditor/cardStyles/constants';
import { useCardStylesStore } from '@cardEditor/cardStyles/store';
import { FC, memo, useState } from 'react';
import { useDebounce, useMeasure } from 'react-use';
import shallow from 'zustand/shallow';
import CardInfo from '../blocks/CardInfo';
import Debug from '../blocks/Debug';
import NameBar from '../blocks/NameBar';
import Hitpoints from '../blocks/NameBar/fields/Hitpoints';
import TypeBar from '../blocks/TypeBar';
import BadgeIcon from '../fields/BadgeIcon';
import CardImage from '../fields/CardImage';
import DexStats from '../fields/DexStats';
import Images from '../fields/Images';
import PrevolveImg from '../fields/PrevolveImg';
import PrevolveName from '../fields/PrevolveName';
import TypeImg from '../fields/TypeImg';
import { CardContainer, CardContent } from './styles';
import MovesAndDescription from '../blocks/MovesAndDescription';

const CardDisplay: FC = () => {
  const { backgroundColor } = useCardOptions(['backgroundColor']);
  const { emphemeralUnit, setEmphemeralUnit } = useCardStylesStore(
    store => ({
      emphemeralUnit: store.emphemeralUnit,
      setEmphemeralUnit: store.setEmphemeralUnit,
    }),
    shallow,
  );
  const [squareRef, { width }] = useMeasure<HTMLDivElement>();
  const [height, setHeight] = useState<number>(cardImgHeight);

  useDebounce(
    () => {
      setEmphemeralUnit(width);
      setHeight(width * cardImgAspect);
    },
    250,
    [width],
  );

  return (
    <CardContainer
      id={cardId}
      $fontSize={emphemeralUnit}
      $height={height}
      $backgroundColor={backgroundColor}
      ref={squareRef}
    >
      <Debug />
      <CardContent>
        <NameBar />
        <Hitpoints />
        <PrevolveName />
        <PrevolveImg />
        <TypeImg />
        <DexStats />
        <BadgeIcon />
        <MovesAndDescription />
        <TypeBar />
        <CardInfo />
      </CardContent>
      <Images />
      <CardImage />
    </CardContainer>
  );
};

export default memo(CardDisplay);
