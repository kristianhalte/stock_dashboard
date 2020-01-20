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
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/0' }">
          D 0
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/1' }">
          D 1
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/2' }">
          D 2
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/3' }">
          D 3
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/4' }">
          D 4
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/5' }">
          D 5
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/6' }">
          D 6
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/7' }">
          D 7
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/8' }">
          D 8
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/doughnut/9' }">
          D 9
        </b-navbar-item>
      </template>
    </b-navbar>
    <section>
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
