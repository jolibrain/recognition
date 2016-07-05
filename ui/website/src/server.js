import path from 'path'
import Express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import configureStore from './stores/configureStore';
import App from './components/App';
import Splash from './components/Splash';
import Gallery from './components/Gallery';
import Match from './components/Match';

const app = Express()
const port = 3000

// This is fired every time the server side receives a request
app.use(handleRender)

function handleRender(req, res) {
  // Create a new Redux store instance
  const store = configureStore();

  // Render the component to a string
  const html = renderToString(
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
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = store.getState()

  // Send the rendered page back to the client
  res.send(renderFullPage(html, initialState))
}

function renderFullPage(html, initialState) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
        </script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
    `
}

app.listen(port)
