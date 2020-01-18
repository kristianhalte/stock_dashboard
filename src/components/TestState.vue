<template>
  <div>
    <p v-if="loading">Loading...</p>
    <p v-else>{{ timeSeriesData }}</p>
  </div>
</template>

<script>
export default {
  name: 'testState',
  computed: {
    timeSeriesData() {
      return this.$store.state.timeSeriesData
    },
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>
