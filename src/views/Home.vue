<template>
  <div class="columns">
    <div class="column">
      <DoughnutChart :chartdata="updatedDoughnutChartDataset" />
    </div>
    <div class="column">
      <h2 class="title is-2">My Portfolio</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">Value</p>
          <p class="subtitle is-4" v-if="loading">Loading...</p>
          <p class="subtitle is-4" v-else>
            ${{ updatedTodaysValue | numFormat('0,0.00') }}
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
              updatedTodaysGain >= 0 ? 'has-text-primary' : 'has-text-danger',
            ]"
          >
            +${{ updatedTodaysGain | numFormat('0,0.00') }}
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
              updatedTodaysReturn >= 0 ? 'has-text-primary' : 'has-text-danger',
            ]"
          >
            {{ updatedTodaysReturn | numFormat('0,0.00') }}%
          </p>
        </div>
      </div>
      <div>
        <p v-if="loading">Loading...</p>
        <LineChart v-else :chartdata="updatedPortfolioLineChartDataset" />
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { doughnutsArray } from '@/data/doughnuts.json'
import {
  getPortfolioLineChartDataset,
  getDoughnutChartDataset,
  getTodaysValue,
  getTodaysGain,
  getTodaysReturn,
} from '@/helpers/helpers'

export default {
  name: 'home',
  components: {
    DoughnutChart,
    LineChart,
  },
  computed: {
    // isTodaysGainPositive() {
    //   return if(this.updatedTodaysGain >= 0)
    // },
    updatedTodaysValue() {
      return getTodaysValue(this.portfolioDataArray)
    },
    updatedTodaysGain() {
      return getTodaysGain(this.portfolioDataArray)
    },
    updatedTodaysReturn() {
      return getTodaysReturn(this.portfolioDataArray)
    },
    updatedDoughnutChartDataset() {
      return getDoughnutChartDataset(doughnutsArray)
    },
    updatedPortfolioLineChartDataset() {
      return getPortfolioLineChartDataset(this.portfolioDataArray)
    },
    portfolioDataArray() {
      return this.$store.state.portfolioDataArray
    },
    loading() {
      return this.$store.state.loading
    },
  },
}
</script>
