<script>
import { Line, mixins } from 'vue-chartjs'
export default {
  name: 'LineChart',
  mixins: [mixins.reactiveProp],
  props: {
    chartData: {
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
    this.renderChart(this.chartData, this.options)
  },
}
</script>
