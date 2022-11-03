import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ShowModalProvider } from './context/ShowModalContext';
import { ModalProvider } from './context/Modal';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ShowModalProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </ShowModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
