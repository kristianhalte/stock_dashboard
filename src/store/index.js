import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { ordersArray } from '@/data/orders'
import { doughnutsArray } from '@/data/doughnuts.json'
import { getPortfolioDataArrayFromOrdersArray } from '@/services/alpha'
import { getTimeSeriesArrayFromOrdersArray } from '@/services'
import { getMyDoughnutsData } from '@/helpers'
import {
  getMainTodaysValue,
  getMainTodaysGain,
  getMainTodaysDividend,
  getMainTodaysReturn,
  getMainDoughnutData,
  getMainLineChartData,
  getMainTableData,
  getDoughnutLabel,
  getDoughnutTodaysValue,
  getDoughnutTodaysGain,
  getDoughnutTodaysDividend,
  getDoughnutTodaysReturn,
  getDoughnutDoughnutData,
  getDoughnutLineChartData,
  getDoughnutTableData,
} from '@/helpers/getterHelpers'
import { getMyPortfolioData } from '@/helpers/helpers'
export default new Vuex.Store({
  state: {
    rawData: {
      doughnutsArray,
      ordersArray,
    },
    computedData: {
      portfolioDataArray: null,
      timeSeriesArray: null,
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
    myDoughnutsData: [
      // [
      //   {
      //     label: 'Venezuela',
      //     value: '290',
      //   },
      //   {
      //     label: 'Saudi',
      //     value: '260',
      //   },
      //   {
      //     label: 'Canada',
      //     value: '180',
      //   },
      //   {
      //     label: 'Iran',
      //     value: '140',
      //   },
      //   {
      //     label: 'Russia',
      //     value: '115',
      //   },
      //   {
      //     label: 'UAE',
      //     value: '100',
      //   },
      //   {
      //     label: 'US',
      //     value: '30',
      //   },
      //   {
      //     label: 'China',
      //     value: '30',
      //   },
      // ],
      // [
      //   {
      //     label: 'Venezuela',
      //     value: '290',
      //   },
      //   {
      //     label: 'Saudi',
      //     value: '260',
      //   },
      //   {
      //     label: 'Canada',
      //     value: '180',
      //   },
      //   {
      //     label: 'Iran',
      //     value: '1140',
      //   },
      //   {
      //     label: 'Russia',
      //     value: '1115',
      //   },
      //   {
      //     label: 'UAE',
      //     value: '1100',
      //   },
      //   {
      //     label: 'US',
      //     value: '130',
      //   },
      //   {
      //     label: 'China',
      //     value: '130',
      //   },
      // ],
    ],
  },

  getters: {
    // add your getters
    testChartData: state => id => state.testChartData[id],
    getMyDoughnutData: state => id => state.myDoughnutsData[id],
    // new Main
    getMainTodaysValue: state => getMainTodaysValue(state.myDoughnutsData),
    getMainTodaysGain: state => getMainTodaysGain(state.myDoughnutsData),
    getMainTodaysDividend: state =>
      getMainTodaysDividend(state.myDoughnutsData),
    getMainTodaysReturn: state => getMainTodaysReturn(state.myDoughnutsData),
    getMainDoughnutData: state => getMainDoughnutData(state.myDoughnutsData),
    getMainLineChartData: state => getMainLineChartData(state.myDoughnutsData),
    getMainTableData: state => getMainTableData(state.myDoughnutsData),
    // new Doughnut
    getDoughnutLabel: state => id =>
      getDoughnutLabel(state.myDoughnutsData[id]),
    getDoughnutTodaysValue: state => id =>
      getDoughnutTodaysValue(state.myDoughnutsData[id]),
    getDoughnutTodaysGain: state => id =>
      getDoughnutTodaysGain(state.myDoughnutsData[id]),
    getDoughnutTodaysDividend: state => id =>
      getDoughnutTodaysDividend(state.myDoughnutsData[id]),
    getDoughnutTodaysReturn: state => id =>
      getDoughnutTodaysReturn(state.myDoughnutsData[id]),
    getDoughnutDoughnutData: () => id =>
      getDoughnutDoughnutData(doughnutsArray[id]),
    getDoughnutLineChartData: state => id =>
      getDoughnutLineChartData(state.myDoughnutsData[id]),
    getDoughnutTableData: state => id =>
      getDoughnutTableData(state.myDoughnutsData[id]),
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
      // state.myDoughnutsData = getMyDoughnutsData(
      //   portfolioDataArray,
      //   doughnutsArray,
      //   ordersArray
      // )
    },
    updateAlphaDataArray(state, timeSeriesArray) {
      state.computedData.timeSeriesArray = timeSeriesArray
      state.myDoughnutsData = getMyDoughnutsData(
        timeSeriesArray,
        ordersArray,
        doughnutsArray
      )
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
    async loadAlphaData({ commit }) {
      const timeSeriesArray = await getTimeSeriesArrayFromOrdersArray(
        ordersArray
      )
      commit('updateAlphaDataArray', timeSeriesArray)
      commit('changeLoadingState', false)
    },
  },
})
