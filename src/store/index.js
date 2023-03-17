import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './modules/auth.module'
import dealer from './modules/dealer'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: { dealer, auth },
  strict: debug
})

if (module.hot) {
  // accept actions and mutations as hot modules
  module.hot.accept([
    dealer,
    auth,
    () => {
      const newModuleDealer = require('./modules/dealer').default
      const newModuleAuth = require('./modules/auth.module').auth
      // swap in the new actions and mutations
      store.hotUpdate({
        modules: {
          dealer: newModuleDealer,
          auth: newModuleAuth
        }
      })
    }
  ])
}

export default store
