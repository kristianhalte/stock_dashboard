<template>
  <div id="app" class="container">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          Home
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/transactions' }">
          Transactions
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/0' }">
          Doughnuts 0
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/1' }">
          Doughnuts 2
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

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: #5ac7c1;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  'white': (
    $white,
    $black,
  ),
  'black': (
    $black,
    $white,
  ),
  'light': (
    $light,
    $light-invert,
  ),
  'dark': (
    $dark,
    $dark-invert,
  ),
  'primary': (
    $primary,
    $primary-invert,
  ),
  'info': (
    $info,
    $info-invert,
  ),
  'success': (
    $success,
    $success-invert,
  ),
  'warning': (
    $warning,
    $warning-invert,
  ),
  'danger': (
    $danger,
    $danger-invert,
  ),
  'twitter': (
    $twitter,
    $twitter-invert,
  ),
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import '~bulma';
@import '~buefy/src/scss/buefy';
</style>
