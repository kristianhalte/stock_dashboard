import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { orders } from '@/data/orders'
import { getTimeSeriesDataForTickersObject } from '@/services/alpha'
import {
  getTodaysDate,
  getTickersObjectInOrdersObject,
  getFirstOrderDateInOrdersObject,
} from '@/helpers/helpers'

const tickersObject = getTickersObjectInOrdersObject(orders)
const today = getTodaysDate()
const endDate = getFirstOrderDateInOrdersObject(orders)

export default new Vuex.Store({
  state: {
    timeSeriesData: [],
    loading: true,
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    updateTimeSeriesData(state, data) {
      state.timeSeriesData = data
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    async loadTimeSeriesData({ commit }) {
      const data = await getTimeSeriesDataForTickersObject(
        tickersObject,
        today,
        endDate
      )
      commit('updateTimeSeriesData', data)
      commit('changeLoadingState', false)
    },
  },
})
