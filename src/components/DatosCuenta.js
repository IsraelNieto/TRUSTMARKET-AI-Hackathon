// src/components/DatosCuenta.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection'; // Reutilizaremos el componente de sección

const DatosCuenta = () => {
  const [user, setUser] = useState(null);
  // Estados para cada campo editable
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      setUser(activeUser);
      // Inicializamos los estados con los datos del usuario
      setEmail(activeUser.email || '');
      setPhone(activeUser.phone || '+525598765432'); // Dato de ejemplo
      setUsername(activeUser.username || activeUser.fullName.replace(/\s+/g, '').toUpperCase()); // Dato de ejemplo
    }
  }, []);

  // Función genérica para guardar los cambios
  const updateUserInfo = (updatedFields) => {
    // Validamos que el email no esté ya en uso si se intenta cambiar
    if (updatedFields.email && updatedFields.email !== user.email) {
      const allUsers = JSON.parse(localStorage.getItem('users')) || [];
      const emailExists = allUsers.some(u => u.email === updatedFields.email);
      if (emailExists) {
        alert('Ese correo electrónico ya está registrado. Por favor, elige otro.');
        return; // Detenemos la actualización
      }
    }
      
    const updatedUser = { ...user, ...updatedFields };
    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === user.email);

    if (userIndex !== -1) {
      // Actualizamos el email en la llave principal si cambió
      if(updatedFields.email) {
        allUsers[userIndex].email = updatedFields.email;
      }
      allUsers[userIndex] = { ...allUsers[userIndex], ...updatedFields };
      
      localStorage.setItem('users', JSON.stringify(allUsers));
      localStorage.setItem('activeUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      alert('¡Datos actualizados!');
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <main className="main-container main-container-wide">
      <div className="profile-edit-container">
        <Link to="/perfil" className="back-btn">← Volver a Mi Perfil</Link>
        <h2>Datos de tu cuenta</h2>

        {/* --- Sección de E-mail --- */}
        <ProfileSection
          title="E-mail"
          onSave={() => updateUserInfo({ email })}
          editContent={
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          }
        >
          <div className="validated-badge">
            <span className="material-icons">check_circle</span> Validado
          </div>
          <p className="data-display">{user.email}</p>
        </ProfileSection>

        {/* --- Sección de Teléfono --- */}
        <ProfileSection
          title="Teléfono"
          onSave={() => updateUserInfo({ phone })}
          editContent={
            <div className="form-group">
              <label htmlFor="phone">Teléfono</label>
              <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          }
        >
          <div className="validated-badge">
            <span className="material-icons">check_circle</span> Validado
          </div>
          <p className="data-display">{user.phone || phone}</p>
        </ProfileSection>
        
        {/* --- Sección de Nombre de Usuario --- */}
        <ProfileSection
          title="Nombre de usuario"
          onSave={() => updateUserInfo({ username })}
          editContent={
            <div className="form-group">
              <label htmlFor="username">Nombre de usuario</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
          }
        >
          <p className="data-display">{user.username || username}</p>
        </ProfileSection>

      </div>
    </main>
  );
};

export default DatosCuenta;