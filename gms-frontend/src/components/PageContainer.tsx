import React from 'react';
import { Box, Paper, SxProps, Theme } from '@mui/material';

interface PageContainerProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

const PageContainer: React.FC<PageContainerProps> = ({ children, sx }) => {
  return (
    <Box className="page-container" sx={sx}>
      <Paper className="page-paper">
        {children}
      </Paper>
    </Box>
  );
};

export default PageContainer;
