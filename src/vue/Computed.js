class Computed {
  constructor () {
    /**
     * total() {
        console.log('Computed')
        return this.a + this.b
      }
     * 
      {
        key: total,
        value: 3,
        get: total fn,
        dep: ['a', 'b']
      }
     */
    this.computedData = []
  }

  addComputed (vm, computed, key) {
    const descriptor = Object.getOwnPropertyDescriptor(computed, key),
          descriptFn = descriptor.value.get ? descriptor.value.get : descriptor.value,
          value = descriptFn.call(vm),
          get = descriptFn.bind(vm),
          dep = this._collectDep(descriptFn)

          
    const dataItem = {
      key,
      value,
      get,
      dep
    }
    this._addComputedProp(dataItem)

    // 让this.total可以访问到computed计算出来的值
    Object.defineProperty(vm, key, {
      get() {
        return dataItem.value
      },
      set () {
        // vm.total = 500 无效，只会重新计算值
        dataItem.value = dataItem.get()
      }
    })
  }

  update(key, watch) {
    this.computedData.forEach(item => {
      const dep = item.dep
      const _key = dep.find(prop => prop == key)
      // 如果某个computed的dep里面有更新的key
      if(_key) {
        const oldValue = item.value
        // 使computed重新计算值
        item.value = item.get()
        watch(item.key, item.value, oldValue)
      }
    })
  }

  _addComputedProp(computedProp) {
    this.computedData.push(computedProp)
  }

  _collectDep(fn) {
    // 匹配这个computed函数中使用到的响应式值有哪些，这里是 this.a和this.b
    // matched = ['this.a', 'this.b']
    const matched = fn.toString().match(/this\.(.+?)/g)
    
    // 这里返回的就是['a', 'b']
    return matched.map(item => item.split('.')[1])
  }
}

export default Computed