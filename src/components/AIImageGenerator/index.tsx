// src/components/AIImageGenerator.tsx

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
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  List, 
  ListItem, 
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { useAIImageGeneration } from './useAIImageGeneration';
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

interface AIImageGeneratorProps {
  onSubmit: (prompt: string, options?: ImageGenerationOptions) => Promise<void>;
}

interface ImageGenerationOptions {
  imageSize: string;
  quantity: number;
}

const examplePrompts = [
  "Create a fiery dragon soaring through the night sky with glowing scales.",
  "Design a mystical forest inhabited by enchanting creatures and luminescent plants.",
  "Illustrate a futuristic cityscape with towering skyscrapers and flying vehicles.",
];

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [selectedExample, setSelectedExample] = useState<string>('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // Image size options
  const imageSizeOptions = [
    { label: 'Landscape (4:3)', value: 'landscape_4_3' },
    { label: 'Square (1:1)', value: 'square' },
    { label: 'Portrait (3:4)', value: 'portrait_3_4' },
  ];

  // Quantity options
  const quantityOptions = [1, 2, 3, 4, 5];

  // Default options
  const [imageSize, setImageSize] = useState<string>('landscape_4_3');
  const [quantity, setQuantity] = useState<number>(1);

  // Destructure necessary states and functions from the hook
  const { 
    isGenerating, 
    error, 
  } = useAIImageGeneration();

  // Update character count whenever prompt changes
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
      const options: ImageGenerationOptions = { imageSize, quantity };
      await onSubmit(prompt, options); // Trigger image generation via the provided onSubmit prop
      setPrompt(''); // Clear the input field after submission
      setSelectedExample('');
    }
  };

  /**
   * Handles selecting an example prompt.
   * @param e Change event
   */
  const handleSelectExample = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selected = e.target.value as string;
    setSelectedExample(selected);
    setPrompt(selected);
  };

  /**
   * Handles clearing the prompt input.
   */
  const handleClearPrompt = () => {
    setPrompt('');
    setSelectedExample('');
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
    setSelectedExample('');
  };

  return (
    <Box>
      {/* Image Generation Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generate Your Pokémon Card Image
          </Typography>

          {/* Example Prompts Dropdown */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="example-prompts-label">Select an Example Prompt</InputLabel>
            <Select
              labelId="example-prompts-label"
              id="example-prompts"
              value={selectedExample}
              onChange={handleSelectExample}
              label="Select an Example Prompt"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {examplePrompts.map((example, index) => (
                <MenuItem key={index} value={example}>
                  {example}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Prompt Text Field with Clear and Favorite Buttons */}
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
            <Box>
              {prompt && (
                <Tooltip title="Clear Prompt">
                  <IconButton 
                    aria-label="clear prompt" 
                    onClick={handleClearPrompt} 
                    disabled={isGenerating}
                    sx={{ mt: 2 }}
                  >
                    <ClearIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
                <IconButton 
                  aria-label="toggle favorite" 
                  onClick={toggleFavorite} 
                  disabled={isGenerating || !prompt.trim()}
                  sx={{ mt: 2 }}
                >
                  {isFavorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                </IconButton>
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

          {/* Image Size Selection */}
          <FormControl fullWidth variant="outlined" sx={{ mt: 2, mb: 2 }}>
            <InputLabel id="image-size-label">Image Size</InputLabel>
            <Select
              labelId="image-size-label"
              id="image-size-select"
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value as string)}
              label="Image Size"
            >
              {imageSizeOptions.map((size) => (
                <MenuItem key={size.value} value={size.value}>
                  {size.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Quantity Selection */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="quantity-label">Number of Images</InputLabel>
            <Select
              labelId="quantity-label"
              id="quantity-select"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value as number)}
              label="Number of Images"
            >
              {quantityOptions.map((num) => (
                <MenuItem key={num} value={num}>
                  {num}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isGenerating || prompt.trim().length === 0 || characterCount > 300}
            sx={{ mt: 2 }}
            aria-label="Generate Image"
          >
            {isGenerating ? <CircularProgress size={24} /> : 'Generate Image'}
          </Button>
        </Box>
      </Paper>

      {/* Instructions or Tips */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Tip: Be as descriptive as possible to get the best results. For example, include colors, emotions, and specific details.
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
              >
                <ListItemText primary={fav} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="remove favorite" onClick={() => toggleFavorite()}>
                    <ClearIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default AIImageGenerator;