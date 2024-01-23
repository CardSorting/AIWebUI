import { FC } from 'react';
import TextInput from '@components/inputs/TextInput';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardDebugStore } from '@cardEditor/cardDebug';

const PrevolveImgSrcInput: FC = () => {
  const prevolveImgSrc = useCardDebugStore(store => store.prevolveImgSrc);
  const setPrevolveImgSrc = useCardDebugStore(store => store.setPrevolveImgSrc);
  const { hasPrevolveImg: hasPrevolve } = useCardLogic(['hasPrevolveImg']);
  if (!hasPrevolve) return null;

  return (
    <TextInput
      slug="prevolveImgSrc"
      label="Prevolve Image Source"
      value={prevolveImgSrc}
      onChange={setPrevolveImgSrc}
    />
  );
};

export default PrevolveImgSrcInput;
