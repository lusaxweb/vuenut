
import components from './vuenut.vue'
const Vuenut = {
  install(Vue, options) {
      Vue.component(components.name,components)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuenut)
}
export default Vuenut
