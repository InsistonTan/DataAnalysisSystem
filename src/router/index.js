import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Descriptives from '@/components/descriptives/Descriptives'
import T_test from '@/components/t_test/t_test'
import Regression from '@/components/regression/regression'
import Anova from '@/components/anova/anova'
import Frequencies from '@/components/frequencies/frequencies'
import Factor from '@/components/factor/factor'
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
      path: '/Descriptives/',
      name: 'Descriptives',
      component: Descriptives
    },
    {
      path: '/T_test/',
      name: 'T_test',
      component: T_test
    },
    {
      path: '/Anova/',
      name: 'Anova',
      component: Anova
    },
    {
      path: '/Regression/',
      name: 'Regression',
      component: Regression
    },
    {
      path: '/Frequencies/',
      name: 'Frequencies',
      component: Frequencies
    },
    {
      path: '/Factor/',
      name: 'Factor',
      component: Factor
    },
  ]
})
