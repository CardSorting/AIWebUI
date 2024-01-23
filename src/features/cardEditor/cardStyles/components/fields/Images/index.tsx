import { FC, memo } from 'react';
import CroppedImg from '@components/CroppedImg';
import { useCardOptions } from '@cardEditor/cardOptions';
import { Wrapper } from './styles';

const Images: FC = () => {
  const { images } = useCardOptions(['images']);

  if (!images?.length) return null;

  return (
    <>
      {images
        .sort((a, b) => a.order - b.order)
        .map(img => (
          <Wrapper key={img.id} $isBehindTemplate={img.behindTemplate}>
            <CroppedImg {...img} />
          </Wrapper>
        ))}
    </>
  );
};

export default memo(Images);
