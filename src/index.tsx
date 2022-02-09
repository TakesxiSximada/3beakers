import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import TagManager from 'react-gtm-module';

if (process.env.REACT_APP_GTM_ID) {
  TagManager.initialize(
    {
      gtmId: process.env.REACT_APP_GTM_ID,
    }
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
