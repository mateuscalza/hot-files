import bluebird from 'bluebird'
import is from 'electron-is'
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../../components/app'
import { fromPath } from '../explorer'

async function init() {
  // debugger
  // const item = await fromPath('~')
  // await item.includeContent()
  // console.log('item.content', item.content)
  ReactDOM.render(
    <App />,
    document.getElementById('app')
  )
}

init()

if (is.dev()) {
  require('devtron').install()
}
