// src/components/Dashboard.js
import { useEffect, useState } from "react";
import { Card, Typography, Container, Box, Grid, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import SettingsIcon from '@mui/icons-material/Settings';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import logo from '../../assets/images/logo.png';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 2
});

const FeatureCard = styled(Card)({
  textAlign: "center",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0px 4px 15px rgba(102, 51, 153, 0.15)",
  transition: "transform 0.3s ease",
  height: "100%",
  '&:hover': {
    transform: "translateY(-5px)"
  }
});

const FeatureIcon = styled(Avatar)({
  backgroundColor: "#663399",
  margin: "0 auto 10px",
  width: 56,
  height: 56
});

const Footer = styled('footer')({
  width: '100%',
  background: "linear-gradient(90deg, #663399 60%, #8a2be2 100%)",
  color: "#ffffff",
  padding: "70px 0 40px 0",
  marginTop: 40,
  fontSize: '1.2rem',
  boxShadow: '0 -8px 32px 0 rgba(102,51,153,0.10)',

  "& .footer-container": {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: 'flex-start',
    maxWidth: "1800px",
    margin: "0 auto",
    gap: 40,
    padding: '0 40px',
  },
  "& .footer-section": {
    flex: "1 1 350px",
    minWidth: 300,
    marginBottom: "35px",
    paddingRight: "30px",
  },
  "& .footer-section h3": {
    color: "#fff",
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "700",
    letterSpacing: 1,
    textShadow: '0 2px 8px #4b1c7d',
  },
  "& .footer-section p, & .footer-section a": {
    color: "#fff",
    marginBottom: "12px",
    textDecoration: "none",
    display: "block",
    fontSize: "1.1rem",
    opacity: 0.95,
  },
  "& .social-icons": {
    display: "flex",
    gap: "22px",
    marginTop: "25px",
    fontSize: 32,
  },
  "& .social-icons a": {
    color: "#fff",
    transition: 'transform 0.2s',
    '&:hover': { transform: 'scale(1.2)' }
  },
  "& .logos-container": {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    marginBottom: "30px",
  },
  "& .footer-logo": {
    height: "70px",
  },
  "& .google-partner": {
    height: "70px",
  },
  "& .copyright": {
    borderTop: "1px solid rgba(255, 255, 255, 0.2)",
    paddingTop: "25px",
    marginTop: "30px",
    fontSize: "1.05rem",
    textAlign: "center",
    width: "100%",
    opacity: 0.85,
    letterSpacing: 0.5,
  }
});

// Amélioration du style général du Dashboard pour un rendu plus moderne et immersif, tout en gardant tout le contenu et en étirant sur toute la largeur

const ModernSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(90deg, #f8f9fa 60%, #f3eaff 100%)',
  borderRadius: 32,
  boxShadow: '0 8px 48px 0 rgba(102,51,153,0.10)',
  padding: '48px 0',
  marginBottom: 64,
  width: '100%',
  maxWidth: 'none',
  [theme.breakpoints.down('md')]: {
    borderRadius: 16,
    padding: '32px 0',
  },
}));

const ModernCard = styled(Card)(({ theme }) => ({
  borderRadius: 24,
  boxShadow: '0 8px 32px 0 rgba(102,51,153,0.13)',
  border: '2px solid #e1d6f7',
  background: 'linear-gradient(120deg, #fff 60%, #f3eaff 100%)',
  padding: '32px 24px',
  minHeight: 220,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.04)',
    boxShadow: '0 12px 48px 0 #d1b3ff',
  },
  [theme.breakpoints.down('md')]: {
    padding: '20px 10px',
    minHeight: 160,
  },
}));

const ModernFeatureIcon = styled(Avatar)({
  background: 'linear-gradient(135deg, #663399 60%, #8a2be2 100%)',
  color: '#fff',
  margin: '0 auto 18px',
  width: 70,
  height: 70,
  boxShadow: '0 2px 12px #d1b3ff',
  fontSize: 38,
});

const DashboardBackground = styled(Box)({
  minHeight: '100vh',
  width: '100%', // Prend toute la largeur de l'écran sans dépasser
  overflowX: 'hidden',
  background: 'linear-gradient(120deg, #f8f9fa 60%, #e3f6fd 100%)',
  position: 'relative',
  maxWidth: '100vw',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
});

