import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store from "./Store/store";
import './index.css';
import App from './App';
import { ContextProvider } from './contexts/ContextProvider';

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
