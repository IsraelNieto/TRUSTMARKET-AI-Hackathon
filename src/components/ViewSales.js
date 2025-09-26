import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ViewSales = () => {
  const [products, setProducts] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [selectedProductSales, setSelectedProductSales] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  
  const [modalView, setModalView] = useState('salesList');
  const [saleToShip, setSaleToShip] = useState(null);
  // Nuevo estado para el número de guía
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    const storedSales = JSON.parse(localStorage.getItem('salesHistory')) || [];
    setSalesHistory(storedSales);
  }, []);

  // Función para generar un número de guía aleatorio
  const generateTrackingNumber = () => {
    const prefix = "TM"; // TrustMarket
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return `${prefix}${randomNumber}MX`;
  };

  const handleShowSales = (productToShow) => {
    const relevantSales = salesHistory.flatMap((sale, saleIndex) => 
      sale.items
        .filter(item => item.productName === productToShow.productName)
        .map(item => ({ ...item, date: sale.date, saleIndex, shipping: sale.shipping }))
    );
    setSelectedProductSales(relevantSales);
    setCurrentProduct(productToShow);
    setModalView('salesList');
    setIsModalOpen(true);
  };

  const handlePrepareShipment = (sale) => {
    setSaleToShip(sale);
    setTrackingNumber(generateTrackingNumber()); // Genera y establece el número de guía
    setModalView('shippingForm');
  };
  
  const handleSaveShipment = (e) => {
    e.preventDefault();
    const carrier = e.target.carrier.value;
    const finalTrackingNumber = e.target.trackingNumber.value;

    const updatedSalesHistory = [...salesHistory];
    const saleToUpdate = updatedSalesHistory[saleToShip.saleIndex];
    
    const shippingInfo = {
      carrier,
      trackingNumber: finalTrackingNumber,
      status: 'Enviado'
    };
    saleToUpdate.shipping = shippingInfo;

    localStorage.setItem('salesHistory', JSON.stringify(updatedSalesHistory));
    setSalesHistory(updatedSalesHistory);

    alert(`¡Envío registrado para ${saleToShip.productName} con ${carrier}!`);
    
    // --- Lógica para imprimir la guía ---
    printShippingLabel(shippingInfo, saleToShip);

    closeModal();
  };
  
  const printShippingLabel = (shippingInfo, sale) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Guía de Envío</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 20px; }
            .label-container { border: 2px solid black; padding: 25px; width: 80%; margin: auto; }
            h1, h2 { margin: 0; padding: 0; }
            h1 { font-size: 24px; }
            h2 { font-size: 18px; color: #555; }
            hr { border: 1px solid black; margin: 20px 0; }
            p { margin: 5px 0; }
            .barcode { font-family: 'Libre Barcode 39', cursive; font-size: 48px; text-align: center; margin-top: 20px; }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap" rel="stylesheet">
        </head>
        <body>
          <div class="label-container">
            <h1>Guía de Envío</h1>
            <h2>Paquetería: ${shippingInfo.carrier}</h2>
            <hr>
            <div>
              <h3>REMITENTE:</h3>
              <p><strong>TRUSTMARKET AI</strong></p>
              <p>Av. Principal 123, Col. Centro</p>
              <p>Tuxtla Gutiérrez, Chiapas, México</p>
            </div>
            <hr>
            <div>
              <h3>DESTINATARIO:</h3>
              <p><strong>(Nombre del Cliente)</strong></p>
              <p>(Dirección del Cliente)</p>
            </div>
            <hr>
            <p><strong>Producto:</strong> ${sale.productName}</p>
            <div class="barcode">${shippingInfo.trackingNumber}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    // Esperamos un momento para que cargue la fuente del código de barras
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setSaleToShip(null);
  };

  const shippingOptions = ["DHL", "Estafeta", "Fedex", "Paquetexpress", "Redpack", "Tres Guerras"];

  return (
    <main className="main-container main-container-wide"> 
      <div className="table-container">
        {/* ... Tu JSX de la tabla principal no cambia ... */}
         <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    {product.productImage ? (
                      <img src={product.productImage} alt={product.productName} className="table-product-img" />
                    ) : (
                      <div className="table-img-placeholder">Sin imagen</div>
                    )}
                  </td>
                  <td>{product.productName}</td>
                  <td>${parseFloat(product.productPrice).toFixed(2)}</td>
                  <td>{product.productCategory}</td>
                  <td className="description-cell">{product.productDescription}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn sales-btn" 
                        onClick={() => handleShowSales(product)}
                      >
                        Ventas
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>✖</button>
            
            {modalView === 'salesList' && (
             // ... Tu JSX de la lista de ventas no cambia ...
             <>
                <h2>Ventas de "{currentProduct?.productName}"</h2>
                {selectedProductSales.length > 0 ? (
                  <ul className="sales-list">
                    {selectedProductSales.map((sale, index) => (
                      <li key={index} className="sale-item">
                        <div className="sale-details">
                          Vendido el: <strong>{sale.date}</strong> - Precio: <strong>${parseFloat(sale.productPrice).toFixed(2)}</strong>
                          {sale.shipping && <span className="shipping-status">✓ Enviado: {sale.shipping.carrier} ({sale.shipping.trackingNumber})</span>}
                        </div>
                        {!sale.shipping && (
                          <button className="action-btn send-btn" onClick={() => handlePrepareShipment(sale)}>
                            Enviar
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Este producto aún no tiene ventas registradas.</p>
                )}
              </>
            )}

            {modalView === 'shippingForm' && (
              <>
                <h2>Registrar Envío</h2>
                <p><strong>Producto:</strong> {saleToShip?.productName}</p>
                <p><strong>Venta del:</strong> {saleToShip?.date}</p>
                <form className="shipping-form" onSubmit={handleSaveShipment}>
                  <div className="form-group">
                    <label htmlFor="carrier">Paquetería</label>
                    <select id="carrier" name="carrier" required>
                      {shippingOptions.map(option => <option key={option} value={option}>{option}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    {/* --- CAMBIOS AQUÍ --- */}
                    <label htmlFor="trackingNumber">Número de Guía</label>
                    <input 
                      type="text" 
                      id="trackingNumber" 
                      name="trackingNumber" 
                      value={trackingNumber} // El valor es controlado por el estado
                      onChange={(e) => setTrackingNumber(e.target.value)} // Permite editar si es necesario
                      required // Campo obligatorio
                    />
                  </div>
                  <div className="shipping-form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setModalView('salesList')}>Cancelar</button>
                    <button type="submit" className="submit-btn">Guardar e Imprimir Guía</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewSales;