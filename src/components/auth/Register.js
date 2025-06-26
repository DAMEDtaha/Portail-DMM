import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../assets/images/logo.png';
import backgroundImage from '../../assets/images/signuppic.png';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Le nom complet est requis';
    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!password) newErrors.password = 'Le mot de passe est requis';
    if (!confirmPassword) {
      newErrors.confirmPassword = 'La confirmation du mot de passe est requise';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log('Inscription validée');
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      p: 2
    }}>
      <Box sx={{
        display: 'flex',
        width: '100%',
        maxWidth: 900,
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}>
        {/* Left section - Image */}
        <Box
          sx={{
            flex: 1,
            minHeight: 500,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
            <img src={logo} alt="DMM Logo" style={{ height: 40 }} />
          </Box>
          <Button
            variant="contained"
            sx={{
              position: 'absolute',
              bottom: 40,
              left: 40,
              bgcolor: '#663399',
              '&:hover': { bgcolor: '#563399' },
              borderRadius: 50,
              px: 3,
              py: 0.75,
              textTransform: 'none',
            }}
          >
            Contacter nos experts
          </Button>
        </Box>

        {/* Right section - Form */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 400,
            bgcolor: 'white',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, textAlign: 'center', mb: 1 }}>
            Boostez votre présence en ligne – Créez votre compte
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
            Démarrer n'a jamais été aussi simple !
          </Typography>

          <Box sx={{ width: '100%', mb: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                mb: 1,
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: '#757575',
                justifyContent: 'flex-start',
                pl: 2,
                py: 0.75,
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<FacebookIcon />}
              sx={{
                mb: 1,
                textTransform: 'none',
                borderColor: '#E0E0E0',
                color: '#757575',
                justifyContent: 'flex-start',
                pl: 2,
                py: 0.75,
              }}
            >
              Facebook
            </Button>
            <Typography variant="body2" align="center" sx={{ my: 1 }}>
              Ou continuer avec
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Nom Complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{ mb: 1.5 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email}
              helperText={errors.email}
              sx={{ mb: 1.5 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 1.5 }}
            />
            <TextField
              fullWidth
              size="small"
              placeholder="Confirmer Mot de passe"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              sx={{ mb: 1.5 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                bgcolor: '#663399',
                '&:hover': { bgcolor: '#563399' },
                textTransform: 'none',
                py: 0.75,
                mb: 1.5,
              }}
            >
              Créer Compte
            </Button>
            <Typography variant="body2" align="center" sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
              En continuant, vous acceptez les{' '}
              <Link href="#" sx={{ color: '#663399', textDecoration: 'none' }}>
                Conditions d'utilisation
              </Link>
            </Typography>
            <Typography variant="body2" align="center" sx={{ mt: 1.5, fontSize: '0.8rem' }}>
              Vous avez déjà un compte ?{' '}
              <Link href="/login" sx={{ color: '#663399', textDecoration: 'none' }}>
                Connectez-vous
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;