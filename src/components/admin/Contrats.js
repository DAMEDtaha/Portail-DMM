import React, { useState } from "react";
import {
  Box, Typography, Paper, List, ListItem, ListItemText, Avatar, IconButton, Button, Grid, Divider
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate, useLocation } from "react-router-dom";

// Exemple de données contrats (à remplacer par un fetch API plus tard)
const contrats = [
  {
    id: 201,
    client: "Ouadhani Mohamed TAHA",
    clientEmail: "taha@dmm.com",
    dateDebut: "2024-01-01",
    dateFin: "2025-01-01",
    statut: "Actif",
    montant: "1200 €",
    description: "Contrat annuel de prestation de service.",
    reference: "C-2024-201"
  },
  {
    id: 202,
    client: "Fatima Zahra",
    clientEmail: "fatima@dmm.com",
    dateDebut: "2023-06-15",
    dateFin: "2024-06-15",
    statut: "Expiré",
    montant: "800 €",
    description: "Contrat de maintenance.",
    reference: "C-2023-202"
  }
];

export default function Contrats() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const clientEmail = params.get("client");

  // Filtrer les contrats si un client est précisé
  const contratsFiltres = clientEmail
    ? contrats.filter(c => c.clientEmail === clientEmail)
    : contrats;

  // État pour afficher le détail d’un contrat
  const [contratDetail, setContratDetail] = useState(null);

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
        background: "linear-gradient(135deg, #ede9fe 0%, #f8fafc 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(124,58,237,0.10)",
      }}
    >
      <IconButton
        onClick={() => navigate("/AdminDashboard")}
        sx={{
          mb: 2,
          alignSelf: "flex-start",
          bgcolor: "#ede9fe",
          color: "#7c3aed",
          "&:hover": { bgcolor: "#d1c4e9" }
        }}
        size="large"
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>

      {/* Affichage du détail du contrat sélectionné */}
      {contratDetail && (
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            width: "100%",
            mb: 3,
            background: "rgba(255,255,255,0.98)",
            boxShadow: "0 4px 24px 0 rgba(124,58,237,0.08)",
          }}
          elevation={0}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AssignmentIcon sx={{ color: "#7c3aed", fontSize: 36, mr: 1 }} />
            <Typography variant="h5" fontWeight={700} color="#7c3aed">
              Détail du contrat #{contratDetail.id}
            </Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Client :</Typography>
              <Typography color="text.secondary">{contratDetail.client}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Email :</Typography>
              <Typography color="text.secondary">{contratDetail.clientEmail}</Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Référence :</Typography>
              <Typography color="text.secondary">{contratDetail.reference}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography fontWeight={600}>Période :</Typography>
              <Typography color="text.secondary">
                Du {contratDetail.dateDebut} au {contratDetail.dateFin}
              </Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Statut :</Typography>
              <Typography color={contratDetail.statut === "Actif" ? "success.main" : "error.main"}>
                {contratDetail.statut}
              </Typography>
              <Typography fontWeight={600} sx={{ mt: 1 }}>Montant :</Typography>
              <Typography color="text.secondary">{contratDetail.montant}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
          <Typography fontWeight={600}>Description :</Typography>
          <Typography color="text.secondary">{contratDetail.description}</Typography>
          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setContratDetail(null)}
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
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 24px 0 rgba(124,58,237,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textShadow: "0 2px 8px rgba(124,58,237,0.08)" }}>
          <AssignmentIcon sx={{ mr: 1, color: "#7c3aed", fontSize: 36 }} />
          Liste des contrats
        </Typography>
        <List sx={{ width: "100%" }}>
          {contratsFiltres.map(contrat => (
            <ListItem
              key={contrat.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: "#ede9fe",
                boxShadow: "0 2px 8px 0 rgba(124,58,237,0.06)",
                "&:hover": { bgcolor: "#e0e7ff" }
              }}
              secondaryAction={
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => setContratDetail(contrat)}
                  sx={{
                    bgcolor: "#7c3aed",
                    color: "#fff",
                    fontWeight: 600,
                    borderRadius: 2,
                    boxShadow: "0 2px 8px 0 rgba(124,58,237,0.10)",
                    "&:hover": { bgcolor: "#663399" }
                  }}
                  startIcon={<InfoIcon />}
                >
                  Voir les détails
                </Button>
              }
            >
              <Avatar sx={{ bgcolor: "#7c3aed", mr: 2, width: 48, height: 48, fontSize: 22 }}>
                <AssignmentIcon />
              </Avatar>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color="#7c3aed">
                    Contrat #{contrat.id} - {contrat.client}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" fontSize="1rem">
                    Du {contrat.dateDebut} au {contrat.dateFin} | Statut : {contrat.statut}
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

export { contrats };