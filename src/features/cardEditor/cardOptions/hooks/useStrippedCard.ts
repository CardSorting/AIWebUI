import { useCardLogicStore } from '@cardEditor/cardLogic';
import { CardInterface } from '@cardEditor/types';
import { useMemo } from 'react';

/**
 * Removes all useless/unused properties on a card based on CardLogic
 * Example: The property `move1` is never used when `supertype` is `trainer`
 */
const useStrippedCard = (card: CardInterface): CardInterface => {
  const cardLogic = useCardLogicStore(store => store.state);

  const strippedCard = useMemo(() => {
    const clone = { ...card };
    if (!cardLogic.hasHitpoints) {
      delete clone.hitpoints;
    }
    if (!cardLogic.hasMoves) {
      delete clone.moves;
    }
    if (!cardLogic.hasSpecialMove && !!clone.moves?.length) {
      clone.moves = clone.moves.map(move => ({ ...move, type: 'default' }));
    }
    if (!cardLogic.hasSubtypes) {
      delete clone.subtypeId;
    }
    if (!cardLogic.hasSubname) {
      delete clone.subname;
    }
    if (!cardLogic.hasTypeImage) {
      delete clone.typeImgId;
      delete clone.typeImgAmount;
      delete clone.customTypeImgSrc;
    }
    if (!cardLogic.hasDescription) {
      delete clone.description;
    }
    if (!cardLogic.hasName) {
      delete clone.name;
    }
    if (!cardLogic.hasVariations) {
      delete clone.variationId;
    }
    if (!cardLogic.hasPrevolveImg) {
      delete clone.prevolveImgSrc;
    }
    if (!cardLogic.hasPrevolveName) {
      delete clone.prevolveName;
    }
    if (!cardLogic.hasDexStats) {
      delete clone.dexStats;
    }
    if (!cardLogic.hasCardInfo) {
      delete clone.setIconId;
      delete clone.customSetIconImgSrc;
      delete clone.rotationIconId;
      delete clone.customRotationIconImgSrc;
      delete clone.cardNumber;
      delete clone.totalInSet;
      delete clone.rarityIconId;
      delete clone.customRarityIconImgSrc;
    }
    if (!cardLogic.hasIllustratorName) {
      delete clone.illustrator;
    }
    if (!cardLogic.hasDexEntry) {
      delete clone.dexEntry;
    }
    if (!cardLogic.hasRotationIcon) {
      delete clone.rotationIconId;
      delete clone.customRotationIconImgSrc;
    }
    if (!cardLogic.hasBadgeIcon) {
      delete clone.badgeIconId;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const legacyCard = clone as any;
    if (
      legacyCard.move1 ||
      legacyCard.move2 ||
      legacyCard.move3 ||
      legacyCard.ability
    ) {
      delete legacyCard.move1;
      delete legacyCard.move2;
      delete legacyCard.move3;
      delete legacyCard.ability;
    }

    return clone;
  }, [card, cardLogic]);

  return strippedCard;
};

export default useStrippedCard;
