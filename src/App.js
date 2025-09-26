import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ExploreProducts from './components/ExploreProducts';
import RegisterProduct from './components/RegistrarProducto';
import ViewSales from './components/ViewSales';
import Chatbot from './components/Chatbot';
import MiAppFlotante from './components/MiAppFlotante';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import MisCompras from './components/MisCompras';
import Perfil from './components/Perfil';
import EditarPerfil from './components/EditarPerfil';
import Seguridad from './components/Seguridad';
import DatosCuenta from './components/DatosCuenta';
import Tarjetas from './components/Tarjetas';
import Direcciones from './components/Direcciones';

import './styles.css';

// --- 1. CREAMOS UN COMPONENTE "LAYOUT" PRINCIPAL ---
// Este componente tendrá el header, la Navbar y el contenido de cada página
const AppLayout = ({ user, onLogout }) => (
  <>
    <header>
      <h1>TRUSTMARKET AI</h1>
      <Navbar user={user} onLogout={onLogout} />
    </header>
    <main>
      <Outlet /> {/* Aquí se renderizará el contenido de cada ruta */}
    </main>
    <MiAppFlotante />
  </>
);

// --- 2. EL COMPONENTE "APP" AHORA MANEJA SÓLO LA LÓGICA Y LAS RUTAS ---
const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('activeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('activeUser', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    localStorage.removeItem('activeUser');
    setUser(null);
    navigate('/');
  };

  return (
    <Routes>
      {/* Las rutas ahora se anidan dentro del Layout */}
      <Route path="/" element={<AppLayout user={user} onLogout={handleLogout} />}>
        {/* Rutas Públicas */}
        <Route index element={<Home user={user} />} />
        <Route path="login" element={<Login onLogin={handleLogin} />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Rutas de Cliente */}
        {user?.role === 'cliente' && (
          <>
            <Route path="explore-products" element={<ExploreProducts />} />
            <Route path="mis-compras" element={<MisCompras />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="editar-perfil" element={<EditarPerfil />} />
            <Route path="seguridad" element={<Seguridad />} />
            <Route path="datos-cuenta" element={<DatosCuenta />} />
            <Route path="tarjetas" element={<Tarjetas />} />
            <Route path="direcciones" element={<Direcciones />} />
          </>
        )}

        {/* Rutas de Vendedor */}
        {user?.role === 'vendedor' && (
          <>
            <Route path="register-product" element={<RegisterProduct />} />
            <Route path="view-sales" element={<ViewSales />} />
          </>
        )}
      </Route>
    </Routes>
  );
};

// --- 3. EL COMPONENTE "ROOTAPP" ENVUELVE TODO EN EL ROUTER ---
const RootApp = () => (
  <Router>
    <App />
    <div id="app-chatbot-container">
      <Chatbot />
    </div>
  </Router>
);

export default RootApp;