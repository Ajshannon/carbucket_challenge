<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
            />
            <div v-if="errors.usernameError" class="error-feedback">
              {{ errors.usernameError }}
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="formData.email"
            />
            <div v-if="errors.emailError" class="error-feedback">
              {{ errors.emailError }}
            </div>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
            />
            <div v-if="errors.passwordError" class="error-feedback">
              {{ errors.passwordError }}
            </div>
          </div>

          <div class="form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
              <span
                v-show="loading"
                class="spinner-border spinner-border-sm"
              ></span>
              Sign Up
            </button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script>
  import * as yup from 'yup'
  import { mapActions } from 'vuex'

  export default {
    name: 'Register',
    data() {
      const schema = yup.object().shape({
        username: yup
          .string()
          .required('Username is required!')
          .min(3, 'Must be at least 3 characters!')
          .max(20, 'Must be maximum 20 characters!'),
        email: yup
          .string()
          .required('Email is required!')
          .email('Email is invalid!')
          .max(50, 'Must be maximum 50 characters!'),
        password: yup
          .string()
          .required('Password is required!')
          .min(6, 'Must be at least 6 characters!')
          .max(40, 'Must be maximum 40 characters!')
      })

      return {
        successful: false,
        loading: false,
        message: '',
        schema,
        formData: {
          username: '',
          email: '',
          password: ''
        },
        errors: {
          usernameError: '',
          emailError: '',
          passwordError: ''
        }
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn
      }
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push('/profile')
      }
    },
    methods: {
      ...mapActions('auth', ['register']),
      handleRegister() {
        this.message = ''
        this.successful = false
        this.loading = true

        this.schema
          .validate(this.formData, { abortEarly: false })
          .then(() => {
            this.errors = {}
            return this.register(this.formData)
          })
          .then(data => {
            this.message = data.message
            this.successful = true
            this.loading = false
            this.$router.push('/login')
          })
          .catch(err => {
            const errors = {}
            if (err.inner) {
              err.inner.forEach(e => {
                errors[e.path] = e.message
              })
            }
            this.errors = errors
            this.successful = false
            this.loading = false
          })
      }
    },
    watch: {
      'formData.username'(value) {
        if (value.length < 3) {
          this.errors.usernameError = 'Must be at least 3 characters!'
        } else if (value.length > 20) {
          this.errors.usernameError = 'Must be maximum 20 characters!'
        } else {
          this.errors.usernameError = ''
        }
      },
      'formData.email'(value) {
        if (!value) {
          this.errors.emailError = 'Email is required!'
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          this.errors.emailError = 'Email is invalid!'
        } else if (value.length > 50) {
          this.errors.emailError = 'Must be maximum 50 characters!'
        } else {
          this.errors.emailError = ''
        }
      },
      'formData.password'(value) {
        if (value.length < 6) {
          this.errors.passwordError = 'Must be at least 6 characters!'
        } else if (value.length > 40) {
          this.errors.passwordError = 'Must be maximum 40 characters!'
        } else {
          this.errors.passwordError = ''
        }
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
