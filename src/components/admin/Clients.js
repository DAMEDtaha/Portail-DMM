import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Avatar, IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// Exemple de données clients (à remplacer par un fetch API plus tard)
const clients = [
  {
    id: 1,
    name: "Ouadhani Mohamed TAHA",
    email: "taha@dmm.com",
  },
  {
    id: 2,
    name: "Fatima Zahra",
    email: "fatima@dmm.com",
  }
];

export default function Clients() {
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
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 24px 0 rgba(102,51,153,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={0}
      >
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700, color: "#663399", letterSpacing: 1, textShadow: "0 2px 8px rgba(102,51,153,0.08)" }}>
          <PeopleIcon sx={{ mr: 1, color: "#7c3aed", fontSize: 36 }} />
          Liste des clients
        </Typography>
        <List sx={{ width: "100%" }}>
          {clients.map(client => (
            <ListItem
              key={client.id}
              sx={{
                mb: 2,
                borderRadius: 2,
                bgcolor: "#ede9fe",
                boxShadow: "0 2px 8px 0 rgba(124,58,237,0.06)",
                "&:hover": { bgcolor: "#e0e7ff" }
              }}
            >
              <Avatar sx={{ bgcolor: "#7c3aed", mr: 2, width: 48, height: 48, fontSize: 22 }}>
                {client.name[0]}
              </Avatar>
              <ListItemText
                primary={
                  <Typography fontWeight={600} color="#663399">
                    {client.name}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary" fontSize="1rem">
                    {client.email}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}