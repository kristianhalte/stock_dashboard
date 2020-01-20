<template>
  <div class="columns">
    <div class="column">
      <div class="section">
        <p class="subtitle is-4" v-if="loading">{{ $t('loading') }}</p>
        <DoughnutChart v-else :chart-data="doughnutChartDataset" />
      </div>
    </div>
    <div class="column">
      <div class="section">
        <h2 class="title is-2">{{ $t('myPortfolio') }}</h2>
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
              {{ todaysGain | numFormat('+$-0,0.00') }}
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
      <b-table :data="data" :columns="columns" :striped="true">
        <template slot-scope="props">
          <b-table-column style="vertical-align:middle">
            <span class="is-vcentered">{{ props.row.name }}</span>
          </b-table-column>

          <b-table-column centered style="vertical-align:middle">
            {{ props.row.value | numFormat('$0,0.00') }}
          </b-table-column>

          <b-table-column class="has-text-right">
            <span
              v-bind:class="[
                props.row.gain >= 0 ? 'has-text-primary' : 'has-text-danger',
              ]"
              >{{ props.row.gain | numFormat('+$-0,0.00') }}</span
            >
            <br />
            <span
              v-bind:class="[
                props.row.return >= 0 ? 'has-text-primary' : 'has-text-danger',
              ]"
              >({{ props.row.return | numFormat('+0,0.00%') }})</span
            >
          </b-table-column>

          <b-table-column class="has-text-right">
            <span>{{ props.row.actual | numFormat('+0,0[.]0%') }}</span>
            <br />
            <span class="has-text-weight-semibold">{{
              props.row.target | numFormat('+0,0[.]0%')
            }}</span>
          </b-table-column>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    DoughnutChart,
    LineChart,
  },
  data() {
    return {
      data: [
        {
          name: 'Real Estate',
          value: 200,
          gain: 20,
          return: 0.08,
          actual: 0.296,
          target: 0.301,
        },
        {
          name: 'Bonds',
          value: 200,
          gain: -20,
          return: -0.08,
          actual: 0.29,
          target: 0.3,
        },
      ],
      columns: [
        {
          field: 'name',
          label: 'Name',
        },
        {
          field: 'value',
          label: 'Value',
          centered: true,
        },
        {
          field: 'gain',
          label: 'Gain (return)',
          centered: true,
        },
        {
          field: 'actual',
          label: 'Actual/Target',
          centered: true,
        },
      ],
    }
  },
  computed: {
    ...mapState({
      loading: state => state.computedData.loading,
      todaysValue: state => state.myPortfolioData.todaysValue,
      todaysGain: state => state.myPortfolioData.todaysGain,
      todaysReturn: state => state.myPortfolioData.todaysReturn,
      doughnutChartDataset: state => state.myPortfolioData.doughnutChartDataset,
      lineChartDataset: state => state.myPortfolioData.lineChartDataset,
    }),
  },
}
</script>
