import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// --- 1. IMPORTA TU LOGO AQUÍ ---
import logo from '../assets/images/logo.jpg'; 
// Ajusta la ruta si es necesario

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('cliente');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.some((user) => user.email === email);

    if (exists) {
      alert('Este correo ya está registrado.');
      return;
    }

    const newUser = { fullName, email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert(`Registro exitoso!`);
    navigate('/login');
  };

  return (
    <main className="main-container">
      <div className="form-container">
        
        {/* --- 2. AÑADE EL LOGO AQUÍ --- */}
        <div className="form-logo">
          <img src={logo} alt="Logo de la Empresa" />
        </div>
        
        <h2>Regístrate</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">Nombre Completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="role">Tipo de Usuario</label>
            <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="cliente">Cliente</option>
              <option value="vendedor">Vendedor / PyME</option>
            </select>
          </div>
          <button type="submit" className="submit-btn">
            Registrar
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;