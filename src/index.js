import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createHashHistory'
import {applyMiddleware, compose, createStore} from 'redux'
import {Provider} from 'react-redux'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'

import reducers from './reducers'
import './index.css'
import App from './routes'
import registerServiceWorker from './registerServiceWorker'

window.global = window
console.groupCollapsed('start')
console.time('start')

let history = global._history
if (!history) {
  history = createHistory()
  global._history = history
}

let store = global.store

if (!store) {
  let middleware = routerMiddleware(history)
  let composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  let enhancers = composeEnhancers(applyMiddleware(middleware)/*, search*/)
  store = createStore(reducers, undefined, enhancers)  
  // to hack in REPL & detect HMR
  global.store = store
}

ReactDOM.render(
  <div>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </div>
  , document.getElementById('root'),
)

console.timeEnd('start')
console.groupEnd('start')
registerServiceWorker()



if (module.hot) { // HMR
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default
    store.replaceReducer(nextRootReducer)
  })
  module.hot.accept()
}