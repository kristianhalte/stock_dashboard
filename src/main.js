import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'
import i18n from './i18n'
import VueFusionCharts from 'vue-fusioncharts'
import FusionCharts from 'fusioncharts'
import FusionMaps from 'fusioncharts/fusioncharts.maps'
import World from 'fusioncharts/maps/fusioncharts.world'
import Column2D from 'fusioncharts/fusioncharts.charts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

// Register VueFusionCharts component
Vue.use(VueFusionCharts, FusionCharts, FusionMaps, World, Column2D, FusionTheme)

Vue.use(Buefy)
Vue.filter('numFormat', numFormat(numeral))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
