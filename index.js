import componentvuenut from './src/components/vuenut.vue'
// import './src/css/iconfont/material-icons.css'

const Vuenut = {
  install(Vue, options) {
    Vue.component(componentvuenut.name,componentvuenut)
  }
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Vuenut)
}
export default Vuenut
