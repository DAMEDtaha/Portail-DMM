import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Grid, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, Chip, Stack } from "@mui/material";
import jsPDF from "jspdf";

// Exemple de données fictives (à remplacer par un fetch API réel)
const contrats = [
  {
    id: "CTR001",
    nom: "Contrat SEO Annuel",
    date: "2024-01-10",
    statut: "En cours",
    montant: "1200 €"
  },
  {
    id: "CTR002",
    nom: "Contrat Site Web",
    date: "2023-11-05",
    statut: "Terminé",
    montant: "2500 €"
  }
];

const bonsDeCommandes = [
  {
    id: "BDC001",
    commandeId: "CMD001",
    date: "2024-01-15",
    montant: "1500 €",
    statut: "Validé"
  },
  {
    id: "BDC002",
    commandeId: "CMD002",
    date: "2024-01-10",
    montant: "2300 €",
    statut: "En attente"
  }
];

function BonsDeCommandes() {
  const [openDialog, setOpenDialog] = useState(false);
  const [contratResiliation, setContratResiliation] = useState(null);
  const [motif, setMotif] = useState("");
  const [success, setSuccess] = useState(false);

  // Générer un PDF pour un contrat
  const handleDownloadContratPDF = (contrat) => {
    const doc = new jsPDF();
    doc.text(`Contrat: ${contrat.nom}`, 10, 10);
    doc.text(`Numéro: ${contrat.id}`, 10, 20);
    doc.text(`Date: ${contrat.date}`, 10, 30);
    doc.text(`Statut: ${contrat.statut}`, 10, 40);
    doc.text(`Montant: ${contrat.montant}`, 10, 50);
    doc.save(`Contrat_${contrat.id}.pdf`);
  };

  // Générer un PDF pour un bon de commande
  const handleDownloadBDCpdf = (bdc) => {
    const doc = new jsPDF();
    doc.text(`Bon de Commande: ${bdc.id}`, 10, 10);
    doc.text(`Commande liée: ${bdc.commandeId}`, 10, 20);
    doc.text(`Date: ${bdc.date}`, 10, 30);
    doc.text(`Statut: ${bdc.statut}`, 10, 40);
    doc.text(`Montant: ${bdc.montant}`, 10, 50);
    doc.save(`BDC_${bdc.id}.pdf`);
  };

  // Fonctions de résiliation (inchangées)
  const handleOpenResiliation = (contrat) => {
    setContratResiliation(contrat);
    setMotif("");
    setOpenDialog(true);
    setSuccess(false);
  };
  const handleCloseResiliation = () => {
    setOpenDialog(false);
    setContratResiliation(null);
    setMotif("");
    setSuccess(false);
  };
  const handleSendResiliation = () => {
    if (!contratResiliation) return;
    const subject = encodeURIComponent(`Demande de résiliation du contrat ${contratResiliation.nom} (${contratResiliation.id})`);
    const body = encodeURIComponent(
      `Bonjour,\n\nJe souhaite résilier mon contrat "${contratResiliation.nom}" (N° ${contratResiliation.id}) souscrit le ${contratResiliation.date}.\nMotif : ${motif}\n\nMerci de bien vouloir prendre en compte ma demande.\n\nCordialement,`
    );
    window.location.href = `mailto:support@dmm.com?subject=${subject}&body=${body}`;
    setSuccess(true);
    setTimeout(() => {
      handleCloseResiliation();
    }, 2000);
  };

  return (
    <Box sx={{ p: { xs: 1, md: 4 }, bgcolor: "#f8f8fc", minHeight: "100vh" }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: "#663399", mb: 4, textAlign: "center" }}>
        Espace Bons de Commandes & Contrats
      </Typography>
      <Divider sx={{ mb: 4 }} />

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#7c3aed" }}>
        Mes Contrats
      </Typography>
      <Grid container spacing={3} mb={4}>
        {contrats.map(contrat => (
          <Grid item xs={12} md={6} key={contrat.id}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px #bdbdfc33", transition: "transform 0.2s", "&:hover": { transform: "translateY(-6px)", boxShadow: "0 8px 32px #bdbdfc55" }, bgcolor: "#fff" }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Typography variant="h6" fontWeight="bold">{contrat.nom}</Typography>
                  <Chip label={contrat.statut} color={contrat.statut === "Terminé" ? "success" : "warning"} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom>N° {contrat.id}</Typography>
                <Typography>Date : <b>{contrat.date}</b></Typography>
                <Typography>Montant : <b style={{ color: "#663399" }}>{contrat.montant}</b></Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2, fontWeight: "bold" }}
                  onClick={() => handleDownloadContratPDF(contrat)}
                >
                  Télécharger en PDF
                </Button>
                {contrat.statut !== "Terminé" && (
                  <Button
                    variant="outlined"
                    color="error"
                    sx={{ mt: 2, borderRadius: 2, fontWeight: "bold", ml: 2 }}
                    onClick={() => handleOpenResiliation(contrat)}
                  >
                    Résilier ce contrat
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog de résiliation */}
      <Dialog open={openDialog} onClose={handleCloseResiliation}>
        <DialogTitle sx={{ color: "#7c3aed", fontWeight: "bold" }}>Résilier le contrat</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Merci de préciser le motif de résiliation pour le contrat <b>{contratResiliation?.nom}</b> (N° {contratResiliation?.id}) :
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Motif de résiliation"
            type="text"
            fullWidth
            multiline
            minRows={2}
            value={motif}
            onChange={e => setMotif(e.target.value)}
            sx={{ bgcolor: "#f3f0fa", borderRadius: 2 }}
          />
          {success && <Alert severity="success" sx={{ mt: 2 }}>Votre demande de résiliation a été transmise au support.</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResiliation}>Annuler</Button>
          <Button
            onClick={handleSendResiliation}
            variant="contained"
            color="error"
            disabled={!motif}
            sx={{ fontWeight: "bold" }}
          >
            Envoyer la demande
          </Button>
        </DialogActions>
      </Dialog>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: "#7c3aed" }}>
        Mes Bons de Commandes
      </Typography>
      <Grid container spacing={3}>
        {bonsDeCommandes.map(bdc => (
          <Grid item xs={12} md={6} key={bdc.id}>
            <Card sx={{ borderRadius: 4, boxShadow: "0 4px 24px #bdbdfc33", transition: "transform 0.2s", "&:hover": { transform: "translateY(-6px)", boxShadow: "0 8px 32px #bdbdfc55" }, bgcolor: "#fff" }}>
              <CardContent>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <Typography variant="h6" fontWeight="bold">Bon de Commande {bdc.id}</Typography>
                  <Chip label={bdc.statut} color={bdc.statut === "Validé" ? "success" : "warning"} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" gutterBottom>Commande liée : {bdc.commandeId}</Typography>
                <Typography>Date : <b>{bdc.date}</b></Typography>
                <Typography>Montant : <b style={{ color: "#663399" }}>{bdc.montant}</b></Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, borderRadius: 2, fontWeight: "bold" }}
                  onClick={() => handleDownloadBDCpdf(bdc)}
                >
                  Télécharger en PDF
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default BonsDeCommandes;