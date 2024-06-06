import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import 'app/styles/index.scss';
import loadEnvFromSSM from './loadEnvFromSSM';

async function startApp() {
  const paths = ['/webapp/test/tco_email', '/webapp/test/tco_password'];
  const env = await loadEnvFromSSM(paths);
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
