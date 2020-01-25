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
    //TODO: Remove
    testChartData: [
      [
        {
          label: 'Venezuela',
          value: '290',
        },
        {
          label: 'Saudi',
          value: '260',
        },
        {
          label: 'Canada',
          value: '180',
        },
        {
          label: 'Iran',
          value: '140',
        },
        {
          label: 'Russia',
          value: '115',
        },
        {
          label: 'UAE',
          value: '100',
        },
        {
          label: 'US',
          value: '30',
        },
        {
          label: 'China',
          value: '30',
        },
      ],
      [
        {
          label: 'Venezuela',
          value: '290',
        },
        {
          label: 'Saudi',
          value: '260',
        },
        {
          label: 'Canada',
          value: '180',
        },
        {
          label: 'Iran',
          value: '1140',
        },
        {
          label: 'Russia',
          value: '1115',
        },
        {
          label: 'UAE',
          value: '1100',
        },
        {
          label: 'US',
          value: '130',
        },
        {
          label: 'China',
          value: '130',
        },
      ],
    ],
    myPortfolioData: null,
    // doughnutsData: null,
  },

  getters: {
    // add your getters
    testChartData: state => id => state.testChartData[id],
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
