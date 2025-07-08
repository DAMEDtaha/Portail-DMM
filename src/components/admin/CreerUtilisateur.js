import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';

export default function CreerUtilisateur() {
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
      // 1. Enregistrer l'ID CRM dans CRM.IO
      await fetch('https://crm.io/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crmId })
      });
      // 2. Enregistrer l'ID VosFactures dans crm.vosfactures.io
      await fetch('https://vosfactures.io/api/utilisateurs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vosFacturesId })
      });
      // 3. Enregistrer le mot de passe dans la base du portail (API fictive)
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
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f8fafc', p: { xs: 2, md: 5 }, boxSizing: 'border-box' }}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Paper sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#663399', textAlign: 'center', fontSize: { xs: 28, md: 32 } }}>
            Créer un nouvel utilisateur
          </Typography>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="ID CRM"
              value={crmId}
              onChange={e => setCrmId(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2, fontSize: { xs: 18, md: 20 } }}
            />
            <TextField
              label="ID VosFactures"
              value={vosFacturesId}
              onChange={e => setVosFacturesId(e.target.value)}
              fullWidth
              required
              sx={{ mb: 2, fontSize: { xs: 18, md: 20 } }}
            />
            <TextField
              label="Mot de passe"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
              required
              sx={{ mb: 3, fontSize: { xs: 18, md: 20 } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ fontWeight: 600, fontSize: { xs: 18, md: 20 }, py: 1.2, bgcolor: '#663399', '&:hover': { bgcolor: '#563399' } }}
            >
              {loading ? 'Création...' : 'Créer Utilisateur'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
