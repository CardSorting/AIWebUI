import { FC } from 'react';
import { SEO } from '@layout';
import {
  Box,
  Button,
  Typography,
  Grid,
  Paper,
  Divider,
  Container,
  useTheme,
} from '@mui/material';
import { siteDescription } from 'src/constants';
import {
  Brush as BrushIcon,
  Create as CreateIcon,
  AutoAwesome as AutoAwesomeIcon,
  ImageSearch as ImageSearchIcon,
  Palette as PaletteIcon,
  EmojiEvents as EmojiEventsIcon,
} from '@mui/icons-material';
import Image from 'next/image';
import NextLink from 'next/link';
import Routes from '@routes';
import { useType } from '@cardEditor/cardOptions/type';
import banner from '@assets/images/banner.png';
import cardImgPaths from '@utils/cardImgPaths';

const Home: FC = () => {
  const { pokemonTypes } = useType();
  const theme = useTheme();

  const sectionStyle = {
    p: 4,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 2,
    boxShadow: 3,
  };

  const featureBoxStyle = {
    p: 3,
    bgcolor: theme.palette.background.default,
    borderRadius: 2,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const iconStyle = {
    fontSize: 48,
    mb: 2,
    color: theme.palette.primary.main,
  };

  return (
    <>
      <SEO
        fullTitle="PlayMoreTCG | Create AI-powered custom Pokémon cards"
        description={`${siteDescription} with AI-generated artwork`}
      />
      <Container maxWidth="lg">
        <Box sx={{ py: 6 }}>
          <Paper
            elevation={3}
            sx={{ overflow: 'hidden', mb: 6, borderRadius: 2 }}
          >
            <Image
              src={banner}
              layout="responsive"
              alt="DreamBees.art banner"
            />
          </Paper>

          <Typography
            variant="h1"
            align="center"
            gutterBottom
            sx={{ fontSize: '3rem', fontWeight: 'bold' }}
          >
            Create Epic Pokémon Cards
          </Typography>
          <Typography
            variant="h4"
            align="center"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 6 }}
          >
            Powered by AI, Designed by You
          </Typography>

          <Box display="flex" justifyContent="center" gap={3} mb={8}>
            <NextLink href={Routes.AIImageGenerator} passHref>
              <Button
                variant="contained"
                startIcon={<BrushIcon />}
                size="large"
                color="primary"
                sx={{ px: 4, py: 1.5 }}
              >
                Generate AI Art
              </Button>
            </NextLink>
            <NextLink href={Routes.Creator} passHref>
              <Button
                variant="outlined"
                startIcon={<CreateIcon />}
                size="large"
                sx={{ px: 4, py: 1.5 }}
              >
                Design Your Card
              </Button>
            </NextLink>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper sx={sectionStyle}>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '2.5rem',
                  }}
                >
                  <AutoAwesomeIcon
                    sx={{ mr: 2, color: theme.palette.primary.main }}
                  />
                  AI-Powered Artwork
                </Typography>
                <Typography variant="body1" paragraph>
                  Transform your ideas into stunning Pokémon card art with our
                  cutting-edge AI generator.
                </Typography>
                <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={featureBoxStyle}>
                      <ImageSearchIcon sx={iconStyle} />
                      <Typography variant="h6" gutterBottom>
                        Text-to-Image
                      </Typography>
                      <Typography variant="body2">
                        Describe your vision and watch it come to life in
                        seconds.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box sx={featureBoxStyle}>
                      <PaletteIcon sx={iconStyle} />
                      <Typography variant="h6" gutterBottom>
                        Style Customization
                      </Typography>
                      <Typography variant="body2">
                        Adjust styles, colors, and compositions to match your
                        preferences.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={4}>
                  <NextLink href={Routes.AIImageGenerator} passHref>
                    <Button
                      variant="contained"
                      endIcon={<BrushIcon />}
                      size="large"
                      color="secondary"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Start Creating AI Art
                    </Button>
                  </NextLink>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={sectionStyle}>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '2.5rem',
                  }}
                >
                  <CreateIcon
                    sx={{ mr: 2, color: theme.palette.primary.main }}
                  />
                  Custom Card Designer
                </Typography>
                <Typography variant="body1" paragraph>
                  Bring your Pokémon cards to life with our powerful card
                  designer featuring {cardImgPaths.length} unique card types and
                  styles.
                </Typography>
                <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                  <Grid item xs={12} sm={4}>
                    <Box sx={featureBoxStyle}>
                      <EmojiEventsIcon sx={iconStyle} />
                      <Typography variant="h6" gutterBottom>
                        Energy Cards
                      </Typography>
                      <Typography variant="body2">
                        Create base, special, and prism star energy cards.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={featureBoxStyle}>
                      <AutoAwesomeIcon sx={iconStyle} />
                      <Typography variant="h6" gutterBottom>
                        Trainer Cards
                      </Typography>
                      <Typography variant="body2">
                        Design supporter, item, and tool cards with various
                        styles.
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={featureBoxStyle}>
                      <PaletteIcon sx={iconStyle} />
                      <Typography variant="h6" gutterBottom>
                        Pokémon Cards
                      </Typography>
                      <Typography variant="body2">
                        Create cards for all {pokemonTypes.length} Pokémon
                        types.
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box mt={4}>
                  <NextLink href={Routes.Creator} passHref>
                    <Button
                      variant="contained"
                      endIcon={<CreateIcon />}
                      size="large"
                      color="secondary"
                      fullWidth
                      sx={{ py: 1.5 }}
                    >
                      Start Designing Cards
                    </Button>
                  </NextLink>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <Divider sx={{ my: 8 }} />

          <Box textAlign="center">
            <Typography variant="h2" gutterBottom sx={{ fontSize: '2.5rem' }}>
              Ready to Create Your Own Pokémon Card?
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 4 }}>
              Start your journey now and bring your unique Pokémon card ideas to
              life with AI-generated artwork and our powerful card designer.
            </Typography>
            <Box display="flex" justifyContent="center" gap={3}>
              <NextLink href={Routes.AIImageGenerator} passHref>
                <Button
                  variant="contained"
                  endIcon={<BrushIcon />}
                  size="large"
                  color="primary"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Generate AI Art
                </Button>
              </NextLink>
              <NextLink href={Routes.Creator} passHref>
                <Button
                  variant="contained"
                  endIcon={<CreateIcon />}
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Design Your Card
                </Button>
              </NextLink>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Home;
