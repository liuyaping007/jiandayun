import Vue from 'vue'
import nxSvgIcon from './index.vue' // svg组件
import generateIconsView from './generateIconsView.js' // just for @/views/icons , you can delete it
// register globally
Vue.component('svg-icon', nxSvgIcon)

const requireAll = (requireContext) => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)
generateIconsView.generate(iconMap)
