import Vue from './vue'

const vm = new Vue({
  data() {
    return {
      a: 1,
      b: 2
    }
  },
  computed: {
    total() {
      console.log('Computed total')
      return this.a + this.b
    },
    total1: {
      get() {
        console.log('Computed total1')
        return this.total * 2
      }
    }
  },
  watch: {
    total(newValue, oldValue) {
      console.log('watcher total:', newValue, oldValue)
    },
    total1(newValue, oldValue) {
      console.log('watcher total1:', newValue, oldValue)
    },
    a(newValue, oldValue) {
      console.log('watcher a:', newValue, oldValue)
    },
    b(newValue, oldValue) {
      console.log('watcher b:', newValue, oldValue)
    }
  }
})

console.log(vm)

console.log('-------------', vm.total1)
console.log(vm.total)
console.log(vm.total)
console.log(vm.total)

vm.a = 100

console.log('-------------', vm.total1)
console.log(vm.total)
console.log(vm.total)
console.log(vm.total)

vm.b = 200

console.log('-------------', vm.total1)
console.log(vm.total)
console.log(vm.total)
console.log(vm.total)