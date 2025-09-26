// src/components/ResetPassword.js

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// 1. Importa el logo
import logo from '../assets/images/logo.jpg';

const ResetPassword = () => {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const recoveryData = JSON.parse(localStorage.getItem('recoveryData'));
    if (recoveryData && recoveryData.email) {
      setRecoveryEmail(recoveryData.email);
    } else {
      alert('Primero solicita un código de recuperación.');
      navigate('/forgot-password');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const recoveryData = JSON.parse(localStorage.getItem('recoveryData'));

    if (!recoveryData || recoveryData.code !== code) {
      alert('El código de recuperación es incorrecto.');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex(user => user.email === recoveryEmail);

    if (userIndex !== -1) {
      users[userIndex].password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.removeItem('recoveryData');
      alert('¡Contraseña actualizada con éxito!');
      navigate('/login');
    } else {
        alert('Ocurrió un error al actualizar la contraseña.');
    }
  };

  return (
    <main className="main-container">
      <div className="form-container">
        {/* 2. Añade el logo aquí */}
        <div className="form-logo">
          <img src={logo} alt="Logo de la Empresa" />
        </div>
        <h2>Establecer Nueva Contraseña</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#555' }}>
          Ingresa el código que te enviamos y tu nueva contraseña.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="code">Código de Recuperación</label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Actualizar Contraseña
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;