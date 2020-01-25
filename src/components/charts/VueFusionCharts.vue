<template>
  <div>
    <fusioncharts
      :type="type"
      :width="width"
      :height="height"
      :dataFormat="dataFormat"
      :dataSource="dataSource"
    >
    </fusioncharts>
  </div>
</template>

<script>
import VueFusionChartsComponent from 'vue-fusioncharts/component'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
FusionTheme(FusionCharts)

const vueFusionCharts = VueFusionChartsComponent(FusionCharts, Charts)
export default {
  name: 'vuefusioncharts',
  props: ['type', 'width', 'height', 'dataFormat', 'dataSource'],
  components: {
    fusioncharts: vueFusionCharts,
  },
}
</script>
