import { observable, computed, action, extendObservable } from 'mobx'
import { resolve } from 'path'
import opn from 'opn'
import { fromPath, normalizePath, types } from '../modules/explorer'
import history from '../modules/history'

export default new class Explorer {
  @observable loading = false
  @observable realPath = null
  @observable content = []
  @observable levelUp = null
  @observable backCandidate = false
  @observable forwardCandidate = false

  set path(value) {
    this.realPath = normalizePath(value)
    this.fromPath(this.realPath)
  }

  @action async fromItem(item, { ignoreHistory = false } = {}) {
    this.loading = true
    try {
      await item.includeDetails()
      if (item.type !== types.DIRECTORY) {
        await this.open(item)
        this.loading = false
        return
      }
      this.realPath = item.path
      await item.includeContent()
      this.content = item.content
      !ignoreHistory && this.addToHistory(item)
      await this.prepareLevelUp()
      this.loading = false
    } catch (error) {
      this.loading = false
      throw error
    }
  }

  @action async fromPath(path, { ignoreHistory = false } = {}) {
    this.loading = true
    try {
      const item = await fromPath(path)
      await item.includeDetails()
      if (item.type !== types.DIRECTORY) {
        await this.open(item)
        this.loading = false
        return
      }
      this.realPath = item.path
      await item.includeContent()
      this.content = item.content
      !ignoreHistory && this.addToHistory(item)
      await this.prepareLevelUp()
      this.loading = false
    } catch (error) {
      this.loading = false
      throw error
    }
  }

  @action toggleSelect(index, multiple = false) {
    if (multiple) {
      const content = this.content
      content[index].selected = !content[index].selected
      this.content.replace(content)
      return
    }
    const content = this.content.map((item, currentIndex)=> {
      item.selected = currentIndex  === index ? !item.selected : false
      return item
    })
    this.content.replace(content)
  }

  @action unselect() {
    const content = this.content.map((item, currentIndex)=> {
      item.selected = false
      return item
    })
    this.content.replace(content)
  }

  @action async prepareLevelUp() {
    this.levelUp = await fromPath(this.realPath !== '/' ? resolve(this.realPath, '..') : '/')
  }

  @action updateHistoryObservables() {
    this.backCandidate = history.findBackCandidate()
    this.forwardCandidate = history.findForwardCandidate()
  }

  addToHistory(item) {
    history.push(item)
    this.updateHistoryObservables()
  }

  @action async goBack() {
    const item = history.goBack()
    this.updateHistoryObservables()
    this.fromItem(item, { ignoreHistory: true })
  }

  @action async goForward() {
    const item = history.goForward()
    this.updateHistoryObservables()
    this.fromItem(item, { ignoreHistory: true })
  }

  async open(item) {
    await opn(item.path)
  }

  @computed get path() {
    return this.realPath
  }
}
