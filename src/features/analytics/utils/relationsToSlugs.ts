import { RelationsInterface } from '@cardEditor';

const relationsToSlugs = (relations: Omit<RelationsInterface, 'typeImgId'>) => {
  const slugs: Record<string, string | undefined> = {};
  Object.entries(relations).forEach(([key, value]) => {
    slugs[key] = value?.slug;
  });
  return slugs;
};

export default relationsToSlugs;
