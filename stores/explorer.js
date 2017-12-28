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
    this.fromPath(this.realPath)
  }

  @action async prepareLevelUp() {
    this.levelUp = await fromPath(this.realPath !== '/' ? resolve(this.realPath, '..') : '/')
  }

  @action async addToHistory(item) {
    const history = Array.from(this.history)
    history.push(item)
    if (history.length > 3) {
      history.shift()
    }
    this.history = history
  }

  @action async backToHistoryIndex(index) {
    const item = this.history[index]
    this.history = this.history.slice(0, index)
    this.fromItem(item)
  }

  @action async fromItem(item) {
    this.loading = true
    this.selected = null
    this.realPath = item.path
    await item.includeContent()
    this.content = item.content
    await this.addToHistory(item)
    await this.prepareLevelUp()
    this.loading = false
  }

  @action async fromPath(path) {
    this.loading = true
    const item = await fromPath(path)
    this.selected = null
    this.realPath = item.path
    await item.includeContent()
    this.content = item.content
    await this.addToHistory(item)
    await this.prepareLevelUp()
    this.loading = false
  }

  @computed get path() {
    return this.realPath
  }
}
