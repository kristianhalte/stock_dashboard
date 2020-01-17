<template>
  <div class="columns">
    <!-- <BarChart :chartdata="updatedDataArray" />
    <PieChart :chartdata="updatedDataArray" /> -->
    <div class="column">
      <!-- <DonutChart :chartdata="updatedDataArray" /> -->
    </div>
    <div class="column">
      <h2 class="title is-2">Test</h2>
      <div class="columns">
        <div class="column">
          <p class="title is-6">Test</p>
          <p class="subtitle is-4">$ 100.00</p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Test</p>
          <p class="subtitle is-4 has-text-right has-text-primary">+$ 200.00</p>
        </div>
        <div class="column">
          <p class="title is-6 has-text-right">Test</p>
          <p class="subtitle is-4 has-text-right has-text-primary">8 %</p>
        </div>
      </div>
      <LineChart :chartdata="updatedDataArray" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import BarChart from '@/components/charts/BarChart.vue'
// import PieChart from '@/components/charts/PieChart.vue'
// import DonutChart from '@/components/charts/DonutChart.vue'
import LineChart from '@/components/charts/LineChart.vue'
// import { getPorfolioArray, getLabelsArray } from '@/helpers/helpers'
import { getCombinedPortfolioArray } from '@/helpers/portfolio'
import { backgroundColor, borderColor, borderWidth } from '@/data/styles.json'

export default {
  name: 'home',
  components: {
    // BarChart,
    // PieChart,
    // DonutChart,
    LineChart,
  },
  data: () => ({
    chartData: {
      labels: [],
      datasets: [
        {
          label: '# of Votes',
          data: [],
          backgroundColor,
          borderColor,
          borderWidth,
        },
      ],
    },
  }),
  computed: {
    updatedDataArray() {
      // convertPortfolioObjectToArray()
      const computedChartData = this.chartData
      const combinedPortfolioArray = getCombinedPortfolioArray()
      // computedChartData.datasets[0].data =
      //   combinedPortfolioArray.portfolioDataArrayReversed
      // computedChartData.labels =
      //   combinedPortfolioArray.portfolioLabelArrayReversed
      computedChartData.datasets[0].data = ['1', '12', '12']
      computedChartData.labels = ['hello', 'there', 'how are you']
      // console.log(computedChartData.datasets[0].data)
      return computedChartData
    },
  },
}
</script>
