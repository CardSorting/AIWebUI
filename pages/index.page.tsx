import { FC } from 'react';
import { SEO } from '@layout';
import { Box, Button, Typography, Grid, Paper, Divider } from '@mui/material';
import { siteDescription } from 'src/constants';
import { Forward as ForwardIcon, Brush as BrushIcon, AutoAwesome as AutoAwesomeIcon, Create as CreateIcon, ImageSearch as ImageSearchIcon, Palette as PaletteIcon } from '@mui/icons-material';
import Image from 'next/image';
import NextLink from 'next/link';
import Routes from '@routes';
import { useType } from '@cardEditor/cardOptions/type';
import banner from '@assets/images/banner.png';
import cardImgPaths from '@utils/cardImgPaths';
import { List, PaperBox, TypeList } from './styles';

const Home: FC = () => {
  const { pokemonTypes } = useType();

  return (
    <>
      <SEO
        fullTitle="Pokécardmaker.net | Create AI-powered custom Pokémon cards"
        description={`${siteDescription} with AI-generated artwork`}
      />
      <Box gap={4} display="flex" flexDirection="column">
        <PaperBox>
          <Box
            sx={theme => ({
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.shadows[1],
              overflow: 'hidden',
              width: '100%',
              marginBottom: theme.spacing(3),
            })}
          >
            <Image src={banner} layout="responsive" alt="Pokécardmaker.net banner" />
          </Box>
          <Typography variant="h1" textAlign="center" gutterBottom>
            Create Epic Pokémon Cards
          </Typography>
          <Typography variant="h4" textAlign="center" color="text.secondary" gutterBottom>
            Powered by AI, Designed by You
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} marginTop={4}>
            <NextLink href={Routes.AIImageGenerator} passHref>
              <Button variant="contained" startIcon={<BrushIcon />} size="large" color="primary">
                Generate AI Art
              </Button>
            </NextLink>
            <NextLink href={Routes.Creator} passHref>
              <Button variant="outlined" startIcon={<CreateIcon />} size="large">
                Design Your Card
              </Button>
            </NextLink>
          </Box>
        </PaperBox>

        <PaperBox>
          <Typography variant="h2" gutterBottom>
            <AutoAwesomeIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            AI-Powered Artwork Creation
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Transform your ideas into stunning Pokémon card art with our cutting-edge AI generator.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                    <ImageSearchIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Text-to-Image</Typography>
                    <Typography variant="body2">Describe your vision and watch it come to life in seconds.</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
                    <PaletteIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="h6" gutterBottom>Style Customization</Typography>
                    <Typography variant="body2">Adjust styles, colors, and compositions to match your preferences.</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Box mt={3}>
                <NextLink href={Routes.AIImageGenerator} passHref>
                  <Button variant="contained" endIcon={<ForwardIcon />} size="large" color="secondary" fullWidth>
                    Start Creating AI Art
                  </Button>
                </NextLink>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography variant="h6" gutterBottom>AI-Generated Image Examples</Typography>
                <Grid container spacing={2}>
                  {/* Replace these with actual AI-generated image examples */}
                  {[1, 2, 3, 4].map((item) => (
                    <Grid item xs={6} key={item}>
                      <Paper sx={{ height: 100, bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>Example {item}</Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </PaperBox>

        <Divider sx={{ my: 4 }} />

        <PaperBox>
          <Typography variant="h2" gutterBottom>
            <CreateIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Custom Card Designer
          </Typography>
          <Typography variant="body1" paragraph>
            Bring your Pokémon cards to life with our powerful card designer featuring {cardImgPaths.length} unique card types and styles.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>Energy Cards</Typography>
                <List sx={{ flexGrow: 1 }}>
                  <li>Base Energy</li>
                  <li>Special Energy</li>
                  <li>Prism Star variation</li>
                  <li>Golden Full Art rarity</li>
                </List>
                <NextLink href={Routes.Creator} passHref>
                  <Button variant="outlined" fullWidth>Create Energy Card</Button>
                </NextLink>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>Trainer Cards</Typography>
                <List sx={{ flexGrow: 1 }}>
                  <li>Supporter</li>
                  <li>Tag Team Supporter</li>
                  <li>Item</li>
                  <li>Tool Item</li>
                  <li>Full Art rarity</li>
                </List>
                <NextLink href={Routes.Creator} passHref>
                  <Button variant="outlined" fullWidth>Create Trainer Card</Button>
                </NextLink>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h4" gutterBottom>Pokémon Cards</Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Available in {pokemonTypes.length} different types
                </Typography>
                <TypeList sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '200px' }}>
                  {pokemonTypes.map(pt => (
                    <Box key={pt.slug} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Image
                        alt={pt.displayName}
                        height={20}
                        width={20}
                        src={Routes.Assets.Icons.Type('swordAndShield', pt.slug)}
                      />
                      <Typography variant="body2" sx={{ ml: 1 }}>{pt.displayName}</Typography>
                    </Box>
                  ))}
                </TypeList>
                <NextLink href={Routes.Creator} passHref>
                  <Button variant="outlined" fullWidth>Create Pokémon Card</Button>
                </NextLink>
              </Paper>
            </Grid>
          </Grid>
        </PaperBox>

        <PaperBox>
          <Typography variant="h2" textAlign="center" gutterBottom>
            Ready to Create Your Own Pokémon Card?
          </Typography>
          <Typography variant="body1" textAlign="center" paragraph>
            Start your journey now and bring your unique Pokémon card ideas to life with AI-generated artwork and our powerful card designer.
          </Typography>
          <Box display="flex" justifyContent="center" gap={2} mt={4}>
            <NextLink href={Routes.AIImageGenerator} passHref>
              <Button variant="contained" endIcon={<BrushIcon />} size="large" color="primary">
                Generate AI Art
              </Button>
            </NextLink>
            <NextLink href={Routes.Creator} passHref>
              <Button variant="contained" endIcon={<CreateIcon />} size="large">
                Design Your Card
              </Button>
            </NextLink>
          </Box>
        </PaperBox>
      </Box>
    </>
  );
};

export default Home;