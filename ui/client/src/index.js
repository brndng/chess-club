import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";
import allReducers from './reducers';
import Wrap from './components/Wrap.jsx'
import App from './components/App.jsx';

const store = createStore(allReducers);
window.store = store;

const AppWrapped = Wrap(App);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWrapped />
    </Router>
  </Provider>,
  document.getElementById('app')
);