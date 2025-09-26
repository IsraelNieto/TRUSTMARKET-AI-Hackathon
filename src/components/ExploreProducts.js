import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExploreProducts = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
    // Carga el carrito desde localStorage al iniciar
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // --- Lógica del carrito actualizada ---

  const addToCart = (productToAdd) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.productName === productToAdd.productName);
      if (existingItem) {
        // Si el producto ya está en el carrito, incrementa su cantidad
        return prevCart.map(item =>
          item.productName === productToAdd.productName
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un producto nuevo, lo añade con cantidad 1
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productName, amount) => {
    setCart(prevCart => 
      prevCart
        .map(item =>
          item.productName === productName
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter(item => item.quantity > 0) // Elimina el producto si su cantidad llega a 0
    );
  };

  const handleRemoveItem = (productName) => {
    setCart(prevCart => prevCart.filter(item => item.productName !== productName));
  };
  
  const calculateTotal = () => {
    // El cálculo del total ahora considera la cantidad de cada producto
    return cart.reduce((total, item) => total + (parseFloat(item.productPrice) * item.quantity), 0).toFixed(2);
  };

  const checkout = () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    
    const activeUser = JSON.parse(localStorage.getItem('activeUser'));
    const salesHistory = JSON.parse(localStorage.getItem('salesHistory')) || [];
    const newSale = {
      buyerEmail: activeUser.email,
      date: new Date().toLocaleString('es-MX'),
      items: [...cart],
      total: calculateTotal()
    };
    salesHistory.push(newSale);
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

    alert(`Gracias por tu compra. Total: $${calculateTotal()}`);
    setCart([]);
  };

  return (
    <div className="products-container">
      {/* ... Tu código de la barra de búsqueda y la rejilla de productos no cambia ... */}
       <Link to="/" className="back-btn">
        ← Volver
      </Link>
      <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." />
        <button>Buscar</button>
      </div>
       <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-card">
            {product.productImage && (
              <img src={product.productImage} alt={product.productName} className="product-card-img" />
            )}
            <h3>{product.productName}</h3>
            <p>
              <strong>Precio:</strong> ${parseFloat(product.productPrice).toFixed(2)}
            </p>
            <p>
              <strong>Categoría:</strong> {product.productCategory}
            </p>
            <p>
              <strong>Descripción:</strong> {product.productDescription}
            </p>
            <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
          </div>
        ))}
      </div>


      {/* --- Carrito de Compras Actualizado --- */}
      <div className="cart">
        <h2>Tu Carrito</h2>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            cart.map((item) => (
              <div key={item.productName} className="cart-item">
                <span className="cart-item-name">{item.productName}</span>
                <div className="quantity-controls">
                  <button onClick={() => handleUpdateQuantity(item.productName, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.productName, +1)}>+</button>
                </div>
                <span className="cart-item-price">${(parseFloat(item.productPrice) * item.quantity).toFixed(2)}</span>
                <button onClick={() => handleRemoveItem(item.productName)} className="cart-item-remove">✖</button>
              </div>
            ))
          )}
        </div>
        <div className="cart-total">Total: ${calculateTotal()}</div>
        <button className="checkout-btn" onClick={checkout}>
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

export default ExploreProducts;