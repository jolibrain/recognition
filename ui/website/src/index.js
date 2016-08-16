/*
Copyright 2016 Fabrica S.P.A., Emmanuel Benazera, Alexandre Girard

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { applyRouterMiddleware, Router, Route, IndexRoute, browserHistory, Location } from 'react-router';
import useScroll from 'react-router-scroll';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Home from './components/Home';
import Gallery from './components/Gallery';
import Match from './components/Match';
import Detail from './components/Detail';
import Info from './components/Info';

require('bootstrap/dist/css/bootstrap.min.css');

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

fetch('/splash.json').then((response) => { return response.json(); })
.then((json) => {
  store.dispatch(actions.loadSplashJson(json));

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} render={applyRouterMiddleware(useScroll())}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/gallery/:matchId" component={Match}/>
          <Route path="/details/:matchId" component={Detail}/>
          <Route path="/info" component={Info}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );

  fetch('/match.json').then((response) => { return response.json(); })
  .then((json) => {
    store.dispatch(actions.loadMatchJson(json));
  });
})

