import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import {
  useTheme,
  useMediaQuery,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import {
  Forward as ForwardIcon,
  Menu as MenuIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import Routes from '@routes';
import { NavItems } from './styles';

const DesktopHeader: FC = () => {
  const { pathname } = useRouter();
  const { user, isLoading } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  if (pathname === Routes.Creator || pathname === Routes.ImageUploadAndOrder)
    return null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Unified button style for consistency
  const buttonStyle = {
    mx: { xs: 0, sm: 1 },
    my: { xs: 1, sm: 0 },
    px: { xs: 1, sm: 2 },
    py: 1,
    borderRadius: '20px',
    transition: 'all 0.3s ease-in-out',
    fontSize: { xs: '0.75rem', sm: '0.875rem' },
    textTransform: 'none',
    fontWeight: 500,
    width: { xs: '100%', sm: 'auto' },
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
  };

  const navContent = (
    <>
      <NextLink href={Routes.Creator} passHref>
        <Button
          component={Link}
          variant="contained"
          color="secondary"
          endIcon={<ForwardIcon />}
          sx={{
            ...buttonStyle,
            background: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Get Started
          </Box>
          <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
            Start
          </Box>
        </Button>
      </NextLink>
      {isLoading ? (
        <Button disabled sx={buttonStyle}>
          Loading...
        </Button>
      ) : user ? (
        <Button
          href="/api/auth/logout"
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          sx={buttonStyle}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Logout
          </Box>
        </Button>
      ) : (
        <Button
          href="/api/auth/login"
          variant="outlined"
          color="primary"
          startIcon={<LoginIcon />}
          sx={buttonStyle}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Login
          </Box>
        </Button>
      )}
    </>
  );

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-end"
      sx={{
        padding: { xs: '10px 0', sm: '20px 0' },
        width: '100%',
      }}
    >
      {isMobile ? (
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={handleClose}
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              {navContent}
            </MenuItem>
          </Menu>
        </>
      ) : (
        <NavItems sx={{ display: 'flex', gap: 2 }}>{navContent}</NavItems>
      )}
    </Box>
  );
};

export default DesktopHeader;
