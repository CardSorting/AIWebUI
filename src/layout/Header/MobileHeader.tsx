import { FC, useState } from 'react';
import HamburgerIcon from '@mui/icons-material/Menu';
import { Forward as ForwardIcon, Brush as BrushIcon, Home as HomeIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  List,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
  Typography,
  ListItemIcon,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { HamburgerFab } from './styles';
import Routes from '@routes';

const MobileHeader: FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const theme = useTheme();

  const listItemStyle = {
    borderRadius: '10px',
    my: 1,
    mx: 2,
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      transform: 'translateX(5px)',
    },
  };

  return (
    <>
      <HamburgerFab 
        color="primary" 
        onClick={() => setMenuOpen(true)}
        sx={{
          boxShadow: theme.shadows[4],
          '&:hover': {
            backgroundColor: theme.palette.primary.dark,
          },
        }}
      >
        <HamburgerIcon />
      </HamburgerFab>
      <SwipeableDrawer
        anchor="top"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpen={() => setMenuOpen(true)}
        PaperProps={{
          sx: {
            backgroundColor: theme.palette.background.default,
            boxShadow: theme.shadows[5],
          },
        }}
      >
        <Box
          component="nav"
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={() => setMenuOpen(false)}
          onKeyDown={() => setMenuOpen(false)}
        >
          <Box component={Link} textTransform="uppercase" href="/">
            <AppBar position="relative" color="primary" enableColorOnDark elevation={0}>
              <Box px={2} py={1}>
                <Typography variant="h4" fontWeight="bold">
                  PlayMoreTCG
                </Typography>
              </Box>
            </AppBar>
          </Box>
          <List sx={{ py: 2 }}>
            <Link href={Routes.Home} passHref>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon>
                  <HomeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Homepage" primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </Link>
            <Link href={Routes.Creator} passHref>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon>
                  <ForwardIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Get Started Now" primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </Link>
            <Link href={Routes.ImageUploadAndOrder} passHref>
              <ListItemButton sx={listItemStyle}>
                <ListItemIcon>
                  <BrushIcon color="action" />
                </ListItemIcon>
                <ListItemText primary="Create Custom Card" primaryTypographyProps={{ fontWeight: 'medium' }} />
              </ListItemButton>
            </Link>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default MobileHeader;