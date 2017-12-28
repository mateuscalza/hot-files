import { observable, computed, action } from 'mobx'
import { fromPath } from '../modules/explorer'

export default new class Explorer {
  @observable loading = false
  @observable realPath = null
  @observable content = null

  set path(value) {
    console.log('path value', value)
    this.realPath = value
    this.fetchItems(value)
  }

  @action async fetchItems(path) {
    this.loading = true
    const item = await fromPath(path)
    await item.includeContent()
    this.content = item.content
    this.loading = false
  }

  @computed get path() {
    return this.realPath
  }
}
