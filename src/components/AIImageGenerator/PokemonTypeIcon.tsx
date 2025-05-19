// src/components/PokemonTypeIcon.tsx

import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import { SvgIconComponent } from '@mui/icons-material';

interface PokemonTypeIconProps {
  type: string;
  Icon: SvgIconComponent;
  prompt: string;
  onSelect: (prompt: string) => void;
}

const PokemonTypeIcon: React.FC<PokemonTypeIconProps> = ({
  type,
  Icon,
  prompt,
  onSelect,
}) => {
  const handleClick = () => {
    onSelect(prompt);
  };

  return (
    <Tooltip title={type} arrow>
      <span>
        {/* The span wrapper ensures Tooltip works correctly even if IconButton is disabled */}
        <IconButton
          onClick={handleClick}
          aria-label={`Select ${type} type prompt`}
        >
          <Icon fontSize="large" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default PokemonTypeIcon;
