import React, { useEffect, useState } from "react";
import {
  Box, Typography, Paper, List, ListItem, ListItemText, Avatar, IconButton, Button, Divider, Grid
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useLocation } from "react-router-dom";

// Exemple de données factures (à remplacer par un fetch API plus tard)
const factures = [
  {
    id: 301,
    client: "Ouadhani Mohamed TAHA",
    clientEmail: "taha@dmm.com",
    date: "2024-04-15",
    montant: "250.00 €",
    statut: "Payée",
    description: "Facture pour prestation annuelle."
  },
  {
    id: 302,
    client: "Fatima Zahra",
    clientEmail: "fatima@dmm.com",
    date: "2024-05-05",
    montant: "120.00 €",
    statut: "En attente",
    description: "Facture pour maintenance."
  }
];

export default function Factures() {
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

  const [factureDetail, setFactureDetail] = useState(null);

  const facturesFiltres = clientEmail
    ? factures.filter(f => f.clientEmail === clientEmail)
    : factures;

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
        background: "linear-gradient(135deg, #fef9c3 0%, #f8fafc 100%)",
        borderRadius: 0,
        boxShadow: "none",
        overflowX: "hidden",
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        color: '#222',
        fontSize: '1.25rem',
        letterSpacing: 0.1,
      }}
    >
      <IconButton
        onClick={() => navigate("/AdminDashboard")}
        sx={{
          mb: 2,
          alignSelf: "flex-start",
          bgcolor: "#fef9c3",
          color: "#eab308",
          "&:hover": { bgcolor: "#fde68a" }
        }}
        size="large"
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>

      {/* Affichage du détail de la facture sélectionnée */}
      {factureDetail && (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
            maxWidth: "100%",
            mb: 3,
            background: "rgba(255,255,255,0.98)",
            boxShadow: "0 4px 24px 0 rgba(234,179,8,0.08)",
            overflowX: "hidden",
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            color: '#222',
            fontSize: '1.25rem',
            letterSpacing: 0.1,
          }}
          elevation={0}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2, width: "100%" }}>
            <ReceiptIcon sx={{ color: "#eab308", fontSize: 36, mr: 1 }} />
            <Typography variant="h5" fontWeight={700} color="#eab308">
              Détail de la facture #{factureDetail.id}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2} sx={{ width: "100%", flexWrap: "wrap" }}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Client :</Typography>
              <Typography color="text.secondary">{factureDetail.client}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
              <Typography color="text.secondary">{factureDetail.clientEmail}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Date :</Typography>
              <Typography color="text.secondary">{factureDetail.date}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
              <Typography color={factureDetail.statut === "Payée" ? "success.main" : "warning.main"}>
                {factureDetail.statut}
              </Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
              <Typography color="text.secondary">{factureDetail.montant}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600}>Description :</Typography>
          <Typography color="text.secondary">{factureDetail.description}</Typography>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setFactureDetail(null)}
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
          boxShadow: "0 4px 24px 0 rgba(234,179,8,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflowX: "hidden",
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          color: '#222',
          fontSize: '1.25rem',
          letterSpacing: 0.1,
        }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#eab308", letterSpacing: 1, textShadow: "0 2px 8px rgba(234,179,8,0.08)", width: "100%", textAlign: "left" }}>
          <ReceiptIcon sx={{ mr: 1, color: "#eab308", fontSize: 36 }} />
          Liste des factures
        </Typography>
        <List sx={{ width: "100%" }}>
          {facturesFiltres.map(facture => (
            <ListItem
              key={facture.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: "#fef9c3",
                boxShadow: "0 2px 8px 0 rgba(234,179,8,0.06)",
                "&:hover": { bgcolor: "#fde68a" }
              }}
              secondaryAction={
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setFactureDetail(facture)}
                  sx={{
                    bgcolor: "#eab308",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(234,179,8,0.10)",
                    "&:hover": { bgcolor: "#ca8a04" }
                  }}
                  startIcon={<InfoIcon />}
                >
                  Voir les détails
                </Button>
              }
            >
              <Avatar sx={{ bgcolor: "#eab308", mr: 2, width: 48, height: 48, fontSize: 22 }}>
                <ReceiptIcon />
              </Avatar>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color="#eab308">
                    Facture #{facture.id} - {facture.client}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" fontSize="1rem">
                    Date : {facture.date} | Montant : {facture.montant} | Statut : {facture.statut}
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

export { factures };