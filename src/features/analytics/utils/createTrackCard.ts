import { useCardOptionsStore } from '@cardEditor/cardOptions';
import relationsToSlugs from './relationsToSlugs';

const createTrackCard = () => {
  const {
    state: {
      retreatCost,
      customRotationIconImgSrc,
      customSetIconImgSrc,
      customRarityIconImgSrc,
    },
    relations: { typeImg: _, ...relations },
  } = useCardOptionsStore.getState();

  const relationSlugs = relationsToSlugs(relations);

  return {
    retreatCost,
    ...relationsToSlugs(relations),
    rarityIcon: customRarityIconImgSrc ? 'custom' : relationSlugs.rarityIcon,
    rotationIcon: customRotationIconImgSrc
      ? 'custom'
      : relationSlugs.rotationIcon,
    setIcon: customSetIconImgSrc ? 'custom' : relationSlugs.setIcon,
  };
};

export default createTrackCard;