const Section = styled(Box)(({ theme }) => ({
  background: '#fff',
  borderRadius: 32,
  boxShadow: '0 8px 32px 0 rgba(102,51,153,0.10)',
  marginBottom: 64,
  padding: '48px 0',
  position: 'relative',
  transition: 'box-shadow 0.3s, transform 0.3s',
  [theme.breakpoints.down('md')]: {
    borderRadius: 18,
    padding: '32px 0',
    marginBottom: 32,
  },
  '&:hover': {
    boxShadow: '0 16px 48px 0 rgba(102,51,153,0.18)',
    transform: 'translateY(-4px) scale(1.01)',
  },
  animation: 'fadeIn 1.2s',
  '@keyframes fadeIn': {
    from: { opacity: 0, transform: 'translateY(40px)' },
    to: { opacity: 1, transform: 'none' },
  },
}));

// Données factices pour les graphes (à remplacer par les vraies stats dynamiques si besoin)
const resultsData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 4200 },
  { name: 'Mar', value: 3200 },
  { name: 'Apr', value: 4100 },
  { name: 'May', value: 4500 },
  { name: 'Jun', value: 3000 },
];
const spendData = [
  { name: 'Jan', value: 200 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 250 },
  { name: 'Apr', value: 400 },
  { name: 'May', value: 350 },
  { name: 'Jun', value: 500 },
];
const orderValueData = [
  { name: 'Jan', value: 20 },
  { name: 'Feb', value: 18 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 22 },
  { name: 'May', value: 21 },
  { name: 'Jun', value: 19 },
];
const audienceData = [
  { name: 'Total Audience', value: 1234, change: 12 },
  { name: 'New Customers', value: 567, change: 5 },
  { name: 'Returning Customers', value: 667, change: -2 },
];

