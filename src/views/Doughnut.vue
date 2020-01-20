<template>
  <div class="columns">
    <div class="column">
      <p class="subtitle is-4" v-if="loading">Loading...</p>
      <DoughnutChart
        v-else
        :chart-data="updatedDoughnutData.doughnutChartDataset"
      />
    </div>
    <div class="column">
      <h2 class="title is-2" v-if="loading">Loading...</h2>
      <h2 class="title is-2" v-else>{{ updatedDoughnutData.label }}</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">test</p>
          <p class="subtitle is-4" v-if="loading">Loading...</p>
          <p class="subtitle is-4" v-else>
            ${{ updatedDoughnutData.todaysValue | numFormat('0,0.00') }}
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">test</p>
          <p class="subtitle is-4 has-text-right" v-if="loading">
            Loading...
          </p>
          <p
            class="subtitle is-4 has-text-right has-text-primary"
            v-else
            v-bind:class="[
              updatedDoughnutData.todaysGain >= 0
                ? 'has-text-primary'
                : 'has-text-danger',
            ]"
          >
            +${{ updatedDoughnutData.todaysGain | numFormat('0,0.00') }}
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">test</p>
          <p class="subtitle is-4 has-text-right" v-if="loading">
            Loading...
          </p>
          <p
            class="subtitle is-4 has-text-right has-text-primary"
            v-else
            v-bind:class="[
              updatedDoughnutData.todaysReturn >= 0
                ? 'has-text-primary'
                : 'has-text-danger',
            ]"
          >
            {{ updatedDoughnutData.todaysReturn | numFormat('0,0.00') }}%
          </p>
        </div>
      </div>
      <div>
        <p v-if="loading">Loading...</p>
        <LineChart v-else :chart-data="updatedDoughnutData.lineChartDataset" />
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { mapState } from 'vuex'
import { getMyDoughnutData } from '@/helpers/helpers'

export default {
  name: 'doughnut',
  components: {
    DoughnutChart,
    LineChart,
  },
  computed: {
    ...mapState({
      loading: state => state.computedData.loading,
    }),
    updatedDoughnutData() {
      return getMyDoughnutData(
        this.$store.state.computedData.portfolioDataArray,
        this.$store.state.rawData.doughnutsArray,
        this.$route.params.id
      )
    },
  },
}
</script>
