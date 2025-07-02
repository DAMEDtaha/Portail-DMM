import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Drawer,
  ListItemIcon,
  Avatar,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Alert
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send'; // Import pour l'icône d'envoi
import { useNavigate } from "react-router-dom";

const sidebarWidthExpanded = 240;
const sidebarWidthCollapsed = 65;

const adminMenuItems = [
  { text: 'Clients', icon: <PeopleIcon />, path: '/admin/clients' },
  { text: 'Contrats', icon: <AssignmentIcon />, path: '/admin/contrats' },
  { text: 'Commandes', icon: <ShoppingCartIcon />, path: '/admin/commandes' },
  { text: 'Factures', icon: <ReceiptIcon />, path: '/admin/factures' },
  { text: 'Profil', icon: <PersonIcon />, path: '/admin/profil' },
];

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null); // Initialisé à null
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [clientToEnd, setClientToEnd] = useState(null);
  const [resiliationEmail, setResiliationEmail] = useState("");
  const [openProposalDialog, setOpenProposalDialog] = useState(false); // État pour la boîte de dialogue de proposition
  const [proposalDetails, setProposalDetails] = useState({ serviceName: '', description: '' }); // État pour les détails de la proposition
  const [clientForProposal, setClientForProposal] = useState(null); // Client sélectionné pour la proposition
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://maplateforme.io/api/projets')
      .then(response => {
        if (!response.ok) throw new Error('Erreur API');
        return response.json();
      })
      .then(data => {
        const projetsFormates = Array.isArray(data)
          ? data.map(projet => ({
              ...projet,
              id: projet.id || projet._id,
              nom: projet.nom || projet.name || '',
              statut: projet.statut || 'Projet API',
              date: projet.date || '',
            }))
          : [];
        setClients(projetsFormates);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les projets');
        setLoading(false);
      });
  }, []);

  // Calcul des statistiques (exemples simples)
  const totalClients = clients.length;
  const activeClients = clients.filter(client => client.statut === 'Actif').length;
  const totalClicks = clients.reduce((sum, client) => sum + (client.clicks || 0), 0);
  const totalServices = new Set(clients.flatMap(client => client.services || [])).size;

  // Filtrage des clients par nom
  const filteredClients = clients.filter(client =>
    (client.nom || '').toLowerCase().includes(search.toLowerCase())
  );

  // Filtrage des projets par nom (recherche)
  const filteredProjects = clients.filter(client => {
    if (!search) return true;
    if (typeof client.nom === 'string') {
      return client.nom.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  });

  // Fonction pour "finir" un client par email
  const handleEndClient = (email) => {
    setClients(prev =>
      prev.map(client =>
        client.email === email ? { ...client, statut: "Résilié" } : client
      )
    );
    if (selectedClient && selectedClient.email === email) {
      setSelectedClient({ ...selectedClient, statut: "Résilié" });
    }
  };

  // Nouvelle fonction pour ouvrir la boîte de dialogue de résiliation
  const handleOpenEndDialog = (client) => {
    setClientToEnd(client);
    setResiliationEmail(client.email); // Préremplir avec l'email du client
    setOpenDialog(true);
  };

  // Nouvelle fonction pour confirmer la résiliation
  const handleConfirmEndClient = () => {
    if (clientToEnd) {
      setClients(prev =>
        prev.map(client =>
          client.email === clientToEnd.email ? { ...client, statut: "Résilié" } : client
        ) 
      );
      if (selectedClient && selectedClient.email === clientToEnd.email) {
        setSelectedClient({ ...clientToEnd, statut: "Résilié" });
      }
      // Ici tu peux ajouter l'appel à une API pour envoyer l'email de résiliation à resiliationEmail
      // Exemple : sendResiliationEmail(resiliationEmail, clientToEnd)
    }
    setOpenDialog(false);
    setClientToEnd(null);
    setResiliationEmail("");
  };

  // Fonctions pour la boîte de dialogue de proposition de service
  const handleOpenProposalDialog = (client) => {
    setClientForProposal(client);
    setOpenProposalDialog(true);
  };

  const handleCloseProposalDialog = () => {
    setOpenProposalDialog(false);
    setClientForProposal(null);
    setProposalDetails({ serviceName: '', description: '' });
  };

  const handleSendProposal = () => {
    if (clientForProposal && proposalDetails.serviceName && proposalDetails.description) {
      // Ici, vous implémenteriez la logique pour envoyer la proposition de service
      console.log(`Sending proposal to ${clientForProposal.email}: Service - ${proposalDetails.serviceName}, Description - ${proposalDetails.description}`);
      // Par exemple, appel API: sendServiceProposal(clientForProposal, proposalDetails);
      handleCloseProposalDialog();
    } else {
      alert("Veuillez remplir tous les champs de la proposition.");
    }
  };

  const handleEdit = (row) => {
    // Exemple d'action de modification : ici tu peux ouvrir un formulaire ou naviguer vers une page d'édition
    alert(`Modification du projet : ${row.nom}`);
    // Tu peux remplacer cette alerte par une navigation ou une ouverture de modal
  };

  const handleDelete = (row) => {
    // Exemple d'envoi de mail pour suppression
    const mailto = `mailto:${row.email || 'admin@maplateforme.io'}?subject=Suppression du projet ${encodeURIComponent(row.nom)}&body=Bonjour,%0D%0AJe souhaite supprimer le projet : ${encodeURIComponent(row.nom)} (ID: ${row.id}).`;
    window.location.href = mailto;
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "linear-gradient(135deg, #ede7f6 0%, #fff 100%)" }}>
      {/* Sidebar admin */}
      <Drawer
        variant="permanent"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        sx={{
          width: isExpanded ? sidebarWidthExpanded : sidebarWidthCollapsed,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isExpanded ? sidebarWidthExpanded : sidebarWidthCollapsed,
            boxSizing: 'border-box',
            bgcolor: '#663399',
            color: 'white',
            borderRight: 'none',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
          },
        }}
        open
      >
        <Box sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          <Avatar sx={{ bgcolor: "#7c3aed", width: 40, height: 40 }}>
            <PeopleIcon />
          </Avatar>
          {isExpanded && (
            <Typography variant="h6" fontWeight="bold" color="#fff" sx={{ ml: 2 }}>
              Admin DMM
            </Typography>
          )}
        </Box>
        <Divider sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.2)" }} />
        <List sx={{ mt: 2 }}>
          {adminMenuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mb: 1,
                mx: 1,
                borderRadius: 1,
                justifyContent: isExpanded ? 'flex-start' : 'center',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                minHeight: 48,
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: isExpanded ? 40 : 'auto',
                  mr: isExpanded ? 2 : 'auto'
                }}
              >
                {item.icon}
              </ListItemIcon>
              {isExpanded && (
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: isExpanded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    '& .MuiListItemText-primary': {
                      fontSize: '0.95rem',
                      fontWeight: 500
                    }
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>
        {/* Déconnexion en bas */}
        <Box sx={{ flexGrow: 1 }} />
        <List sx={{ mb: 2 }}>
          <ListItem
            button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }}
            sx={{
              mx: 1,
              borderRadius: 1,
              justifyContent: isExpanded ? 'flex-start' : 'center',
              minHeight: 48,
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: 'white',
                minWidth: isExpanded ? 40 : 'auto',
                mr: isExpanded ? 2 : 'auto',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            {isExpanded && (
              <ListItemText
                primary="Se déconnecter"
                sx={{
                  opacity: isExpanded ? 1 : 0,
                  transition: 'opacity 0.3s ease-in-out',
                  '& .MuiListItemText-primary': {
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  },
                }}
              />
            )}
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content modernisé */}
      <Container maxWidth="xl" sx={{ py: 3, ml: isExpanded ? `${sidebarWidthExpanded}px` : `${sidebarWidthCollapsed}px`, transition: 'margin-left 0.3s' }}>
        {/* En-tête admin modernisé */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar sx={{ bgcolor: "#663399", width: 56, height: 56, mr: 2 }}>A</Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#663399" }}>
              Espace Administrateur
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Bienvenue sur l'interface d'administration DMM
            </Typography>
          </Box>
        </Box>

        {/* Statistiques modernes */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 4, boxShadow: 3, p: 2, bgcolor: "#ede7f6", textAlign: "center", transition: "transform 0.2s", '&:hover': { transform: 'translateY(-5px)' } }}>
              <ShoppingCartIcon sx={{ fontSize: 40, color: "#663399", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{clients.length}</Typography>
              <Typography color="text.secondary">Projets</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 4, boxShadow: 3, p: 2, bgcolor: "#e3f2fd", textAlign: "center", transition: "transform 0.2s", '&:hover': { transform: 'translateY(-5px)' } }}>
              <PeopleIcon sx={{ fontSize: 40, color: "#1976d2", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalClients}</Typography>
              <Typography color="text.secondary">Clients</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 4, boxShadow: 3, p: 2, bgcolor: "#e0f7fa", textAlign: "center", transition: "transform 0.2s", '&:hover': { transform: 'translateY(-5px)' } }}>
              <AssignmentIcon sx={{ fontSize: 40, color: "#009cde", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalServices}</Typography>
              <Typography color="text.secondary">Services</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper sx={{ borderRadius: 4, boxShadow: 3, p: 2, bgcolor: "#e8f5e9", textAlign: "center", transition: "transform 0.2s", '&:hover': { transform: 'translateY(-5px)' } }}>
              <ReceiptIcon sx={{ fontSize: 40, color: "#43a047", mb: 1 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{totalClicks}</Typography>
              <Typography color="text.secondary">Clics Totaux</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Section Statistiques (ancienne version, à garder si besoin) */}
        {/* <Paper sx={{ mb: 4, p: 2, bgcolor: '#e3f2fd', borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#3f51b5' }}>
            Statistiques Clients
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#bbdefb', borderRadius: 2, boxShadow: 1, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <Typography variant="h5" fontWeight="bold" color="#1976d2">{totalClients}</Typography>
                <Typography variant="body2" color="text.secondary">Clients Totaux</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#c8e6c9', borderRadius: 2, boxShadow: 1, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <Typography variant="h5" fontWeight="bold" color="#388e3c">{activeClients}</Typography>
                <Typography variant="body2" color="text.secondary">Clients Actifs</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#ffecb3', borderRadius: 2, boxShadow: 1, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <Typography variant="h5" fontWeight="bold" color="#ffa000">{totalClicks}</Typography>
                <Typography variant="body2" color="text.secondary">Clics Totaux</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8bbd0', borderRadius: 2, boxShadow: 1, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-5px)' } }}>
                <Typography variant="h5" fontWeight="bold" color="#d81b60">{totalServices}</Typography>
                <Typography variant="body2" color="text.secondary">Services Souscrits</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper> */}

        {/* Barre de recherche */}
        <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Rechercher un client par nom"
            value={search}
            onChange={e => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{ width: 320, bgcolor: "#fff", borderRadius: 2 }} a
          />
        </Box>

        {/* Tableau des projets */}
        <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700 }}>
          Liste des projets (API maplateforme.io)
        </Typography>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        <TableContainer component={Paper} sx={{
          mt: 2,
          borderRadius: 3,
          boxShadow: 2,
          width: '100%', // Prend toute la largeur du conteneur parent
          minWidth: 0,
          maxWidth: '100%',
          overflowX: 'auto', // Permet le scroll horizontal uniquement si nécessaire (devrait être inutile avec les styles ci-dessous)
        }}>
          <Table sx={{
            width: '100%',
            minWidth: 0,
            maxWidth: '100%',
            tableLayout: 'auto', // Permet aux colonnes de s'adapter au contenu
            fontSize: { xs: 18, md: 22 },
            '& .MuiTableCell-root': {
              fontSize: { xs: 18, md: 22 },
              fontWeight: 600,
              padding: { xs: '10px 6px', md: '18px 14px' },
              color: '#222',
              maxWidth: 220,
              wordBreak: 'break-word',
              whiteSpace: 'normal',
            },
            '& .MuiTableHead-root .MuiTableCell-root': {
              background: '#ede7f6',
              color: '#663399',
              fontWeight: 800,
              fontSize: { xs: 20, md: 24 },
              borderBottom: '2px solid #d1c4e9',
            },
          }}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nom</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProjects.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.nom}</TableCell>
                  <TableCell>{row.client ? row.client.email : ''}</TableCell>
                  <TableCell>{row.statut}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      onClick={() => handleEdit(row)}
                      sx={{ mr: 1, fontSize: { xs: 16, md: 20 }, borderRadius: 2, fontWeight: 700 }}
                    >
                      Modifier
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="large"
                      onClick={() => handleDelete(row)}
                      sx={{ fontSize: { xs: 16, md: 20 }, borderRadius: 2, fontWeight: 700 }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProjects.length === 0 && !loading && !error && (
                <TableRow>
                  <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#aaa', fontSize: 22 }}>Aucun projet trouvé.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Boîte de dialogue de résiliation */}
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        >
          <DialogTitle>Confirmation de résiliation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir résilier le client <b>{clientToEnd?.name}</b> ({clientToEnd?.email}) ?<br />
              Cette action est irréversible.<br /><br />
              <b>Adresse email pour envoyer la notification de résiliation :</b>
            </DialogContentText>
            <input
              type="email"
              value={resiliationEmail}
              onChange={e => setResiliationEmail(e.target.value)}
              style={{
                width: "100%",
                marginTop: 12,
                padding: 8,
                borderRadius: 4,
                border: "1px solid #ccc",
                fontSize: "1rem"
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleConfirmEndClient} color="error" variant="contained">
              Résilier
            </Button>
          </DialogActions>
        </Dialog>

        {/* Boîte de dialogue d'envoi de proposition */}
        <Dialog open={openProposalDialog} onClose={handleCloseProposalDialog}>
          <DialogTitle>Envoyer une proposition de service à {clientForProposal?.name}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Veuillez saisir les détails de la proposition de service pour ce client.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Nom du service"
              type="text"
              fullWidth
              variant="outlined"
              value={proposalDetails.serviceName}
              onChange={(e) => setProposalDetails({ ...proposalDetails, serviceName: e.target.value })}
              sx={{ mt: 2 }}
            />
            <TextField
              margin="dense"
              label="Description de la proposition"
              type="text"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={proposalDetails.description}
              onChange={(e) => setProposalDetails({ ...proposalDetails, description: e.target.value })}
              sx={{ mt: 2 }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseProposalDialog} color="primary">
              Annuler
            </Button>
            <Button onClick={handleSendProposal} color="primary" variant="contained">
              Envoyer la proposition
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default AdminDashboard;