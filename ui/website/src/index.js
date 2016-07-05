import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Splash from './components/Splash';
import Gallery from './components/Gallery';
import Match from './components/Match';

require('bootstrap/dist/css/bootstrap.min.css');

const store = configureStore();

fetch('/img/photos.json').then((response) => { return response.json(); })
.then((json) => {
  store.dispatch(actions.setPhotos(json));
})

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Splash} />
        <Route path="/" component={Splash} />
        <Route path="/gallery" component={Gallery}>
          <Route path="/gallery/:userId" component={Match}/>
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
