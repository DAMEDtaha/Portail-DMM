// src/components/layout/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#f4f4f4',
          display: 'flex',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;