import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import creeruser from '../../assets/images/creeruser.png';

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
        bgcolor: '#f2f5fa',
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 2200,
          display: 'flex',
          bgcolor: '#ffffff',
          borderRadius: 5,
          overflow: 'hidden',
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.1)',
          minHeight: 600,
        }}
      >
        {/* Partie gauche avec l'image */}
        <Box
          sx={{
            flex: 1,
            bgcolor: '#e8f0fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.4s ease',
            '&:hover': {
              transform: 'scale(1.02)',
            },
          }}
        >
          <img
            src={creeruser}
            alt="Créer utilisateur illustration"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.4s ease',
            }}
          />
        </Box>

        {/* Partie droite avec le formulaire */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: '#ffffff',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#18113c',
              mb: 10,
              position: 'relative',
              letterSpacing: 0.5,
              '&:after': {
                content: '""',
                display: 'block',
                width: '90px',
                height: '6px',
                backgroundColor: '#3797f7',
                mt: 3,
                borderRadius: '2px'
              }
            }}
          >
            Créer Utilisateur
          </Typography>

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

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
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
                  borderRadius: 3,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  transition: 'all 0.3s ease',
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
                  borderRadius: 3,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  transition: 'all 0.3s ease',
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
                  borderRadius: 3,
                  fontWeight: 500,
                  fontSize: 16,
                  height: 56,
                  transition: 'all 0.3s ease',
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
                mt: 1,
                fontWeight: 700,
                fontSize: 16,
                bgcolor: '#3797f7',
                borderRadius: 3,
                py: 2,
                px: 4,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: '#1877f2',
                  transform: 'translateY(-2px)',
                  boxShadow: '0px 6px 20px rgba(55, 151, 247, 0.3)',
                },
                '&:disabled': {
                  bgcolor: '#e0e0e0',
                  color: '#a8a8a8'
                }
              }}
            >
              {loading ? 'Création en cours...' : "Créer l'utilisateur"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
