export default new class History {
  limit = 10
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

  current() {
    return this.items[this.items.length - 1 + this.index]
  }
}
