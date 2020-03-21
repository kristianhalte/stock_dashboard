import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import data from '@/data/data.json'
// import { getData } from '@/services'
import {
  mainLabelGetter,
  mainValueGetter,
  mainGainGetter,
  mainDividendGetter,
  mainReturnsGetter,
  mainDoughnutChartDataGetter,
  mainPlotChartDataGetter,
  mainTableDataGetter,
} from '@/store/getters/mainGetters'
import {
  portfolioLabelGetter,
  portfolioValueGetter,
  portfolioGainGetter,
  portfolioDividendGetter,
  portfolioReturnsGetter,
  portfolioDoughnutChartDataGetter,
  portfolioPlotChartDataGetter,
  portfolioTableDataGetter,
} from '@/store/getters/portfolioGetters'
import {
  categoryLabelGetter,
  categoryValueGetter,
  categoryGainGetter,
  categoryDividendGetter,
  categoryReturnsGetter,
  categoryDoughnutChartDataGetter,
  categoryPlotChartDataGetter,
  categoryTableDataGetter,
} from '@/store/getters/categoryGetters'
export default new Vuex.Store({
  state: {
    data: data,
    loading: false,
    dateRange: 'a',
  },

  getters: {
    getData: state => id => state.data.portfolios[id],
    // Main Getters
    mainLabel: state => mainLabelGetter(state.data),
    mainValue: state => mainValueGetter(state.data),
    mainGain: state => dateRange => mainGainGetter(state.data, dateRange),
    mainDividend: state => dateRange =>
      mainDividendGetter(state.data, dateRange),
    mainReturns: state => dateRange => mainReturnsGetter(state.data, dateRange),
    mainDoughnutChartData: state => mainDoughnutChartDataGetter(state.data),
    mainPlotChartData: state => dateRange =>
      mainPlotChartDataGetter(state.data, dateRange),
    mainTableData: state => dateRange =>
      mainTableDataGetter(state.data, dateRange),
    // Category Getters
    portfolioLabel: state => port_id =>
      portfolioLabelGetter(state.data.portfolios[port_id]),
    portfolioValue: state => port_id =>
      portfolioValueGetter(state.data.portfolios[port_id]),
    portfolioGain: state => (port_id, dateRange) =>
      portfolioGainGetter(state.data.portfolios[port_id], dateRange),
    portfolioDividend: state => (port_id, dateRange) =>
      portfolioDividendGetter(state.data.portfolios[port_id], dateRange),
    portfolioReturns: state => (port_id, dateRange) =>
      portfolioReturnsGetter(state.data.portfolios[port_id], dateRange),
    portfolioDoughnutChartData: state => port_id =>
      portfolioDoughnutChartDataGetter(state.data.portfolios[port_id]),
    portfolioPlotChartData: state => (port_id, dateRange) =>
      portfolioPlotChartDataGetter(state.data.portfolios[port_id], dateRange),
    portfolioTableData: state => (port_id, dateRange) =>
      portfolioTableDataGetter(state.data.portfolios[port_id], dateRange),
    // Category Getters
    categoryLabel: state => (port_id, cat_id) =>
      categoryLabelGetter(state.data.portfolios[port_id].categories[cat_id]),
    categoryValue: state => (port_id, cat_id) =>
      categoryValueGetter(state.data.portfolios[port_id].categories[cat_id]),
    categoryGain: state => (port_id, cat_id, dateRange) =>
      categoryGainGetter(
        state.data.portfolios[port_id].categories[cat_id],
        dateRange
      ),
    categoryDividend: state => (port_id, cat_id, dateRange) =>
      categoryDividendGetter(
        state.data.portfolios[port_id].categories[cat_id],
        dateRange
      ),
    categoryReturns: state => (port_id, cat_id, dateRange) =>
      categoryReturnsGetter(
        state.data.portfolios[port_id].categories[cat_id],
        dateRange
      ),
    categoryDoughnutChartData: state => (port_id, cat_id) =>
      categoryDoughnutChartDataGetter(
        state.data.portfolios[port_id].categories[cat_id]
      ),
    categoryPlotChartData: state => (port_id, cat_id, dateRange) =>
      categoryPlotChartDataGetter(
        state.data.portfolios[port_id].categories[cat_id],
        dateRange
      ),
    categoryTableData: state => (port_id, cat_id, dateRange) =>
      categoryTableDataGetter(
        state.data.portfolios[port_id].categories[cat_id],
        dateRange
      ),
  },

  mutations: {
    // updateDataState(state, data) {
    //   state.data = data
    // },
    // changeLoadingState(state, loading) {
    //   state.loading = loading
    // },
    updateDateRange(state, value) {
      state.dateRange = value
    },
  },

  // actions: {
  //   async loadData({ commit }) {
  //     const data = await getData()
  //     commit('updateDataState', data)
  //     commit('changeLoadingState', false)
  //   },
  // },
})
