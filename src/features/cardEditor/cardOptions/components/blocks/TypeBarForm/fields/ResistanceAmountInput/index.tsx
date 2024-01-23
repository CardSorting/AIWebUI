import { FC } from 'react';
import NumberInput from '@components/inputs/NumberInput';
import { ButtonGroup, InputAdornment } from '@mui/material';
import { useCardOptions } from '@cardEditor/cardOptions';
import DamageModifierButton from '@cardEditor/cardOptions/components/atoms/DamageModifierButton';

const ResistanceAmountInput: FC = () => {
  const { resistanceTypeId, resistanceAmount, resistanceModifier, setState } =
    useCardOptions([
      'resistanceTypeId',
      'resistanceModifier',
      'resistanceAmount',
    ]);

  if (!resistanceTypeId) return null;

  return (
    <NumberInput
      slug="resistanceAmount"
      label="Resistance Amount"
      value={resistanceAmount}
      onChange={value => setState({ resistanceAmount: value })}
      max={99}
      min={1}
      InputProps={{ sx: { pl: 0 } }}
      startAdornment={
        <InputAdornment position="start">
          <ButtonGroup disableElevation>
            <DamageModifierButton
              isActive={resistanceModifier === '×'}
              onChange={() =>
                setState({
                  resistanceModifier: '×',
                })
              }
            >
              ×
            </DamageModifierButton>
            <DamageModifierButton
              isActive={resistanceModifier === '+'}
              onChange={() =>
                setState({
                  resistanceModifier: '+',
                })
              }
              noBorderRadius
            >
              +
            </DamageModifierButton>
            <DamageModifierButton
              isActive={resistanceModifier === '-'}
              onChange={() =>
                setState({
                  resistanceModifier: '-',
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

export default ResistanceAmountInput;
