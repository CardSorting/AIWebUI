import React, { useEffect, useState, useCallback } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import OpacityIcon from '@mui/icons-material/Opacity';
import NatureIcon from '@mui/icons-material/Nature';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import NightlightIcon from '@mui/icons-material/Nightlight';
import StarIcon from '@mui/icons-material/Star';
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import TerrainIcon from '@mui/icons-material/Terrain';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import BugReportIcon from '@mui/icons-material/BugReport';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PetsIcon from '@mui/icons-material/Pets';
import BlurOnIcon from '@mui/icons-material/BlurOn';

interface PromptType {
  type: string;
  prompts: string[];
}

interface ExamplePromptsProps {
  onSelectExample: (prompt: string) => void;
}

const typeToIconMap: { [key: string]: React.ElementType } = {
  Fire: WhatshotIcon,
  Water: OpacityIcon,
  Grass: NatureIcon,
  Electric: FlashOnIcon,
  Psychic: PsychologyIcon,
  Ice: AcUnitIcon,
  Dark: NightlightIcon,
  Fairy: StarIcon,
  Fighting: SportsMartialArtsIcon,
  Ground: TerrainIcon,
  Rock: FitnessCenterIcon,
  Bug: BugReportIcon,
  Ghost: VisibilityOffIcon,
  Dragon: PetsIcon,
  Normal: BlurOnIcon,
};

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectExample }) => {
  const [typePrompts, setTypePrompts] = useState<PromptType[]>([]);
  const [promptState, setPromptState] = useState<{ [key: string]: string[] }>(
    {},
  );

  const shuffleArray = useCallback((array: string[]): string[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  const loadPrompts = useCallback(async () => {
    const types = [
      'fire',
      'water',
      'grass',
      'electric',
      'psychic',
      'ice',
      'dark',
      'fairy',
      'fighting',
      'ground',
      'rock',
      'bug',
      'ghost',
      'dragon',
      'normal',
    ];

    const loadedPrompts: PromptType[] = [];
    const initialPromptState: { [key: string]: string[] } = {};

    for (const type of types) {
      try {
        const module = await import(`./types/${type}.json`);
        const prompts = module.default?.prompts || [];
        if (Array.isArray(prompts) && prompts.length > 0) {
          loadedPrompts.push({
            type: type.charAt(0).toUpperCase() + type.slice(1),
            prompts,
          });
          initialPromptState[type] = shuffleArray(prompts);
        } else {
          console.warn(`No valid prompts found for type: ${type}`);
        }
      } catch (error) {
        console.error(`Error loading prompts for ${type}:`, error);
      }
    }

    setTypePrompts(loadedPrompts);
    setPromptState(initialPromptState);
  }, [shuffleArray]);

  useEffect(() => {
    loadPrompts();
  }, [loadPrompts]);

  const handleIconClick = useCallback(
    (type: string) => {
      setPromptState(prevState => {
        const currentPrompts = prevState[type.toLowerCase()] || [];
        if (currentPrompts.length > 0) {
          const [nextPrompt, ...remainingPrompts] = currentPrompts;
          onSelectExample(nextPrompt);

          let updatedPrompts = remainingPrompts;
          if (updatedPrompts.length === 0) {
            const typePrompt = typePrompts.find(
              item => item.type.toLowerCase() === type.toLowerCase(),
            );
            updatedPrompts = shuffleArray(typePrompt?.prompts || []);
          }

          return { ...prevState, [type.toLowerCase()]: updatedPrompts };
        }
        return prevState;
      });
    },
    [onSelectExample, shuffleArray, typePrompts],
  );

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose a Pokémon Type to Populate an Example Prompt:
      </Typography>
      <Grid container spacing={2}>
        {typePrompts.map(item => {
          const IconComponent = typeToIconMap[item.type];
          if (!IconComponent) {
            console.warn(`No icon found for type: ${item.type}`);
            return null;
          }

          return (
            <Grid item xs={3} sm={2} md={1.5} key={item.type}>
              <Box textAlign="center">
                <Button
                  onClick={() => handleIconClick(item.type)}
                  startIcon={<IconComponent fontSize="large" />}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Typography variant="caption" component="p" mt={1}>
                    {item.type}
                  </Typography>
                </Button>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ExamplePrompts;
