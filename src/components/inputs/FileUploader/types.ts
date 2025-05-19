// src/components/inputs/FileUploader/types.ts

import { PropsWithChildren, ReactNode } from 'react';
import { TooltipProps } from '../Tooltip/types';

export interface FileUploaderProps {
  slug: string;
  label: string;
  onChange: (name: string, url: string, metadata: any) => void;
  file?: string;
  tooltipProps?: PropsWithChildren<TooltipProps>;
  buttonText?: ReactNode;
}
