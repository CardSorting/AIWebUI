import React from 'react';
import ThemeToggle from '@components/ThemeToggle';
import { Hidden, Link, Toolbar, Typography, Box, useTheme, AppBar } from '@mui/material';
import Routes from '@routes';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { InvisibleHeading } from './styles';

const Header: React.FC = () => {
  const { pathname } = useRouter();
  const theme = useTheme();

  return (
    <>
      {(pathname === Routes.Home || pathname === Routes.Creator) && (
        <InvisibleHeading>PlayMoreTCG</InvisibleHeading>
      )}
      <AppBar 
        position="sticky" 
        color="primary" 
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // Adjust for dark mode compatibility
          transition: theme.transitions.create(['background-color', 'box-shadow', 'color'], {
            duration: theme.transitions.duration.short,
          }),
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <NextLink href={Routes.Home} passHref>
              <Typography 
                variant="h1" 
                component={Link} 
                color="primary"
                sx={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  textDecoration: 'none',
                  '&:hover': {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                PlayMoreTCG
              </Typography>
            </NextLink>
          </Box>

          <Box display="flex" alignItems="center">
            <Hidden smDown>
              <DesktopHeader />
            </Hidden>
            <Box ml={2}>
              <ThemeToggle />
            </Box>
            <Hidden mdUp>
              <MobileHeader />
            </Hidden>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;