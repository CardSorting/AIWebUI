import { useCardOptions } from '@cardEditor/cardOptions';
import { useCardStyles } from '@cardEditor/cardStyles/hooks';
import { FC, memo } from 'react';
import { ModifierText, TypeText } from '../../styles';
import { Wrapper } from './styles';

const ResistanceAmount: FC = () => {
  const { resistanceAmount, resistanceModifier } = useCardOptions([
    'resistanceAmount',
    'resistanceModifier',
  ]);
  const { typeBarTextColor, typeBarOutline } = useCardStyles([
    'typeBarTextColor',
    'typeBarOutline',
  ]);

  return (
    <Wrapper textColor={typeBarTextColor} textOutline={typeBarOutline}>
      <ModifierText $modifier={resistanceModifier}>
        {resistanceModifier}
      </ModifierText>
      <TypeText>{resistanceAmount}</TypeText>
    </Wrapper>
  );
};

export default memo(ResistanceAmount);
