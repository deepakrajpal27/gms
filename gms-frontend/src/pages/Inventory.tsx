import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/PageContainer';

const Inventory: React.FC = () => {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Inventory
      </Typography>
      <Typography variant="body1" className="page-content">
        Track your inventory levels here.
      </Typography>
    </PageContainer>
  );
};

export default Inventory;
