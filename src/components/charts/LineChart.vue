<script>
import { Line } from 'vue-chartjs'
export default {
  name: 'LineChart',
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
    },
  }),
  extends: Line,
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
