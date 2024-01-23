import { useCardOptions } from '@cardEditor/cardOptions';
import {
  baseEmphemeralUnit,
  cardImgWidth,
  useCardPlacements,
  useCardStylesStore,
} from '@cardEditor/cardStyles';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import { CSSProperties } from '@mui/styled-engine';
import { Box } from '@mui/system';
import { FC, memo, useMemo, useRef } from 'react';
import { useMeasure } from 'react-use';
import { getNameSymbolSize } from '../NameSymbol/utils';
import { NameText } from './styles';

// TODO: Change back to 0.9
const DEFAULT_SCALE = 1;

const Name: FC = () => {
  const emphemeralUnit = useCardStylesStore(store => store.emphemeralUnit);
  const { name } = useCardOptions(['name']);
  const { nameOutline, nameTextColor, nameSymbol } = useCardStyles([
    'nameOutline',
    'nameTextColor',
    'nameSymbol',
  ]);
  const { name: namePosition } = useCardPlacements(['name']);
  const ref = useRef<HTMLDivElement | null>(null);
  const [invisibleRef, { width }] = useMeasure<HTMLDivElement>();

  const nameSymbolSize = useMemo<string>(
    () => getNameSymbolSize(nameSymbol)?.width || '0em',
    [nameSymbol],
  );

  const maxWidth = useMemo(() => {
    const maxWidthPercentile =
      +(String((namePosition as CSSProperties)?.width) || '50%').split('%')[0] /
      100;
    const nameSymbolPx = nameSymbolSize
      ? +nameSymbolSize.split('em')[0] * emphemeralUnit
      : 0;
    // TODO: Subtract measured subname size
    // TODO: And measured HP too?

    // TODO: Get rid of emphemeralunit calculations in this fn because it breaks consistency with downloads
    return (
      cardImgWidth *
        (emphemeralUnit / baseEmphemeralUnit) *
        maxWidthPercentile -
      nameSymbolPx
    );
  }, [emphemeralUnit, namePosition, nameSymbolSize]);

  const scale = useMemo<number>(
    () => Math.min(maxWidth / width, DEFAULT_SCALE),
    [maxWidth, width],
  );

  if (!name) return null;

  return (
    <>
      <Box
        ref={ref}
        sx={{
          transformOrigin: 'left center',
          transform: `scale(${scale}, 1)`,
          // TODO: Change back when DEFAULT_SCALE === 0.9
          // ? `${width * DEFAULT_SCALE}px`
          width:
            scale === DEFAULT_SCALE
              ? 'unset'
              : `calc(100% - ${nameSymbolSize})`,
        }}
      >
        <NameText
          textOutline={nameOutline}
          textColor={nameTextColor}
          unscale={scale}
        >
          {name}
        </NameText>
      </Box>
      <Box
        ref={invisibleRef}
        sx={{
          transition: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -100,
          opacity: 0,
          pointerEvents: 'none',
          transformOrigin: 'left center',
          transform: `scaleX(${DEFAULT_SCALE})`,
        }}
      >
        <NameText textOutline={nameOutline} textColor={nameTextColor}>
          {name}
        </NameText>
      </Box>
    </>
  );
};

export default memo(Name);
