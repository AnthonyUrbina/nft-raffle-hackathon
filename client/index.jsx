import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';

import.meta.webpackHot?.accept();

const root =
  window.APP_ROOT ??=
  ReactDOM.createRoot(document.querySelector('#root'));

root.render(<App />);
