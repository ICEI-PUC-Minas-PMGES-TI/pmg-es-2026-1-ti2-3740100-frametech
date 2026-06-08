import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initializeTheme } from './utils/theme.js';
import './theme.css';

initializeTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    
  </StrictMode>,
);
