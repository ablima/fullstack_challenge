import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import { ApolloClient, ApolloProvider } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import ListScreen from './screens/list';
import CheckoutScreen from './screens/checkout';
import DetailsScreen from './screens/details';

import reportWebVitals from './reportWebVitals';
import './index.css';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:5000/graphql'
})

const client = new ApolloClient({
  cache,
  link
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/details/:id">
            <DetailsScreen />
          </Route>
          <Route path="/checkout">
            <CheckoutScreen />
          </Route>
          <Route path="/:id">
            <ListScreen />
          </Route>
          <Route path="/">
            <ListScreen />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
