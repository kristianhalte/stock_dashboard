import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ordersArray } from '@/data/orders'
import { getPortfolioDataArrayFromOrdersArray } from '@/services/alpha'

export default new Vuex.Store({
  state: {
    portfolioDataArray: {},
    loading: true,
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    updatePortfolioDataArray(state, portfolioDataArray) {
      state.portfolioDataArray = portfolioDataArray
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
      commit('updatePortfolioDataArray', portfolioDataArray)
      commit('changeLoadingState', false)
    },
  },
})
