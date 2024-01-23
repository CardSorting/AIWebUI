import { useCardDebugStore } from '@cardEditor/cardDebug';
import TextInput from '@components/inputs/TextInput';
import { FC } from 'react';

const OverlayImgSrcInput: FC = () => {
  const overlayImgSrc = useCardDebugStore(store => store.overlayImgSrc);
  const setOverlayImgSrc = useCardDebugStore(store => store.setOverlayImgSrc);

  return (
    <TextInput
      slug="overlayImgSrc"
      label="Overlay Image Source"
      value={overlayImgSrc}
      onChange={setOverlayImgSrc}
    />
  );
};

export default OverlayImgSrcInput;
