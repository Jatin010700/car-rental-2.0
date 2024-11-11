import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './scss/style.scss'
import App from './App.jsx'

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
