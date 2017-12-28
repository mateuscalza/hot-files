const bluebird = require('bluebird')
const explorer = require('../explorer')

async function init() {
  debugger
	const item = await explorer.fromPath('~')
	await item.includeContent()
  console.log('item.content', item.content)
}

init()
