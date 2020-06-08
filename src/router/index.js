import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Analysis from '@/components/analysis'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/Analysis',
      name: 'Analysis',
      component: Analysis
    }
  ]
})
