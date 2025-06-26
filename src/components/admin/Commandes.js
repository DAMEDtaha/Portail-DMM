import React from "react";
import {
  Box, Typography, Paper, List, ListItem, ListItemText, Avatar, IconButton, Button
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
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  const commandesFiltres = clientEmail
    ? commandes.filter(c => c.clientEmail === clientEmail)
    : commandes;

  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 700,
        mx: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #e0f2fe 0%, #f8fafc 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(14,165,233,0.10)",
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
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 24px 0 rgba(14,165,233,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#0ea5e9", letterSpacing: 1, textShadow: "0 2px 8px rgba(14,165,233,0.08)" }}>
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
                  onClick={() => navigate(`/admin/commandes/${commande.id}?client=${encodeURIComponent(commande.clientEmail)}`)}
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