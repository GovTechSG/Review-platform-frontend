import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './components/_base/layout/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root')
);
registerServiceWorker();
