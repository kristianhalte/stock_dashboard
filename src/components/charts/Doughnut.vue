<template>
  <div>
    <fusioncharts
      :type="type"
      :width="width"
      :dataFormat="dataFormat"
      :dataSource="testDataSource"
      @beforeDataUpdate="beforeDataUpdate"
      @dataUpdated="dataUpdated"
      @drawComplete="drawComplete"
      @renderComplete="renderComplete"
    >
    </fusioncharts>
    <div v-html="displayValue"></div>
  </div>
</template>

<script>
export default {
  name: 'Doughnut',
  props: ['data', 'label', 'todaysValue'],
  methods: {
    // Binding Life Cycle events
    beforeDataUpdate: function() {
      const prevValue = this.displayValue
      this.displayValue = prevValue + ' beforeDataUpdate'
    },
    dataUpdated: function() {
      const prevValue = this.displayValue
      this.displayValue = prevValue + ', dataUpdated'
    },
    drawComplete: function() {
      const prevValue = this.displayValue
      this.displayValue = prevValue + ', drawComplete'
    },
    renderComplete: function() {
      const prevValue = this.displayValue
      this.displayValue = prevValue + ', renderComplete'
    },
  },
  data() {
    return {
      displayValue: '<b>Status: </b>',
      type: 'doughnut2d',
      width: '100%',
      height: '100%',
      dataFormat: 'json',
      testDataSource: {
        chart: {
          // Functional Attribues
          showLabels: 0,
          showValues: 0,
          showPercentValues: 0,
          showPercentInTooltip: 0,
          theme: 'fusion',
          // Pie / Doughnut Properties
          pieRadius: '90%',
          doughnutRadius: '60%',
          startingAngle: 0,
          enableSlicing: 0,
          slicingDistance: 0,
          enableRotation: 0,
          enableMultiSlicing: 0,
          // Smart Labels & Lines
          enableSmartLabels: 0,
          // Legend Properties
          showLegend: 0,
          // Center Label Cosmetics
          defaultCenterLabel: `${this.label} ${this.$options.filters.numFormat(
            this.todaysValue,
            '$0,0.00'
          )}`,
          // defaultCenterLabel: this.label + ' ' + this.todaysValue,
          centerLabel: `$label: ${this.$options.filters.numFormat(
            '$value',
            '0,0.00%'
          )}`,
          // centerLabel: '$label: $value',
          // Number Formatting
          decimals: 0,
        },
        data: this.data,
      },
    }
  },
}
</script>
