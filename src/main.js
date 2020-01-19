import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'
import numeral from 'numeral'
import numFormat from 'vue-filter-number-format'

Vue.use(Buefy)
Vue.filter('numFormat', numFormat(numeral))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
