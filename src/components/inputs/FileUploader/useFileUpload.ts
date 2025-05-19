// src/components/inputs/FileUploader/useFileUpload.ts

import { useState, useCallback } from 'react';
import { maxFileSize } from 'src/constants';

interface UseFileUploadProps {
  onChange: (name: string, data: string) => void;
  setErrorMessage: (message: string | undefined) => void;
  onSuccess?: (message: string) => void;
}

export const useFileUpload = ({
  onChange,
  setErrorMessage,
  onSuccess,
}: UseFileUploadProps) => {
  const [isLoading, setLoading] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const upload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setErrorMessage(undefined);
      const uploadedFiles = e.currentTarget.files;
      if (!uploadedFiles) return;

      const filesArray = Array.from(uploadedFiles);

      setLoading(true);

      for (const file of filesArray) {
        if (file.size > maxFileSize) {
          setErrorMessage(
            `Please upload a file smaller than 5 MB: ${file.name}`,
          );
          continue;
        }

        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            onChange(file.name, reader.result);
            setFileNames(prev => [...prev, file.name]);
            if (onSuccess) {
              onSuccess(`File uploaded successfully: ${file.name}`);
            }
          }
        };
        reader.onerror = () => {
          setErrorMessage(
            `An error occurred while reading the file: ${file.name}`,
          );
        };
        reader.readAsDataURL(file);
      }

      setLoading(false);
      e.currentTarget.value = '';
    },
    [onChange, setErrorMessage, onSuccess],
  );

  return { upload, isLoading, fileNames };
};
