import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from '../components/PageContainer';

const Category: React.FC = () => {
  return (
    <PageContainer>
      <Typography variant="h4" component="h1" className="page-title">
        Categories
      </Typography>
      <Typography variant="body1" className="page-content">
        Manage your product categories here.
      </Typography>
    </PageContainer>
  );
};

export default Category;
