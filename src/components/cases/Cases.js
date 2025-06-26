import React, { useState } from "react";
import { Card, CardContent, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Chip } from "@mui/material";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CommentIcon from '@mui/icons-material/Comment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

function Cases() {
  // Exemple de tickets (à remplacer par des données dynamiques plus tard)
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Problème de connexion", status: "Ouvert", date: "2025-05-10", type: "Technique", description: "Impossible de se connecter au portail." },
    { id: 2, subject: "Question sur une facture", status: "Fermé", date: "2025-04-28", type: "Contestations", description: "Je conteste le montant de la facture d'avril." }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    type: "",
    description: ""
  });

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewTicket({ subject: "", type: "", description: "" });
  };

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.type || !newTicket.description) return;
    setTickets([
      ...tickets,
      {
        id: tickets.length + 1,
        subject: newTicket.subject,
        status: "Ouvert",
        date: new Date().toISOString().slice(0, 10),
        type: newTicket.type,
        description: newTicket.description
      }
    ]);
    handleDialogClose();
  };

  const getTypeIcon = (type) => {
    if (type === "Technique") return <ReportProblemIcon sx={{ color: "#ff9800", mr: 1 }} />;
    if (type === "Commentaire") return <CommentIcon sx={{ color: "#2196f3", mr: 1 }} />;
    if (type === "Contestations") return <SupportAgentIcon sx={{ color: "#663399", mr: 1 }} />;
    return null;
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 6 }}>
      <Typography variant="h4" sx={{ color: "#663399", fontWeight: "bold", mb: 3 }}>
        Mes tickets de support
      </Typography>
      <Grid container spacing={3}>
        {tickets.map(ticket => (
          <Grid item xs={12} md={6} key={ticket.id}>
            <Card sx={{ borderLeft: `6px solid ${ticket.status === "Ouvert" ? "#ff9800" : "#4caf50"}` }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {getTypeIcon(ticket.type)}
                  <Typography variant="h6">{ticket.subject}</Typography>
                  <Chip
                    label={ticket.status}
                    color={ticket.status === "Ouvert" ? "warning" : "success"}
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Type :</b> {ticket.type}
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <b>Description :</b> {ticket.description}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <b>Date :</b> {ticket.date}
                </Typography>
                <Button variant="outlined" size="small" sx={{ color: "#663399", borderColor: "#663399" }}>
                  Voir le ticket
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "right", mt: 3 }}>
        <Button variant="contained" sx={{ bgcolor: "#663399" }} onClick={handleDialogOpen}>
          Ouvrir un nouveau ticket
        </Button>
      </Box>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Ouvrir un nouveau ticket</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Sujet"
            name="subject"
            fullWidth
            value={newTicket.subject}
            onChange={handleInputChange}
          />
          <TextField
            select
            margin="dense"
            label="Type"
            name="type"
            fullWidth
            SelectProps={{ native: true }}
            value={newTicket.type}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          >
            <option >Sélectionner un type</option>
            <option value="Technique">Problème technique</option>
            <option value="Commentaire">Commentaire</option>
            <option value="Contestations">Contestations</option>
          </TextField>
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            minRows={3}
            value={newTicket.description}
            onChange={handleInputChange}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Annuler</Button>
          <Button onClick={handleCreateTicket} variant="contained" sx={{ bgcolor: "#663399" }}>
            Envoyer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Cases;