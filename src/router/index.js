import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/businessRegist',
    name: 'businessRegist',
    component: () => import(/* webpackChunkName: "about" */ '../views/businessRegist.vue')
  },
  {
    path: '/submitSucess',
    name: 'submitSucess',
    component: () => import(/* webpackChunkName: "about" */ '../views/submitSucess.vue')
  },
  
  

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
