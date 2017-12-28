const bluebird = require('bluebird')
const is = require('electron-is')
const explorer = require('../explorer')

async function init() {
	const item = await explorer.fromPath('~')
	await item.includeContent()
  console.log('item.content', item.content)
}

init()

if (is.dev()) {
  require('devtron').install()
}
