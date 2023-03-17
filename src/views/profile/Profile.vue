<template>
  <div class="container">
    <div class="jumbotron mt-5">
      <h1 class="display-4">
        {{
          currentUser.username.charAt(0).toUpperCase() +
          currentUser.username.slice(1)
        }}'s Profile
      </h1>
      <hr class="my-4" />
    </div>
    <div class="row mt-5">
      <div class="col-md-6">
        <h3>User Details</h3>
        <ul class="list-group">
          <li class="list-group-item">
            <strong>Token:</strong> {{ currentUser.accessToken }}
          </li>
          <li class="list-group-item">
            <strong>Id:</strong> {{ currentUser.id }}
          </li>
          <li class="list-group-item">
            <strong>Email:</strong> {{ currentUser.email }}
          </li>
          <li class="list-group-item">
            <strong>Authorities:</strong>
            <ul>
              <li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Profile',
    computed: {
      currentUser() {
        return this.$store.state.auth.user
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  .jumbotron {
    background-color: #e9ecef;
  }
</style>
