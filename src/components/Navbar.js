import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";
// --- 1. Importa tu logo para asegurar que siempre se vea ---
import logo from '../assets/images/logo.jpg';

const Navbar = ({ user, onLogout }) => {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          {/* --- 2. Usa el logo importado --- */}
          <img src={logo} alt="TrustMarket AI" />
          <span>TRUSTMARKET AI</span>
        </div>

        {/* === MENÚ DINÁMICO CORREGIDO === */}
        <ul className="navbar-list">
          {user?.role === "cliente" ? (
            // --- Menú exclusivo para Clientes ---
            <>
              <li><Link to="/" className="navbar-link">Inicio</Link></li>
              <li><Link to="/explore-products" className="navbar-link">Explora Productos</Link></li>
              <li><Link to="/mis-compras" className="navbar-link">Mis Compras</Link></li>
              <li><Link to="/perfil" className="navbar-link">Perfil</Link></li>
            </>
          ) : user?.role === "vendedor" ? (
            // --- Menú exclusivo para Vendedores ---
            <>
              <li><Link to="/" className="navbar-link">Inicio</Link></li>
              <li><Link to="/register-product" className="navbar-link">Registrar Productos</Link></li>
              <li><Link to="/view-sales" className="navbar-link">Ver Ventas</Link></li>
            </>
          ) : (
            // --- Menú para usuarios no logueados (tu menú original) ---
            <>
              <li><Link to="/" className="navbar-link">Inicio</Link></li>
              <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); handleScroll("nosotros"); }} className="navbar-link">¿Quiénes somos?</a></li>
              <li><a href="#soluciones" onClick={(e) => { e.preventDefault(); handleScroll("soluciones"); }} className="navbar-link">Soluciones</a></li>
              <li><a href="#vendedores" onClick={(e) => { e.preventDefault(); handleScroll("vendedores"); }} className="navbar-link">Para Vendedores</a></li>
              <li><a href="#contacto" onClick={(e) => { e.preventDefault(); handleScroll("contacto"); }} className="navbar-link">Contacto</a></li>
            </>
          )}
        </ul>

        {/* Botones */}
        <div className="navbar-buttons">
          {user ? (
            <button onClick={onLogout} className="navbar-btn navbar-btn-primary">
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link to="/register" className="navbar-btn navbar-btn-secondary">Regístrate</Link>
              <Link to="/login" className="navbar-btn navbar-btn-secondary">Iniciar Sesión</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;