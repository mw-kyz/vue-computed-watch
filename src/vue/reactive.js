export function reactive(vm, __get__, __set__) {
  const _data = vm.$data

  for (let key in _data) {
    Object.defineProperty(vm, key, {
      get() {
        __get__ && __get__(key, _data[key])
        return _data[key]
      },
      set(newValue) {
        const oldValue = _data[key]
        _data[key] = newValue
        __set__ && __set__(key, newValue, oldValue)
      }
    })
  }
}