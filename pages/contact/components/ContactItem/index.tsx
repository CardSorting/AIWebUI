import { Box } from '@mui/system';
import { FC } from 'react';

const ContactItem: FC = ({ children }) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    gap={1}
    width={['100%', undefined, '50%']}
    mb={2}
  >
    {children}
  </Box>
);

export default ContactItem;
