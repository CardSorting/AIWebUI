import shallow from 'zustand/shallow';
import { CardInterface, CroppableCardImg } from '@cardEditor/types';
import { useCardOptionsStore } from '../store';

const useCardOptions = <K extends keyof CardInterface>(
  properties: K[],
): Pick<CardInterface, K> & {
  setState: (values: Partial<CardInterface>) => void;
  setCardImage: (imageUrl: string) => void;
} => {
  const { setStateValues, ...values } = useCardOptionsStore(
    store => ({
      ...properties.reduce<Partial<CardInterface>>(
        (obj, key) => ({
          ...obj,
          [key]: store.state[key],
        }),
        {},
      ),
      setStateValues: store.setStateValues,
    }),
    shallow,
  );

  const setCardImage = (imageUrl: string) => {
    const newImage: CroppableCardImg = {
      id: Date.now().toString(),
      name: 'Uploaded Image',
      src: imageUrl,
      order: 0,
      behindTemplate: false,
      croppedArea: undefined,
    };

    // Ensure 'images' is included in 'properties' or handle undefined
    const currentImages = (values as Partial<CardInterface>).images || [];
    const updatedImages = [...currentImages, newImage];

    setStateValues({
      images: updatedImages,
    });
  };

  return {
    ...(values as Pick<CardInterface, K>),
    setState: setStateValues,
    setCardImage,
  };
};

export default useCardOptions;
