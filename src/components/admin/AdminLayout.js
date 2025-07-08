import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Avatar, Divider
} from "@mui/material";
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const sidebarWidthExpanded = 240;
const sidebarWidthCollapsed = 65;

const adminMenuItems = [
  { text: 'Clients', icon: <PeopleIcon />, path: '/admin/clients' },
  { text: 'Contrats', icon: <AssignmentIcon />, path: '/admin/contrats' },
  { text: 'Commandes', icon: <ShoppingCartIcon />, path: '/admin/commandes' },
  { text: 'Factures', icon: <ReceiptIcon />, path: '/admin/factures' },
  { text: 'Profil', icon: <PersonIcon />, path: '/admin/profil' },
  { text: 'Créer Utilisateur', icon: <PersonIcon />, path: '/admin/creer-utilisateur' },
];

export default function AdminLayout() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f8fafc" }}>
      <Drawer
        variant="permanent"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        sx={{
          width: isExpanded ? sidebarWidthExpanded : sidebarWidthCollapsed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isExpanded ? sidebarWidthExpanded : sidebarWidthCollapsed,
            boxSizing: 'border-box',
            bgcolor: '#663399',
            color: 'white',
            borderRight: 'none',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
          },
        }}
        open
      >
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <Avatar sx={{ bgcolor: "#7c3aed", width: 40, height: 40 }}>
            <PeopleIcon />
          </Avatar>
          {isExpanded && (
            <ListItemText
              primary="Admin DMM"
              sx={{ ml: 2, color: "#fff", fontWeight: "bold" }}
            />
          )}
        </Box>
        <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
        <List sx={{ mt: 2 }}>
          {adminMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: 1,
                justifyContent: isExpanded ? 'flex-start' : 'center',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: isExpanded ? 40 : 'auto',
                  mr: isExpanded ? 2 : 'auto'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    '& .MuiListItemText-primary': {
                      fontSize: '0.95rem',
                      fontWeight: 500
                    }
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
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
              borderRadius: 1,
              justifyContent: isExpanded ? 'flex-start' : 'center',
              minHeight: 48,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: isExpanded ? 40 : 'auto',
                mr: isExpanded ? 2 : 'auto',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary="Se déconnecter"
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  },
                }}
              />
            )}
          </ListItem>
        </List>
      </Drawer>
      {/* Ici s'affichera la page enfant */}
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}