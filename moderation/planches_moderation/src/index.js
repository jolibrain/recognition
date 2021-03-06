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
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore from './stores/configureStore';
import * as actions from './actions';
import App from './components/App';
import Gallery from './components/Gallery';
require('bootstrap/dist/css/bootstrap.min.css');

var headers = new Headers();
headers.append("Authorization", "Basic " + new Buffer("recog:zuaFUqnzJHdF0W33AaA66D99T").toString('base64'));

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

fetch('./match.json', {headers: headers}).then((response) => { return response.json(); })
.then((json) => {
  store.dispatch(actions.loadMatchJson(json));

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Gallery} />
        </Route>
      </Router>
    </Provider>,
    document.getElementById('app')
  );
})
