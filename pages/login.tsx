import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography, Container, Paper } from '@mui/material';
import { SEO } from '@layout';

const LoginPage = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to home page if user is already logged in
    }
  }, [user, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      <SEO title="Login" />
      <Container maxWidth="sm">
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Typography component="h1" variant="h5" gutterBottom>
              Welcome to PlayMoreTCG
            </Typography>
            <Typography variant="body1" gutterBottom>
              Please log in to access the AI Image Generator and other features.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button
                href="/api/auth/login"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Log in with Auth0
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default LoginPage;