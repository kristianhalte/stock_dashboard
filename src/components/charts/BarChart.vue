<script>
import { Bar } from 'vue-chartjs'
export default {
  name: 'BarChart',
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  }),
  extends: Bar,
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
