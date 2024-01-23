import { useCardDebugStore } from '@cardEditor/cardDebug';
import AccordionForm from '@components/AccordionForm';
import { FC } from 'react';
import OverlayImgSrcInput from './fields/OverlayImgSrcInput';
import OverlayOpacitySlider from './fields/OverlayOpacitySlider';
import PrevolveImgSrcInput from './fields/PrevolveImgSrcInput';
import ShowCardOverlayCheckbox from './fields/ShowCardOverlayCheckbox';

const DebugForm: FC = () => {
  const showDebug = useCardDebugStore(store => store.showDebug);

  if (!showDebug) return null;

  return (
    <AccordionForm slug="debugForm" header="Debug">
      <ShowCardOverlayCheckbox />
      <OverlayOpacitySlider />
      <OverlayImgSrcInput />
      <PrevolveImgSrcInput />
    </AccordionForm>
  );
};

export default DebugForm;
