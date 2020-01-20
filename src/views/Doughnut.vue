<template>
  <div class="columns">
    <div class="column">
      <DoughnutChart :chart-data="updatedSubDoughnutChartDataset" />
    </div>
    <div class="column">
      <h2 class="title is-2">{{ doughnutTitle }}</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">Value</p>
          <p class="subtitle is-4" v-if="loading">Loading...</p>
          <p class="subtitle is-4" v-else>
            ${{ updatedSubTodaysValue | numFormat('0,0.00') }}
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
              updatedSubTodaysGain >= 0
                ? 'has-text-primary'
                : 'has-text-danger',
            ]"
          >
            +${{ updatedSubTodaysGain | numFormat('0,0.00') }}
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
              updatedSubTodaysReturn >= 0
                ? 'has-text-primary'
                : 'has-text-danger',
            ]"
          >
            {{ updatedSubTodaysReturn | numFormat('0,0.00') }}%
          </p>
        </div>
      </div>
      <div>
        <p v-if="loading">Loading...</p>
        <LineChart v-else :chart-data="updatedSubPortfolioLineChartDataset" />
      </div>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
// import { doughnutsArray } from '@/data/doughnuts.json'
import { mapState } from 'vuex'
import {
  getPortfolioLineChartDataset,
  getDoughnutChartDataset,
  getTodaysValue,
  getTodaysGain,
  getTodaysReturn,
  // getSubPortfolioDataArray,
} from '@/helpers/helpers'

export default {
  name: 'doughnut',
  components: {
    DoughnutChart,
    LineChart,
  },
  computed: {
    doughnutTitle() {
      return this.doughnutsArray[this.$route.params.id].name
    },
    updatedSubTodaysValue() {
      return getTodaysValue(
        this.$store.getters.subPortfolioDataArray(this.$route.params.id)
      )
    },
    updatedSubTodaysGain() {
      return getTodaysGain(
        this.$store.getters.subPortfolioDataArray(this.$route.params.id)
      )
    },
    updatedSubTodaysReturn() {
      return getTodaysReturn(
        this.$store.getters.subPortfolioDataArray(this.$route.params.id)
      )
    },
    // subPortfolioDataArray() {
    //   return getSubPortfolioDataArray(
    //     this.portfolioDataArray,
    //     this.$route.params.id
    //   )
    // },
    // subDoughnutArray() {
    //   return doughnutsArray[this.$route.params.id].subDoughnutsArray
    // },
    updatedSubDoughnutChartDataset() {
      return getDoughnutChartDataset(
        this.$store.getters.subDoughnutArray(this.$route.params.id)
      )
    },
    updatedSubPortfolioLineChartDataset() {
      return getPortfolioLineChartDataset(
        this.$store.getters.subPortfolioDataArray(this.$route.params.id)
      )
    },
    ...mapState({
      loading: state => state.computedData.loading,
      doughnutsArray: state => state.rawData.doughnutsArray,
    }),
  },
}
</script>
