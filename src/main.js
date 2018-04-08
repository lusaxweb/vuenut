
import components from './App.vue'
const Vuenut = {
  theme:{
    "primary-color":'rgb(51, 186, 77)'
  },
  install(Vue, options) {
      Vue.component(components.name,components)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuenut)
}
export default Vuenut
