// src/components/inputs/FileUploader/index.tsx

import React, { FC, useState, useCallback } from 'react';
import {
  Button,
  FormControl,
  FormHelperText,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  ContentPasteSearch as ClipboardIcon,
  UploadFile as UploadFileIcon,
} from '@mui/icons-material';
import Label from '../Label';
import { ButtonLabel } from './styles';
import { FileUploaderProps } from './types';
import { useFileUpload } from './useFileUpload';
import { useClipboardUpload } from './useClipboardUpload';

const FileUploader: FC<FileUploaderProps> = ({
  slug,
  label,
  buttonText,
  onChange,
  file,
  tooltipProps,
}) => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const handleSuccess = useCallback((message: string) => {
    setSuccessMessage(message);
  }, []);

  const handleChange = useCallback((name: string, url: string, metadata: any) => {
    onChange(name, url, metadata);
  }, [onChange]);

  const { upload, isLoading, fileName } = useFileUpload({
    onChange: handleChange,
    setErrorMessage,
    onSuccess: handleSuccess,
  });

  const { onClipboardUpload } = useClipboardUpload({
    upload,
    setErrorMessage,
  });

  const handleSnackbarClose = () => {
    setSuccessMessage(undefined);
  };

  return (
    <FormControl error={!!errorMessage}>
      <Label slug={slug} tooltipProps={tooltipProps}>
        {label}
      </Label>
      <Box display="flex" gap={0.5}>
        <Button
          sx={theme => ({
            borderColor: theme.custom.inputBorderColor,
            textTransform: 'none',
            flexGrow: 1,
          })}
          variant="outlined"
          color="inherit"
          component="label"
          startIcon={isLoading ? <CircularProgress color="inherit" size={20} /> : <UploadFileIcon />}
        >
          <ButtonLabel>{buttonText || (fileName ?? <>&nbsp;</>)}</ButtonLabel>
          <input
            id={`${slug}-input`}
            accept="image/*"
            type="file"
            hidden
            onChange={upload}
          />
        </Button>
        <Button
          title="Paste image from clipboard"
          onClick={onClipboardUpload}
          variant="outlined"
          color="inherit"
          sx={theme => ({
            borderColor: theme.custom.inputBorderColor,
            px: 2.5,
            minWidth: 0,
          })}
        >
          <ClipboardIcon fontSize="small" />
        </Button>
      </Box>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </FormControl>
  );
};

export default FileUploader;