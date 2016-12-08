
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import usersInfo from './reducers';
import _ from 'underscore';
import { persistLoad, persistStore } from './utils';
import generateUserInfo from './generateUserInfo';
import App from './App';
import './index.css';

const USER_INFO_KEY = 'USER_INFO';
const initialState = persistLoad(USER_INFO_KEY, ()=>{return { users: generateUserInfo() }} );
let store = createStore( usersInfo, initialState );
persistStore( USER_INFO_KEY, store.getState() );
store.subscribe(()=>{persistStore(USER_INFO_KEY,store.getState())});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
