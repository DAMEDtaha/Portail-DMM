import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Checkbox, 
  FormControlLabel, 
  Link, 
  Divider, 
  Alert 
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../../assets/images/logo.png';
import backgroundImage from '../../assets/images/signinpic.jpg';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCfbCrzLxfzXwNnDz4qwTxp0Tr6nmb5aXY",
  authDomain: "portail-dmm.firebaseapp.com",
  projectId: "portail-dmm",
  storageBucket: "portail-dmm.appspot.com",
  messagingSenderId: "1018804605494",
  appId: "1:1018804605494:web:f345995ab01b300f8ffe97",
  measurementId: "G-HZWP7DSQH5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Correction de la fonction pour rendre la comparaison d'email insensible à la casse et aux espaces
async function checkEmailInProjets(email) {
  const response = await fetch('https://maplateforme.io/api/projets');
  if (!response.ok) throw new Error('Erreur API');
  const data = await response.json();
  return data.filter(
    projet =>
      projet.client &&
      projet.client.email &&
      projet.client.email.trim().toLowerCase() === email.trim().toLowerCase()
  );
}

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // OTP
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const recaptchaRef = useRef(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpError, setOtpError] = useState('');

  const validateFields = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setError('');

    if (!email) {
      setEmailError('L\'email est requis');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Format d\'email invalide');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Le mot de passe est requis');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      const isAdmin = email.trim().toLowerCase() === 'admin@dmm.com' && password === 'admin123';
      if (isAdmin) {
        navigate('/AdminDashboard');
      } else {
        try {
          const projetsClient = await checkEmailInProjets(email);
          if (projetsClient.length > 0) {
            localStorage.setItem('clientEmail', email.trim().toLowerCase());
            navigate('/dashboard');
          } else {
            setError("Aucun projet trouvé pour cet email. Veuillez vérifier vos identifiants.");
          }
        } catch (err) {
          setError("Erreur lors de la vérification de l'email dans l'API.");
        }
      }
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleGoogleLogin = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/dashboard');
  };

  const handleFacebookLogin = (response) => {
    console.log(response);
    navigate('/dashboard');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password');
  };

  const handleSendOtp = async () => {
    setOtpError('');

    if (!phoneNumber) {
      setOtpError("Numéro requis");
      return;
    }
    if (!phoneNumber.startsWith('+') || phoneNumber.length < 10) {
      setOtpError("Entrez un numéro au format international, ex: +212642671710");
      return;
    }

    try {
      // Reset recaptcha if already exists
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
      }

      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setOtpError("Le reCAPTCHA a expiré, veuillez réessayer");
        }
      });

      const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current);
      setConfirmationResult(result);
      setShowOtpInput(true);
    } catch (err) {
      console.error("Erreur OTP:", err);
      setOtpError("Erreur d'envoi du code : " + err.message);
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || !confirmationResult) {
      setOtpError("Code OTP requis");
      return;
    }

    try {
      await confirmationResult.confirm(otp);
      alert("Authentification réussie avec OTP");
      navigate('/dashboard');
    } catch (err) {
      console.error("Erreur de vérification OTP:", err);
      setOtpError("Code OTP invalide ou expiré");
    }
  };

  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
      }
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId="600138492189-quf8v9484fasou679r3dsb89t3hjshpa.apps.googleusercontent.com">
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        maxWidth: 4700,
        p: 2
      }}>
        <Box sx={{
          display: 'flex',
          width: '100%',
          maxWidth: 4700,
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Left section */}
          <Box
            sx={{
              flex: 1,
              minHeight: 500,
              maxWidth: '50%',
              width: '50%',
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
              <img src={logo} alt="DMM Logo" style={{ height: 150, maxWidth: 280 }} />
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

          {/* Right section */}
          <Box
            sx={{
              flex: 1,
              maxWidth: '50%',
              width: '50%',
              bgcolor: 'white',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <img src={logo} alt="DMM Logo" style={{ height: 110, marginBottom: 28, alignSelf: 'center' }} />

            <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}>
              Bienvenue, connectez-vous pour continuer
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box sx={{ width: '100%', mb: 3, maxWidth: 500, mx: 'auto', fontSize: '1.35rem' }}>
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => alert('Erreur Google')}
                width="100%"
                theme="outline"
                size="large"
                style={{ minWidth: 0, width: '100%' }}
              />
              <FacebookLogin
                appId="2869193333288683"
                callback={handleFacebookLogin}
                render={renderProps => (
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    onClick={renderProps.onClick}
                    sx={{
                      mb: 1,
                      textTransform: 'none',
                      borderColor: '#E0E0E0',
                      color: '#1877f3',
                      justifyContent: 'flex-start',
                      pl: 2,
                      py: 0.75,
                      fontWeight: 600,
                      maxWidth: 500,
                      mx: 'auto',
                      width: '100%',
                      fontSize: '1.35rem'
                    }}
                  >
                    Continuer avec Facebook
                  </Button>
                )}
              />
              <Divider sx={{ my: 2, maxWidth: 500, mx: 'auto', fontSize: '1.35rem' }}>Ou continuer avec</Divider>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 500, mx: 'auto', fontSize: '1.35rem' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                size="small"
                sx={{ mb: 1.5, fontSize: '1.35rem', '& .MuiInputBase-input': { fontSize: '1.35rem' }, '& .MuiInputLabel-root': { fontSize: '1.35rem' } }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                size="small"
                sx={{ mb: 2, fontSize: '1.35rem', '& .MuiInputBase-input': { fontSize: '1.35rem' }, '& .MuiInputLabel-root': { fontSize: '1.35rem' } }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      value="remember" 
                      color="primary" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  }
                  label="Se souvenir de moi"
                />
                <Link href="#" variant="body2" sx={{ color: '#663399' }} onClick={handleForgotPassword}>
                  Mot de passe oublié ?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 1,
                  mb: 2,
                  bgcolor: '#663399',
                  '&:hover': { bgcolor: '#563399' },
                  textTransform: 'none',
                  py: 1.2,
                  fontSize: '1.35rem',
                  minHeight: 44,
                  maxWidth: 500,
                  mx: 'auto',
                  width: '100%'
                }}
              >
                Se connecter
              </Button>

              {/* Auth OTP */}
              <Divider sx={{ my: 2 }}>Ou se connecter par téléphone</Divider>
              <TextField
                fullWidth
                label="Numéro de téléphone"
                placeholder="+212612345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                size="small"
                sx={{ maxWidth: 500, mx: 'auto', fontSize: '1.35rem', '& .MuiInputBase-input': { fontSize: '1.35rem' }, '& .MuiInputLabel-root': { fontSize: '1.35rem' } }}
              />
              <Button 
                onClick={handleSendOtp}
                fullWidth
                sx={{ mt: 1, bgcolor: '#663399', color: '#fff', py: 1.2, fontSize: '1.35rem', minHeight: 44, maxWidth: 500, mx: 'auto', width: '100%' }}
              >
                Envoyer le code
              </Button>

              {showOtpInput && (
                <>
                  <TextField
                    fullWidth
                    label="Code OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    size="small"
                    sx={{ mt: 2, maxWidth: 500, mx: 'auto', fontSize: '1.35rem', '& .MuiInputBase-input': { fontSize: '1.35rem' }, '& .MuiInputLabel-root': { fontSize: '1.35rem' } }}
                  />
                  <Button 
                    onClick={handleVerifyOtp}
                    fullWidth
                    sx={{ mt: 1, bgcolor: '#663399', color: '#fff', py: 1.2, fontSize: '1.35rem', minHeight: 44, maxWidth: 500, mx: 'auto', width: '100%' }}
                  >
                    Vérifier
                  </Button>
                </>
              )}

              {otpError && <Alert severity="error" sx={{ mt: 2 }}>{otpError}</Alert>}
              
              <div id="recaptcha-container"></div>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" sx={{ display: 'inline' }}>
                  Vous n'avez pas de compte ?{' '}
                </Typography>
                <Link
                  href="#"
                  variant="body2"
                  onClick={handleSignUpClick}
                  sx={{ color: '#663399', textDecoration: 'none', fontWeight: 500 }}
                >
                  Inscrivez-vous
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </GoogleOAuthProvider>
  );
};

export default Login;