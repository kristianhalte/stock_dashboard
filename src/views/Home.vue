<template>
  <div class="columns">
    <div class="column is-two-fifths">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <DoughnutChart v-else :chart-data="doughnutChartDataset" />
      </div>
    </div>
    <div class="column is-three-fifths">
      <div class="section">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <h2 class="title is-2">{{ $t('myPortfolio') }}</h2>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <div>
                <div class="buttons is-marginless">
                  <button class="button is-rounded">1D</button>
                  <button class="button is-rounded">1W</button>
                  <button class="button is-rounded">1M</button>
                  <button class="button is-rounded">1Q</button>
                  <button class="button is-rounded">1Y</button>
                  <button class="button is-rounded is-primary">All</button>
                </div>
                <p class="has-text-right has-text-grey">
                  Performance since Jan 01, 2020
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <p class="title is-6">{{ $t('value') }}</p>
            <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
            <p class="subtitle is-4" v-else>
              {{ todaysValue | numFormat('$0,0.00') }}
            </p>
          </div>
          <div class="column">
            <p class="title is-6 has-text-right">{{ $t('gain') }}</p>
            <p class="subtitle is-4 has-text-right" v-if="loading">
              {{ $t('loading') }}
            </p>
            <p
              class="subtitle is-4 has-text-right"
              v-else
              v-bind:class="[
                todaysGain >= 0 ? 'has-text-primary' : 'has-text-danger',
              ]"
            >
              {{ (todaysGain + todaysDividend) | numFormat('+$-0,0.00') }}
            </p>
          </div>
          <div class="column">
            <p class="title is-6 has-text-right">{{ $t('return') }}</p>
            <p class="subtitle is-4 has-text-right" v-if="loading">
              {{ $t('loading') }}
            </p>
            <p
              class="subtitle is-4 has-text-right"
              v-else
              v-bind:class="[
                todaysReturn >= 0 ? 'has-text-primary' : 'has-text-danger',
              ]"
            >
              {{ todaysReturn | numFormat('+0,0.00%') }}
            </p>
          </div>
        </div>
        <div>
          <p v-if="loading">{{ $t('loading') }}</p>
          <LineChart v-else :chart-data="lineChartDataset" />
        </div>
      </div>
      <div class="section">
        <h2 class="title is-2">{{ $t('slices') }}</h2>
      </div>
      <p v-if="loading">{{ $t('loading') }}</p>
      <Slices v-else :table-data="tableData" />
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import Slices from '@/components/Slices.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    DoughnutChart,
    LineChart,
    Slices,
  },
  computed: {
    ...mapState({
      loading: state => state.computedData.loading,
      todaysValue: state => state.myPortfolioData.todaysValue,
      todaysGain: state => state.myPortfolioData.todaysGain,
      todaysDividend: state => state.myPortfolioData.todaysDividend,
      todaysReturn: state => state.myPortfolioData.todaysReturn,
      doughnutChartDataset: state => state.myPortfolioData.doughnutChartDataset,
      lineChartDataset: state => state.myPortfolioData.lineChartDataset,
      tableData: state => state.myPortfolioData.tableData,
    }),
  },
}
</script>
