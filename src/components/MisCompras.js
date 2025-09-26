import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MisCompras = () => {
  const [mySales, setMySales] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    setUser(activeUser);

    if (activeUser) {
      const allSales = JSON.parse(localStorage.getItem('salesHistory')) || [];
      const userSales = allSales.filter(sale => sale.buyerEmail === activeUser.email);
      setMySales(userSales);
    }
  }, []);

  // --- NUEVA FUNCIÓN ---
  // Genera la URL de rastreo según la paquetería
  const getTrackingUrl = (carrier, trackingNumber) => {
    const carrierUrls = {
      'DHL': `https://www.dhl.com/mx-es/home/rastreo.html?tracking-id=${trackingNumber}`,
      'Estafeta': `https://www.estafeta.com/Herramientas/Rastreo?strGuia=${trackingNumber}`,
      'Fedex': `https://www.fedex.com/fedextrack/?trknbr=${trackingNumber}`,
      'Paquetexpress': `https://www.paquetexpress.com.mx/rastreo/${trackingNumber}`,
      'Redpack': `https://www.redpack.com.mx/rastreo/?folio=${trackingNumber}`,
      'Tres Guerras': `https://www.tresguerras.com.mx/3g/servicios/rastreo.php?gui=${trackingNumber}`
    };
    // Devuelve la URL correcta o una búsqueda en Google si la paquetería no se encuentra
    return carrierUrls[carrier] || `https://www.google.com/search?q=rastrear+envio+${carrier}+${trackingNumber}`;
  };

  const handleTrackShipment = (shippingInfo) => {
    const url = getTrackingUrl(shippingInfo.carrier, shippingInfo.trackingNumber);
    window.open(url, '_blank'); // Abre el enlace en una nueva pestaña
  };
  
  if (!user) {
    return <p>Necesitas iniciar sesión para ver tus compras.</p>;
  }

  return (
    <main className="main-container main-container-wide">
      <div className="table-container">
        <h2>Mis Compras</h2>
        {mySales.length > 0 ? (
          mySales.map((sale, index) => (
            <div key={index} className="purchase-card">
              <div className="purchase-header">
                <span>Compra realizada el: <strong>{sale.date}</strong></span>
                <span>Total: <strong>${sale.total}</strong></span>
              </div>
              <div className="purchase-items">
                {sale.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="purchase-item">
                    <img src={item.productImage} alt={item.productName} className="purchase-item-img" />
                    <div className="purchase-item-details">
                      <h4>{item.productName}</h4>
                      <p>Precio: ${parseFloat(item.productPrice).toFixed(2)}</p>
                      
                      {/* --- LÓGICA ACTUALIZADA PARA MOSTRAR EL BOTÓN --- */}
                      {sale.shipping ? (
                        <div className="shipping-info">
                          <span className="shipping-status-customer">
                            ✓ Enviado por <strong>{sale.shipping.carrier}</strong> | Guía: {sale.shipping.trackingNumber}
                          </span>
                          <button 
                            className="track-btn" 
                            onClick={() => handleTrackShipment(sale.shipping)}
                          >
                            Rastrear envío
                          </button>
                        </div>
                      ) : (
                        <div className="shipping-status-pending">
                          Pendiente de envío
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Aún no has realizado ninguna compra.</p>
        )}
      </div>
    </main>
  );
};

export default MisCompras;