import Vue from 'vue'
import Vuex from 'vuex'

import { formdesignconfig } from './formdesign.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    formdesignconfig,
  },
})

export default store
