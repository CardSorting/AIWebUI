import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { Wrapper } from './styles';
import { ModifierText, TypeText } from '../../styles';

const WeaknessAmount: FC = () => {
  const { weaknessAmount, weaknessModifier } = useCardOptions([
    'weaknessAmount',
    'weaknessModifier',
  ]);
  const { typeBarTextColor, typeBarOutline } = useCardStyles([
    'typeBarTextColor',
    'typeBarOutline',
  ]);

  return (
    <Wrapper textColor={typeBarTextColor} textOutline={typeBarOutline}>
      <ModifierText $modifier={weaknessModifier}>
        {weaknessModifier}
      </ModifierText>
      <TypeText>{weaknessAmount}</TypeText>
    </Wrapper>
  );
};

export default memo(WeaknessAmount);
