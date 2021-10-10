import { reactive } from './reactive'
import Computed from './Computed'
import Watcher from './Watcher'

class Vue {
  constructor(options) {
    const { data, computed, watch } = options

    this.$data = data()

    this.init(this, computed, watch)
  }

  init(vm, computed, watch) {
    this.initData(vm)
    const computedIns = this.initComputed(vm, computed)
    const watcherIns = this.initWatcher(vm, watch)
    // 保存computed更新方法
    this.$computed = computedIns.update.bind(computedIns)
    // 保存watch调用方法
    this.$watch = watcherIns.invoke.bind(watcherIns)
  }

  initData(vm) {
    // 数据响应式
    reactive(vm, (key, value) => {
      // console.log(key, value)
    }, (key, newValue, oldValue) => {
      if(newValue === oldValue) {
        return
      }
      // console.log(key, newValue, oldValue)
      this.$computed(key, this.$watch)
      this.$watch(key, newValue, oldValue)
    })
  }

  initComputed(vm, computed) {
    // 枚举computed -> 增加computedData
    // 返回实例 -> 实例里有update -> 更新computedData的value
    const computedIns = new Computed()

    for (let key in computed) {
      computedIns.addComputed(vm, computed, key)
    }

    return computedIns
  }

  initWatcher(vm, watch) {
    // 枚举watcher -> 增加侦听器
    // 返回实例 -> 实例里有调用watch的方法 -> 执行侦听器
    const watcherIns = new Watcher()

    for(let key in watch) {
      watcherIns.addWatcher(vm, watch, key)
    }

    return watcherIns
  }
}

export default Vue