import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {StateProvider} from './StateProvider';
import reducer, {initialState} from './reducer/reducer';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initaliState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

