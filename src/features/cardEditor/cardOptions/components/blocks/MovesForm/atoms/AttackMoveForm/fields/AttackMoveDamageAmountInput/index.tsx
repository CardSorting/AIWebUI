import { ButtonGroup, InputAdornment } from '@mui/material';
import { FC } from 'react';
import TextInput from '@components/inputs/TextInput';
import DamageModifierButton from '@cardEditor/cardOptions/components/atoms/DamageModifierButton';
import { AttackMoveFieldProps } from '../../types';

const AttackMoveDamageAmountInput: FC<AttackMoveFieldProps> = ({
  slug,
  move,
  setMove,
}) => (
  <TextInput
    slug={`${slug}DamageAmount`}
    label="Damage"
    value={move.damageAmount}
    inputProps={{
      inputMode: 'numeric',
      pattern: '[0-9]*',
    }}
    endAdornment={
      <InputAdornment position="end">
        <ButtonGroup disableElevation>
          <DamageModifierButton
            isActive={move.damageModifier === '×'}
            onChange={active =>
              setMove({
                ...move,
                damageModifier: active ? '×' : undefined,
              })
            }
            noBorderRadius
          >
            ×
          </DamageModifierButton>
          <DamageModifierButton
            isActive={move.damageModifier === '+'}
            onChange={active =>
              setMove({
                ...move,
                damageModifier: active ? '+' : undefined,
              })
            }
            noBorderRadius
          >
            +
          </DamageModifierButton>
          <DamageModifierButton
            isActive={move.damageModifier === '-'}
            onChange={active =>
              setMove({
                ...move,
                damageModifier: active ? '-' : undefined,
              })
            }
          >
            -
          </DamageModifierButton>
        </ButtonGroup>
      </InputAdornment>
    }
    onChange={damageAmount =>
      setMove({
        ...move,
        damageAmount,
      })
    }
  />
);

export default AttackMoveDamageAmountInput;
