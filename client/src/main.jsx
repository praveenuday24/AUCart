import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/cartContext';
import { ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'
import { NotificationProvider } from './context/NotificationContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <NotificationProvider>
          <GoogleOAuthProvider 
            clientId={
              import.meta.env.VITE_GOOGLE_CLIENT_ID
            }>
            <App />
          </GoogleOAuthProvider>
        </NotificationProvider>
        <ToastContainer/>
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
