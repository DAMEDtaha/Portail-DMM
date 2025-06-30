import React, { useState } from "react";
import { Box, Typography, Paper, Avatar, Divider, Button, IconButton, Grid, Chip, List, ListItem, ListItemText, ListItemSecondaryAction, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";

const admin = {
  name: "Admin DMM",
  email: "admin@dmm.com",
  role: "Administrateur",
  phone: "+212 600-000000",
  status: "Actif",
  avatar: "",
};

export default function ProfilAdmin() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  // Gestion ouverture dialog selon le champ
  const handleEditClick = (field, currentValue) => {
    setEditField(field);
    setFieldValue(currentValue);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditField(null);
    setFieldValue("");
  };
  const handleDialogSave = () => {
    setOpenDialog(false);
    setEditField(null);
    setFieldValue("");
  };

  return (
    <Box
      sx={{
        width: 'vw',
        minHeight: '100vh',
        bgcolor: 'linear-gradient(135deg, #f8f6ff 0%, #e9e4f5 100%)',
        py: { xs: 4, md: 8 },
        px: 0,
        m: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box sx={{
        width: '100%',
        maxWidth: 1950, // Augmente la largeur maximale
        minWidth: 350, // Largeur minimale pour éviter le scroll horizontal sur mobile
        mx: 'auto',
        bgcolor: '#fff',
        borderRadius: 6,
        boxShadow: '0 8px 32px #bbaaff33, 0 1.5px 8px #bbaaff22',
        p: { xs: 2, md: 6 },
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        border: '1.5px solid #ede7f6',
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        fontSize: { xs: '1.1rem', md: '1.25rem' },
        color: '#2d205a',
        fontWeight: 500,
        letterSpacing: 0.2,
        overflowX: 'auto', // Permet d'éviter le scroll horizontal sauf cas extrême
      }}>
        <IconButton
          onClick={() => navigate("/AdminDashboard")}
          sx={{
            mb: 2,
            alignSelf: "flex-start",
            bgcolor: "#ede9fe",
            color: "#663399",
            "&:hover": { bgcolor: "#d1c4e9" }
          }}
          size="large"
        >
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar sx={{ width: 110, height: 110, bgcolor: '#f3f3f3', fontSize: 54, border: '3px solid #b39ddb', boxShadow: '0 2px 12px #bbaaff44' }} src={admin.avatar}>
            <PersonIcon sx={{ fontSize: 60 }} />
          </Avatar>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 32 }, fontFamily: 'inherit', color: '#222' }}>{admin.name}</Typography>
            <Typography sx={{ color: '#888', fontSize: { xs: 17, md: 20 }, fontFamily: 'inherit' }}>{admin.email}</Typography>
            <Chip icon={<VerifiedUserIcon />} label={admin.role} color="secondary" sx={{ bgcolor: "#ede9fe", color: "#7c3aed", fontWeight: 600, mt: 1, fontSize: "1rem" }} />
          </Box>
        </Box>
        <Divider sx={{ my: 1, bgcolor: '#ede7f6' }} />
        {/* Account Details */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Détails du compte
        </Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <List disablePadding>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Nom</Typography>
                <Typography sx={{ color: '#222', fontSize: 15 }}>{admin.name}</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('nom', admin.name)}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Email</Typography>
                <Typography sx={{ color: '#888', fontSize: 15 }}>{admin.email}</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('email', admin.email)}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<Typography sx={{ fontWeight: 500, fontSize: 15 }}>Changer le mot de passe</Typography>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('password', '')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Téléphone</Typography>
                <Typography sx={{ color: '#222', fontSize: 15 }}>{admin.phone}</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('phone', admin.phone)}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Statut</Typography>
                <Chip label={admin.status} color={admin.status === "Actif" ? "success" : "default"} size="small" sx={{ fontWeight: 600, ml: 1 }} />
              </>} />
            </ListItem>
          </List>
        </Paper>
        {/* Dernière connexion */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Dernière connexion
        </Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <Typography sx={{ color: '#888', fontSize: 16 }}>Aujourd'hui, 09:15</Typography>
        </Paper>
        {/* Déconnexion */}
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          fullWidth
          sx={{
            bgcolor: "#7c3aed",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: "0 2px 8px 0 rgba(124,58,237,0.10)",
            py: 1.2,
            mt: 2,
            "&:hover": {
              bgcolor: "#663399"
            }
          }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        >
          Se déconnecter
        </Button>
        {/* Dialog édition */}
        {openDialog && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: '#00000055', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: 4, minWidth: 320, maxWidth: '90vw', boxShadow: '0 4px 32px #bbaaff44', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#663399', fontWeight: 700 }}>
                {editField === 'nom' && 'Modifier le nom'}
                {editField === 'email' && 'Modifier l\'email'}
                {editField === 'password' && 'Changer le mot de passe'}
                {editField === 'phone' && 'Modifier le téléphone'}
              </Typography>
              {editField !== 'password' ? (
                <input type="text" value={fieldValue} onChange={e => setFieldValue(e.target.value)} style={{ fontSize: 18, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
              ) : (
                <input type="password" value={fieldValue} onChange={e => setFieldValue(e.target.value)} style={{ fontSize: 18, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} placeholder="Nouveau mot de passe" />
              )}
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                <Button onClick={handleDialogClose} variant="outlined" sx={{ borderRadius: 2 }}>Annuler</Button>
                <Button onClick={handleDialogSave} variant="contained" sx={{ borderRadius: 2, bgcolor: '#663399' }}>Enregistrer</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}