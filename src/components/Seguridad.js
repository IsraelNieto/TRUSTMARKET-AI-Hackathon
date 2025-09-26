// src/components/Seguridad.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Seguridad = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    setUser(activeUser);
  }, []);

  if (!user) {
    return <p>Cargando...</p>;
  }
  
  // Datos de ejemplo para los métodos de verificación
  const verificationMethods = [
    { icon: 'phone_iphone', title: 'Teléfono', subtitle: '+52 5512345678', status: 'verified', link: '#' },
    { icon: 'password', title: 'Contraseña', subtitle: 'Tu contraseña venció, modifícala para volver a usarla.', status: 'action_needed', link: '/reset-password' },
    { icon: 'email', title: 'E-mail', subtitle: user.email, status: 'verified', link: '#' },
    { icon: 'face', title: 'Reconocimiento facial', subtitle: user.fullName, status: 'verified', link: '#' },
    { icon: 'qr_code_scanner', title: 'Código QR', subtitle: 'Escaneas códigos QR con tus dispositivos.', status: 'verified', link: '#' },
    { icon: 'apps', title: 'Google Authenticator', subtitle: 'Activa Google Authenticator para usar códigos.', status: 'unverified', link: '#' },
  ];

  return (
    <main className="main-container main-container-wide">
      <div className="security-settings-container">
        <Link to="/perfil" className="back-btn">← Volver a Mi Perfil</Link>
        <h2>Configura tus métodos de verificación</h2>
        
        <div className="alert alert-warning">
          <span className="material-icons">warning</span>
          Modifica tu contraseña para volver a usarla como método de verificación.
        </div>
        
        <div className="verification-method-list">
          {verificationMethods.map((method, index) => (
            <Link to={method.link} key={index} className="verification-method-item">
              <div className="item-icon-wrapper">
                <span className="material-icons item-icon">{method.icon}</span>
                {method.status === 'verified' && <span className="material-icons status-badge status-verified">check_circle</span>}
                {method.status === 'action_needed' && <span className="material-icons status-badge status-action-needed">error</span>}
              </div>
              <div className="item-text">
                <h4 className="item-title">{method.title}</h4>
                <p className="item-subtitle">{method.subtitle}</p>
              </div>
              <span className="material-icons item-chevron">chevron_right</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Seguridad;