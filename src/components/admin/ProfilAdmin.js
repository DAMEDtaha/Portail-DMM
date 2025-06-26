import React from "react";
import { Box, Typography, Paper, Avatar, Divider, Button, IconButton, Grid, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { useNavigate } from "react-router-dom";

const admin = {
  name: "Admin DMM",
  email: "admin@dmm.com",
  role: "Administrateur",
  phone: "+212 600-000000",
  status: "Actif",
  avatar: "",
};

export default function ProfilAdmin() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: 3,
        maxWidth: 700,
        mx: "auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ede9fe 0%, #f8fafc 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px 0 rgba(102,51,153,0.10)",
      }}
    >
      <IconButton
        onClick={() => navigate("/AdminDashboard")}
        sx={{
          mb: 2,
          alignSelf: "flex-start",
          bgcolor: "#ede9fe",
          color: "#663399",
          "&:hover": { bgcolor: "#d1c4e9" }
        }}
        size="large"
      >
        <ArrowBackIcon fontSize="inherit" />
      </IconButton>
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
          width: "100%",
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 4px 24px 0 rgba(102,51,153,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Avatar
          sx={{
            bgcolor: "#7c3aed",
            width: 110,
            height: 110,
            mb: 2,
            boxShadow: "0 4px 16px 0 rgba(124,58,237,0.15)",
            border: "4px solid #ede9fe",
            fontSize: 48,
          }}
          src={admin.avatar}
        >
          <PersonIcon sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 0.5,
            color: "#663399",
            letterSpacing: 1,
            textShadow: "0 2px 8px rgba(102,51,153,0.08)"
          }}
        >
          {admin.name}
        </Typography>
        <Chip
          icon={<VerifiedUserIcon />}
          label={admin.role}
          color="secondary"
          sx={{
            bgcolor: "#ede9fe",
            color: "#7c3aed",
            fontWeight: 600,
            mt: 1,
            mb: 2,
            fontSize: "1rem"
          }}
        />
        <Divider sx={{ my: 2, width: "100%", bgcolor: "#ede9fe" }} />
        <Grid container spacing={2} sx={{ width: "100%", mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <EmailIcon sx={{ color: "#7c3aed", mr: 1 }} />
              <Typography color="text.secondary" fontSize="1.1rem">
                {admin.email}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <PersonIcon sx={{ color: "#7c3aed", mr: 1 }} />
              <Typography color="text.secondary" fontSize="1.1rem">
                {admin.phone}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography fontWeight={600} color="#663399" sx={{ mr: 1 }}>
                Statut :
              </Typography>
              <Chip
                label={admin.status}
                color={admin.status === "Actif" ? "success" : "default"}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Typography fontWeight={600} color="#663399" sx={{ mr: 1 }}>
                Dernière connexion :
              </Typography>
              <Typography color="text.secondary" fontSize="1.1rem">
                Aujourd'hui, 09:15
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 2, width: "100%", bgcolor: "#ede9fe" }} />
        <Button
          variant="contained"
          color="secondary"
          startIcon={<LogoutIcon />}
          fullWidth
          sx={{
            bgcolor: "#7c3aed",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            borderRadius: 2,
            boxShadow: "0 2px 8px 0 rgba(124,58,237,0.10)",
            py: 1.2,
            mt: 2,
            "&:hover": {
              bgcolor: "#663399"
            }
          }}
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
        >
          Se déconnecter
        </Button>
      </Paper>
    </Box>
  );
}