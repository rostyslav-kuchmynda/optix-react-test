import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppLayout } from './containers/AppLayout';

import { store } from './store';

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
