import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

export default function CreerUtilisateur({ drawerWidth = 240, sidebarOpen }) {
  const [crmId, setCrmId] = useState('');
  const [vosFacturesId, setVosFacturesId] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);
    try {
      await fetch('https://crm.io/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crmId })
      });
      await fetch('https://vosfactures.fr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vosFacturesId })
      });
      await fetch('/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crmId, vosFacturesId, password })
      });
      setSuccess('Utilisateur créé avec succès !');
      setCrmId('');
      setVosFacturesId('');
      setPassword('');
    } catch (err) {
      setError("Erreur lors de la création de l'utilisateur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        transition: (theme) => theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        ...(sidebarOpen && {
          transition: (theme) => theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }),
        bgcolor: '#f7f9fa',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          width: '100%',
          ml: 0,
          mt: 8,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: '#18113c',
            mb: 4,
            textAlign: 'left',
            fontSize: { xs: 28, md: 36 },
            letterSpacing: 1,
            position: 'relative',
            '&:after': {
              content: '""',
              display: 'block',
              width: '60px',
              height: '4px',
              backgroundColor: '#3797f7',
              mt: 1,
              borderRadius: '2px'
            }
          }}
        >
          Créer Utilisateur
        </Typography>
        
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: '100%',
              maxWidth: 600,
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              p: { xs: 2, md: 4 },
              bgcolor: 'white',
              borderRadius: 2,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.05)',
            }}
          >
            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            
            <TextField
              label="CRM ID"
              placeholder="Entrez le CRM ID"
              value={crmId}
              onChange={(e) => setCrmId(e.target.value)}
              fullWidth
              required
              InputProps={{
                sx: {
                  bgcolor: '#f5f9ff',
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  '&:hover fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                },
              }}
              InputLabelProps={{
                sx: { 
                  fontWeight: 600, 
                  fontSize: 14,
                  color: '#5a6473',
                  '&.Mui-focused': {
                    color: '#3797f7',
                  },
                },
              }}
            />
            
            <TextField
              label="VosFactures ID"
              placeholder="Entrez le VosFactures ID"
              value={vosFacturesId}
              onChange={(e) => setVosFacturesId(e.target.value)}
              fullWidth
              required
              InputProps={{
                sx: {
                  bgcolor: '#f5f9ff',
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  '&:hover fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                },
              }}
              InputLabelProps={{
                sx: { 
                  fontWeight: 600, 
                  fontSize: 14,
                  color: '#5a6473',
                  '&.Mui-focused': {
                    color: '#3797f7',
                  },
                },
              }}
            />
            
            <TextField
              label="Mot de passe"
              placeholder="Entrez le mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              InputProps={{
                sx: {
                  bgcolor: '#f5f9ff',
                  borderRadius: 2,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  '&:hover fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3797f7 !important',
                  },
                },
              }}
              InputLabelProps={{
                sx: { 
                  fontWeight: 600, 
                  fontSize: 14,
                  color: '#5a6473',
                  '&.Mui-focused': {
                    color: '#3797f7',
                  },
                },
              }}
            />
            
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                fontWeight: 700,
                fontSize: 16,
                bgcolor: '#3797f7',
                borderRadius: 2,
                py: 2,
                px: 4,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { 
                  bgcolor: '#1877f2',
                  boxShadow: '0px 4px 12px rgba(55, 151, 247, 0.3)'
                },
                '&:disabled': {
                  bgcolor: '#e0e0e0',
                  color: '#a8a8a8'
                }
              }}
            >
              {loading ? 'Création en cours...' : 'Créer l\'utilisateur'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}