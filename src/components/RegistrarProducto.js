import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterProduct = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(''); // Nuevo estado para la imagen
  const navigate = useNavigate();

  // Nueva función para manejar el archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Convertimos la imagen a un string Base64 para guardarla
        setProductImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    // Añadimos la imagen al nuevo producto
    const newProduct = { productName, productPrice, productCategory, productDescription, productImage };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));

    alert(`Producto "${productName}" registrado con éxito!`);
    navigate('/explore-products');
  };

  return (
    <main className="main-container">
      <div className="form-container">
        <Link to="/" className="back-btn" style={{ marginBottom: '1.5rem' }}>
          ← Volver al inicio
        </Link>
        <h2>Registrar Nuevo Producto</h2>

        <form onSubmit={handleSubmit}>
          {/* ... (los otros campos del formulario no cambian) ... */}
          <div className="form-group">
            <label htmlFor="productName">Nombre del Producto</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Precio</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Categoría</label>
            <input
              type="text"
              id="productCategory"
              name="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
            />
          </div>

          {/* === NUEVO CAMPO PARA LA IMAGEN === */}
          <div className="form-group">
            <label htmlFor="productImage">Imagen del Producto</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              accept="image/png, image/jpeg" // Acepta solo archivos PNG o JPG
              onChange={handleImageChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="productDescription">Descripción</label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows="4"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-btn">
            Registrar Producto
          </button>
        </form>
      </div>
    </main>
  );
};

export default RegisterProduct;