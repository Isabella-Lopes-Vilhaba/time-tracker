import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import modules from './modules'

const store = createStore({
  state,
  mutations,
  actions,
  modules
})

export default store
