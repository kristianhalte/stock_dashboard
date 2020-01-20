import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'
import i18n from './i18n'

Vue.use(Buefy)
Vue.filter('numFormat', numFormat(numeral))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
