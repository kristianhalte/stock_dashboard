import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Doughnuts from '../views/Doughnuts.vue'
import TestStates from '../views/TestStates.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/transactions',
    name: 'transactions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Transactions.vue'),
  },
  {
    path: '/doughnuts/:id',
    name: 'doughnuts',
    component: Doughnuts,
    props: true,
  },
  {
    path: '/teststates/:id',
    name: 'teststates',
    component: TestStates,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
