import React, { useState } from "react";
import { Box, Typography, TextField, Button, Alert, Paper } from "@mui/material";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    // Ici tu peux appeler ton API de reset password
    setSubmitted(true);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f8fafc"
      }}
    >
      <Paper
        sx={{
          p: 5,
          borderRadius: 4,
          minWidth: 370,
          boxShadow: "0 8px 32px 0 rgba(124,58,237,0.10)",
          background: "linear-gradient(135deg, #ede9fe 0%, #f8fafc 100%)"
        }}
        elevation={0}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          mb={2}
          color="primary"
          sx={{ textAlign: "center", letterSpacing: 1 }}
        >
          Mot de passe oublié&nbsp;?
        </Typography>
        <Typography color="text.secondary" mb={3} sx={{ textAlign: "center" }}>
          Saisissez votre adresse email pour recevoir un lien de réinitialisation.
        </Typography>
        {submitted ? (
          <Alert severity="success" sx={{ mt: 2 }}>
            Si cet email existe, un lien de réinitialisation a été envoyé.<br />
            Pensez à vérifier vos spams.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Adresse email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              autoFocus
              autoComplete="email"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0 2px 8px 0 rgba(124,58,237,0.10)"
              }}
            >
              Envoyer le lien de réinitialisation
            </Button>
          </form>
        )}
      </Paper>
    </Box>
  );
}