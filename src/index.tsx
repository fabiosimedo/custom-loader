import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Não foi possível encontrar o elemento #root no HTML.');
}

// ou, de forma mais sucinta:
// const root = ReactDOM.createRoot(document.getElementById('root')!);

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

