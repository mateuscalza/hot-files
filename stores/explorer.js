import { observable, computed, action } from 'mobx'
import { resolve } from 'path'
import { fromPath, normalizePath } from '../modules/explorer'

export default new class Explorer {
  @observable loading = false
  @observable realPath = null
  @observable content = null
  @observable selected = null
  @observable levelUp = null
  @observable history = []

  set path(value) {
    this.selected = null
    this.realPath = normalizePath(value)
    this.fetchItems()
    this.prepareLevelUp()
    this.addToHistory(this.realPath)
  }

  @action async prepareLevelUp() {
    this.levelUp = await fromPath(this.realPath !== '/' ? resolve(this.realPath, '..') : '/')
  }

  @action async addToHistory(path) {
    const history = Array.from(this.history)
    history.push(await fromPath(path))
    if (history.length > 3) {
      history.shift()
    }
    this.history = history
  }

  @action async fetchItems() {
    this.loading = true
    const item = await fromPath(this.realPath)
    await item.includeContent()
    this.content = item.content
    this.loading = false
  }

  @computed get path() {
    return this.realPath
  }
}
