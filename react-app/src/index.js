import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ShowModalProvider } from './context/ShowModalContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShowModalProvider>
        <App />
      </ShowModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
