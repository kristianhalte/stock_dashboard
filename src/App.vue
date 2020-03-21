<template>
  <div id="app" class="container">
    <b-navbar>
      <template slot="start">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          {{ $t('home') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          {{ $t('transactions') }}
        </b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          {{ $t('search') }}
        </b-navbar-item>
        <b-navbar-item @click="downloadData">
          Download Data
        </b-navbar-item>
      </template>
    </b-navbar>
    <section>
      <router-view />
    </section>
  </div>
</template>

<script>
import { getNewData } from '@/services'
export default {
  name: 'app',
  // created() {
  //   this.$store.dispatch('loadData')
  // },
  methods: {
    downloadData() {
      getNewData().then(response => {
        const data = JSON.stringify(response)
        const fileURL = window.URL.createObjectURL(new Blob([data]))
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'data.json')
        document.body.appendChild(fileLink)
        fileLink.click()
      })
    },
  },
}
</script>

<style lang="scss">
// Import Bulma's core
@import '~bulma/sass/utilities/_all';

// Set your colors
$primary: rgba(91, 193, 190, 1);
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
