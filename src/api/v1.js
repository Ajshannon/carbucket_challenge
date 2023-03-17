import axios from 'axios'

const base = 'api'
const host = 'http://localhost:8000'
const version = 'v1'
const endpoint = resource => `${host}/${base}/${version}/${resource}`

/**
 * Wrapper for axios.
 * @param {string} action   - Action for axios
 * @param {string} resource - Endpoint to use
 * @param {(* | null)} [payload = null] - Data to post
 * @param {(* | null)} [config = null] - Config Axios
 */
export async function fetch(action, resource, payload = null, config = null) {
  const response = await axios[action](endpoint(resource), payload, config)
  return response.data
}

export default {
  async login(data) {
    return fetch('post', 'auth/login', data)
  },
  async logout() {
    return fetch('post', 'auth/logout')
  },
  async register(data) {
    return fetch('post', 'auth/users', data)
  },
  async getMe() {
    return fetch('get', 'auth/me')
  },
  async getBidOptions() {
    return fetch('get', 'bid/config/options')
  },
  async getBidConfigs() {
    return fetch('get', 'bid/config/index')
  },
  async postBidConfigs(data) {
    return fetch('post', 'bid/config/index', data)
  }
}
