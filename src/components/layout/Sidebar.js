import React, { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  ShoppingCart as OrdersIcon,
  Person as AccountIcon,
  Cases as CasesIcon,
  Chat as ChatIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const menuItems = [
    { text: 'Tableau de bord', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Factures', icon: <ReceiptIcon />, path: '/factures' },
    { text: 'Commandes', icon: <OrdersIcon />, path: '/Orders' },
    { text: 'Mes Contrats', icon: <ReceiptIcon />, path: '/bons-de-commandes' },
    { text: 'Mon Compte', icon: <AccountIcon />, path: '/Profil' },
    { text: 'Support', icon: <CasesIcon />, path: '/cases' },
    
  ];

  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      sx={{
        width: isExpanded ? 500 : 100, // largeur encore augmentée
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isExpanded ? 500 : 100, // largeur encore augmentée
          boxSizing: 'border-box',
          bgcolor: '#663399',
          color: 'white',
          borderRight: 'none',
          transition: 'width 0.3s ease-in-out',
          overflowX: 'hidden',
        },
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        minHeight: isExpanded ? 200 : 80,
        transition: 'min-height 0.3s',
      }}>
        <img 
          src={logo} 
          alt="DMM Logo" 
          style={{ 
            width: isExpanded ? '85%' : '60px',
            maxHeight: isExpanded ? 200 : 70,
            transition: 'width 0.3s, max-height 0.3s',
            display: 'block',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 12px #fff8)'
          }} 
        />
      </Box>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => navigate(item.path)}
            sx={{
              mb: 1,
              mx: 1,
              borderRadius: 2,
              justifyContent: isExpanded ? 'flex-start' : 'center',
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.16)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.22)',
              },
              minHeight: 64,
              transition: 'background 0.2s',
            }}
          >
            <ListItemIcon 
              sx={{ 
                color: location.pathname === item.path ? '#ffd700' : 'white',
                minWidth: isExpanded ? 56 : 'auto',
                mr: isExpanded ? 2 : 'auto',
                fontSize: isExpanded ? 38 : 28,
                transition: 'color 0.2s, font-size 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {React.cloneElement(item.icon, { fontSize: isExpanded ? 'inherit' : 'large', style: { fontSize: isExpanded ? 38 : 28 } })}
            </ListItemIcon>
            {isExpanded && (
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  whiteSpace: 'nowrap', // force sur une seule ligne
                  overflow: 'visible', // pas de coupure
                  textOverflow: 'unset', // pas de points de suspension
                  maxWidth: 'none', // pas de limite de largeur
                  '& .MuiListItemText-primary': { 
                    fontSize: '1.45rem',
                    fontWeight: location.pathname === item.path ? 800 : 600,
                    fontFamily: 'Roboto, Arial, sans-serif',
                    color: location.pathname === item.path ? '#ffd700' : 'white',
                    letterSpacing: 0.5,
                    textShadow: '0 2px 8px #0002',
                    whiteSpace: 'nowrap',
                    overflow: 'visible',
                    textOverflow: 'unset',
                    maxWidth: 'none',
                  } 
                }}
              />
            )}
          </ListItem>
        ))}
      </List>
      {/* Ajout du bouton Se déconnecter en bas */}
      <Box sx={{ flexGrow: 1 }} />
      <List sx={{ mb: 2 }}>
        <ListItem
          button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          sx={{
            mx: 1,
            borderRadius: 2,
            justifyContent: isExpanded ? 'flex-start' : 'center',
            minHeight: 64,
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
            },
            transition: 'background 0.2s',
          }}
        >
          <ListItemIcon
            sx={{
              color: '#ff7675',
              minWidth: isExpanded ? 56 : 'auto',
              mr: isExpanded ? 2 : 'auto',
              fontSize: isExpanded ? 38 : 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LogoutIcon fontSize={isExpanded ? 'inherit' : 'large'} style={{ fontSize: isExpanded ? 38 : 28 }} />
          </ListItemIcon>
          {isExpanded && (
            <ListItemText
              primary="Se déconnecter"
              sx={{
                opacity: isExpanded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
                '& .MuiListItemText-primary': {
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  fontFamily: 'Roboto, Arial, sans-serif',
                  color: '#ff7675',
                  letterSpacing: 0.5,
                  textShadow: '0 2px 8px #0002',
                },
              }}
            />
          )}
        </ListItem>
      </List>
      {/* Fin ajout */}
    </Drawer>
  );
};

export default Sidebar;