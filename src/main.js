import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons/index.js' // icon
import 'font-awesome/css/font-awesome.min.css'
import '@/style/index.css'
import '@/style/cuIcon.css'
import * as XLSX from 'xlsx'
// import { addListener, launch } from 'devtools-detector'
// addListener((isOpen) =>
//   isOpen ? (location.href = 'https://www.baidu.com') : ''
// )

function queryUrlParam(queryName) {
  const reg = new RegExp('(^|&)' + queryName + '=([^&]*)(&|$)', 'i')
  if (window.location.search !== '') {
    const r = window.location.search.substring(1).match(reg)
    if (r != null) return decodeURI(unescape(r[2]))
    return null
  }
  const r = window.location.hash.replace('#/?', '&').match(reg)
  if (r != null) return decodeURI(unescape(r[2]))
  return null
}
Vue.prototype.$query = queryUrlParam
Vue.prototype.$event = {}
Vue.config.productionTip = false
Vue.prototype.$XLSX = XLSX
Vue.use(ElementUI)
new Vue({ router, store, render: (h) => h(App) }).$mount('#app')
