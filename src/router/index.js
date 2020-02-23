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
    path: '/jobEntry',
    name: 'jobEntry',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/jobEntry.vue')
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
