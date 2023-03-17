import App from './App.vue'
import { FontAwesomeIcon } from '@/plugins/font-awesome'
import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'
import router from './router/router'
import store from './store'

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueCurrencyInput)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
