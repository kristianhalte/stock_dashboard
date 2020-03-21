<template>
  <div>
    <fusioncharts
      :type="type"
      :width="width"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
    >
    </fusioncharts>
  </div>
</template>

<script>
export default {
  name: 'PlotChart',
  props: ['chartData'],
  data() {
    return {
      type: 'line',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          theme: 'fusion',
          lineThickness: 2,
        },
        data: this.chartData,
      },
    }
  },
}
</script>
