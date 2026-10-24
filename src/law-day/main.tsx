import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { FrostProvider } from './context/FrostContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FrostProvider>
      <App />
    </FrostProvider>
  </StrictMode>,
);
