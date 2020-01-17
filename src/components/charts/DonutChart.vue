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
      cutoutPercentage: 75,
    },
  }),
  extends: Pie,
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
