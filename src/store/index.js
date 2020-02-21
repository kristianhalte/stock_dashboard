import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getData } from '@/services'
export default new Vuex.Store({
  state: {
    data: null,
    loading: true,
  },

  getters: {},

  mutations: {
    // updateDoughnutData(state, id) {
    //   state.doughnutData = state.doughnutsData[id]
    // },
    updateDataState(state, data) {
      state.data = data
    },
    changeLoadingState(state, loading) {
      state.loading = loading
    },
  },

  actions: {
    async loadData({ commit }) {
      const data = await getData()
      commit('updateDataState', data)
      commit('changeLoadingState', false)
    },
  },
})
