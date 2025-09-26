import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Usaremos Link para la interactividad

const Perfil = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      setUser(activeUser);
    }
  }, []);

  if (!user) {
    return <p>Cargando perfil...</p>;
  }

  // Tarjetas de opciones del perfil
  const profileOptions = [
    { icon: 'badge', title: 'Información personal', description: 'Datos de tu identificación oficial y tu actividad fiscal.', link: '/editar-perfil' },
    { icon: 'person', title: 'Datos de tu cuenta', description: 'Información que representa a tu cuenta.', link: '/datos-cuenta' }, // <-- Cambia el link aquí
    { icon: 'lock', title: 'Seguridad', description: 'Refuerza la seguridad de tu cuenta.', link: '/seguridad' }, // <-- Cambia el link aquí
    { icon: 'credit_card', title: 'Tarjetas', description: 'Tarjetas guardadas en tu cuenta.', link: '/tarjetas' }, // <-- Cambia el link aquí
    { icon: 'location_on', title: 'Direcciones', description: 'Direcciones guardadas en tu cuenta.', link: '/direcciones' }, // <-- Cambia el link
  ];

  return (
    <main className="main-container main-container-wide">
      <div className="profile-dashboard">
        {/* Encabezado del Perfil */}
        <div className="profile-header">
          <img src="/assets/images/user-avatar.png" alt="Avatar" className="profile-avatar" />
          <div className="profile-info">
            <h3>{user.fullName}</h3>
            <p>{user.email}</p>
          </div>
        </div>

        {/* Rejilla de Opciones */}
        <div className="profile-grid">
          {profileOptions.map((option, index) => (
            <Link to={option.link} key={index} className="profile-card">
              <span className="material-icons card-icon">{option.icon}</span>
              <div className="card-text">
                <h4 className="card-title">{option.title}</h4>
                <p className="card-description">{option.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Perfil;