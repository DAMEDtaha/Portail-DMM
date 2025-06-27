
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Global } from '@emotion/react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EventIcon from '@mui/icons-material/Event';
import InfoIcon from '@mui/icons-material/Info';

const PageHeader = styled("div")(() => ({
  background: "linear-gradient(135deg, #663399, #8a2be2)",
  color: "#fff",
  padding: "60px 0 40px",
  marginBottom: "50px",
  borderBottomLeftRadius: "30px",
  borderBottomRightRadius: "30px",
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
}));

const StyledTableCell = styled(TableCell)(() => ({
  "&.MuiTableCell-head": {
    backgroundColor: "#663399",
    color: "#fff",
    fontWeight: 700,
    fontSize: "1.05rem",
  },
  "&.MuiTableCell-body": {
    fontSize: "0.98rem",
    fontWeight: 500,
    color: "#333",
  },
}));

const StyledCard = styled(Card)(() => ({
  borderRadius: "15px",
  boxShadow: "0 10px 30px rgba(102, 51, 153, 0.1)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 15px 40px rgba(102, 51, 153, 0.2)",
  },
}));

const StatusChip = styled(Chip)(({ status }) => ({
  backgroundColor:
    status === "Livré"
      ? "#4CAF50"
      : status === "En cours"
      ? "#FFA500"
      : "#F44336",
  color: "#fff",
  fontWeight: 600,
  padding: "4px 8px",
  borderRadius: "8px",
}));

