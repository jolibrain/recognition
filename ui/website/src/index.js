import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Location } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Loading from './components/Loading';
import Splash from './components/Splash';
import Gallery from './components/Gallery';
import Match from './components/Match';
import Detail from './components/Detail';

require('bootstrap/dist/css/bootstrap.min.css');

const store = configureStore();

fetch('/match.json').then((response) => { return response.json(); })
.then((json) => {
  store.dispatch(actions.loadMatchJson(json));
})

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Loading} />
        <Route path="/splash" component={Splash} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/gallery/:matchId" component={Match}/>
        <Route path="/details/:matchId" component={Detail}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
