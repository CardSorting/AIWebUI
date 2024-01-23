import { Button } from '@mui/material';
import { FC } from 'react';
import { DamageModifierButtonProps } from './types';

const DamageModifierButton: FC<DamageModifierButtonProps> = ({
  isActive,
  onChange,
  noBorderRadius,
  borderRight,
  children,
}) => (
  <Button
    sx={theme => ({
      fontSize: '0.9rem',
      borderColor: 'transparent',
      borderLeftColor: theme.custom.inputBorderColor,
      borderRightColor: borderRight
        ? `${theme.custom.inputBorderColor} !important`
        : undefined,
      color: isActive
        ? theme.palette.primary.contrastText
        : theme.palette.text.primary,
      borderRadius: noBorderRadius ? 0 : undefined,
    })}
    variant={isActive ? 'contained' : 'outlined'}
    onClick={() => onChange(!isActive)}
  >
    {children}
  </Button>
);

export default DamageModifierButton;
