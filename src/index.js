import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import usersInfo from './reducers';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
