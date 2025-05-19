// src/components/inputs/FileUploader/AIImageDialog.tsx

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface AIImageDialogProps {
  open: boolean;
  onClose: () => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const AIImageDialog: React.FC<AIImageDialogProps> = ({
  open,
  onClose,
  aiPrompt,
  setAiPrompt,
  onGenerate,
  isGenerating,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Generate AI Image</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        id="ai-prompt"
        label="Image Description"
        type="text"
        fullWidth
        variant="outlined"
        value={aiPrompt}
        onChange={e => setAiPrompt(e.target.value)}
        multiline
        rows={4}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onGenerate} disabled={isGenerating || !aiPrompt.trim()}>
        {isGenerating ? 'Generating...' : 'Generate'}
      </Button>
    </DialogActions>
  </Dialog>
);

export default AIImageDialog;
