import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mastercardLogo from '../assets/images/mastercard-logo.png'; 

const Tarjetas = () => {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);

  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    if (activeUser) {
      setUser(activeUser);
      setCards(activeUser.cards || []); 
    }
  }, []);

  const updateUserInfo = (updatedFields) => {
    const updatedUser = { ...user, ...updatedFields };
    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = allUsers.findIndex(u => u.email === user.email);

    if (userIndex !== -1) {
      allUsers[userIndex] = { ...allUsers[userIndex], ...updatedFields };
      localStorage.setItem('users', JSON.stringify(allUsers));
      localStorage.setItem('activeUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  };
  
  const handleAddCard = (e) => {
    e.preventDefault();
    const newCard = {
      id: Date.now(),
      last4: cardNumber.slice(-4),
      holder: cardHolder,
      expiry: expiryDate,
      // Para probar, la primera tarjeta nueva no será Mastercard
      type: cards.length % 2 === 0 ? 'Visa' : 'Mastercard' 
    };
    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
    updateUserInfo({ cards: updatedCards });
    
    setIsAdding(false);
    setCardNumber('');
    setCardHolder('');
    setExpiryDate('');
    setCvv('');
  };
  
  const handleDeleteCard = (cardId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
      const updatedCards = cards.filter(card => card.id !== cardId);
      setCards(updatedCards);
      updateUserInfo({ cards: updatedCards });
    }
  };

  if (!user) return <p>Cargando...</p>;

  return (
    <main className="main-container main-container-wide">
      <div className="profile-edit-container">
        <Link to="/perfil" className="back-btn">← Volver a Mi Perfil</Link>
        <div className="cards-header">
          <h2>Tarjetas</h2>
          {!isAdding && (
            <button className="submit-btn" onClick={() => setIsAdding(true)}>
              Registrar nueva tarjeta
            </button>
          )}
        </div>

        {isAdding && (
          // ... tu formulario no cambia
          <div className="profile-section-card">
            <h4>Nueva Tarjeta</h4>
            <form onSubmit={handleAddCard} className="add-card-form">
              <div className="form-group">
                <label>Nombre del titular</label>
                <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Número de la tarjeta</label>
                <input type="text" pattern="\d{16}" title="Debe contener 16 dígitos" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Vencimiento (MM/AA)</label>
                  <input type="text" pattern="\d{2}/\d{2}" title="Formato MM/AA" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" pattern="\d{3,4}" title="Debe contener 3 o 4 dígitos" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancelar</button>
                <button type="submit" className="submit-btn">Agregar Tarjeta</button>
              </div>
            </form>
          </div>
        )}

        <div className="cards-list">
          {cards.length > 0 ? (
            cards.map(card => (
              <div key={card.id} className="card-item">
                {/* --- LÓGICA ACTUALIZADA PARA MOSTRAR EL ÍCONO --- */}
                <div className="card-logo-wrapper">
                  {card.type === 'Mastercard' ? (
                    <img src={mastercardLogo} alt="Mastercard" className="card-logo" />
                  ) : (
                    <span className="material-icons default-card-icon">credit_card</span>
                  )}
                </div>
                <div className="card-details">
                  <h4>Terminada en {card.last4}</h4>
                  <p>{card.type} - Vencimiento: {card.expiry}</p>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteCard(card.id)}>Eliminar</button>
              </div>
            ))
          ) : (
            !isAdding && <p>No tienes tarjetas guardadas.</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Tarjetas;