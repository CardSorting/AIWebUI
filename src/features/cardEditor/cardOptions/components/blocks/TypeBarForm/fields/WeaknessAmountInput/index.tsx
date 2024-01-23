import { FC } from 'react';
import NumberInput from '@components/inputs/NumberInput';
import { ButtonGroup, InputAdornment } from '@mui/material';
import { useCardOptions } from '@cardEditor/cardOptions';
import DamageModifierButton from '@cardEditor/cardOptions/components/atoms/DamageModifierButton';

const WeaknessAmountInput: FC = () => {
  const { weaknessTypeId, weaknessModifier, weaknessAmount, setState } =
    useCardOptions(['weaknessTypeId', 'weaknessModifier', 'weaknessAmount']);

  if (!weaknessTypeId) return null;

  return (
    <NumberInput
      slug="weaknessAmount"
      label="Weakness Amount"
      value={weaknessAmount}
      onChange={value => setState({ weaknessAmount: value })}
      max={99}
      min={1}
      InputProps={{ sx: { pl: 0 } }}
      startAdornment={
        <InputAdornment position="start">
          <ButtonGroup disableElevation>
            <DamageModifierButton
              isActive={weaknessModifier === '×'}
              onChange={() =>
                setState({
                  weaknessModifier: '×',
                })
              }
            >
              ×
            </DamageModifierButton>
            <DamageModifierButton
              isActive={weaknessModifier === '+'}
              onChange={() =>
                setState({
                  weaknessModifier: '+',
                })
              }
              noBorderRadius
            >
              +
            </DamageModifierButton>
            <DamageModifierButton
              isActive={weaknessModifier === '-'}
              onChange={() =>
                setState({
                  weaknessModifier: '-',
                })
              }
              noBorderRadius
              borderRight
            >
              -
            </DamageModifierButton>
          </ButtonGroup>
        </InputAdornment>
      }
    />
  );
};

export default WeaknessAmountInput;
