import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
      domain="dev-8his2amisscpohz8.us.auth0.com"
      clientId="yYFp0APB3UcOth6FvnVprXVAqnSz57Ld"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://jcsFSNDCapstone510699.com',
        scope: "all:permissions"
      }}
    >
      <App />
    </Auth0Provider>,
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
