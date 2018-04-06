import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/home',
      component:home,
    },
  ]
})
export default router
