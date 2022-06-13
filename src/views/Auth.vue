<template>
  <div class="home">
    <AuthComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import AuthComponent from '@components/Auth.vue'

export default {
  name: 'AuthView',
  components: {
    AuthComponent,
  }
}
</script>
