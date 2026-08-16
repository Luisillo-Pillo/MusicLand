import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css';

// Punto de entrada de la app: monta <App/> envuelto en los providers globales.
// El orden importa: BrowserRouter debe ir antes que cualquier hook de rutas
// (useNavigate, useLocation, etc. que usan AuthProvider/CartProvider/App), y
// CartProvider va dentro de AuthProvider porque el carrito depende de quién
// esté logueado (ver useAuth() dentro de CartContext).
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
