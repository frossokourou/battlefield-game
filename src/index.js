import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import battleField from './reducers/battleField';
import reduxThunk from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';

let store = createStore(
  battleField,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes />
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
