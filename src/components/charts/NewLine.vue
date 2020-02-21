<template>
  <div>
    <fusioncharts
      :type="type"
      :width="width"
      :dataFormat="dataFormat"
      :dataSource="testDataSource"
    >
    </fusioncharts>
  </div>
</template>

<script>
export default {
  name: 'NewLine',
  props: ['data'],
  data() {
    return {
      type: 'line',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      testDataSource: {
        chart: {
          theme: 'fusion',
          caption: 'Total footfall in Bakersfield Central',
          subCaption: 'Last week',
          xAxisName: 'Day',
          yAxisName: 'No. of Visitors',
          lineThickness: 2,
        },
        data: this.data,
      },
    }
  },
  // computed: {
  //   testDataSource() {
  //     const testDataSource = {
  //       chart: {
  //         // Functional Attribues
  //         showLabels: 0,
  //         showValues: 0,
  //         showPercentValues: 0,
  //         showPercentInTooltip: 0,
  //         theme: 'fusion',
  //         // Pie / Doughnut Properties
  //         pieRadius: '90%',
  //         doughnutRadius: '60%',
  //         startingAngle: 0,
  //         enableSlicing: 0,
  //         slicingDistance: 0,
  //         enableRotation: 0,
  //         enableMultiSlicing: 0,
  //         // Smart Labels & Lines
  //         enableSmartLabels: 0,
  //         // Legend Properties
  //         showLegend: 0,
  //         // Center Label Cosmetics
  //         defaultCenterLabel: 'Portfolio $5,000',
  //         centerLabel: 'Revenue from $label: $value',
  //         // Number Formatting
  //         decimals: 0,
  //       },
  //       data: this.data,
  //     }
  //     return testDataSource
  //   },
  // },
}
</script>
