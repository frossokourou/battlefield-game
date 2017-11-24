import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Welcome from './components/Welcome';
import PlayGame from './containers/PlayGame';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import battleField from './reducers/battleField';
import reduxThunk from 'redux-thunk';
import {BrowserRouter as Router, Route} from 'react-router-dom';

let store = createStore(
  battleField,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
{/* without exact matches whatever follows the path as well  */}
        <Route exact path='/' component={Welcome}/>
        <Route path='/setup' component={App}/>
        <Route path='/play_game' component={PlayGame}/>
      </div>
    </Router>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
