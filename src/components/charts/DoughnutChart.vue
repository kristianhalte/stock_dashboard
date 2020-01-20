<script>
import { Pie, mixins } from 'vue-chartjs'
export default {
  name: 'DoughnutChart',
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
      cutoutPercentage: 70,
      // onClick: this.handle,
    },
  }),
  extends: Pie,
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    handle(evt, item) {
      console.log('legend onClick', evt)
      console.log('legd item', item)
      this.$router.push({ path: `/doughnut/${item._index}` })
    },
  },
}
</script>
