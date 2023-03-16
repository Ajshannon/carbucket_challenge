import App from './App.vue'
import Vue from 'vue'
import VueCurrencyInput from 'vue-currency-input'
import router from './router/router'
import store from './store'

Vue.use(VueCurrencyInput)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
