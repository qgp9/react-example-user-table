
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import usersInfo from './reducers';
import _ from 'underscore';
import generateUserInfo from './generateUserInfo';
import App from './App';
import './index.css';

let store = createStore( usersInfo, {users:generateUserInfo()} );
console.log(store.state);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
