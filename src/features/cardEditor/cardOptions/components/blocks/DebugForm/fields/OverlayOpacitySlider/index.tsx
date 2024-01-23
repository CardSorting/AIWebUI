import { useCardDebugStore } from '@cardEditor/cardDebug';
import ControlledSlider from '@components/inputs/ControlledSlider';
import { FC, useEffect, useState } from 'react';

const OverlayOpacitySlider: FC = () => {
  const overlayOpacity = useCardDebugStore(store => store.overlayOpacity);
  const setOverlayOpacity = useCardDebugStore(store => store.setOverlayOpacity);
  const [opacity, setOpacity] = useState(overlayOpacity);

  useEffect(() => {
    setOpacity(overlayOpacity);
  }, [overlayOpacity]);

  return (
    <ControlledSlider
      slug="overlayOpacity"
      label="Overlay Opacity"
      step={1}
      min={0}
      max={100}
      value={opacity}
      onChange={setOpacity}
      onChangeCommitted={setOverlayOpacity}
    />
  );
};

export default OverlayOpacitySlider;
