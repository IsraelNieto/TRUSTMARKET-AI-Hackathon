import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
// --- 1. Importa tu logo para asegurar que siempre se vea ---
import logo from '../assets/images/logo.svg';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close the menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className='navbar'>
      <div className='navbar-container'>
        {/* Logo */}
        <div className='navbar-logo'>
          {/* --- 2. Usa el logo importado --- */}
          <img src={logo} alt='TrustMarket AI' />
          {/* <span>TRUSTMARKET AI</span> */}
        </div>

        {/* Toggle button (hamburger) */}
        <button type='button' aria-label='Abrir menú' aria-expanded={isOpen} className='navbar-toggle' onClick={() => setIsOpen((prev) => !prev)}>
          <span className='navbar-bar'></span>
          <span className='navbar-bar'></span>
          <span className='navbar-bar'></span>
        </button>

        {/* === MENÚ DINÁMICO CORREGIDO === */}
        <ul className={`navbar-list ${isOpen ? 'open' : ''}`}>
          {user?.role === 'cliente' ? (
            // --- Menú exclusivo para Clientes ---
            <>
              <li>
                <Link to='/' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to='/explore-products' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Explora Productos
                </Link>
              </li>
              <li>
                <Link to='/mis-compras' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Mis Compras
                </Link>
              </li>
              <li>
                <Link to='/perfil' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Perfil
                </Link>
              </li>
            </>
          ) : user?.role === 'vendedor' ? (
            // --- Menú exclusivo para Vendedores ---
            <>
              <li>
                <Link to='/' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to='/register-product' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Registrar Productos
                </Link>
              </li>
              <li>
                <Link to='/view-sales' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Ver Ventas
                </Link>
              </li>
            </>
          ) : (
            // --- Menú para usuarios no logueados (tu menú original) ---
            <>
              <li>
                <Link to='/' className='navbar-link' onClick={() => setIsOpen(false)}>
                  Inicio
                </Link>
              </li>
              <li>
                <a
                  href='#nosotros'
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('nosotros');
                  }}
                  className='navbar-link'
                >
                  ¿Quiénes somos?
                </a>
              </li>
              <li>
                <a
                  href='#soluciones'
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('soluciones');
                  }}
                  className='navbar-link'
                >
                  Soluciones
                </a>
              </li>
              <li>
                <a
                  href='#vendedores'
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('vendedores');
                  }}
                  className='navbar-link'
                >
                  Para Vendedores
                </a>
              </li>
              <li>
                <a
                  href='#contacto'
                  onClick={(e) => {
                    e.preventDefault();
                    handleScroll('contacto');
                  }}
                  className='navbar-link'
                >
                  Contacto
                </a>
              </li>
            </>
          )}

          {/* Mobile actions inside drawer */}
          <li className='navbar-actions-mobile'>
            {user ? (
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout && onLogout();
                }}
                className='navbar-btn navbar-btn-primary'
              >
                Cerrar Sesión
              </button>
            ) : (
              <div className='navbar-actions-mobile-buttons'>
                <Link to='/register' className='navbar-btn navbar-btn-secondary' onClick={() => setIsOpen(false)}>
                  Regístrate
                </Link>
                <Link to='/login' className='navbar-btn navbar-btn-secondary' onClick={() => setIsOpen(false)}>
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </li>
        </ul>

        {/* Botones */}
        <div className='navbar-buttons'>
          {user ? (
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout && onLogout();
              }}
              className='navbar-btn navbar-btn-primary'
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link to='/register' className='navbar-btn navbar-btn-secondary' onClick={() => setIsOpen(false)}>
                Regístrate
              </Link>
              <Link to='/login' className='navbar-btn navbar-btn-secondary' onClick={() => setIsOpen(false)}>
                Iniciar Sesión
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
