import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { Provider } from 'react-redux';
import store from "./redux/store"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './stores/context/CartContext';
 
ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Provider store={store}>  
    <CartProvider>
      <App/>
    </CartProvider>
      </Provider>
    </React.StrictMode>
  </ApolloProvider>
);
 
reportWebVitals();
 