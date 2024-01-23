import { useCardDebugStore } from '@cardEditor/cardDebug';
import ControlledCheckbox from '@components/inputs/ControlledCheckbox';
import { FC } from 'react';

const ShowCardOverlayCheckbox: FC = () => {
  const showCardOverlay = useCardDebugStore(store => store.showCardOverlay);
  const setShowCardOverlay = useCardDebugStore(
    store => store.setShowCardOverlay,
  );

  return (
    <ControlledCheckbox
      slug="showCardOverlay"
      label="Show Card Overlay"
      value={showCardOverlay}
      onChange={setShowCardOverlay}
    />
  );
};

export default ShowCardOverlayCheckbox;
