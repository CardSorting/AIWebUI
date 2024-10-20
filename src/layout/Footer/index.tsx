import { GitHub as GitHubIcon } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import FooterDivider from './components/FooterDivider';
import { FC } from 'react';

const Footer: FC = () => (
  <Paper
    component="footer"
    sx={{
      p: [8, undefined, 1],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: [2, undefined, 0],
      flexWrap: 'wrap',
      borderRadius: 0,
      flexDirection: ['column', undefined, 'row'],
    }}
  >
    <Typography variant="h6" align="center">
      © {new Date().getFullYear()} PlayMoreTCG
    </Typography>
    <Box ml={2.5} mr={1} py={1} display={['none', undefined, 'block']}>
      <FooterDivider />
    </Box>
    {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' && (
      <>
        <Box mx={2.5} py={1} display={['none', undefined, 'block']}>
          <FooterDivider />
        </Box>
        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {process.env.NEXT_PUBLIC_ENVIRONMENT}
        </Typography>
      </>
    )}
  </Paper>
);

export default Footer;