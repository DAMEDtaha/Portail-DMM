import React, { useState } from "react";
import { Box, Typography, Avatar, Button, Grid, Paper, Divider, List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox, IconButton } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentIcon from '@mui/icons-material/Payment';
import AddCardIcon from '@mui/icons-material/AddCard';

const avatarUrl = "/path/to/avatar.jpg"; // Remplace par le chemin réel de l'avatar

function Profil() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editField, setEditField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  // Gestion ouverture dialog selon le champ
  const handleEditClick = (field, currentValue) => {
    setEditField(field);
    setFieldValue(currentValue);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
    setEditField(null);
    setFieldValue("");
  };
  const handleDialogSave = () => {
    // Ici, on pourrait envoyer la nouvelle valeur à l'API ou la stocker
    setOpenDialog(false);
    setEditField(null);
    setFieldValue("");
  };

  // Navigation liens rapides
  const handleQuickLink = (type) => {
    if (type === 'orders') {
      window.location.href = '/orders';
    } else if (type === 'support') {
      window.location.href = 'mailto:support@dmm-africa.com?subject=Contact Support';
    }
  };

  // Liste des moyens de paiement disponibles
  const paymentMethods = [
    {
      label: 'Carte bancaire',
      value: 'card',
      icon: <CreditCardIcon sx={{ color: '#673ab7', fontSize: 28, mr: 1 }} />,
      color: '#ede7f6',
      desc: 'MasterCard se terminant par 1234',
    },
    {
      label: 'Virement bancaire',
      value: 'bank',
      icon: <AccountBalanceIcon sx={{ color: '#1976d2', fontSize: 28, mr: 1 }} />,
      color: '#e3f2fd',
      desc: 'Compte Société Générale',
    },
    {
      label: 'PayPal',
      value: 'paypal',
      icon: <PaymentIcon sx={{ color: '#009cde', fontSize: 28, mr: 1 }} />,
      color: '#e0f7fa',
      desc: 'paypal@email.com',
    },
    {
      label: 'Ajouter une carte',
      value: 'add',
      icon: <AddCardIcon sx={{ color: '#43a047', fontSize: 28, mr: 1 }} />,
      color: '#e8f5e9',
      desc: 'Ajouter un nouveau moyen de paiement',
    },
  ];
  const [selectedPayment, setSelectedPayment] = useState('card');

  // Dialog pour infos paiement
  const [openPaymentDialog, setOpenPaymentDialog] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({ card: '', bank: '', paypal: '' });
  const [currentPayment, setCurrentPayment] = useState('');

  // Ouvre le dialog de saisie paiement
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
    setCurrentPayment(method);
    setOpenPaymentDialog(true);
  };
  const handlePaymentDialogClose = () => {
    setOpenPaymentDialog(false);
    setCurrentPayment('');
  };
  const handlePaymentDialogSave = () => {
    setOpenPaymentDialog(false);
    setCurrentPayment('');
  };

  return (
    <Box sx={{
      width: '100vw',
      minHeight: '100vh',
      bgcolor: 'linear-gradient(135deg, #f8f6ff 0%, #e9e4f5 100%)',
      py: { xs: 4, md: 8 },
      px: 0,
      m: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflowX: 'hidden',
    }}>
      <Box sx={{
        width: '100%',
        maxWidth: 2050,
        mx: 'auto',
        bgcolor: '#fff',
        borderRadius: 6,
        boxShadow: '0 8px 32px #bbaaff33, 0 1.5px 8px #bbaaff22',
        p: { xs: 2, md: 6 },
        minHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        border: '1.5px solid #ede7f6',
        fontFamily: 'Inter, Roboto, Arial, sans-serif',
        fontSize: { xs: '1.1rem', md: '1.25rem' },
        color: '#2d205a',
        fontWeight: 500,
        letterSpacing: 0.2,
        overflowX: 'hidden',
      }}>
        {/* Header */}
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 3, fontSize: { xs: '2.2rem', md: '2.7rem' }, fontFamily: 'inherit', color: '#663399', letterSpacing: 0.5 }}>
          Mon Compte
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar src={avatarUrl} sx={{ width: 110, height: 110, bgcolor: '#f3f3f3', fontSize: 54, border: '3px solid #b39ddb', boxShadow: '0 2px 12px #bbaaff44' }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 26, md: 32 }, fontFamily: 'inherit', color: '#222' }}>Sophia Bennett</Typography>
            <Typography sx={{ color: '#888', fontSize: { xs: 17, md: 20 }, fontFamily: 'inherit' }}>sophia.bennett@email.com</Typography>
          </Box>
        </Box>
        <Divider sx={{ my: 1, bgcolor: '#ede7f6' }} />
        {/* Account Details */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Détails du compte
        </Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <List disablePadding>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Nom</Typography>
                <Typography sx={{ color: '#222', fontSize: 15 }}>Sophia Bennett</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('nom', 'Sophia Bennett')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Email</Typography>
                <Typography sx={{ color: '#888', fontSize: 15 }}>sophia.bennett@email.com</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('email', 'sophia.bennett@email.com')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<Typography sx={{ fontWeight: 500, fontSize: 15 }}>Changer le mot de passe</Typography>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('password', '')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        {/* Contact Details */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Coordonnées
        </Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <List disablePadding>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Numéro de téléphone</Typography>
                <Typography sx={{ color: '#222', fontSize: 15 }}>+1-555-123-4567</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('phone', '+1-555-123-4567')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem sx={{ px: 0, '&:hover': { bgcolor: '#ede7f6' }, borderRadius: 2 }}>
              <ListItemText primary={<>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>Adresse</Typography>
                <Typography sx={{ color: '#888', fontSize: 15 }}>123 Maple Street, Anytown, CA 91234</Typography>
              </>} />
              <ListItemSecondaryAction>
                <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('address', '123 Maple Street, Anytown, CA 91234')}>Modifier</Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Paper>
        {/* Payment Methods */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Moyens de paiement
        </Typography>
        <Paper elevation={0} sx={{ p: 2, mb: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <List disablePadding>
            {paymentMethods.map((method) => (
              <ListItem key={method.value} sx={{ px: 0, borderRadius: 2, mb: 1, bgcolor: selectedPayment === method.value ? method.color : 'transparent', '&:hover': { bgcolor: method.color } }}>
                <Checkbox
                  checked={selectedPayment === method.value}
                  onChange={() => handlePaymentSelect(method.value)}
                  sx={{ mr: 2, borderRadius: 2, bgcolor: '#fafafa', color: '#663399', '&.Mui-checked': { color: '#663399' } }}
                />
                {method.icon}
                <ListItemText
                  primary={<Typography sx={{ fontWeight: 500, fontSize: 15 }}>{method.label}</Typography>}
                  secondary={<Typography sx={{ color: '#888', fontSize: 14 }}>{method.desc}</Typography>}
                />
                <ListItemSecondaryAction>
                  <Button variant="outlined" size="small" sx={{ borderRadius: 8, px: 3, fontWeight: 500, fontSize: 15, bgcolor: '#fafafa', textTransform: 'none', boxShadow: 'none', borderColor: '#b39ddb', color: '#663399', '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleEditClick('card', method.desc)}>Modifier</Button>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
        {/* Quick Links */}
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 20, md: 24 }, mb: 2, mt: 2, fontFamily: 'inherit', color: '#663399' }}>
          Liens rapides
        </Typography>
        <Paper elevation={0} sx={{ p: 2, borderRadius: 4, bgcolor: '#f6f3ff', boxShadow: '0 1px 8px #bbaaff11' }}>
          <List disablePadding>
            <ListItem sx={{ px: 0, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleQuickLink('orders')}>
              <ListItemText primary={<Typography sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>Historique des commandes</Typography>} />
              <IconButton edge="end" size="small">
                <ArrowForwardIosIcon sx={{ fontSize: 20, color: '#888' }} />
              </IconButton>
            </ListItem>
            <ListItem sx={{ px: 0, cursor: 'pointer', borderRadius: 2, '&:hover': { bgcolor: '#ede7f6' } }} onClick={() => handleQuickLink('support')}>
              <ListItemText primary={<Typography sx={{ fontSize: 16, color: '#222', fontWeight: 500 }}>Support/Contact</Typography>} />
              <IconButton edge="end" size="small">
                <ArrowForwardIosIcon sx={{ fontSize: 20, color: '#888' }} />
              </IconButton>
            </ListItem>
          </List>
        </Paper>
        {/* Dialog édition */}
        {openDialog && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: '#00000055', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: 4, minWidth: 320, maxWidth: '90vw', boxShadow: '0 4px 32px #bbaaff44', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#663399', fontWeight: 700 }}>
                {editField === 'nom' && 'Modifier le nom'}
                {editField === 'email' && 'Modifier l\'email'}
                {editField === 'password' && 'Changer le mot de passe'}
                {editField === 'phone' && 'Modifier le téléphone'}
                {editField === 'address' && 'Modifier l\'adresse'}
                {editField === 'card' && 'Modifier la carte'}
              </Typography>
              {editField !== 'password' ? (
                <input type="text" value={fieldValue} onChange={e => setFieldValue(e.target.value)} style={{ fontSize: 18, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
              ) : (
                <input type="password" value={fieldValue} onChange={e => setFieldValue(e.target.value)} style={{ fontSize: 18, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} placeholder="Nouveau mot de passe" />
              )}
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                <Button onClick={handleDialogClose} variant="outlined" sx={{ borderRadius: 2 }}>Annuler</Button>
                <Button onClick={handleDialogSave} variant="contained" sx={{ borderRadius: 2, bgcolor: '#663399' }}>Enregistrer</Button>
              </Box>
            </Box>
          </Box>
        )}
        {/* Dialog infos paiement */}
        {openPaymentDialog && (
          <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', bgcolor: '#00000055', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ bgcolor: '#fff', borderRadius: 4, p: 4, minWidth: 340, maxWidth: '90vw', boxShadow: '0 4px 32px #bbaaff44', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, color: '#663399', fontWeight: 700 }}>
                {currentPayment === 'card' && 'Informations Carte Bancaire'}
                {currentPayment === 'bank' && 'Informations Virement Bancaire'}
                {currentPayment === 'paypal' && 'Informations PayPal'}
                {currentPayment === 'add' && 'Ajouter une nouvelle carte'}
              </Typography>
              {currentPayment === 'card' && (
                <>
                  <input type="text" placeholder="Numéro de carte" value={paymentInfo.card} onChange={e => setPaymentInfo({ ...paymentInfo, card: e.target.value })} style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="text" placeholder="Nom sur la carte" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="text" placeholder="Date d'expiration (MM/AA)" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="password" placeholder="Cryptogramme" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
                </>
              )}
              {currentPayment === 'bank' && (
                <>
                  <input type="text" placeholder="IBAN" value={paymentInfo.bank} onChange={e => setPaymentInfo({ ...paymentInfo, bank: e.target.value })} style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="text" placeholder="Nom du titulaire" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
                </>
              )}
              {currentPayment === 'paypal' && (
                <input type="email" placeholder="Adresse PayPal" value={paymentInfo.paypal} onChange={e => setPaymentInfo({ ...paymentInfo, paypal: e.target.value })} style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
              )}
              {currentPayment === 'add' && (
                <>
                  <input type="text" placeholder="Numéro de carte" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="text" placeholder="Nom sur la carte" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="text" placeholder="Date d'expiration (MM/AA)" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none', marginBottom: 8 }} />
                  <input type="password" placeholder="Cryptogramme" style={{ fontSize: 17, padding: 8, borderRadius: 6, border: '1.5px solid #b39ddb', outline: 'none' }} />
                </>
              )}
              <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'flex-end' }}>
                <Button onClick={handlePaymentDialogClose} variant="outlined" sx={{ borderRadius: 2 }}>Annuler</Button>
                <Button onClick={handlePaymentDialogSave} variant="contained" sx={{ borderRadius: 2, bgcolor: '#663399' }}>Enregistrer</Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Profil;