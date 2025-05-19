// src/components/inputs/FileUploader/useClipboardUpload.ts

import { useCallback } from 'react';

interface UseClipboardUploadProps {
  upload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setErrorMessage: (message: string | undefined) => void;
}

export const useClipboardUpload = ({
  upload,
  setErrorMessage,
}: UseClipboardUploadProps) => {
  const onClipboardUpload = useCallback(() => {
    navigator.clipboard
      .read()
      .then(data => {
        for (const item of data) {
          if (
            item.types.includes('image/png') ||
            item.types.includes('image/jpeg')
          ) {
            item
              .getType('image/png')
              .then(blob => {
                const file = new File([blob], 'pasted-image.png', {
                  type: 'image/png',
                });
                const event = {
                  target: {
                    files: [file],
                  },
                } as unknown as React.ChangeEvent<HTMLInputElement>;
                upload(event);
              })
              .catch(() => {
                setErrorMessage('Failed to read the clipboard image.');
              });
          } else {
            setErrorMessage('Clipboard does not contain an image.');
          }
        }
      })
      .catch(() => {
        setErrorMessage('Failed to access the clipboard.');
      });
  }, [upload, setErrorMessage]);

  return { onClipboardUpload };
};
