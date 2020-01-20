import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ordersArray } from '@/data/orders'
import { doughnutsArray } from '@/data/doughnuts.json'
import { getPortfolioDataArrayFromOrdersArray } from '@/services/alpha'
import { getMyPortfolioData } from '@/helpers/helpers'

export default new Vuex.Store({
  state: {
    rawData: {
      doughnutsArray,
      ordersArray,
    },
    computedData: {
      portfolioDataArray: null,
      loading: true,
    },
    // test: {},
    myPortfolioData: null,
    // doughnutsData: null,
  },

  getters: {
    // add your getters
  },

  mutations: {
    // updateDoughnutData(state, id) {
    //   state.doughnutData = state.doughnutsData[id]
    // },
    updatePortfolioDataArray(state, portfolioDataArray) {
      state.computedData.portfolioDataArray = portfolioDataArray
      state.myPortfolioData = getMyPortfolioData(
        portfolioDataArray,
        doughnutsArray,
        ordersArray
      )
      // state.doughnutsData = getMyDoughnutsData(
      //   portfolioDataArray,
      //   doughnutsArray,
      //   ordersArray
      // )
    },
    changeLoadingState(state, loading) {
      state.computedData.loading = loading
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
