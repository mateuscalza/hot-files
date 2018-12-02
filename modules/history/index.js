export default new class History {
  limit = 15
  index = 0
  items = []

  go(num = 0) {
    if (!this.canGo(num)) {
      throw new Error('History register not exists!')
    }
    this.index += num
    return this.current()
  }

  goBack() {
    return this.go(-1)
  }

  goForward() {
    return this.go(1)
  }

  push(item) {
    this.index = 0
    this.items.push(item)
    if (this.items.length > this.limit) {
      this.items.shift()
    }
  }

  canGo(indexCandidate) {
    return !!this.items[this.items.length - 1 + this.index + indexCandidate]
  }

  canGoBack() {
    return this.canGo(-1)
  }

  canGoForward() {
    return this.canGo(1)
  }

  findCandidate(indexCandidate) {
    return this.items[this.items.length - 1 + this.index + indexCandidate]
  }

  findBackCandidate() {
    return this.findCandidate(-1)
  }

  findForwardCandidate() {
    return this.findCandidate(1)
  }

  current() {
    return this.items[this.items.length - 1 + this.index]
  }
}
