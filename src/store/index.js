import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    async loadData({ commit }) {
      const data = await getData()
      commit('updateData', data)
      commit('changeLoadingState', false)
    },
  },
})
