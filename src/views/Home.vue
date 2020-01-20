<template>
  <div class="columns">
    <div class="column">
      <DoughnutChart :chart-data="doughnutChartDataset" />
    </div>
    <div class="column">
      <h2 class="title is-2">My Portfolio</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">Value</p>
          <p class="subtitle is-4" v-if="loading">Loading...</p>
          <p class="subtitle is-4" v-else>
            ${{ todaysValue | numFormat('0,0.00') }}
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Gain</p>
          <p class="subtitle is-4 has-text-right" v-if="loading">
            Loading...
          </p>
          <p
            class="subtitle is-4 has-text-right has-text-primary"
            v-else
            v-bind:class="[
              todaysGain >= 0 ? 'has-text-primary' : 'has-text-danger',
            ]"
          >
            +${{ todaysGain | numFormat('0,0.00') }}
          </p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Return</p>
          <p class="subtitle is-4 has-text-right" v-if="loading">
            Loading...
          </p>
          <p
            class="subtitle is-4 has-text-right has-text-primary"
            v-else
            v-bind:class="[
              todaysReturn >= 0 ? 'has-text-primary' : 'has-text-danger',
            ]"
          >
            {{ todaysReturn | numFormat('0,0.00') }}%
          </p>
        </div>
      </div>
      <div>
        <p v-if="loading">Loading...</p>
        <LineChart v-else :chart-data="portfolioLineChartDataset" />
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    DoughnutChart,
    LineChart,
  },
  computed: {
    ...mapGetters([
      'todaysValue',
      'todaysGain',
      'todaysReturn',
      'doughnutChartDataset',
      'portfolioLineChartDataset',
    ]),
    ...mapState({
      loading: state => state.computedData.loading,
    }),
  },
}
</script>
