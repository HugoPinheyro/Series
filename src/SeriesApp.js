import React from 'react'
import Router from './Router'


import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk'
import rootReducer from './reducers'
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

const SeriesApp = prop => (
  <Provider store={store}>
      <Router />
  </Provider>
)

export default SeriesApp
