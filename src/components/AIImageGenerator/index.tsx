import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  CircularProgress, 
  Box, 
  Typography, 
  Paper, 
  Alert, 
  Tooltip, 
  IconButton, 
  List, 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction,
  Grid
} from '@mui/material';
import { useAIImageGeneration } from './useAIImageGeneration';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AddIcon from '@mui/icons-material/Add';
import ExamplePrompts from './ExamplePrompts'; // Import the refactored component

interface AIImageGeneratorProps {
  onSubmit: (prompt: string) => Promise<void>;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Destructure necessary states and functions from the hook
  const { isGenerating, error } = useAIImageGeneration();

  // Update character count and favorite status whenever prompt changes
  useEffect(() => {
    setCharacterCount(prompt.length);
    setIsFavorite(favorites.includes(prompt));
  }, [prompt, favorites]);

  // Initialize favorites from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoritePrompts');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Update localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('favoritePrompts', JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Handles form submission for generating an image.
   * @param e Form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      await onSubmit(prompt); // Trigger image generation via the provided onSubmit prop
      setPrompt(''); // Clear the input field after submission
    }
  };

  /**
   * Handles selecting an example prompt from the ExamplePrompts component.
   * @param selectedPrompt The selected example prompt
   */
  const handleSelectExample = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  /**
   * Handles clearing the prompt input.
   */
  const handleClearPrompt = () => {
    setPrompt('');
  };

  /**
   * Handles saving or removing a favorite prompt.
   */
  const toggleFavorite = () => {
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav !== prompt));
      setIsFavorite(false);
    } else {
      setFavorites([...favorites, prompt]);
      setIsFavorite(true);
    }
  };

  /**
   * Handles selecting a favorite prompt.
   * @param favorite The selected favorite prompt
   */
  const handleSelectFavorite = (favorite: string) => {
    setPrompt(favorite);
  };

  return (
    <Box>
      {/* Image Generation Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generate Your Pokémon Card Image
          </Typography>

          <Grid container spacing={2}>
            {/* Example Prompts with Pokémon Type Icons */}
            <Grid item xs={12}>
              <ExamplePrompts onSelectExample={handleSelectExample} />
            </Grid>

            {/* Prompt Text Field with Clear and Favorite Buttons */}
            <Grid item xs={12}>
              <Box display="flex" alignItems="flex-end">
                <TextField
                  fullWidth
                  label="Describe your Pokémon card image"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  margin="normal"
                  multiline
                  rows={4}
                  disabled={isGenerating}
                  variant="outlined"
                  inputProps={{ 'aria-label': 'Pokémon card image description' }}
                />
                <Box display="flex" flexDirection="column" ml={1}>
                  {prompt && (
                    <Tooltip title="Clear Prompt">
                      <span> {/* Wrapper element to address MUI Tooltip warning */}
                        <IconButton 
                          aria-label="clear prompt" 
                          onClick={handleClearPrompt} 
                          disabled={isGenerating}
                          sx={{ mt: 2 }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </span>
                    </Tooltip>
                  )}
                  <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                    <span> {/* Wrapper element to address MUI Tooltip warning */}
                      <IconButton 
                        aria-label="toggle favorite" 
                        onClick={toggleFavorite} 
                        disabled={isGenerating || !prompt.trim()}
                        sx={{ mt: 1 }}
                      >
                        {isFavorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Box>

              {/* Character Count */}
              <Typography variant="caption" color={characterCount > 300 ? 'error' : 'textSecondary'}>
                {characterCount}/300 characters
              </Typography>

              {/* Error Alert */}
              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isGenerating || prompt.trim().length === 0 || characterCount > 300}
                sx={{ mt: 2 }}
                startIcon={isGenerating ? <CircularProgress size={20} /> : <AddIcon />}
                aria-label="Generate Image"
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Instructions or Tips */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          <strong>Tip:</strong> Be as descriptive as possible to get the best results. Include colors, emotions, and specific details.
        </Typography>
      </Box>

      {/* Favorite Prompts List */}
      {favorites.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Your Favorite Prompts:
          </Typography>
          <List>
            {favorites.map((fav, index) => (
              <ListItem 
                button 
                key={index} 
                onClick={() => handleSelectFavorite(fav)}
                disabled={isGenerating}
                secondaryAction={
                  <Tooltip title="Remove from Favorites">
                    <span> {/* Wrapper element to address MUI Tooltip warning */}
                      <IconButton edge="end" aria-label="remove favorite" onClick={() => {
                        setFavorites(favorites.filter(favItem => favItem !== fav));
                      }}>
                        <ClearIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                }
              >
                <ListItemText primary={fav} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AIImageGenerator;