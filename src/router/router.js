import DealershipPricingView from '@/views/DealershipPricingView'
import Home from '@/views/Home'
import Login from '@/views/login/LoginScreen'
import Register from '@/views/register/Register'
import Vue from 'vue'
import VueRouter from 'vue-router'
// lazy-loaded
// const Profile = () => import('@/components/profile/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },

  {
    path: '/pricing', // changed from '/'
    name: 'price',
    component: DealershipPricingView
  },

  {
    path: '/home', // changed from '/'
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   // lazy-loaded
  //   component: Profile
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   // ...
//   // explicitly return false to cancel the navigation

//   if (sessionStorage.getItem('login')) {
//     console.log('Go ahead')
//     next()
//   } else {
//     return false
//   }

//   // allows progression
// })

export default router
