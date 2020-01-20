import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ordersArray } from '@/data/orders'
import { doughnutsArray } from '@/data/doughnuts.json'
import { getPortfolioDataArrayFromOrdersArray } from '@/services/alpha'
import {
  getPortfolioLineChartDataset,
  getDoughnutChartDataset,
  getTodaysValue,
  getTodaysGain,
  getTodaysReturn,
  getSubPortfolioDataArray,
} from '@/helpers/helpers'

export default new Vuex.Store({
  state: {
    rawData: {
      doughnutsArray,
      ordersArray,
    },
    computedData: {
      portfolioDataArray: {},
      // doughnutId: 0,
      loading: true,
    },
    myPortfolioData: {
      todaysValue: 5,
      todaysGain: 4,
      todaysReturn: 3,
      doughnutChartDatase: [],
      lineChartDataset: [],
    },
    doughnutsData: [
      {
        todaysValue: 5,
        todaysGain: 4,
        todaysReturn: 3,
        doughnutChartDatase: [],
        lineChartDataset: [],
      },
      {
        todaysValue: 5,
        todaysGain: 4,
        todaysReturn: 3,
        doughnutChartDatase: [],
        lineChartDataset: [],
      },
      {
        todaysValue: 5,
        todaysGain: 4,
        todaysReturn: 3,
        doughnutChartDatase: [],
        lineChartDataset: [],
      },
    ],
  },

  getters: {
    todaysValue: state => getTodaysValue(state.computedData.portfolioDataArray),
    todaysGain: state => getTodaysGain(state.computedData.portfolioDataArray),
    todaysReturn: state =>
      getTodaysReturn(state.computedData.portfolioDataArray),
    doughnutChartDataset: state =>
      getDoughnutChartDataset(state.rawData.doughnutsArray),
    portfolioLineChartDataset: state =>
      getPortfolioLineChartDataset(state.computedData.portfolioDataArray),

    subPortfolioDataArray: state => id =>
      getSubPortfolioDataArray(state.computedData.portfolioDataArray, id),
    subDoughnutArray: state => id =>
      state.rawData.doughnutsArray[id].subDoughnutsArray,
  },

  mutations: {
    updatePortfolioDataArray(state, portfolioDataArray) {
      state.computedData.portfolioDataArray = portfolioDataArray
    },
    // updateDoughnutId(state, id) {
    //   state.doughnutId = id
    // },
    changeLoadingState(state, loading) {
      state.computedData.loading = loading
    },
  },

  actions: {
    // getDoughnutId({ commit }, id) {
    //   commit('updateDoughnutId', id)
    // },
    async loadPortfolioData({ commit }) {
      const portfolioDataArray = await getPortfolioDataArrayFromOrdersArray(
        ordersArray
      )
      commit('updatePortfolioDataArray', portfolioDataArray)
      commit('changeLoadingState', false)
    },
  },
})
