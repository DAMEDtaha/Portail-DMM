import React, { useEffect } from "react";
import {
  Box, Typography, Paper, List, ListItem, ListItemText, Avatar, IconButton, Button, Grid, Divider
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useLocation } from "react-router-dom";

// Exemple de données commandes (à remplacer par un fetch API plus tard)
const commandes = [
  {
    id: 101,
    client: "Ouadhani Mohamed TAHA",
    clientEmail: "taha@dmm.com",
    date: "2024-05-01",
    statut: "Livrée",
    montant: "500 €",
    description: "Commande de matériel informatique."
  },
  {
    id: 102,
    client: "Fatima Zahra",
    clientEmail: "fatima@dmm.com",
    date: "2024-05-10",
    statut: "En cours",
    montant: "300 €",
    description: "Commande de fournitures de bureau."
  }
];

export default function Commandes() {
  // Supprimer le scroll horizontal globalement
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    document.documentElement.style.overflowX = 'hidden';
    const root = document.getElementById('root');
    if (root) root.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = '';
      document.documentElement.style.overflowX = '';
      if (root) root.style.overflowX = '';
    };
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  const [commandeDetail, setCommandeDetail] = React.useState(null);

  const commandesFiltres = clientEmail
    ? commandes.filter(c => c.clientEmail === clientEmail)
    : commandes;

  return (
    <Box
      sx={{
        p: 3,
        width: "100%",
        maxWidth: 2400,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        background: "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)",
        borderRadius: 0,
        boxShadow: "none",
        overflowX: "hidden",
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        color: '#222',
        fontSize: '1.25rem', // Agrandir la taille d'écriture pour plus de lisibilité
        letterSpacing: 0.1,
      }}
    >
      <IconButton
        onClick={() => navigate("/AdminDashboard")}
        sx={{
          mb: 2,
          alignSelf: "flex-start",
          bgcolor: "#e0f2fe",
          color: "#0ea5e9",
          "&:hover": { bgcolor: "#bae6fd" }
        }}
        size="large"
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>

      {/* Affichage du détail de la commande sélectionnée */}
      {commandeDetail && (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
            maxWidth: "100%",
            mb: 3,
            background: "rgba(255,255,255,0.98)",
            boxShadow: "0 4px 24px 0 rgba(14,165,233,0.08)",
            overflowX: "hidden",
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            color: '#222',
            fontSize: '1.25rem', // Agrandir la taille d'écriture pour plus de lisibilité
            letterSpacing: 0.1,
          }}
          elevation={0}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}>
            <ShoppingCartIcon sx={{ color: "#0ea5e9", fontSize: 36, mr: 1 }} />
            <Typography variant="h5" fontWeight={700} color="#0ea5e9">
              Détail de la commande #{commandeDetail.id}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} sx={{ width: "100%", flexWrap: "wrap" }}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Client :</Typography>
              <Typography color="text.secondary">{commandeDetail.client}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
              <Typography color="text.secondary">{commandeDetail.clientEmail}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Date :</Typography>
              <Typography color="text.secondary">{commandeDetail.date}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
              <Typography color={commandeDetail.statut === "Livrée" ? "success.main" : "warning.main"}>
                {commandeDetail.statut}
              </Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
              <Typography color="text.secondary">{commandeDetail.montant}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600}>Description :</Typography>
          <Typography color="text.secondary">{commandeDetail.description}</Typography>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setCommandeDetail(null)}
              startIcon={<InfoIcon />}
            >
              Fermer le détail
            </Button>
          </Box>
        </Paper>
      )}

      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          maxWidth: "100%",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 24px 0 rgba(14,165,233,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          color: '#222',
          fontSize: '1.25rem', // Agrandir la taille d'écriture pour plus de lisibilité
          letterSpacing: 0.1,
        }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#0ea5e9", letterSpacing: 1, textShadow: "0 2px 8px rgba(14,165,233,0.08)", width: "100%", textAlign: "left" }}>
          <ShoppingCartIcon sx={{ mr: 1, color: "#0ea5e9", fontSize: 36 }} />
          Liste des commandes
        </Typography>
        <List sx={{ width: "100%" }}>
          {commandesFiltres.map(commande => (
            <ListItem
              key={commande.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: "#e0f2fe",
                boxShadow: "0 2px 8px 0 rgba(14,165,233,0.06)",
                "&:hover": { bgcolor: "#bae6fd" }
              }}
              secondaryAction={
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setCommandeDetail(commande)}
                  sx={{
                    bgcolor: "#0ea5e9",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(14,165,233,0.10)",
                    "&:hover": { bgcolor: "#0369a1" }
                  }}
                  startIcon={<InfoIcon />}
                >
                  Voir les détails
                </Button>
              }
            >
              <Avatar sx={{ bgcolor: "#0ea5e9", mr: 2, width: 48, height: 48, fontSize: 22 }}>
                <ShoppingCartIcon />
              </Avatar>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color="#0ea5e9">
                    Commande #{commande.id} - {commande.client}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" fontSize="1rem">
                    Date : {commande.date} | Statut : {commande.statut}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export { commandes };