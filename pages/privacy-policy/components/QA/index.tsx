import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';
import { QAProps } from './types';

const QA: FC<QAProps> = ({ q, a }) => (
  <Box>
    <Typography fontWeight="bold">{q}</Typography>
    {typeof a === 'string' ? <Typography>{a}</Typography> : a}
  </Box>
);

export default QA;
