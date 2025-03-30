import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, useLocation } from 'react-router-dom';
import './scss/style.scss'
import App from './App.jsx'

import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import { Provider } from 'react-redux';

import { Toaster } from "react-hot-toast";
import { GlobalFooter } from './components/global/globalFooter.jsx';
import { GlobalNavBar } from './components/global/globalNavbar.jsx';

function MainLayout() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register","/unauthorized"];
  const shouldHideNavFooter = hiddenRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavFooter && <GlobalNavBar />}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              fontWeight: "bold",
              borderRadius: "100px",
              background: "#111119",
              color: "#febd00",
            },
          }} />
        <App />
      {!shouldHideNavFooter && <GlobalFooter />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainLayout />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
