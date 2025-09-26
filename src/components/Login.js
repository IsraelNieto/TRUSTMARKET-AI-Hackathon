import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// 1. Importa el logo
import logo from '../assets/images/logo.jpg';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      alert(`¡Bienvenido ${user.fullName}!`);
      onLogin(user);
      navigate('/');
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    // 2. Aplica las clases de contenedor
    <main className="main-container">
      <div className="form-container">
        
        {/* 3. Añade el logo */}
        <div className="form-logo">
          <img src={logo} alt="Logo de la Empresa" />
        </div>

        <h2>Accede a tu cuenta</h2>
        <form onSubmit={handleSubmit}>
          {/* 4. Estructura los campos con "form-group" */}
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Iniciar Sesión
          </button>
        </form>
        
        {/* === ENLACE AÑADIDO === */}
        <div className="form-links">
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>

        {/* 5. Añade una clase para el enlace de registro */}
        <p className="form-footer-note">
          ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;