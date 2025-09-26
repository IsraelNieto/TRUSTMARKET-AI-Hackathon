// src/components/Direcciones.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LoadScript, Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; // Habilita la API de Places

const Direcciones = () => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  
  // Estado para el formulario
  const [addressFields, setAddressFields] = useState({ street: '', city: '', state: '', postalCode: '', country: '' });
  const autocompleteRef = useRef(null);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      setUser(activeUser);
      setAddresses(activeUser.addresses || []);
    }
  }, []);

  const updateUserInfo = (updatedFields) => {
    // ... (Esta función es la misma que en los otros componentes de perfil)
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      // Extraer componentes de la dirección
      let streetNumber = '', route = '', city = '', state = '', postalCode = '', country = '';
      place.address_components.forEach(component => {
        const types = component.types;
        if (types.includes('street_number')) streetNumber = component.long_name;
        if (types.includes('route')) route = component.long_name;
        if (types.includes('locality')) city = component.long_name;
        if (types.includes('administrative_area_level_1')) state = component.long_name;
        if (types.includes('postal_code')) postalCode = component.long_name;
        if (types.includes('country')) country = component.long_name;
      });
      setAddressFields({
        street: `${route} ${streetNumber}`.trim(),
        city, state, postalCode, country
      });
    }
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    const newAddress = { id: Date.now(), ...addressFields };
    const updatedAddresses = [...addresses, newAddress];
    setAddresses(updatedAddresses);
    updateUserInfo({ addresses: updatedAddresses });
    setIsAdding(false);
  };
  
  // ... (Aquí iría la función handleDeleteAddress)

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
      <main className="main-container main-container-wide">
        <div className="profile-edit-container">
          <Link to="/perfil" className="back-btn">← Volver a Mi Perfil</Link>
          <h2>Direcciones</h2>

          {/* Lista de direcciones existentes */}
          <div className="address-list">
            {addresses.map(addr => (
              <div key={addr.id} className="address-card">
                <h4>{addr.street}</h4>
                <p>Código postal {addr.postalCode} - {addr.state} - {addr.city}</p>
                <p>{user?.fullName} - {user?.phone}</p>
              </div>
            ))}
          </div>

          {/* Botón y formulario para agregar dirección */}
          {!isAdding ? (
            <button className="add-address-btn" onClick={() => setIsAdding(true)}>
              <span className="material-icons">add</span>
              Agregar nueva dirección
            </button>
          ) : (
            <div className="profile-section-card">
              <h4>Nueva Dirección</h4>
              <form onSubmit={handleSaveAddress}>
                <div className="form-group">
                  <label>Busca tu dirección</label>
                  <Autocomplete
                    onLoad={(ref) => (autocompleteRef.current = ref)}
                    onPlaceChanged={handlePlaceSelect}
                  >
                    <input type="text" placeholder="Ej: Av. Central 123, Tuxtla Gutiérrez" required />
                  </Autocomplete>
                </div>
                {/* Campos que se autocompletan */}
                <input type="text" value={addressFields.street} placeholder="Calle y número" disabled />
                <input type="text" value={addressFields.city} placeholder="Ciudad" disabled />
                <input type="text" value={addressFields.state} placeholder="Estado" disabled />
                <input type="text" value={addressFields.postalCode} placeholder="Código Postal" disabled />
                
                <div className="form-actions">
                  <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancelar</button>
                  <button type="submit" className="submit-btn">Guardar Dirección</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </LoadScript>
  );
};

export default Direcciones;