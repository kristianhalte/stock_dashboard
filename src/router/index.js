import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Portfolios from '../views/Portfolios.vue'
import Categories from '../views/Categories.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/portfolios/:port_id',
    name: 'portfolios',
    component: Portfolios,
    props: true,
  },
  {
    path: '/portfolios/:port_id/categories/:cat_id',
    name: 'categories',
    component: Categories,
    props: true,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
