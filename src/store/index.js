import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
  },
  mutations: {
    increase(state) {
      state.count++
    },
  },
  actions: {},
  modules: {},
})
