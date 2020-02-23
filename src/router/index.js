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
    path: '/jobList',
    name: 'jobList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/jobList.vue')
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
  {
    path: '/applicationList',
    name: 'applicationList',
    component: () => import(/* webpackChunkName: "about" */ '../views/applicationList.vue')
  },
  {
    path: '/succes',
    name: 'succes',
    component: () => import(/* webpackChunkName: "about" */ '../views/succes.vue')
  },
  
  

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
