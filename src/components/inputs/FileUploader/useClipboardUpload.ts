// src/components/inputs/FileUploader/useClipboardUpload.ts

import { useCallback } from 'react';

export const useClipboardUpload = ({ upload, setErrorMessage }) => {
  const onClipboardUpload = useCallback(async () => {
    setErrorMessage(undefined);

    try {
      const permission = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
      if (permission.state === 'denied') {
        throw new Error('Permission to read your clipboard was denied');
      }

      const clipboardContents = await navigator.clipboard.read();
      const imageItem = clipboardContents.find(item => item.types.includes('image/png'));
      if (!imageItem) {
        throw new Error('Please copy an image to your clipboard to upload it');
      }

      const blob = await imageItem.getType('image/png');
      const file = new File([blob], 'Clipboard.png', { type: 'image/png' });
      upload({ currentTarget: { files: [file] } } as any);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }, [upload, setErrorMessage]);

  return { onClipboardUpload };
};