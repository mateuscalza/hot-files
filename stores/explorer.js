import { observable, computed, action } from 'mobx'
import { resolve } from 'path'
import opn from 'opn'
import { fromPath, normalizePath, types } from '../modules/explorer'

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

  @action async fromItem(item) {
    this.loading = true
    try {
      this.selected = null
      await item.includeDetails()
      if (item.type !== types.DIRECTORY) {
        await this.open(item)
        this.loading = false
        return
      }
      this.realPath = item.path
      await item.includeContent()
      this.content = item.content
      await this.addToHistory(item)
      await this.prepareLevelUp()
      this.loading = false
    } catch (error) {
      this.loading = false
      throw error
    }
  }

  @action async fromPath(path) {
    this.loading = true
    try {
      const item = await fromPath(path)
      await item.includeDetails()
      if (item.type !== types.DIRECTORY) {
        await this.open(item)
        this.loading = false
        return
      }
      this.selected = null
      this.realPath = item.path
      await item.includeContent()
      this.content = item.content
      await this.addToHistory(item)
      await this.prepareLevelUp()
      this.loading = false
    } catch (error) {
      this.loading = false
      throw error
    }
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

  async open(item) {
    console.log('item', item, item.path)
    await opn(item.path)
  }

  @computed get path() {
    return this.realPath
  }
}
