
import components from './App.vue'
const Vuenut = {
  install(Vue, options) {
      Vue.component(components.name,components)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuenut)
}
export default Vuenut
