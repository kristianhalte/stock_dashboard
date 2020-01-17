<script>
import { Pie } from 'vue-chartjs'
export default {
  name: 'DonutChart',
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    options: {
      legend: {
        display: false,
      },
      cutoutPercentage: 70,
    },
  }),
  extends: Pie,
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
