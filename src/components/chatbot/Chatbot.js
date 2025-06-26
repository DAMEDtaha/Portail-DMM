import React, { useState, useRef, useEffect } from "react";
import { Box, IconButton, TextField, Paper, Typography, Fab, Avatar, Fade } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider ?" }
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false); // Ajout de l'état
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = async () => {
    if (input.trim() === "") return;
    setMessages([...messages, { from: "user", text: input }]);
    setIsBotTyping(true);
    setMessages(msgs => [
      ...msgs,
      { from: "bot", text: "en train d'écrire..." }
    ]);
    try {
      // Appel à l'API backend Symfony
      const response = await fetch("http://localhost:8000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input }),
        credentials: "omit", // <-- Ajouté pour éviter l'envoi de cookies/session
        redirect: "follow"   // <-- S'assure que fetch suit la redirection (par défaut)
      });

      if (response.status === 429) {
        setIsBotTyping(false);
        setMessages(msgs => [
          ...msgs.slice(0, -1), // retire le message "en train d'écrire"
          { from: "bot", text: "Vous avez envoyé trop de requêtes. Merci de patienter quelques instants avant de réessayer." }
        ]);
        setInput("");
        return;
      }

      const data = await response.json();
      let botText = data.bot || "Désolé, je n'ai pas compris votre demande.";

      // --- Toute ta logique métier personnalisée reste ici ---
      const userInput = input.toLowerCase();

      if (
        /(c'est quoi|qui est|présente|présentation|peux-tu me parler de|tu es qui|qu'est-ce que|qu est ce que|qu’est-ce que|vous faites quoi|c'est quoi votre metier).*(dmm|digital media mobile)/i.test(userInput) ||
        /(dmm|digital media mobile).*(c'est quoi|qui est|présente|présentation|peux-tu me parler de|tu es qui|qu'est-ce que|qu est ce que|qu’est-ce que)/i.test(userInput) ||
        userInput.trim() === "dmm" ||
        userInput.trim() === "digital media mobile"||
        userInput.trim() === "digital media mobile (dmm)"||
        userInput.trim() === "digital media mobile (dmm) est une entreprise française spécialisée dans le marketing digital"
      ) {
        botText = `Digital Media Mobile (DMM) est une entreprise française spécialisée dans le marketing digital. 
DMM s'est distinguée comme mandataire des annonceurs Pages Jaunes et dans la création de sites web. 
L’agence est experte en SEO (référencement naturel) pour optimiser la visibilité sur les moteurs de recherche, 
et en SEA (publicité payante) pour des campagnes ciblées et rapides. 
DMM intègre aussi des technologies innovantes comme le NFC pour des solutions mobiles et sans contact. 
Le groupe est présent en France, au Maroc et au Sénégal, avec plus de 1 500 clients et une équipe commerciale structurée. 
DMM accompagne ses clients pour augmenter leur visibilité et leur performance sur le web et les supports digitaux.`;
      } 
      else if (/^(bonjour|salut|hello|coucou|bonsoir|hey|salam)/i.test(userInput)) {
        botText = "Bonjour ! Comment puis-je vous aider aujourd'hui ?";
      } 
      else if (/^(cava|cv|vous etes bien|tu te sens bien aujourd'hui|bekher|labas)/i.test(userInput)) {
        botText = "Je vais bien, merci ! Et vous ?";
      } 
      else if (/(merci|thanks|thank you|thx)/i.test(userInput)) {
        botText = "Avec plaisir ! N'hésitez pas si vous avez d'autres questions.";
      } 
      else if (
        (
          (userInput.includes("commande") && userInput.includes("créer")) ||
          (userInput.includes("commande") && userInput.includes("nouvelle")) ||
          (userInput.includes("commande") && userInput.includes("ajouter")) ||
          (userInput.includes("commande") && userInput.includes("nouvelle commande"))||
          (userInput.includes("commande") && userInput.includes("consulter les commandes"))
        )
      ) {
        botText = "Pour créer une commande, allez dans la section 'Commandes', cliquez sur 'Nouvelle commande', choisissez l'activité (SEO, SEA, Site Web, NFC, etc.) puis remplissez les informations. Vous pouvez aussi ajouter des commentaires ou des pièces jointes pour préciser votre besoin. Une fois la commande envoyée, vous recevrez une notification lors de chaque changement de statut.";
      } 
      else if (
        userInput.includes("suivi commande") ||
        userInput.includes("où en est ma commande") ||
        userInput.includes("statut commande") ||
        userInput.includes("avancement commande")
      ) {
        botText = "Pour suivre l'avancement de vos commandes, consultez la timeline de chaque commande dans la section 'Commandes'. Vous y verrez les étapes (créée, en cours, livrée, etc.) et recevrez des notifications à chaque changement de statut.";
      }
      else if (
        userInput.includes("répéter commande") ||
        userInput.includes("dupliquer commande") ||
        userInput.includes("refaire commande")
      ) {
        botText = "Pour répéter une commande, utilisez le bouton 'Répéter' disponible sur la fiche de commande. Cela vous permet de gagner du temps pour les commandes récurrentes.";
      }
      else if (
        userInput.includes("rechercher commande") ||
        userInput.includes("filtrer commande") ||
        userInput.includes("trier commande")
      ) {
        botText = "Vous pouvez rechercher, filtrer ou trier vos commandes grâce à la barre de recherche et aux filtres disponibles en haut de la section 'Commandes'.";
      }
      else if (
        userInput.includes("commande") && 
        (userInput.includes("modifier") ||
        userInput.includes("changer") || userInput.includes("éditer"))
      ) {
        botText = "La modification d'une commande n'est pas disponible. Vous pouvez uniquement consulter ou créer une nouvelle commande.";
      } 
      else if (
        userInput.includes("commande") && 
        (userInput.includes("supprimer") || userInput.includes("effacer") || userInput.includes("retirer"))
      ) {
        botText = "La suppression d'une commande n'est pas disponible. Vous pouvez uniquement consulter ou créer une nouvelle commande.";
      } 
      else if (
        userInput.includes("résilier") ||
        userInput.includes("resiliation") ||
        userInput.includes("résiliation") ||
        userInput.includes("annuler") ||
        userInput.includes("mettre fin") ||
        userInput.includes("fin de contrat") ||
        userInput.includes("contrat") ||
        userInput.includes("contrat d'engagement") ||
        userInput.includes("contrat d'abonnement") ||
        userInput.includes("contrat d'adhésion") ||
        (userInput.includes("contrat") && (userInput.includes("annuler") || userInput.includes("mettre fin")))
      ) {
        botText = "Pour résilier un contrat, rendez-vous dans la section 'Bons de Commandes & Contrats', cliquez sur le bouton 'Résilier ce contrat' du contrat concerné et précisez le motif. Votre demande sera transmise au support.";
      }
      else if (
        userInput.includes("commande") && 
        (userInput.includes("consulter commande") || userInput.includes("voir") || userInput.includes("liste"))
      ) {
        botText = "Dans la section 'Commandes', vous pouvez consulter toutes vos commandes et en créer de nouvelles selon les services proposés.";
      }
      else if (userInput.includes("commande")) {
        botText = "Dans la section 'Commandes', vous pouvez consulter toutes vos commandes et en créer de nouvelles selon les services proposés.";
      } 
      else if (
        userInput.includes("facture") || 
        userInput.includes("avoir") || 
        userInput.includes("paiement") || 
        userInput.includes("payer") ||
        userInput.includes("montant") ||
        userInput.includes("règlement") ||
        userInput.includes("facturation") ||
        userInput.includes("historique de facturation") ||
        userInput.includes("historique des paiements") ||
        userInput.includes("historique des factures") ||
        userInput.includes("historique des avoirs") ||
        userInput.includes("historique des règlements") ||
        userInput.includes("historique des factures et avoirs") ||
        userInput.includes("historique des paiements et factures") ||
        userInput.includes("historique des paiements et avoirs") ||
        userInput.includes("historique des paiements et règlements") ||
        userInput.includes("historique des factures et paiements") ||
        userInput.includes("consulter mes factures")
      ) {
        botText = "Pour consulter vos factures ou avoirs, rendez-vous dans la section 'Factures' du menu.";
      } 
      else if (
        userInput.includes("aide") || 
        userInput.includes("support") || 
        userInput.includes("problème") || 
        userInput.includes("ticket") || 
        userInput.includes("case") || 
        userInput.includes("assistance") || 
        userInput.includes("contacter")
      ) {
        botText = "Pour toute question ou problème, ouvrez un ticket dans la section 'Cases'. Sélectionnez le type (Technique, Commentaire, Contestation) et décrivez votre demande.";
      } 
      else if (
        userInput.includes("profil") || 
        userInput.includes("compte") || 
        userInput.includes("mon compte") || 
        userInput.includes("informations personnelles")
      ) {
        botText = "Pour gérer votre compte, cliquez sur 'Mon compte' dans la barre latérale.";
      } 
      else if (
        userInput.includes("seo") || 
        userInput.includes("référencement") || 
        userInput.includes("naturel")||
        userInput.includes("search engine optimization") ||
        userInput.includes("optimisation") ||
        userInput.includes("référencement naturel") ||
        userInput.includes("SEO") 
      ) {
        botText = "Le service SEO vous aide à améliorer la visibilité de votre site sur les moteurs de recherche.";
      } 
      else if (
        userInput.includes("sea") || 
        userInput.includes("publicité") || 
        userInput.includes("google ads")||
        userInput.includes("search engine advertising") ||
        userInput.includes("publicité payante") ||
        userInput.includes("campagne publicitaire") ||
        userInput.includes("SEA") 
      ) {
        botText = "Le service SEA concerne la publicité sur les moteurs de recherche (Google Ads, etc.).";
      } 
      else if (
        userInput.includes("site web") || 
        userInput.includes("création de site") || 
        userInput.includes("site internet")
      ) {
        botText = "Nous proposons la création et la gestion de sites web adaptés à vos besoins.";
      } 
      else if (
        userInput.includes("nfc") || 
        userInput.includes("sans contact") || 
        userInput.includes("near field communication")||
        userInput.includes("communication en champ proche") ||
        userInput.includes("solution nfc") ||
        userInput.includes("technologie nfc") ||
        userInput.includes("solution sans contact") ||
        userInput.includes("NFC") 
      ) {
        botText = "La solution NFC permet de connecter vos supports physiques à des expériences digitales.";
      } 
      else if (
        userInput.includes("maroc") || 
        userInput.includes("sénégal") || 
        userInput.includes("france") || 
        userInput.includes("international") || 
        userInput.includes("présence")
      ) {
        botText = "DMM est présent en France, au Maroc et au Sénégal, avec une équipe commerciale structurée et plus de 1 500 clients.";
      }
      else if (
        userInput.includes("pages jaunes") || 
        userInput.includes("mandataire") || 
        userInput.includes("annonceur")
      ) {
        botText = "DMM agit comme mandataire des annonceurs Pages Jaunes, accompagnant les clients dans la création, gestion et optimisation de leurs campagnes publicitaires.";
      }
      else if (
        userInput.includes("au revoir") || 
        userInput.includes("bye") || 
        userInput.includes("à bientôt")
      ) {
        botText = "Au revoir ! N'hésitez pas à revenir si vous avez d'autres questions.";
      }

      // Affiche le message "en train d'écrire..." pendant 5 secondes
      setTimeout(() => {
        setIsBotTyping(false);
        setMessages(msgs => [
          ...msgs.slice(0, -1), // retire le message "en train d'écrire"
          { from: "bot", text: botText }
        ]);
      }, 5000);

    } catch (error) {
      setIsBotTyping(false);
      setMessages(msgs => [
        ...msgs.slice(0, -1), // retire le message "en train d'écrire"
        { from: "bot", text: "Erreur lors de la connexion à l'assistant IA." }
      ]);
    }
    setInput("");
  };

  return (
    <>
      {!open && (
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 2000,
            bgcolor: "#7c3aed",
            boxShadow: "0 4px 24px 0 #bdbdfc"
          }}
          onClick={() => setOpen(true)}
        >
          <ChatIcon />
        </Fab>
      )}
      <Fade in={open}>
        <Paper
          elevation={12}
          sx={{
            position: "fixed",
            bottom: 32,
            right: 32,
            width: 370,
            height: 500,
            display: open ? "flex" : "none",
            flexDirection: "column",
            zIndex: 2000,
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "#f8fafc",
            boxShadow: "0 8px 32px 0 #bdbdfc"
          }}
        >
          {/* Header */}
          <Box sx={{
            bgcolor: "#7c3aed",
            color: "#fff",
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar sx={{ bgcolor: "#fff", color: "#7c3aed", mr: 1 }}>
                <SmartToyIcon />
              </Avatar>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Assistant IA DMM
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{ color: "#fff" }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Messages */}
          <Box sx={{
            flex: 1,
            p: 2,
            overflowY: "auto",
            bgcolor: "#f1f5f9",
            display: "flex",
            flexDirection: "column"
          }}>
            {messages.map((msg, idx) => (
              <Fade in={open} key={idx} timeout={400 + idx * 100}>
                <Box
                  sx={{
                    mb: 1.5,
                    display: "flex",
                    justifyContent: msg.from === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: 3,
                      bgcolor: msg.from === "user" ? "#7c3aed" : "#e0e7ff",
                      color: msg.from === "user" ? "#fff" : "#222",
                      maxWidth: "75%",
                      boxShadow: 1,
                      fontSize: 15,
                      wordBreak: "break-word",
                      transition: "all 0.3s"
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              </Fade>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          {/* Input */}
          <Box sx={{
            display: "flex",
            p: 1.5,
            borderTop: "1px solid #e5e7eb",
            bgcolor: "#fff"
          }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Votre message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              sx={{
                flex: 1,
                mr: 1,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                boxShadow: "0 1px 4px #e0e7ff"
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              sx={{
                bgcolor: "#7c3aed",
                color: "#fff",
                "&:hover": { bgcolor: "#5b21b6" }
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Fade>
    </>
  );
}

export default Chatbot;