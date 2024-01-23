import { ListItemText } from '@mui/material';
import { FC } from 'react';
import Routes from '@routes';
import Image from 'next/image';
import { SelectorListItemIcon } from '@components/SelectorListItemIcon';
import { SelectorMenuItem } from '@components/SelectorMenuItem';
import { useType, useTypeImg } from '@cardEditor/cardOptions/type';
import { useCardLogic } from '@cardEditor/cardLogic';
import { useBaseSet } from '@cardEditor/cardOptions/baseSet';
import CustomIconSelector from '@cardEditor/cardOptions/components/atoms/CustomIconSelector';

const TypeImgSelector: FC = () => {
  const { hasTypeImage } = useCardLogic(['hasTypeImage']);
  const { baseSet } = useBaseSet();
  const { pokemonTypes } = useType();
  const { typeImg, setTypeImg, customTypeImgSrc, setCustomTypeImgSrc } =
    useTypeImg();

  if (!hasTypeImage) return null;

  return (
    <CustomIconSelector
      displayName="Energy Type"
      slug="typeImg"
      icon={typeImg}
      customIconSrc={customTypeImgSrc}
      setIcon={setTypeImg}
      setCustomIconSrc={setCustomTypeImgSrc}
      recommendedSize={42}
    >
      {pokemonTypes.map(pt => (
        <SelectorMenuItem key={pt.slug} value={pt.id}>
          <SelectorListItemIcon>
            <Image
              src={Routes.Assets.Icons.Type(baseSet.slug, pt.slug, true)}
              width={26}
              height={26}
              alt=""
            />
          </SelectorListItemIcon>
          <ListItemText primary={pt.displayName} />
        </SelectorMenuItem>
      ))}
    </CustomIconSelector>
  );
};

export default TypeImgSelector;
