import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from "@mui/material";
import MenuItem from '@mui/material/MenuItem';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import BugReportIcon from '@mui/icons-material/BugReport';
import InfoIcon from '@mui/icons-material/Info';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Cases() {
  // Exemple de tickets (à remplacer par des données dynamiques plus tard)
  const [tickets, setTickets] = useState([
    { id: 1, subject: "Problème de connexion", status: "Ouvert", date: "2025-05-10" },
    { id: 2, subject: "Question sur une facture", status: "Fermé", date: "2025-04-28" }
  ]);
  const [newTicket, setNewTicket] = useState({ subject: "", description: "" });

  const problemTypes = [
    'Problème de connexion',
    'Facture ou paiement',
    'Problème technique',
    'Demande d\'information',
    'Autre'
  ];

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.description) return;
    setTickets([
      ...tickets,
      {
        id: tickets.length + 1,
        subject: newTicket.subject,
        status: "Ouvert",
        date: new Date().toISOString().slice(0, 10)
      }
    ]);
    // Envoi d'email au support en parallèle
    try {
      await fetch('/api/send-support-mail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newTicket.subject,
          description: newTicket.description
        })
      });
    } catch (err) {
      // Optionnel: afficher une notification d'échec
    }
    setNewTicket({ subject: '', description: '' });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Problème de connexion':
        return <SupportAgentIcon sx={{ color: '#2563eb', mr: 1 }} />;
      case 'Facture ou paiement':
        return <ReceiptLongIcon sx={{ color: '#0ea5e9', mr: 1 }} />;
      case 'Problème technique':
        return <BugReportIcon sx={{ color: '#eab308', mr: 1 }} />;
      case "Demande d'information":
        return <InfoIcon sx={{ color: '#6366f1', mr: 1 }} />;
      case 'Autre':
        return <HelpOutlineIcon sx={{ color: '#64748b', mr: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{
      bgcolor: '#f8fafc',
      minHeight: '100vh',
      width: '100%',
      px: 0,
      py: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden',
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 3000,
        mx: 'auto',
        bgcolor: 'white',
        borderRadius: 5,
        boxShadow: '0 8px 32px 0 rgba(38,132,255,0.10)',
        p: { xs: 2, sm: 5 },
        minHeight: 650,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1.5px solid #e3e8f0',
      }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3, letterSpacing: -1, ml: 0, mt: 2, color: '#2563eb' }}>
          Support
        </Typography>
        {/* New request */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, fontSize: 22, ml: 0, color: '#22223b' }}>
          Nouvelle demande
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4, width: '100%', maxWidth: 600, ml: 0, background: '#f6f8fa', borderRadius: 3, p: 3, boxShadow: '0 2px 8px 0 rgba(38,132,255,0.04)' }}>
          <TextField
            select
            label="Choisir le type de problème"
            name="subject"
            value={newTicket.subject}
            onChange={handleInputChange}
            fullWidth
            placeholder="Choisir le type de problème"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 4px 0 rgba(38,132,255,0.04)' }}
            InputProps={{ style: { borderRadius: 10, fontSize: 17, background: 'white' } }}
          >
            {problemTypes.map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={newTicket.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            minRows={4}
            placeholder="Enter description"
            sx={{ mb: 2, bgcolor: 'white', borderRadius: 2, boxShadow: '0 1px 4px 0 rgba(38,132,255,0.04)' }}
            InputProps={{ style: { borderRadius: 10, fontSize: 17, background: 'white' } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#2563eb',
                borderRadius: 8,
                px: 4,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: 17,
                boxShadow: '0 2px 8px rgba(38,132,255,0.10)',
                height: 42,
                letterSpacing: 1
              }}
            >
              Valider
            </Button>
            <Box sx={{ width: 16 }} />
            <Box sx={{ width: 12, height: 12, bgcolor: '#2563eb', borderRadius: '50%', ml: 1, mb: 0.5, boxShadow: '0 0 8px #2563eb33' }} />
          </Box>
        </Box>
        {/* Submitted requests */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: 22, ml: 0, color: '#22223b' }}>
          Demandes soumises
        </Typography>
        <TableContainer sx={{ borderRadius: 3, boxShadow: '0 2px 8px 0 rgba(38,132,255,0.04)', width: '100%', background: '#f8fafc', overflowX: 'auto', border: '1px solid #e3e8f0' }}>
          <Table sx={{ minWidth: 650, width: '100%' }}>
            <TableHead>
              <TableRow sx={{ background: '#f6f8fa' }}>
                <TableCell sx={{ fontWeight: 800, borderTopLeftRadius: 12, fontSize: 16, color: '#2563eb', letterSpacing: 0.5 }}>Sujet</TableCell>
                <TableCell sx={{ fontWeight: 800, fontSize: 16, color: '#2563eb', letterSpacing: 0.5 }}>Statut</TableCell>
                <TableCell sx={{ fontWeight: 800, borderTopRightRadius: 12, fontSize: 16, color: '#2563eb', letterSpacing: 0.5 }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id} sx={{ '&:hover': { background: '#e0e7ff' } }}>
                  <TableCell sx={{ fontSize: 16, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                    {getTypeIcon(ticket.subject)}
                    {ticket.subject}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={ticket.status === 'Ouvert' ? 'Open' : ticket.status === 'Fermé' ? 'Closed' : ticket.status}
                      sx={{
                        bgcolor: ticket.status === 'Ouvert' ? '#e0e7ff' : '#e9f7ef',
                        color: ticket.status === 'Ouvert' ? '#2563eb' : '#2e7d32',
                        fontWeight: 700,
                        borderRadius: 2,
                        px: 2,
                        minWidth: 70,
                        boxShadow: 'none',
                        fontSize: 15
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#2563eb', fontWeight: 600, fontSize: 16 }}>{ticket.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Cases;