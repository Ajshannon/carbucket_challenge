import DealershipPricingView from '@/views/DealershipPricingView'
import Login from '@/views/login/LoginScreen'
import Register from '@/views/register/Register'
import Vue from 'vue'
import VueRouter from 'vue-router'
// lazy-loaded
const Profile = () => import('@/views/profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/pricing', // changed from '/'
    name: 'price',
    component: DealershipPricingView
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    // lazy-loaded
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
