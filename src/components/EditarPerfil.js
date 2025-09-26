// src/components/EditarPerfil.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileSection from './ProfileSection'; // Importaremos este componente que crearemos a continuación

const EditarPerfil = () => {
  const [user, setUser] = useState(null);
  // Estados separados para cada campo editable
  const [fullName, setFullName] = useState('');
  const [curp, setCurp] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      setUser(activeUser);
      // Inicializamos los estados del formulario con los datos del usuario
      setFullName(activeUser.fullName || '');
      setCurp(activeUser.curp || 'XXXXXXXXXXXXXX'); // Datos de ejemplo
      setAddress(activeUser.address || 'Abasolo, 4, Estado De México, CP 55310'); // Datos de ejemplo
    }
  }, []);

  // --- Función genérica para guardar los cambios en localStorage ---
  const updateUserInfo = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    
    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === user.email);

    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...updatedFields };
      
      localStorage.setItem('users', JSON.stringify(allUsers));
      localStorage.setItem('activeUser', JSON.stringify(updatedUser)); // Actualiza el usuario activo
      setUser(updatedUser); // Actualiza el estado local para que la UI refleje el cambio
      alert('¡Información actualizada!');
    }
  };
  
  // --- Funciones de guardado específicas para cada sección ---
  const handleSaveNameAndCurp = () => {
    updateUserInfo({ fullName, curp });
  };
  
  const handleSaveAddress = () => {
    updateUserInfo({ address });
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <main className="main-container main-container-wide">
      <div className="profile-edit-container">
        <Link to="/perfil" className="back-btn">← Volver a Mi Perfil</Link>
        <div className="status-header">
          <span className="material-icons check-icon">check_circle</span>
          Identidad validada
        </div>

        <ProfileSection
          title="Nombre y CURP"
          onSave={handleSaveNameAndCurp}
          editContent={ // Contenido del formulario para el modo de edición
            <>
              <div className="form-group">
                <label htmlFor="fullName">Nombre y apellido</label>
                <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="curp">CURP</label>
                <input id="curp" type="text" value={curp} onChange={(e) => setCurp(e.target.value)} />
              </div>
            </>
          }
        >
          {/* Contenido para el modo de solo lectura */}
          <div className="data-pair">
            <span>Nombre y apellido</span>
            <strong>{user.fullName}</strong>
          </div>
          <div className="data-pair">
            <span>CURP</span>
            <strong>{user.curp || curp}</strong>
          </div>
        </ProfileSection>

        <ProfileSection
          title="Domicilio particular"
          onSave={handleSaveAddress}
          editContent={
            <div className="form-group">
              <label htmlFor="address">Domicilio</label>
              <input id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
          }
        >
          <div className="data-pair">
            <span>Domicilio</span>
            <strong>{user.address || address}</strong>
          </div>
        </ProfileSection>

      </div>
    </main>
  );
};

export default EditarPerfil;