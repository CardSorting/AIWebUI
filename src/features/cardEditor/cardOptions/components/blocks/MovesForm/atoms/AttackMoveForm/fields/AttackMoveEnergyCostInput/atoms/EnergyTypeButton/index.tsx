import { IconButton } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { TypeContainer } from '../../components/EnergyCostAddField/styles';

interface EnergyTypeButtonProps {
  small?: boolean;
  label: string;
  title: string;
  onClick: () => void;
}

const EnergyTypeButton: FC<EnergyTypeButtonProps> = ({
  label,
  title,
  small,
  onClick,
  children,
}) => (
  <Box display="flex" flexDirection="column" width={30} alignItems="center">
    <IconButton
      size="small"
      aria-label={label}
      title={title}
      onClick={onClick}
      sx={small ? { p: 0 } : undefined}
    >
      <TypeContainer>{children}</TypeContainer>
    </IconButton>
  </Box>
);

export default EnergyTypeButton;
