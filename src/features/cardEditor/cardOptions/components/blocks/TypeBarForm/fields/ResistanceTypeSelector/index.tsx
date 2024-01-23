import { useResistanceType } from '@cardEditor/cardOptions/type';
import { CardCreatorAnalyticsEvent } from '@features/analytics';
import { FC } from 'react';
import TypeBarTypeSelector from '../../components/TypeBarTypeSelector';

const ResistanceTypeSelector: FC = () => {
  const { resistanceType, setResistanceType } = useResistanceType();

  return (
    <TypeBarTypeSelector
      slug="resistanceType"
      displayName="Resistance Type"
      analyticsEvent={CardCreatorAnalyticsEvent.ResistanceTypeChange}
      type={resistanceType}
      setType={setResistanceType}
    />
  );
};

export default ResistanceTypeSelector;
