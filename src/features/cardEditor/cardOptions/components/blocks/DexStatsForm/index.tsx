import { useCardLogic } from '@cardEditor/cardLogic';
import AccordionForm from '@components/AccordionForm';
import { FC } from 'react';
import DexStatsInput from './fields/DexStatsInput';

const DexStatsForm: FC = () => {
  const { hasDexStats } = useCardLogic(['hasDexStats']);
  if (!hasDexStats) return null;

  return (
    <AccordionForm slug="dexStatsForm" header="Pokédex Stats">
      <DexStatsInput />
    </AccordionForm>
  );
};

export default DexStatsForm;
