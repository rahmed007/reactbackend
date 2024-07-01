import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'

window.addEventListener('beforeunload', (event) => {
  // console.log('the window is closing');
  // alert('close all');
  localStorage.removeItem('currentUser')
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