function Orders() {
  // État pour les projets API
  const [projets, setProjets] = useState([]);
  const [loadingProjets, setLoadingProjets] = useState(true);
  const [errorProjets, setErrorProjets] = useState("");

  // Récupère l'email du client authentifié
  const clientEmail = localStorage.getItem('clientEmail');

  useEffect(() => {
    fetch("https://maplateforme.io/api/projets")
      .then((response) => {
        if (!response.ok) throw new Error("Erreur API");
        return response.json();
      })
      .then((data) => {
        // Filtrer les projets du client authentifié
        const projetsClient = Array.isArray(data)
          ? data.filter(
              (projet) =>
                projet.client &&
                projet.client.email &&
                clientEmail &&
                projet.client.email.trim().toLowerCase() === clientEmail.trim().toLowerCase()
            ).map((projet) => ({
              ...projet,
              id: projet.id || projet._id,
              nom: projet.nom || projet.name,
              date: projet.date || "",
              service: projet.service || "",
              montant: projet.montant || "",
              statut: projet.statut || "",
            }))
          : [];
        setProjets(projetsClient);
        setLoadingProjets(false);
      })
      .catch((err) => {
        setErrorProjets("Impossible de charger les projets");
        setLoadingProjets(false);
      });
  }, [clientEmail]);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProduit, setFilterProduit] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    id: "",
    date: new Date().toISOString().split("T")[0],
    montant: "",
    statut: "En attente",
    produit: "",
  });

  const API_URL = "https://mapplateforme.io/api/projets";
  const API_TOKEN = "e34dc63aca876521a7fa7b359ecfdbec";
  const ORDER_ID = 1234;

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.post(API_URL, {
          orderId: ORDER_ID,
          token: API_TOKEN,
        });
        setOrders(response.data);
      } catch (err) {
        setError("Erreur lors du chargement des projets");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const passOrder = async (orderId) => {
    try {
      await axios.post(API_URL, {
        orderId: orderId,
        token: API_TOKEN,
        action: "passer",
      });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, statut: "En cours" } : order
        )
      );
      alert(`Projet ${orderId} lancé avec succès !`);
    } catch (error) {
      alert(`Erreur: ${error.response?.data?.message || "Échec de l'opération"}`);
    }
  };

  // Ajout d'une fonction pour lancer un projet (envoi mail au support)
  const handleLaunch = (row) => {
    const subject = encodeURIComponent(`Demande de lancement du projet: ${row.nom} (ID: ${row.id})`);
    const body = encodeURIComponent(`Bonjour,\n\nJe souhaite lancer le projet :\n- Nom : ${row.nom}\n- ID : ${row.id}\n- Service : ${row.produit ? (row.produit.designation || row.produit) : ''}\n- Email client : ${row.client ? row.client.email : ''}\n\nMerci de traiter cette demande.\n`);
    window.location.href = `mailto:support@dmm-africa.com?subject=${subject}&body=${body}`;
  };

  // Recherche et filtrage améliorés sur projets (nom, service, statut)
  const [searchProjet, setSearchProjet] = useState("");
  const [filterProjetStatus, setFilterProjetStatus] = useState("");
  const [filterProjetService, setFilterProjetService] = useState("");
  const [filterClientName, setFilterClientName] = useState("");
  const projetsFiltres = projets.filter((row) => {
    const nomMatch = !searchProjet || (row.nom && row.nom.toLowerCase().includes(searchProjet.toLowerCase()));
    const serviceLabel = row.produit ? (row.produit.designation || row.produit) : row.service || '';
    const serviceMatch = !filterProjetService || serviceLabel === filterProjetService;
    const statutMatch = !filterProjetStatus || row.statut === filterProjetStatus;
    const searchServiceMatch = !searchProjet || serviceLabel.toLowerCase().includes(searchProjet.toLowerCase());
    const clientNameMatch = !filterClientName || (row.client && row.client.nom && row.client.nom.toLowerCase().includes(filterClientName.toLowerCase()));
    return (nomMatch || searchServiceMatch) && serviceMatch && statutMatch && clientNameMatch;
  });

  const handleDialogOpen = () => {
    setEditingOrder(null);
    setNewOrder({
      id: `CMD${orders.length + 1}`,
      date: new Date().toISOString().split("T")[0],
      montant: "",
      statut: "En attente",
      produit: "",
    });
    setOpenDialog(true);
  };

  const handleDialogClose = () => setOpenDialog(false);

  // Ajout d'un état pour le projet en cours de modification (pour le dialog)
  const [editProjet, setEditProjet] = useState(null);

  // Fonction pour ouvrir le dialog de modification
  const handleEdit = (row) => {
    setEditProjet(row);
    setOpenDialog(true);
    setNewOrder({
      id: row.id,
      nom: row.nom || '',
      date: row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : '',
      montant: row.montant || '',
      statut: row.statut || '',
      produit: row.produit ? (row.produit.designation || row.produit) : '',
      email: row.client ? row.client.email : '',
    });
  };

  // Fonction pour sauvegarder la modification
  const handleSaveOrder = () => {
    if (editProjet) {
      const hasChanged =
        (editProjet.nom || '') !== newOrder.nom ||
        (editProjet.startDate ? new Date(editProjet.startDate).toISOString().split('T')[0] : '') !== newOrder.date ||
        (editProjet.produit ? (editProjet.produit.designation || editProjet.produit) : '') !== newOrder.produit ||
        (editProjet.montant || '') !== newOrder.montant ||
        (editProjet.statut || '') !== newOrder.statut ||
        (editProjet.client ? editProjet.client.email : '') !== newOrder.email;
      setProjets(
        projets.map((projet) =>
          projet.id === editProjet.id
            ? {
                ...projet,
                nom: newOrder.nom,
                startDate: newOrder.date,
                montant: newOrder.montant,
                statut: newOrder.statut,
                produit: typeof projet.produit === 'object'
                  ? { ...projet.produit, designation: newOrder.produit }
                  : newOrder.produit,
                client: { ...projet.client, email: newOrder.email },
              }
            : projet
        )
      );
      if (hasChanged) {
        const subject = encodeURIComponent(`Demande de modification du projet: ${editProjet.nom} (ID: ${editProjet.id})`);
        const body = encodeURIComponent(`Bonjour,\n\nJe souhaite modifier le projet :\n- Ancien nom : ${editProjet.nom}\n- Nouveau nom : ${newOrder.nom}\n- ID : ${editProjet.id}\n- Ancienne date : ${editProjet.startDate || ''}\n- Nouvelle date : ${newOrder.date}\n- Ancien service : ${editProjet.produit ? (editProjet.produit.designation || editProjet.produit) : ''}\n- Nouveau service : ${newOrder.produit}\n- Ancien montant : ${editProjet.montant}\n- Nouveau montant : ${newOrder.montant}\n- Ancien statut : ${editProjet.statut}\n- Nouveau statut : ${newOrder.statut}\n- Ancien email : ${editProjet.client ? editProjet.client.email : ''}\n- Nouvel email : ${newOrder.email}\n\nMerci de traiter cette demande.\n`);
        window.location.href = `mailto:support@dmm-africa.com?subject=${subject}&body=${body}`;
      }
      setEditProjet(null);
    }
    setOpenDialog(false);
  };

  const handleDelete = (row) => {
    if (row.client && row.client.email) {
      window.location.href = `mailto:${row.client.email}?subject=Suppression de projet&body=Bonjour, merci de supprimer le projet \"${row.nom}\" (ID: ${row.id})`;
    } else {
      alert("Aucune adresse email client disponible pour ce projet.");
    }
  };

  return (
    <>
      {/* Style global pour supprimer tout scroll horizontal */}
      <Global styles={{
        html: { overflowX: 'hidden', width: '100vw' },
        body: { overflowX: 'hidden', width: '100vw' },
        '#root': { overflowX: 'hidden', width: '100vw' },
      }} />
      <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', minWidth: '100vw', width: '100vw', height: '100vh', pb: 6, fontFamily: 'Inter, Roboto, Arial, sans-serif', px: 0, overflowX: 'hidden' }}>
        {/* En-tête Commandes */}
        <Container maxWidth={false} disableGutters sx={{ pt: 6, pb: 2, width: '100vw', maxWidth: '100vw', px: { xs: 2, md: 6 }, overflowX: 'hidden' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: 32, md: 38 }, color: '#111', mb: 2, textAlign: 'left', letterSpacing: 0.5 }}>
            Commandes
          </Typography>
          {/* Filtres avancés */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'center' }}>
            {/* Recherche par nom de commande */}
            <TextField
              label={<><AssignmentIcon sx={{ fontSize: 28, color: '#663399', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Rechercher par nom de commande</span></>}
              size="medium"
              value={searchProjet}
              onChange={(e) => setSearchProjet(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 260, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            />
            {/* Filtre par service */}
            <TextField
              select
              label={<><InfoIcon sx={{ fontSize: 28, color: '#663399', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Service</span></>}
              size="medium"
              value={filterProjetService}
              onChange={(e) => setFilterProjetService(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 180, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            >
              <MenuItem value="">Tous</MenuItem>
              {["Forfait Duo", "Le trio", "Referencement", "Site web", "SEO", "SEA", "Community", "E-reputation"]
                .concat(Array.from(new Set(projets.map((o) => o.produit ? (o.produit.designation || o.produit) : o.service || ''))).filter(Boolean))
                .filter((v, i, arr) => arr.indexOf(v) === i)
                .map((service) => (
                  <MenuItem key={service} value={service} style={{ fontSize: 18, fontWeight: 600 }}>{service}</MenuItem>
              ))}
            </TextField>
            {/* Filtre par statut */}
            <TextField
              select
              label={<><EventIcon sx={{ fontSize: 28, color: '#663399', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Statut</span></>}
              size="medium"
              value={filterProjetStatus}
              onChange={(e) => setFilterProjetStatus(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 150, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            >
              <MenuItem value="">Tous</MenuItem>
              <MenuItem value="En attente" style={{ fontSize: 18, fontWeight: 600 }}>En attente</MenuItem>
              <MenuItem value="En cours" style={{ fontSize: 18, fontWeight: 600 }}>En cours</MenuItem>
              <MenuItem value="Livré" style={{ fontSize: 18, fontWeight: 600 }}>Livré</MenuItem>
            </TextField>
            {/* Filtre par nom du client */}
            <TextField
              select
              label={<><PersonIcon sx={{ fontSize: 28, color: '#663399', mr: 1, verticalAlign: 'middle' }} /> <span style={{fontSize:22,fontWeight:800}}>Nom du client</span></>}
              size="medium"
              value={filterClientName || ''}
              onChange={(e) => setFilterClientName(e.target.value)}
              sx={{ bgcolor: '#fff', borderRadius: '16px', minWidth: 180, fontSize: 18, '.MuiInputBase-input': { fontSize: 18, fontWeight: 600, color: '#222', height: 28, padding: '14px 12px' }, '.MuiInputLabel-root': { fontSize: 22, fontWeight: 800 } }}
              InputProps={{ style: { borderRadius: 16, fontSize: 18, fontWeight: 600, color: '#222', height: 56 }, sx: { height: 56 } }}
              InputLabelProps={{ shrink: true, style: { fontSize: 22, fontWeight: 800 } }}
            >
              <MenuItem value="">Tous</MenuItem>
              {Array.from(new Set(projets.map((o) => o.client && o.client.nom ? o.client.nom : ''))).filter(Boolean).map((nom) => (
                <MenuItem key={nom} value={nom} style={{ fontSize: 18, fontWeight: 600 }}>{nom}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Container>
        {/* Tableau commandes modernisé */}
        <Container maxWidth={false} disableGutters sx={{ pt: 0, width: '100vw', maxWidth: '100vw', px: { xs: 2, md: 6 }, overflowX: 'hidden' }}>
          <TableContainer component={Paper} sx={{ borderRadius: '16px', boxShadow: 'none', border: '1px solid #eee', mt: 2, width: '100%', maxWidth: '100vw', minWidth: 0, overflowX: 'hidden' }}>
            <Table sx={{ width: '100%', maxWidth: '100vw', minWidth: 0, tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Année</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Nom de la commande</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Nom du client</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Service</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Statut</TableCell>
                  <TableCell sx={{ color: '#222', fontWeight: 800, fontSize: 17, background: '#fafafa', borderBottom: '2px solid #eee' }}>Montant</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {projetsFiltres
                  .filter(row => !filterClientName || (row.client && row.client.nom === filterClientName))
                  .map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{row.startDate ? new Date(row.startDate).getFullYear() : ''}</TableCell>
                    <TableCell sx={{ color: '#222', fontWeight: 700, fontSize: 16 }}>{row.nom}</TableCell>
                    <TableCell sx={{ color: '#444', fontWeight: 600, fontSize: 15 }}>{row.client && row.client.nom ? row.client.nom : ''}</TableCell>
                    <TableCell sx={{ color: '#666', fontWeight: 600, fontSize: 15 }}>{row.produit ? row.produit.designation : ''}</TableCell>
                    <TableCell>
                      <Box sx={{ bgcolor: '#ededed', color: '#222', borderRadius: '16px', px: 2.5, py: 0.5, fontWeight: 800, fontSize: 15, display: 'inline-block', minWidth: 90, textAlign: 'center' }}>
                        {row.statut}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#222', fontWeight: 600, fontSize: 16 }}>{row.montant ? `${row.montant} $` : ''}</TableCell>
                  </TableRow>
                ))}
                {projetsFiltres.filter(row => !filterClientName || (row.client && row.client.nom === filterClientName)).length === 0 && !loadingProjets && !errorProjets && (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', color: '#aaa', fontSize: 18 }}>Aucune commande trouvée.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>

        <Dialog open={openDialog} onClose={() => { setOpenDialog(false); setEditProjet(null); }}>
          <DialogTitle>{editProjet ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: "grid", gap: 2 }}>
              <TextField label="ID Projet" value={newOrder.id} disabled fullWidth />
              <TextField
                label="Nom"
                value={newOrder.nom}
                onChange={(e) => setNewOrder({ ...newOrder, nom: e.target.value })}
                fullWidth
              />
              <TextField
                label="Email"
                value={newOrder.email}
                onChange={(e) => setNewOrder({ ...newOrder, email: e.target.value })}
                fullWidth
              />
              <TextField
                label="Date"
                type="date"
                value={newOrder.date}
                onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                label="Service"
                select
                value={newOrder.produit}
                onChange={(e) => setNewOrder({ ...newOrder, produit: e.target.value })}
                fullWidth
              >
                {["Forfait Duo", "Le trio", "Referencement", "Site web", "SEO", "SEA", "Community", "E-reputation", "Autre"].map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Montant (€)"
                type="number"
                value={newOrder.montant}
                onChange={(e) => setNewOrder({ ...newOrder, montant: e.target.value })}
                fullWidth
              />
              <TextField
                label="Statut"
                select
                value={newOrder.statut}
                onChange={(e) => setNewOrder({ ...newOrder, statut: e.target.value })}
                fullWidth
              >
                {["En attente", "En cours", "Livré"].map((status) => (
                  <MenuItem key={status} value={status}>{status}</MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => { setOpenDialog(false); setEditProjet(null); }}>Annuler</Button>
            <Button onClick={handleSaveOrder} variant="contained">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default Orders;
