<template>
  <div id="app" class="container">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/transactions' }">
          Test
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('loadPortfolioData')
  },
}
</script>
