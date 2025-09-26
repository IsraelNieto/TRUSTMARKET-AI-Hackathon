// src/components/ForgotPassword.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// 1. Importa el logo
import logo from '../assets/images/logo.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.email === email);

    if (!userExists) {
      alert('No se encontró ninguna cuenta con ese correo electrónico.');
      return;
    }

    const recoveryCode = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('recoveryData', JSON.stringify({ email, code: recoveryCode }));
    alert(`En una aplicación real, este código se enviaría a tu correo.\n\nTu código de recuperación es: ${recoveryCode}`);
    navigate('/reset-password');
  };

  return (
    <main className="main-container">
      <div className="form-container">
        {/* 2. Añade el logo aquí */}
        <div className="form-logo">
          <img src={logo} alt="Logo de la Empresa" />
        </div>
        <h2>Recuperar Contraseña</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#555' }}>
          Ingresa tu correo electrónico para recibir un código de recuperación.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Enviar Código
          </button>
        </form>
        <p className="form-footer-note">
          ¿Ya recordaste? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
};

export default ForgotPassword;