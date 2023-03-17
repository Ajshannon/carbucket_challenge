<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input
            name="username"
            type="text"
            class="form-control"
            v-model="username"
          />
          <div v-if="usernameError" class="error-feedback">
            {{ usernameError }}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            v-model="password"
          />
          <div v-if="passwordError" class="error-feedback">
            {{ passwordError }}
          </div>
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Login</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import * as yup from 'yup'

  export default {
    name: 'Login',
    data() {
      const schema = yup.object().shape({
        username: yup.string().required('Username is required!'),
        password: yup.string().required('Password is required!')
      })

      return {
        loading: false,
        message: '',
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        schema
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/profile')
      }
    },
    methods: {
      handleLogin() {
        this.usernameError = ''
        this.passwordError = ''

        if (!this.username) {
          this.usernameError = 'Username is required!'
        }

        if (!this.password) {
          this.passwordError = 'Password is required!'
        }

        if (this.usernameError || this.passwordError) {
          return
        }

        this.loading = true

        this.$store
          .dispatch('auth/login', {
            username: this.username,
            password: this.password
          })
          .then(
            () => {
              this.$router.push('/profile')
            },
            error => {
              this.loading = false
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString()
            }
          )
      }
    }
  }
</script>

<style scoped>
  label {
    display: block;
    margin-top: 10px;
  }

  .card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
  }

  .card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }

  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }

  .error-feedback {
    color: red;
  }
</style>
