import { CardInterface } from '@cardEditor/types';

const isCardInterface = <T>(t: T | Object): t is CardInterface => {
  const card = t as CardInterface;
  return !!(card.baseSetId && card.supertypeId && card.typeId);
};

export default isCardInterface;
