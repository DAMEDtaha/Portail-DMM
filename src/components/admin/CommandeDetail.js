import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { commandes } from "./Commandes";
import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function CommandeDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  const commande = commandes.find(
    c => String(c.id) === String(id) && c.clientEmail === clientEmail
  );

  if (!commande) return <Typography>Commande introuvable.</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ShoppingCartIcon sx={{ color: "#0ea5e9", fontSize: 36, mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="#0ea5e9">
            Détail de la commande #{commande.id}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography fontWeight={600}>Client :</Typography>
        <Typography color="text.secondary">{commande.client}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
        <Typography color="text.secondary">{commande.clientEmail}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Date :</Typography>
        <Typography color="text.secondary">{commande.date}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
        <Typography color="text.secondary">{commande.statut}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
        <Typography color="text.secondary">{commande.montant}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Description :</Typography>
        <Typography color="text.secondary">{commande.description}</Typography>
      </Paper>
    </Box>
  );
}