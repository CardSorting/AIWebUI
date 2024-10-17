// src/components/inputs/FileUploader/useFileUpload.ts

import { useState, useCallback } from 'react';
import { maxFileSize } from 'src/constants';

interface UseFileUploadProps {
  onChange: (name: string, data: string) => void;
  setErrorMessage: (message: string | undefined) => void;
  onSuccess?: (message: string) => void;
}

export const useFileUpload = ({ onChange, setErrorMessage, onSuccess }: UseFileUploadProps) => {
  const [isLoading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string>();

  const upload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(undefined);
    const uploadedFile = e.currentTarget.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.size > maxFileSize) {
      setErrorMessage('Please upload a file smaller than 5 MB');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      setLoading(false);
      if (typeof reader.result === 'string') {
        onChange(uploadedFile.name, reader.result);
        setFileName(uploadedFile.name);
        if (onSuccess) {
          onSuccess('File uploaded successfully');
        }
      }
    };
    reader.onerror = () => {
      setLoading(false);
      setErrorMessage('An error occurred while reading the file. Please try again.');
    };
    reader.readAsDataURL(uploadedFile);
    e.currentTarget.value = '';
  }, [onChange, setErrorMessage, onSuccess]);

  return { upload, isLoading, fileName };
};