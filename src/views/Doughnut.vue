<template>
  <div class="columns">
    <div class="column">
      <div>Doughnut {{ $route.params.id }}</div>
      <!-- <DoughnutChart :chartdata="updatedDataArray" /> -->
    </div>
    <div class="column">
      <div>Doughnut {{ $route.params.id }}</div>
    </div>
  </div>
</template>

<script>
// import DoughnutChart from '@/components/charts/DoughnutChart.vue'

export default {
  name: 'home',
  components: {
    // DoughnutChart,
  },
  computed: {
    portfolioDataArray() {
      return this.$store.state.portfolioDataArray
    },
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>
