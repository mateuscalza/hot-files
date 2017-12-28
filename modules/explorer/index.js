const fs = require('fs-extra')
const path = require('path')
const klaw = require('klaw')
const untildify = require('untildify')
const bluebird = require('bluebird')
const hidefile = bluebird.promisifyAll(require('hidefile'))

const types = {
  FILE: 'FILE',
  DIRECTORY: 'DIRECTORY',
  SYMBOLIC_LINK: 'SYMBOLIC_LINK',
  UNKNOWN: 'UNKNOWN'
}

class Item {
  constructor() {
    this.name = null
    this.path = null
    this.createdAt = null
    this.updatedAt = null
    this.accessedAt = null
    this.size = null
    this.type = null
    this.extension = null
    this.exists = null
    this.details = false
    this.content = null
  }

  async includeDetails() {
    this.details = true
    if (!await fs.exists(this.path)) {
      this.exists = false
      return this
    }
    const stat = await fs.lstat(this.path)

    this.hidden = await hidefile.isHiddenAsync(this.path)
    this.exists = true
    this.createdAt = stat.birthtime
    this.updatedAt = stat.ctime
    this.accessedAt = stat.atime
    this.size = stat.size

    if (stat.isFile()) {
      this.type = types.FILE
    } else if (stat.isDirectory()) {
      this.type = types.DIRECTORY
    } else if (stat.isSymbolicLink()) {
      this.type = types.SYMBOLIC_LINK
    } else {
      this.type = types.UNKNOWN
    }
    return this
  }

  async includeContent(options = {}) {
    if (!this.details) {
      await this.includeDetails()
    }
    const { depthLimit = 0, includeHidden = false } = options
    if (this.type == types.DIRECTORY) {
      const content = await Item.getDirectoryContent(this.path, {
        depthLimit
      })
      const contentWithDetails = await bluebird.map(content, async fullPath => {
        const item = await Item.fromPath(fullPath)
        await item.includeDetails()
        return item
      }, { concurrency: 2 })
      const filteredContentWithDetails = includeHidden ? contentWithDetails : contentWithDetails.filter(
        item => !item.hidden
      )
      this.content = filteredContentWithDetails
    }
    return 
  }

  static async getDirectoryContent(fullPath, options) {
    return await new Promise((resolve, reject) => {
      const items = []
      klaw(fullPath, options)
        .on('data', item => items.push(item.path))
        .on('error', error => reject(error))
        .on('end', () => resolve(items))
    })
  }

  static async fromPath(fullPath) {
    const item = new Item()

    item.path = untildify(path.normalize(fullPath))
    item.name = path.basename(item.path)
    item.extension = path.extname(item.path).replace(/^\./, '')

    return item
  }
}

module.exports = {
  fromPath: fullPath => Item.fromPath(fullPath),
  getDirectoryContent: fullPath => Item.getDeepDirectoryContent(fullPath)
}
