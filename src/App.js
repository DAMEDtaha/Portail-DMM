import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Layout from './components/layout/Layout';
import Orders from './orders/Orders';
import Invoices from './invoices/Invoices';
import Cases from "./components/cases/Cases";
import Profil from "./components/profil/Profil";
import Chatbot from "./components/chatbot/Chatbot";
import BonsDeCommandes from './components/bonsDeCommandes/BonsDeCommandes';
import AdminDashboard from "./components/admin/AdminDashboard"; 
import Clients from "./components/admin/Clients";
import Contrats from "./components/admin/Contrats";
import Commandes from "./components/admin/Commandes";
import Factures from "./components/admin/Factures";
import ProfilAdmin from "./components/admin/ProfilAdmin";
import AdminLayout from "./components/admin/AdminLayout";
import ContratDetail from "./components/admin/ContratDetail";
import CommandeDetail from "./components/admin/CommandeDetail";
import FactureDetail from "./components/admin/FactureDetail";
import ForgotPassword from "./components/auth/forgot-password";
import CreerUtilisateur from "./components/admin/CreerUtilisateur";
function App() {
  return (
    <Router>
      {/* Le Chatbot est affiché globalement */}
      <Chatbot />
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Routes avec Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/factures" element={<Invoices />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/bons-de-commandes" element={<BonsDeCommandes />} />
          
        </Route>

        {/* Route admin SANS Layout */}
        <Route path="/AdminDashboard" element={<AdminDashboard />} />

        {/* Routes admin avec sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="clients" element={<Clients />} />
          <Route path="contrats" element={<Contrats />} />
          <Route path="commandes" element={<Commandes />} />
          <Route path="factures" element={<Factures />} />
          <Route path="profil" element={<ProfilAdmin />} />
          <Route path="/admin/Contrats/:id" element={<ContratDetail />} />
          <Route path="/admin/commandes/:id" element={<CommandeDetail />} />
          <Route path="/admin/factures/:id" element={<FactureDetail />} />
          <Route path="/admin/creer-utilisateur" element={<CreerUtilisateur />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
