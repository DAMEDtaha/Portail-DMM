import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Stack,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  MenuItem,
  GlobalStyles
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventIcon from '@mui/icons-material/Event';
import jsPDF from 'jspdf';

const PageHeader = styled('div')({
  background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
  color: '#fff',
  padding: '60px 0',
  marginBottom: '40px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
});

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-head': {
    backgroundColor: '#6a1b9a',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
});

const StyledCard = styled(Card)({
  borderRadius: '22px',
  boxShadow: '0 12px 36px rgba(106,27,154,0.13)',
  transition: 'transform 0.3s cubic-bezier(.4,2,.6,1)',
  '&:hover': {
    transform: 'translateY(-10px) scale(1.012)'
  },
  padding: '18px 0',
  minWidth: '98%',
  maxWidth: '98%',
  margin: '0 auto'
});

const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  marginBottom: '20px',
  backdropFilter: 'blur(6px)',
  background: 'rgba(255, 255, 255, 0.6)',
  borderRadius: '18px',
  border: '1px solid rgba(142,36,170,0.3)',
  boxShadow: '0 8px 24px rgba(142,36,170,0.12)',
  padding: '20px',
  transition: 'all 0.3s ease'
});

function Invoices() {
  // Données factures exemple
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

  // Génération PDF (mock)
  const handleDownloadPDF = (invoice) => {
    const doc = new jsPDF();
    doc.text(`Facture: ${invoice.id}\nAnnée: ${invoice.annee}\nMois: ${invoice.mois}\nMontant: ${invoice.montant} €`, 10, 10);
    doc.save(`${invoice.id}.pdf`);
  };

  // Ouvre le dialog d'édition
  const handleEdit = (invoice) => {
    setEditInvoice(invoice);
    setEditDialog(true);
  };
  const handleEditClose = () => {
    setEditDialog(false);
    setEditInvoice(null);
  };

  // Filtres et recherche
  const filteredInvoices = invoices.filter(inv => {
    const matchAnnee = !anneeFilter || inv.annee === Number(anneeFilter);
    const matchMois = !moisFilter || inv.mois === moisFilter;
    const matchSearch = !search || inv.id.toLowerCase().includes(search.toLowerCase());
    return matchAnnee && matchMois && matchSearch;
  });

  // Liste unique des années et mois
  // On génère la liste des années de 2000 à l'année courante
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
        html: { overflow: 'hidden', width: '100vw', height: '100vh' },
        body: { overflow: 'hidden', width: '100vw', height: '100vh' },
        '#root': { overflow: 'hidden', width: '100vw', height: '100vh' },
      }} />
      <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', pb: 6, fontFamily: 'Inter, Roboto, Arial, sans-serif', px: { xs: 0, md: 4 }, overflow: 'hidden' }}>
        <Container maxWidth={false} disableGutters sx={{ pt: 6, pb: 2, width: '100vw', maxWidth: '100vw', px: { xs: 2, md: 6 }, overflow: 'hidden' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: 32, md: 38 }, color: '#111', mb: 2, textAlign: 'left', letterSpacing: 0.5 }}>
            Factures
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
            <TextField
              label={<><ReceiptIcon sx={{ fontSize: 28, color: '#6a1b9a', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Recherche par N° facture</span></>}
              size="medium"
              value={search}
              onChange={e => setSearch(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 260, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            />
            <TextField
              select
              label={<><EventIcon sx={{ fontSize: 28, color: '#6a1b9a', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Année</span></>}
              size="medium"
              value={anneeFilter}
              onChange={e => setAnneeFilter(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 180, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            >
              <MenuItem value="">Toutes</MenuItem>
              {annees.map(a => <MenuItem key={a} value={a} style={{ fontSize: 18, fontWeight: 600 }}>{a}</MenuItem>)}
            </TextField>
            <TextField
              select
              label={<><EventIcon sx={{ fontSize: 28, color: '#6a1b9a', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Mois</span></>}
              size="medium"
              value={moisFilter}
              onChange={e => setMoisFilter(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 180, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            >
              <MenuItem value="">Tous</MenuItem>
              {mois.map(m => <MenuItem key={m} value={m} style={{ fontSize: 18, fontWeight: 600 }}>{m}</MenuItem>)}
            </TextField>
          </Box>
        </Container>
        <Container maxWidth={false} disableGutters sx={{ pt: 0, width: '100vw', maxWidth: '100vw', px: { xs: 2, md: 6 }, overflow: 'hidden' }}>
          <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 'none', border: '1px solid #eee', mt: 2, width: '100%', maxWidth: '100vw', overflow: 'hidden' }}>
            <Table sx={{ width: '100%', maxWidth: '100vw', minWidth: 0, tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#222', fontWeight: 700, fontSize: 18, background: '#fafafa', borderBottom: '2px solid #eee' }}>Année</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 700, fontSize: 18, background: '#fafafa', borderBottom: '2px solid #eee' }}>Mois</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 700, fontSize: 18, background: '#fafafa', borderBottom: '2px solid #eee' }}>Montant</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 700, fontSize: 18, background: '#fafafa', borderBottom: '2px solid #eee' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} sx={{ textAlign: 'center', color: '#aaa', fontSize: 18 }}>Aucune facture trouvée.</TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((row) => (
                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell sx={{ color: '#222', fontWeight: 500, fontSize: 17 }}>{row.annee}</TableCell>
                      <TableCell sx={{ color: '#222', fontWeight: 600, fontSize: 17 }}>{row.mois}</TableCell>
                      <TableCell sx={{ color: '#222', fontWeight: 500, fontSize: 17 }}>{row.montant} €</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button variant="outlined" color="secondary" sx={{ borderRadius: 2, fontWeight: 600 }} onClick={() => handleEdit(row)}>Modifier</Button>
                          <Button variant="contained" color="primary" sx={{ borderRadius: 2, fontWeight: 600, bgcolor: '#6a1b9a' }} onClick={() => handleDownloadPDF(row)}>Télécharger PDF</Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        {/* Dialog édition facture */}
        <Dialog open={editDialog} onClose={handleEditClose}>
          <DialogTitle>Modifier la facture</DialogTitle>
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
            <Button variant="contained" onClick={handleEditClose}>Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Invoices;