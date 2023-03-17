import axios from 'axios'

const API_URL = 'http://localhost:8000/api/auth/'

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'users', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(user) {
    console.log('Auth.service is registering')
    return axios.post(API_URL + 'users', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
