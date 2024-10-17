// src/components/EmbedGrid/EmbedGridModal.tsx

import React from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmbedGrid from './EmbedGrid';

interface EmbedData {
  imageUrl: string | null;
  fullResult: any;
}

interface EmbedGridModalProps {
  open: boolean;
  onClose: () => void;
  embeds: EmbedData[];
  itemsPerPage: number;
}

const EmbedGridModal: React.FC<EmbedGridModalProps> = ({ open, onClose, embeds, itemsPerPage }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Generated Images
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <EmbedGrid embeds={embeds} itemsPerPage={itemsPerPage} />
      </DialogContent>
    </Dialog>
  );
};

export default EmbedGridModal;