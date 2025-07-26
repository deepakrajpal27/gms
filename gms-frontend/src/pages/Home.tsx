import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Box sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to GMS
        </Typography>
        <Typography variant="body1">
          Your one-stop solution for grocery management.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;
