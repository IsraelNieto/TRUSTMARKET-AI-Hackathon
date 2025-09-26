import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Este código silencia el error "ResizeObserver loop" que puede ocurrir en React con algunas librerías
if (typeof window !== 'undefined') {
  const resizeObserverErrDiv = document.createElement('div');
  resizeObserverErrDiv.style.display = 'none';
  resizeObserverErrDiv.id = 'resize-observer-error-div';
  document.body.appendChild(resizeObserverErrDiv);

  const resizeObserverErrHandler = (error) => {
    if (error.message && error.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return true; // Suprime el error
    }
    return false; // Permite otros errores
  };
  window.addEventListener('error', (event) => {
    if (resizeObserverErrHandler(event.error)) {
      event.preventDefault();
    }
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);