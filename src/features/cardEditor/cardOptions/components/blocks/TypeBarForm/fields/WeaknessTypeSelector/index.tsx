import { useWeaknessType } from '@cardEditor/cardOptions/type';
import { CardCreatorAnalyticsEvent } from '@features/analytics';
import { FC } from 'react';
import TypeBarTypeSelector from '../../components/TypeBarTypeSelector';

const WeaknessTypeSelector: FC = () => {
  const { weaknessType, setWeaknessType } = useWeaknessType();

  return (
    <TypeBarTypeSelector
      slug="weaknessType"
      displayName="Weakness Type"
      analyticsEvent={CardCreatorAnalyticsEvent.WeaknessTypeChange}
      type={weaknessType}
      setType={setWeaknessType}
    />
  );
};

export default WeaknessTypeSelector;
