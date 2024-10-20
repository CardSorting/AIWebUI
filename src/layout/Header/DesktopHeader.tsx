import { Forward as ForwardIcon, Brush as BrushIcon } from '@mui/icons-material';
import { Button, Link, Box, useTheme } from '@mui/material';
import Routes from '@routes';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { NavItems } from './styles';

const DesktopHeader: FC = () => {
  const { pathname } = useRouter();
  const theme = useTheme();

  if (pathname === Routes.Creator || pathname === Routes.ImageUploadAndOrder) return null;

  const buttonStyle = {
    mx: 1,
    px: 2,
    py: 1,
    borderRadius: '20px',
    transition: 'all 0.3s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: theme.shadows[4],
    },
  };

  return (
    <Box display="flex" alignItems="center">
      <NavItems>
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
            Get Started Now
          </Button>
        </NextLink>
        <NextLink href={Routes.ImageUploadAndOrder} passHref>
          <Button
            component={Link}
            variant="outlined"
            endIcon={<BrushIcon />}
            sx={{
              ...buttonStyle,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.background.paper,
              '&:hover': {
                ...buttonStyle['&:hover'],
                borderColor: theme.palette.secondary.main,
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.background.default,
              },
            }}
          >
            Create Custom Card
          </Button>
        </NextLink>
      </NavItems>
    </Box>
  );
};

export default DesktopHeader;