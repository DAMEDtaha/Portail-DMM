import React from "react";
import {
  Megaphone,
  Monitor,
  Nfc,
  BookOpen,
  Search,
  DollarSign,
  Users,
  Shield,
  TrendingUp,
  Award,
  Link,
} from "lucide-react";

const styles = {
  container: {
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
  },
  hero: {
    background: "linear-gradient(to bottom right, #7c3aed, #312e81)",
    color: "white",
    padding: "2.5rem 1rem",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  heroTitle: {
    fontSize: "1.875rem",
    fontWeight: "800",
    marginBottom: "0.5rem",
  },
  heroSubTitle: {
    fontSize: "2.25rem",
    fontWeight: "800",
    marginBottom: "0.75rem",
  },
  heroParagraph: {
    fontSize: "1rem",
    color: "#ddd6fe",
    marginBottom: "1.5rem",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  button: {
    backgroundColor: "white",
    color: "#7c3aed",
    fontWeight: "700",
    padding: "0.75rem 2rem",
    borderRadius: "9999px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease-in-out",
  },
  section: {
    width: "100%",
    padding: "4rem 2rem",
    backgroundColor: "#f3f4f6",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "3rem",
    textAlign: "center",
  },
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
    width: "100%",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    border: "1px solid #e5e7eb",
    borderRadius: "1rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    textAlign: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    minHeight: "260px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", // 💥 Ajout pour centrer l'icône horizontalement
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  cardIcon: {
    color: "#7c3aed",
    marginBottom: "1rem",
    width: "2.5rem",
    height: "2.5rem",
  },
  cardTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "0.5rem",
  },
  cardDesc: {
    fontSize: "0.95rem",
    color: "#4b5563",
  },
};

const services = [
  { icon: Megaphone, title: "Marketing Digital", desc: "Stratégies personnalisées pour atteindre vos objectifs." },
  { icon: Monitor, title: "Création de sites web", desc: "Sites web modernes et performants, à votre image." },
  { icon: Nfc, title: "Solutions NFC", desc: "Intégration de technologie NFC pour une expérience unique." },
  { icon: BookOpen, title: "Pages Jaunes", desc: "Optimisation de votre présence sur les Pages Jaunes." },
  { icon: Search, title: "Référencement", desc: "Améliorez votre visibilité sur les moteurs de recherche." },
  { icon: DollarSign, title: "Publicité en ligne", desc: "Campagnes ciblées pour un ROI maximal." },
  { icon: Users, title: "Community Management", desc: "Engagez efficacement votre communauté." },
  { icon: Shield, title: "E-réputation", desc: "Protégez et améliorez votre image en ligne." },
  { icon: TrendingUp, title: "SEO", desc: "Optimisation pour les moteurs de recherche." },
  { icon: DollarSign, title: "SEA", desc: "Publicité payante sur les moteurs de recherche." },
  { icon: Link, title: "Forfait DUO", desc: "Combinaison de services pour un impact maximal." },
  { icon: Award, title: "Le TRIO", desc: "Offre complète pour une présence optimale." },
];

const MaVitrine = () => {
  return (
    <div style={styles.container}>
      {/* Hero section */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Boostez votre présence en ligne</h1>
        <h2 style={styles.heroSubTitle}>MaVitrine</h2>
        <p style={styles.heroParagraph}>
          Les solutions complètes pour développer votre activité sur le web.
        </p>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ede9fe")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
        >
          Découvrir nos services
        </button>
      </div>

      {/* Services section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Nos services</h3>
        <div style={styles.cardGrid}>
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={idx}
                style={styles.card}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, styles.cardHover);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = styles.card.boxShadow;
                }}
              >
                <Icon style={styles.cardIcon} />
                <h4 style={styles.cardTitle}>{service.title}</h4>
                <p style={styles.cardDesc}>{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MaVitrine;
