import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import initDatabase from './database/initDatabase';

initDatabase()
  .then(() => {
    console.log('Banco de dados inicializado com sucesso!');
  })
  .catch(error => {
    console.error('Erro ao inicializar o banco de dados:', error);
  });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
