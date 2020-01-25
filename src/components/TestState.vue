<template>
  <div class="container">
    <br />
    <p>Compoent ID: {{ id }}</p>
    <div>
      <vuefusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataFormat="dataFormat"
        :dataSource="testDataSource"
      >
      </vuefusioncharts>
    </div>
  </div>
</template>

<script>
import vuefusioncharts from '@/components/charts/VueFusionCharts.vue'

export default {
  name: 'TestState',
  props: ['id'],
  components: {
    vuefusioncharts,
  },
  data() {
    return {
      type: 'column2d',
      width: '550',
      height: '350',
      dataFormat: 'json',
    }
  },
  computed: {
    testDataSource() {
      const testDataSource = {
        chart: {
          caption: 'Countries With Most Oil Reserves [2017-18]',
          subcaption: 'In MMbbl = One Million barrels',
          xaxisname: 'Country',
          yaxisname: 'Reserves (MMbbl)',
          numbersuffix: 'K',
          theme: 'fusion',
        },
        data: this.$store.getters.testChartData(this.id),
      }
      return testDataSource
    },
  },
}
</script>
