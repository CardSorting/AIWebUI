import { useCardDebugStore } from '@cardEditor/cardDebug';
import { FC, memo } from 'react';
import { StyledImage } from './styles';

const DebugImage: FC = () => {
  const showCardOverlay = useCardDebugStore(store => store.showCardOverlay);
  const overlayOpacity = useCardDebugStore(store => store.overlayOpacity);
  const overlayImgSrc = useCardDebugStore(store => store.overlayImgSrc);

  if (!showCardOverlay || !overlayImgSrc) return null;

  return (
    <StyledImage $opacity={overlayOpacity / 100} src={overlayImgSrc} alt="" />
  );
};

export default memo(DebugImage);
