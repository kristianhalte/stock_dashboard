<script>
import { Pie } from 'vue-chartjs'
export default {
  name: 'PieChart',
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    options: {
      cutoutPercentage: 0,
    },
  }),
  extends: Pie,
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
