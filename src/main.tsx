import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import 'app/styles/index.scss';
import loadEnvFromSSM from './loadEnvFromSSM';

async function startApp() {
  const env = await loadEnvFromSSM();
  console.log(env);
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </React.StrictMode>
  );
}

startApp();
