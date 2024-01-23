import FileUploader from '@components/inputs/FileUploader';
import { FC } from 'react';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useCardOptions } from '@cardEditor/cardOptions';

const PrevolveImgSrcFileUploader: FC = () => {
  const { hasPrevolveImg } = useCardLogic(['hasPrevolveImg']);
  const { setState } = useCardOptions([]);

  if (!hasPrevolveImg) return null;

  return (
    <FileUploader
      slug="prevolveImg"
      label="Prevolve Image"
      onChange={(_, value) => setState({ prevolveImgSrc: value })}
    />
  );
};

export default PrevolveImgSrcFileUploader;
