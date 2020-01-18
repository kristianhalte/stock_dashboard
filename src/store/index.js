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
    timeSeriesData: {},
    // portfolioData: {},
    loading: true,
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    updateTimeSeriesData(state, data) {
      state.timeSeriesData = data
    },
    updatePortfolioData(state, data) {
      state.portfolioData = data
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    loadPortfolioData({ commit }) {
      const data = { content: 'data from portfolio' }
      commit('updatePortfolioData', data)
      commit('changeLoadingState', false)
    },
    async loadTimeSeriesData({ commit, dispatch }) {
      const data = await getTimeSeriesDataForTickersObject(
        tickersObject,
        today,
        endDate
      )
      commit('updateTimeSeriesData', data)
      dispatch('loadPortfolioData')
    },
  },
})
