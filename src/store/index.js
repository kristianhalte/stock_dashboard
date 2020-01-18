import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getTimeSeriesData } from '@/services/alpha'

export default new Vuex.Store({
  state: {
    returnedData: [],
    loading: true,
  },

  getters: {
    // Here we will create a getter
  },

  mutations: {
    updateData(state, data) {
      state.returnedData = data
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    async loadTimeSeriesData({ commit }) {
      const data = await getTimeSeriesData()
      commit('updateData', data)
      commit('changeLoadingState', false)
    },
  },
})
