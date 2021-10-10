class Watcher {
  /**
   * addWatcher (vm, watcher, key)
   * 
   * this.watchers -> watch
   * {
   *    key: ?
   *    fn: key fn
   * }
   * 
   * 
   */
  constructor() {
    this.watchers = []
  }

  addWatcher (vm, watcher, key) {
    this._addWatchProp({
      key,
      fn: watcher[key].bind(vm)
    })
  }

  invoke(key, newValue, oldValue) {
    this.watchers.forEach(item => {
      if (item.key === key) {
        item.fn(newValue, oldValue)
      }
    })
  }

  _addWatchProp (watchProp) {
    this.watchers.push(watchProp)
  }
}

export default Watcher