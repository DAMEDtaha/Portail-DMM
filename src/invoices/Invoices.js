import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  GlobalStyles,
  Chip
} from '@mui/material';
// Illustration SVG décorative (peut être remplacée par une image locale si besoin)
const InvoiceIllustration = () => (
  <svg width="180" height="120" viewBox="0 0 180 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="20" width="160" height="90" rx="18" fill="#ede7f6"/>
    <rect x="30" y="40" width="120" height="50" rx="10" fill="#d1c4e9"/>
    <rect x="40" y="50" width="100" height="10" rx="4" fill="#b39ddb"/>
    <rect x="40" y="65" width="60" height="8" rx="4" fill="#b39ddb"/>
    <circle cx="150" cy="100" r="10" fill="#9575cd"/>
    <circle cx="30" cy="35" r="6" fill="#9575cd"/>
  </svg>
);
import { styled } from '@mui/material/styles';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventIcon from '@mui/icons-material/Event';
import jsPDF from 'jspdf';

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-head': {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem',
    borderBottom: '2px solid #5a189a'
  }
});

function Invoices() {
  const invoices = [
    { id: 'FAC001', date: '2024-01-15', montant: 1500, annee: 2024, mois: 'Janvier' },
    { id: 'FAC002', date: '2024-02-10', montant: 2300, annee: 2024, mois: 'Février' },
    { id: 'FAC003', date: '2023-12-05', montant: 800, annee: 2023, mois: 'Décembre' },
  ];
  const [search, setSearch] = useState('');
  const [anneeFilter, setAnneeFilter] = useState('');
  const [moisFilter, setMoisFilter] = useState('');
  const [editDialog, setEditDialog] = useState(false);
  const [editInvoice, setEditInvoice] = useState(null);

  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Facture: ${invoice.id}\nAnnée: ${invoice.annee}\nMois: ${invoice.mois}\nMontant: ${invoice.montant} €`, 10, 10);
    doc.save(`${invoice.id}.pdf`);
  };

  const handleEdit = (invoice) => {
    setEditInvoice(invoice);
    setEditDialog(true);
  };
  const handleEditClose = () => {
    setEditDialog(false);
    setEditInvoice(null);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchAnnee = !anneeFilter || inv.annee === Number(anneeFilter);
    const matchMois = !moisFilter || inv.mois === moisFilter;
    const matchSearch = !search || inv.id.toLowerCase().includes(search.toLowerCase());
    return matchAnnee && matchMois && matchSearch;
  });

  const currentYear = new Date().getFullYear();
  const annees = [];
  for (let y = 2000; y <= currentYear; y++) {
    annees.push(y);
  }
  const mois = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <>
      <GlobalStyles styles={{
        html: { overflowX: 'hidden' },
        body: { overflowX: 'hidden' },
        '#root': { overflowX: 'hidden' },
      }} />

      <Box
        sx={{
          bgcolor: '#f5f5fa',
          minHeight: '100vh',
          pb: 6,
          px: { xs: 0, md: 4 },
          fontFamily: 'Inter, Roboto, Arial, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Décorations SVG en arrière-plan */}
        <Box
          sx={{
            position: 'absolute',
            top: -80,
            left: -120,
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
          }}
        >
          <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="160" fill="#a78bfa" />
          </svg>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
          }}
        >
          <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
            <rect x="0" y="0" width="260" height="260" rx="80" fill="#6a1b9a" />
          </svg>
        </Box>
        {/* SVG Personnage à gauche */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: -30,
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <svg width="140" height="180" viewBox="0 0 140 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="70" cy="170" rx="50" ry="10" fill="#ede7f6"/>
            <circle cx="70" cy="60" r="35" fill="#b39ddb"/>
            <ellipse cx="70" cy="120" rx="32" ry="40" fill="#9575cd"/>
            <rect x="55" y="110" width="30" height="40" rx="12" fill="#ede7f6"/>
            <ellipse cx="55" cy="130" rx="7" ry="12" fill="#b39ddb"/>
            <ellipse cx="85" cy="130" rx="7" ry="12" fill="#b39ddb"/>
            <ellipse cx="70" cy="60" rx="10" ry="8" fill="#fff"/>
            <ellipse cx="60" cy="58" rx="4" ry="3" fill="#6a1b9a"/>
            <ellipse cx="80" cy="58" rx="4" ry="3" fill="#6a1b9a"/>
            <rect x="65" y="70" width="10" height="4" rx="2" fill="#6a1b9a"/>
          </svg>
        </Box>
        {/* SVG Facture à droite */}
        <Box
          sx={{
            position: 'absolute',
            top: 60,
            right: 40,
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <rect x="10" y="20" width="100" height="80" rx="18" fill="#ede7f6"/>
            <rect x="25" y="40" width="70" height="40" rx="10" fill="#d1c4e9"/>
            <rect x="35" y="50" width="50" height="8" rx="4" fill="#b39ddb"/>
            <rect x="35" y="65" width="30" height="6" rx="3" fill="#b39ddb"/>
            <circle cx="95" cy="90" r="7" fill="#9575cd"/>
            <circle cx="25" cy="35" r="4" fill="#9575cd"/>
          </svg>
        </Box>
        {/* SVG Personnages au centre pour expérience vivante */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            opacity: 1,
            pointerEvents: 'none',
            display: { xs: 'none', md: 'block' }
          }}
        >
          <svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Personnage 1 */}
            <ellipse cx="70" cy="170" rx="40" ry="8" fill="#ede7f6"/>
            <circle cx="70" cy="90" r="32" fill="#b39ddb"/>
            <ellipse cx="70" cy="130" rx="28" ry="32" fill="#9575cd"/>
            <rect x="54" y="120" width="32" height="36" rx="12" fill="#ede7f6"/>
            <ellipse cx="60" cy="140" rx="6" ry="10" fill="#b39ddb"/>
            <ellipse cx="80" cy="140" rx="6" ry="10" fill="#b39ddb"/>
            <ellipse cx="70" cy="90" rx="8" ry="7" fill="#fff"/>
            {/* Personnage 2 */}
            <ellipse cx="170" cy="170" rx="40" ry="8" fill="#ede7f6"/>
            <circle cx="170" cy="90" r="32" fill="#ffd54f"/>
            <ellipse cx="170" cy="130" rx="28" ry="32" fill="#ffb300"/>
            <rect x="154" y="120" width="32" height="36" rx="12" fill="#fffde7"/>
            <ellipse cx="160" cy="140" rx="6" ry="10" fill="#ffe082"/>
            <ellipse cx="180" cy="140" rx="6" ry="10" fill="#ffe082"/>
            <ellipse cx="170" cy="90" rx="8" ry="7" fill="#fff"/>
            {/* Personnage 3 */}
            <ellipse cx="270" cy="170" rx="40" ry="8" fill="#ede7f6"/>
            <circle cx="270" cy="90" r="32" fill="#81d4fa"/>
            <ellipse cx="270" cy="130" rx="28" ry="32" fill="#0288d1"/>
            <rect x="254" y="120" width="32" height="36" rx="12" fill="#e1f5fe"/>
            <ellipse cx="260" cy="140" rx="6" ry="10" fill="#4fc3f7"/>
            <ellipse cx="280" cy="140" rx="6" ry="10" fill="#4fc3f7"/>
            <ellipse cx="270" cy="90" rx="8" ry="7" fill="#fff"/>
            {/* Factures flottantes */}
            <rect x="110" y="30" width="28" height="18" rx="4" fill="#ede7f6" stroke="#b39ddb" strokeWidth="2"/>
            <rect x="210" y="20" width="28" height="18" rx="4" fill="#ede7f6" stroke="#b39ddb" strokeWidth="2"/>
            <rect x="150" y="60" width="28" height="18" rx="4" fill="#ede7f6" stroke="#b39ddb" strokeWidth="2"/>
          </svg>
        </Box>

        {/* Header moderne avec illustration et badge */}
        <Container maxWidth={false} disableGutters sx={{ pt: 6, pb: 3, px: { xs: 2, md: 6 }, position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 3, position: 'relative' }}>
            <Box sx={{ position: 'absolute', right: 0, top: -30, opacity: 0.18, zIndex: 0 }}>
              <InvoiceIllustration />
            </Box>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: 32, md: 38 }, color: '#222', letterSpacing: 0.5, display: 'flex', alignItems: 'center', zIndex: 1 }}>
              <ReceiptIcon sx={{ fontSize: 44, color: '#6a1b9a', mr: 1 }} />
              Mes factures
              <Chip label={filteredInvoices.length + ' factures'} sx={{ ml: 2, bgcolor: '#ede7f6', color: '#6a1b9a', fontWeight: 700, fontSize: 20, px: 2, py: 0.5, borderRadius: 2, display: { xs: 'none', md: 'inline-flex' } }} />
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, zIndex: 1, position: 'relative' }}>
            <TextField
              label={<><ReceiptIcon sx={{ fontSize: 22, color: '#6a1b9a', mr: 1 }} /> <span style={{fontWeight:600}}>N° facture</span></>}
              size="medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{
                bgcolor: '#fff',
                borderRadius: '12px',
                minWidth: 220,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                '& .MuiInputBase-input': { fontWeight: 500 }
              }}
            />
            <TextField
              select
              label={<><EventIcon sx={{ fontSize: 22, color: '#6a1b9a', mr: 1 }} /> <span style={{fontWeight:600}}>Année</span></>}
              value={anneeFilter}
              onChange={e => setAnneeFilter(e.target.value)}
              sx={{
                bgcolor: '#fff',
                borderRadius: '12px',
                minWidth: 140,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                '& .MuiInputBase-input': { fontWeight: 500 }
              }}
            >
              <MenuItem value="">Toutes</MenuItem>
              {annees.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)}
            </TextField>
            <TextField
              select
              label={<><EventIcon sx={{ fontSize: 22, color: '#6a1b9a', mr: 1 }} /> <span style={{fontWeight:600}}>Mois</span></>}
              value={moisFilter}
              onChange={e => setMoisFilter(e.target.value)}
              sx={{
                bgcolor: '#fff',
                borderRadius: '12px',
                minWidth: 140,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                '& .MuiInputBase-input': { fontWeight: 500 }
              }}
            >
              <MenuItem value="">Tous</MenuItem>
              {mois.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
            </TextField>
          </Box>
        </Container>
        {/* Tableau modernisé avec colonne Actions adaptée */}
        <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, md: 6 } }}>
          <TableContainer component={Paper} sx={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 32px rgba(0,0,0,0.08)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Année</StyledTableCell>
                  <StyledTableCell>Mois</StyledTableCell>
                  <StyledTableCell>Montant</StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 210, width: 210, textAlign: 'center' }}>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#999', fontSize: 17, py: 3 }}>
                      Aucune facture trouvée.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((row) => (
                    <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: '#f3e5f5' } }}>
                      <TableCell sx={{ fontWeight: 500 }}>{row.annee}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>{row.mois}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.montant} €</TableCell>
                      <TableCell sx={{ minWidth: 210, width: 210, textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{
                              borderRadius: 2,
                              fontWeight: 600,
                              textTransform: 'none',
                              borderColor: '#6a1b9a',
                              color: '#6a1b9a',
                              px: 2.5,
                              minWidth: 110,
                              fontSize: 16,
                              '&:hover': { backgroundColor: '#f3e5f5', borderColor: '#6a1b9a' }
                            }}
                            onClick={() => handleEdit(row)}
                          >
                            Modifier
                          </Button>
                          <Button
                            variant="contained"
                            sx={{
                              borderRadius: 2,
                              fontWeight: 600,
                              textTransform: 'none',
                              bgcolor: '#6a1b9a',
                              px: 2.5,
                              minWidth: 110,
                              fontSize: 16,
                              '&:hover': { bgcolor: '#7b1fa2' }
                            }}
                            onClick={() => handleDownloadPDF(row)}
                          >
                            Télécharger
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Dialog open={editDialog} onClose={handleEditClose} PaperProps={{ sx: { borderRadius: '16px' } }}>
          <DialogTitle sx={{ fontWeight: 700 }}>Modifier la facture</DialogTitle>
          <DialogContent>
            {editInvoice && (
              <Box sx={{ pt: 2, display: 'grid', gap: 2 }}>
                <TextField label="Année" value={editInvoice.annee} fullWidth disabled />
                <TextField label="Mois" value={editInvoice.mois} fullWidth disabled />
                <TextField label="Montant" value={editInvoice.montant} fullWidth />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Annuler</Button>
            <Button
              variant="contained"
              sx={{ bgcolor: '#6a1b9a', '&:hover': { bgcolor: '#7b1fa2' } }}
              onClick={handleEditClose}
            >
              Enregistrer
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Invoices;
