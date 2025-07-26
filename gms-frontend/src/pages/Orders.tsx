import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/PageContainer';

const Orders: React.FC = () => {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Orders
      </Typography>
      <Typography variant="body1" className="page-content">
        Manage your orders here.
      </Typography>
    </PageContainer>
  );
};

export default Orders;
