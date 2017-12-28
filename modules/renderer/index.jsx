import bluebird from 'bluebird'
import is from 'electron-is'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import stores from '../../stores'
import App from '../../components/app'

async function init() {
  ReactDOM.render(
    <Provider {...stores}>
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

init()

if (is.dev()) {
  require('devtron').install()
}
