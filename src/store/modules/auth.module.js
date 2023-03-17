import AuthService from '../../services/auth.service'

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user) {
      console.log('auth.module.js is working')
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        error => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
      localStorage.setItem('user', JSON.stringify(user)) // add user to local storage
      console.log('login was a success')
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
      console.log('login was a failure')
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
      localStorage.removeItem(user) // remove user on logout
    },
    registerSuccess(state) {
      state.status.loggedIn = false
      console.log('registration was a success')
    },
    registerFailure(state) {
      state.status.loggedIn = false
      console.log('registration was a failure')
    }
  }
}
