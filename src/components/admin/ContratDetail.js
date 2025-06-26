import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, IconButton, Divider, Grid } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { contrats } from "./Contrats";

export default function ContratDetail() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  // Même logique que CommandeDetail
  const contrat = contrats.find(
    c => String(c.id) === String(id) && c.clientEmail === clientEmail
  );

  if (!contrat) return <Typography>Contrat introuvable.</Typography>;

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        <ArrowBackIcon />
      </IconButton>
      <Paper sx={{ p: 4, borderRadius: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <AssignmentIcon sx={{ color: "#7c3aed", fontSize: 36, mr: 1 }} />
          <Typography variant="h5" fontWeight={700} color="#7c3aed">
            Détail du contrat #{contrat.id}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Client :</Typography>
            <Typography color="text.secondary">{contrat.client}</Typography>
            <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
            <Typography color="text.secondary">{contrat.clientEmail}</Typography>
            <Typography fontWeight={600} sx={{ mt: 1 }}>Référence :</Typography>
            <Typography color="text.secondary">{contrat.reference}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontWeight={600}>Période :</Typography>
            <Typography color="text.secondary">
              Du {contrat.dateDebut} au {contrat.dateFin}
            </Typography>
            <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
            <Typography color={contrat.statut === "Actif" ? "success.main" : "error.main"}>
              {contrat.statut}
            </Typography>
            <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
            <Typography color="text.secondary">{contrat.montant}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2 }} />
        <Typography fontWeight={600}>Description :</Typography>
        <Typography color="text.secondary">{contrat.description}</Typography>
      </Paper>
    </Box>
  );
}