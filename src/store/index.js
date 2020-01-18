import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ordersArray } from '@/data/orders'
import { getPortfolioDataArrayFromOrdersArray } from '@/services/alpha'

export default new Vuex.Store({
  state: {
    portfolioData: {},
    loading: true,
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    updatePortfolioData(state, data) {
      state.portfolioData = data
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    async loadPortfolioData({ commit }) {
      const portfolioDataArray = await getPortfolioDataArrayFromOrdersArray(
        ordersArray
      )
      commit('updatePortfolioData', portfolioDataArray)
      commit('changeLoadingState', false)
    },
  },
})
