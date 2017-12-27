const bluebird = require('bluebird')
const explorer = require('../explorer')

async function init() {
  alert('init')
	const item = await explorer.fromPathWithDetails('~')
	await item.includeContent()
  console.log('item.content', item.content)
	const content = await bluebird.map(item.content, explorer.fromPathWithDetails, { concurrency: 2 })
	console.log('content', content)
  alert(content)
}

init()
