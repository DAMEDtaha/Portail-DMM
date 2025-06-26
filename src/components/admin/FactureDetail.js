import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { factures } from "./Factures";
import { Box, Typography, Paper, IconButton, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ReceiptIcon from "@mui/icons-material/Receipt";

export default function FactureDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  const facture = factures.find(
    f => String(f.id) === String(id) && f.clientEmail === clientEmail
  );

  if (!facture) return <Typography>Facture introuvable.</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <ReceiptIcon sx={{ color: "#eab308", fontSize: 36, mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="#eab308">
            Détail de la facture #{facture.id}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Typography fontWeight={600}>Client :</Typography>
        <Typography color="text.secondary">{facture.client}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
        <Typography color="text.secondary">{facture.clientEmail}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Date :</Typography>
        <Typography color="text.secondary">{facture.date}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
        <Typography color="text.secondary">{facture.statut}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
        <Typography color="text.secondary">{facture.montant}</Typography>
        <Typography fontWeight={600} sx={{ mt: 1 }}>Description :</Typography>
        <Typography color="text.secondary">{facture.description}</Typography>
      </Paper>
    </Box>
  );
}