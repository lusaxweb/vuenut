// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import vuex from 'vuex'
import 'prefixfree'
import {store} from './store.js'
// import marked from 'marked'
// import lang from './lang/index.js'

// Vue.use(markedx);

// import Vuenut from '../../index.js'
import Vuenut from '../../dist/vuenut.js'
import '../../dist/vuenut.css'
// import '../../dist/vuesax.css'
// import Vuesax from 'vuesax'
Vue.use(Vuenut);
// console.log(Vuesax);
// Vue.use(InstantSearch);

Vue.config.productionTip = false

// import './assets/app.css'

// Vue.mixin({
//   data() {
//     return {
//       lang:this.$lang[this.$route.params.lang],
//     }
//   }
// })

/* eslint-disable no-new */
var vm = new Vue({
  store,
  el: '#app',
  // router,
  components: { App },
  template: '<App/>',
})


// console.log(vm);
// router.beforeEach((to, from, next) => {
//     next()
// })
//
// var setDocumentVariable = function(propertyName, value) {
//
// };

// document.documentElement.style.setProperty('--primary', "255, 0, 153");
//
// router.afterEach((to)=>{
//   vm.$store.state.estas = to.fullPath
// })