// Composant Gauge type "demi-cadran" inspiré de l'image fournie
function BoosterGauge({ value = 70, label = "Booster Mon Entreprise" }) {
  // value: 0-100
  const angle = (value / 100) * 180 - 90; // -90deg (E) à +90deg (F)
  // Dégradé couleurs (rouge, orange, vert)
  const getColor = (v) => {
    if (v < 35) return "#ef4444"; // rouge
    if (v < 65) return "#f59e42"; // orange
    return "#22c55e"; // vert
  };
  // Ajout d'un effet glow dynamique sur l'aiguille et le pourcentage
  return (
    <Box sx={{ width: '100%', textAlign: 'center', position: 'relative' }}>
      <svg viewBox="0 0 220 120" width="100%" height="120" style={{ maxWidth: 320, display: 'block', margin: '0 auto' }}>
        {/* Arc de fond */}
        <path d="M20,110 A90,90 0 0,1 200,110" fill="none" stroke="#eee" strokeWidth="18" />
        {/* Arc coloré animé */}
        <path
          d="M20,110 A90,90 0 0,1 200,110"
          fill="none"
          stroke={getColor(value)}
          strokeWidth="18"
          strokeDasharray={`${(value/100)*283} 283`}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 16px ${getColor(value)}99)`,
            transition: 'stroke-dasharray 1s cubic-bezier(.4,2,.6,1)',
          }}
        />
        {/* Ticks */}
        {[...Array(21)].map((_, i) => {
          const a = (-90 + i*9);
          const r1 = 90, r2 = 100;
          const x1 = 110 + r1 * Math.cos((a * Math.PI) / 180);
          const y1 = 110 + r1 * Math.sin((a * Math.PI) / 180);
          const x2 = 110 + r2 * Math.cos((a * Math.PI) / 180);
          const y2 = 110 + r2 * Math.sin((a * Math.PI) / 180);
          let color = '#eee';
          if (i <= 7) color = '#ef4444';
          else if (i <= 13) color = '#f59e42';
          else color = '#22c55e';
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i%2===0?4:2} />;
        })}
        {/* Aiguille avec glow */}
        <g style={{ transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)', transform: `rotate(${angle}deg)`, transformOrigin: '110px 110px' }}>
          <rect x="108" y="30" width="4" height="80" rx="2" fill="#444" style={{ filter: `drop-shadow(0 0 8px ${getColor(value)}99)` }} />
          <circle cx="110" cy="110" r="10" fill="#888" stroke="#fff" strokeWidth="3" style={{ filter: `drop-shadow(0 0 8px ${getColor(value)}99)` }} />
        </g>
        {/* Labels E/F */}
        <text x="30" y="120" fontSize="18" fill="#ef4444" fontWeight="bold">E</text>
        <text x="190" y="120" fontSize="18" fill="#22c55e" fontWeight="bold">F</text>
        {/* Texte central */}
        <text x="110" y="80" textAnchor="middle" fontSize="22" fill="#222" fontWeight="bold">{label}</text>
        <text x="110" y="105" textAnchor="middle" fontSize="28" fill={getColor(value)} fontWeight="bold" style={{ filter: `drop-shadow(0 0 10px ${getColor(value)}66)` }}>{value}%</text>
      </svg>
      {/* Sous-texte explicite indicateur de performance */}
      <Typography sx={{ mt: 2, fontSize: { xs: 16, md: 18 }, color: '#663399', fontWeight: 500, opacity: 0.85 }}>
        Votre niveau de performance actuel pour booster votre entreprise
      </Typography>
    </Box>
  );
}

function Dashboard() {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupère l'email du client authentifié
  const clientEmail = localStorage.getItem('clientEmail');
  const [clientName, setClientName] = useState('');

  // Récupérer et compter les projets, commandes, factures du client connecté
  const [nbProjets, setNbProjets] = useState(0);
  const [nbCommandes, setNbCommandes] = useState(0);
  const [nbFactures, setNbFactures] = useState(0);

  useEffect(() => {
    if (clientEmail) {
      fetch('https://maplateforme.io/api/projets')
        .then(res => res.json())
        .then(data => {
          // Projets du client
          const projetsClient = data.filter(p => p.client && p.client.email && p.client.email.trim().toLowerCase() === clientEmail.trim().toLowerCase());
          setNbProjets(projetsClient.length);
          // Commandes = projets avec statut 'En cours' ou 'En attente'
          setNbCommandes(projetsClient.filter(p => ["En cours", "En attente"].includes(p.statut)).length);
          // Factures = projets avec statut 'Livré'
          setNbFactures(projetsClient.filter(p => p.statut === 'Livré').length);
          // Nom du client
          const projet = projetsClient[0];
          if (projet && projet.client && projet.client.nom) {
            setClientName(projet.client.nom);
          } else {
            setClientName('');
          }
        })
        .catch(() => {
          setNbProjets(0);
          setNbCommandes(0);
          setNbFactures(0);
          setClientName('');
        });
    }
  }, [clientEmail]);

  const user = {
    name: "Nom de l'utilisateur",
  };
  // Statistiques dynamiques selon les projets du client
  const stats = [
    { title: "Projets", value: `${nbProjets} projet${nbProjets > 1 ? 's' : ''}`, icon: <AssessmentIcon fontSize="medium" /> },
    { title: "Commandes", value: `${nbCommandes} commande${nbCommandes > 1 ? 's' : ''}`, icon: <LocalShippingIcon fontSize="medium" /> },
    { title: "Factures", value: `${nbFactures} facture${nbFactures > 1 ? 's' : ''}`, icon: <ReceiptIcon fontSize="medium" /> },
  ];

  // URL du logo Google Partner (remplacez par votre URL réelle)
  const googlePartnerLogo = "https://www.gstatic.com/partners/badge/images/2022/PartnerBadgeClickable.svg";

  // État pour le dialog de détail service
  const [openDetail, setOpenDetail] = useState(false);
  const [detailService, setDetailService] = useState(null);

  // Liste structurée des services
  const services = [
    {
      group: 'Site internet',
      items: [
        {
          title: 'Site corporate',
          description: 'Un site vitrine professionnel pour présenter votre activité et vos services.',
          price: '49€',
          details: 'Site vitrine responsive, design moderne, formulaire de contact, optimisation SEO de base, hébergement inclus la 1ère année.'
        },
        {
          title: 'Site e-commerce',
          description: 'Vendez vos produits en ligne avec une boutique moderne et sécurisée.',
          price: '99€',
          details: 'Gestion catalogue, paiement sécurisé, suivi des commandes, responsive, support technique 6 mois.'
        },
        {
          title: 'Site webdesign',
          description: 'Un site au design unique et créatif pour marquer les esprits.',
          price: '69€',
          details: 'Création graphique sur-mesure, animations, UX optimisée, accompagnement personnalisé.'
        }
      ]
    },
    {
      group: 'Référencement',
      items: [
        {
          title: '2 mots clés',
          description: 'Optimisez votre visibilité sur Google avec 2 mots clés ciblés.',
          price: '39€',
          details: 'Audit SEO, choix des mots clés, optimisation on-page, rapport de positionnement.'
        },
        {
          title: '4 mots clés',
          description: 'Boostez votre SEO avec 4 mots clés pour plus de trafic qualifié.',
          price: '59€',
          details: 'Optimisation avancée, suivi mensuel, rapport détaillé, conseils personnalisés.'
        },
        {
          title: '6 mots clés',
          description: 'Pour une présence renforcée sur plusieurs requêtes stratégiques.',
          price: '89€',
          details: 'Stratégie multi-mots clés, netlinking, reporting, accompagnement dédié.'
        },
        {
          title: '12 mots clés',
          description: 'La solution complète pour dominer votre secteur sur Google.',
          price: '149€',
          details: 'SEO complet, contenu optimisé, backlinks, analyse concurrentielle.'
        }
      ]
    },
    {
      group: 'SEA',
      items: [
        {
          title: 'Pack Everest',
          description: 'Campagne Google Ads premium, gestion avancée, reporting détaillé.',
          price: 'à partir de 1200€',
          details: 'Création et gestion de campagnes, optimisation ROI, A/B testing, reporting mensuel.'
        },
        {
          title: 'Pack Kilimandjaro',
          description: 'Gestion de campagnes SEA pour une visibilité rapide et efficace.',
          price: '750€',
          details: 'Paramétrage, suivi, optimisation, support dédié.'
        },
        {
          title: 'Pack Mont Blanc',
          description: 'Pack d\'entrée pour lancer vos premières campagnes Google Ads.',
          price: '200€',
          details: 'Mise en place rapide, budget maîtrisé, conseils personnalisés.'
        }
      ]
    },
    {
      group: 'Community Management',
      items: [
        {
          title: 'Community Management',
          description: 'Création graphique, 2 posts/semaine, animation, stratégie éditoriale, campagne display.',
          price: '139€',
          details: 'Animation réseaux sociaux, création de contenu, planification, reporting.'
        }
      ]
    },
    {
      group: 'E-réputation',
      items: [
        {
          title: '30 transmissions',
          description: '30 demandes d’avis clients transmises/an pour booster votre réputation.',
          price: '39€',
          details: 'Collecte d\'avis, gestion des retours, rapport annuel.'
        },
        {
          title: '50 transmissions',
          description: '50 demandes d’avis clients transmises/an pour une meilleure visibilité.',
          price: '49€',
          details: 'Gestion avancée, suivi, analyse de la satisfaction.'
        },
        {
          title: '100 transmissions',
          description: '100 demandes d’avis clients transmises/an pour une réputation optimale.',
          price: '69€',
          details: 'Gestion complète, analyse, reporting détaillé.'
        }
      ]
    }
  ];

  return (
    <DashboardBackground>
      {/* Ajout d'une petite navbar en haut du dashboard */}
      <Box sx={{
        width: '100%',
        bgcolor: '#663399',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 6 },
        py: { xs: 2, md: 2.5 },
        minHeight: { xs: 60, md: 80 },
        boxShadow: '0 2px 12px #66339922',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        {/* Partie gauche : nom de l'entreprise */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 18, md: 26 }, letterSpacing: 1, textShadow: '0 2px 8px #4b1c7d88' }}>
            Digital Media Mobile
          </Typography>
        </Box>
        {/* Partie centrale : message de bienvenue + nom utilisateur */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: { xs: 22, md: 32 }, letterSpacing: 1, textShadow: '0 2px 8px #4b1c7d88', textAlign: 'center', width: '100%' }}>
            Bienvenue{clientName ? `, ${clientName}` : ''} !
          </Typography>
        </Box>
       {/* Partie droite : bouton déconnexion */}
<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flex: 1.5, ml: 1 }}>
  <button
    onClick={() => {
      localStorage.removeItem('clientEmail');
      window.location.href = '/';
    }}
    style={{
      background: '#fff',
      color: '#663399',
      border: 'none',
      borderRadius: 8,
      padding: '8px 22px',
      fontWeight: 700,
      fontSize: '1.1rem',
      cursor: 'pointer',
      boxShadow: '0 2px 8px #fff4',
      transition: 'background 0.2s',
      marginLeft: 'auto', // ← on garde cette ligne pour le pousser à droite
      display: 'block',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      minWidth: 120,
    }}
  >
    Déconnexion
  </button>
</Box>

      </Box>  

      <Container maxWidth={false} disableGutters sx={{
        px: 0,
        width: '100%', // Correction ici
        m: 0,
        maxWidth: '100vw', // Correction ici
        overflowX: 'hidden',
        boxSizing: 'border-box',
        bgcolor: '#fff',
        display: 'block',
        minHeight: '100vh',
      }}>
        {/* Section principale full width */}
        <Box sx={{
          width: '100%', // Correction ici
          maxWidth: '100vw', // Correction ici
          minHeight: 'calc(100vh - 250px)',
          display: 'block',
          px: 0,
          mx: 0,
        }}>
          {/* Nouvelle section widgets côte à côte */}
          <Box sx={{ py: { xs: 8, md: 12 }, px: 0, m: 0 }}>
            <Grid container spacing={0} sx={{ m: 0, width: '100%', maxWidth: '100%', background: 'transparent', px: 0 }}>
              {/* Section Mes Résultats + jauge : full bord à bord */}
              <Grid item xs={12} sx={{ p: 0, m: 0 }}>
                <Box sx={{ width: '100%', maxWidth: '100%', px: 0, py: { xs: 5, md: 7 }, m: 0 }}>
                  <Card sx={{ width: '100%', borderRadius: 0, boxShadow: 'none', border: 'none', bgcolor: '#fff', p: { xs: 6, md: 10 }, m: 0 }}>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: 40, md: 56 }, color: '#663399', mb: 6, textAlign: 'left', letterSpacing: 0.5, px: 0 }}>Mes Résultats</Typography>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 6, md: 6 }, width: '100%', justifyContent: 'space-between', alignItems: 'stretch', px: 0 }}>
                      {/* Widgets statistiques */}
                      <Box sx={{ flex: 2, minWidth: 0, pr: { md: 4 }, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 5, width: '100%' }}>
                        {/* Widget Fréquence */}
                        <Card sx={{ width: '100%', minWidth: 0, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(102,51,153,0.13)', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '0 16px 48px #d1b3ff' } }}>
                          <Avatar sx={{ bgcolor: '#663399', color: '#fff', width: 60, height: 60, mb: 2, fontSize: 36 }}>⏱️</Avatar>
                          <Typography sx={{ fontWeight: 600, fontSize: { xs: 26, md: 32 }, color: '#663399', mb: 2 }}>Fréquence d'utilisation du service</Typography>
                          <Typography sx={{ fontWeight: 800, fontSize: { xs: 48, md: 64 }, color: '#111', mb: 1 }}>12 345</Typography>
                          <Typography sx={{ color: '#444', fontSize: { xs: 20, md: 22 }, mb: 3, fontWeight: 500 }}>30 derniers jours <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1em' }}>+12%</span></Typography>
                          <ResponsiveContainer width="100%" height={80}>
                            <BarChart data={resultsData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <Bar dataKey="value" fill="#d1b3ff" radius={[12, 12, 0, 0]} barSize={28} />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={18} dy={10} tick={{ fill: '#888' }} />
                              <YAxis hide />
                              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} contentStyle={{ borderRadius: 14, fontSize: 18 }} />
                            </BarChart>
                          </ResponsiveContainer>
                        </Card>
                        {/* Widget Dépenses */}
                        <Card sx={{ width: '100%', minWidth: 0, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(34,197,94,0.13)', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '0 16px 48px #b3ffd1' } }}>
                          <Avatar sx={{ bgcolor: '#22c55e', color: '#fff', width: 60, height: 60, mb: 2, fontSize: 36 }}>💶</Avatar>
                          <Typography sx={{ fontWeight: 600, fontSize: { xs: 26, md: 32 }, color: '#22c55e', mb: 2 }}>Dépenses totales</Typography>
                          <Typography sx={{ fontWeight: 800, fontSize: { xs: 48, md: 64 }, color: '#111', mb: 1 }}>567 €</Typography>
                          <Typography sx={{ color: '#444', fontSize: { xs: 20, md: 22 }, mb: 3, fontWeight: 500 }}>30 derniers jours <span style={{ color: '#22c55e', fontWeight: 700, fontSize: '1.1em' }}>+5%</span></Typography>
                          <ResponsiveContainer width="100%" height={70}>
                            <LineChart data={spendData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={5} dot={false} />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={16} dy={10} tick={{ fill: '#888' }} />
                              <YAxis hide />
                              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} contentStyle={{ borderRadius: 14, fontSize: 16 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </Card>
                        {/* Widget Valeur moyenne */}
                        <Card sx={{ width: '100%', minWidth: 0, bgcolor: '#fff', borderRadius: 6, boxShadow: '0 8px 32px 0 rgba(239,68,68,0.13)', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: '0 16px 48px #ffd1d1' } }}>
                          <Avatar sx={{ bgcolor: '#ef4444', color: '#fff', width: 60, height: 60, mb: 2, fontSize: 36 }}>📊</Avatar>
                          <Typography sx={{ fontWeight: 600, fontSize: { xs: 26, md: 32 }, color: '#ef4444', mb: 2 }}>Valeur moyenne du service</Typography>
                          <Typography sx={{ fontWeight: 800, fontSize: { xs: 48, md: 64 }, color: '#111', mb: 1 }}>21,89 €</Typography>
                          <Typography sx={{ color: '#444', fontSize: { xs: 20, md: 22 }, mb: 3, fontWeight: 500 }}>30 derniers jours <span style={{ color: '#ef4444', fontWeight: 700, fontSize: '1.1em' }}>-2%</span></Typography>
                          <ResponsiveContainer width="100%" height={70}>
                            <BarChart data={orderValueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                              <Bar dataKey="value" fill="#ef4444" radius={[12, 12, 0, 0]} barSize={22} />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={16} dy={10} tick={{ fill: '#888' }} />
                              <YAxis hide />
                              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.03)' }} contentStyle={{ borderRadius: 14, fontSize: 16 }} />
                            </BarChart>
                          </ResponsiveContainer>
                        </Card>
                      </Box>
                      {/* Widget jauge Booster */}
                      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'center', pl: { md: 4 }, mt: { xs: 6, md: 0 } }}>
                        <Card sx={{
                          width: '100%',
                          minWidth: 0,
                          bgcolor: '#fff',
                          borderRadius: 6,
                          boxShadow: '0 8px 32px 0 rgba(102,51,153,0.13)',
                          p: 5,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center', // centrage horizontal
                          justifyContent: 'center', // centrage vertical
                          transition: 'box-shadow 0.3s',
                          border: '2px solid #e1d6f7',
                          '&:hover': { boxShadow: '0 16px 48px #d1b3ff' }
                        }}>
                          <BoosterGauge value={70} label="Booster Mon Entreprise" />
                        </Card>
                      </Box>
                    </Box>
                  </Card>
                </Box>
              </Grid>
              {/* Section Mes Produits (en dessous, toute la largeur sur desktop) */}
              <Grid item xs={12}>
                <Box sx={{ bgcolor: '#fff', border: '2px solid #d1d5db', borderRadius: 4, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', p: { xs: 5, md: 7 }, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', overflowY: 'auto', maxHeight: { xs: 400, md: 600 }, mt: 4 }}>
                  <Typography sx={{ fontWeight: 800, fontSize: { xs: 40, md: 56 }, color: '#663399', mb: 4, textAlign: 'center', letterSpacing: 0.5, fontFamily: 'Roboto, Arial, sans-serif' }}>Mes Produits</Typography>
                  <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {services.map((group, idx) => (
                      <Box key={group.group} sx={{ mb: 2 }}>
                        <Typography sx={{ fontWeight: 500, fontSize: { xs: 20, md: 24 }, color: '#663399', mb: 1, textAlign: 'left', pl: 1 }}>{group.group}</Typography>
                        <Grid container spacing={2}>
                          {group.items.map((item, i) => (
                            <Grid item xs={12} sm={6} md={4} key={item.title}>
                              <Card sx={{
                                width: '100%',
                                minWidth: 0,
                                bgcolor: '#fff',
                                borderRadius: 6,
                                boxShadow: '0 8px 32px 0 rgba(102,51,153,0.13)',
                                p: 5,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                transition: 'box-shadow 0.3s',
                                border: '2px solid #e1d6f7',
                                '&:hover': { boxShadow: '0 16px 48px #d1b3ff' }
                              }}>
                                <Typography sx={{ fontWeight: 700, fontSize: { xs: 26, md: 32 }, color: '#222', mb: 1, fontFamily: 'Roboto, Arial, sans-serif', letterSpacing: 0.5 }}>{item.title}</Typography>
                                <Typography sx={{ fontSize: { xs: 18, md: 20 }, color: '#444', mb: 2, fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 400 }}>{item.description}</Typography>
                                <Typography sx={{ fontWeight: 700, color: '#663399', fontSize: { xs: 22, md: 26 }, mb: 1, fontFamily: 'Roboto, Arial, sans-serif' }}>{item.price}</Typography>
                                <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: '#888', mt: 1, fontFamily: 'Roboto, Arial, sans-serif', fontWeight: 400 }}>{item.details}</Typography>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          {/* Section Mon Audience */}
          <Box sx={{ py: 7, px: { xs: 2, md: 6 } }}>
            <Typography variant="h5" sx={{ fontWeight: 400, fontSize: { xs: 32, md: 44 }, mb: 3, color: '#111' }}>Mon Audience</Typography>
            <Grid container spacing={4}>
              {audienceData.map((aud, idx) => (
                <Grid item xs={12} md={4} key={aud.name}>
                  <Box sx={{ bgcolor: '#fff', borderRadius: 4, boxShadow: '0 2px 12px #eee', p: 4, height: '100%', textAlign: 'center', fontSize: { xs: 22, md: 28 }, color: '#222' }}>
                    <Typography sx={{ fontWeight: 400, fontSize: { xs: 26, md: 32 }, mb: 1 }}>{aud.name}</Typography>
                    <Typography sx={{ fontWeight: 400, fontSize: { xs: 38, md: 54 } }}>{aud.value}</Typography>
                    <Typography sx={{ color: aud.change >= 0 ? '#22c55e' : '#ef4444', fontWeight: 400, fontSize: { xs: 22, md: 28 } }}>{aud.change >= 0 ? `+${aud.change}%` : `${aud.change}%`}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {/* Footer Digital Media Mobile - Style inspiré par l'exemple */}
        <Footer>
          <div className="footer-container">
            {/* Section DMM */}
            <div className="footer-section">
              <h3>Digital Media Mobile</h3>
              <div className="logos-container">
                <img src={logo}  alt="DMM Logo" className="footer-logo" />
                <img src={googlePartnerLogo} alt="Google Partner" className="google-partner" />
              </div>
              <div className="social-icons">
                <a href="#"><FacebookIcon /></a>
                <a href="#"><InstagramIcon /></a>
                <a href="#"><YouTubeIcon /></a>
                <a href="#"><TwitterIcon /></a>
              </div>
            </div>

            {/* Section Services */}
            <div className="footer-section">
              <h3>Nos Services</h3>
              <p>Marketing Digital</p>
              <p>Création de sites web</p>
              <p>Solutions NFC</p>
              <p>Pages Jaunes</p>
              <p>Référencement</p>
              <p>Publicité en ligne</p>
              <p>Community Management</p>
              <p>E-réputation</p>
              <p>SEO</p>
              <p>SEA</p>
              <p>Forfait DUO</p>
              <p>Le TRIO</p>
            </div>

            {/* Section Expertises */}
            <div className="footer-section">
              <h3>Expertises</h3>
              <p>Optimisation SEO</p>
              <p>Publicité SEA</p>
              <p>Stratégie digitale</p>
              <p>Analyse de marché</p>
            </div>

            {/* Section Contact */}
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>contact@dmm-africa.com</p>
              <p>+33 1 23 45 67 89</p>
              <p>Paris, France</p>
            </div>

            {/* Copyright section */}
            <div className="copyright">
              Copyright © {new Date().getFullYear()} Digital Media Mobile . Tous droits réservés. Designed by Digital Media Mobile.
            </div>
          </div>
        </Footer>
      </Container>
    </DashboardBackground>
  );
}

export default Dashboard;
