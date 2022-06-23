import Vue from 'vue'
import App from './App'
import router from './router'
import './permission' // permission control
import './components/antDesignComp/index' // ant组件
import * as filters from './filters' // 全局过滤器
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './portal-public-path'
import i18n from './lang'
import store from './store'
// 右键菜单
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import '@/icons/index.js' // icon
import '@/Permission/btnPermission.js'
import { loadScriptQueue } from '@/utils/loadScript'
// 全局过滤器
Object.keys(filters).forEach(filterName => {
  Vue.filter(filterName, filters[filterName])
})
Vue.use(contentmenu)
Vue.use(ElementUI)
Vue.config.productionTip = false

function render() {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}

// 判断 package.json 字段和 router的 base字段一致不
const { base, mode } = router.options
if (window.__POWERED_BY_QIANKUN__) {
  if (mode !== 'history') {
    throw new Error('在此子应用中router.js 中开启 browserhistory，不懂联系csj')
  } else if ('/' + name !== base) {
    throw new Error(
      '请保证router.js 中 base字段与 package.json字段一致 如 /sub-app1 不懂联系csj'
    )
  }
}
// 确保子应用独立运行
render()
// export async function bootstrap(props = {}) {
//   // eslint-disable-next-line no-console
//   // console.log('子应用 加载中')
//   // 父应用传递的值 挂载vue原型上  默认有 userInfo  tokenz
//   // 在页面中可通过 this.parentData 获取
//   Vue.prototype.parentData = {
//     ...props.data
//   }
//   // 父应用传递的 方法 挂载原型上  默认有 退出方法 portal_logout
//   // 在页面中可通过 this.parentFns 获取
//   Vue.prototype.parentFns = props.fns
// }

// export async function mount() {
//   // eslint-disable-next-line no-console
//   // console.log('子应用 加载完毕')
//   render()
// }

// export async function unmount() {
//   instance.$destroy()
//   instance = null
// }
function buildLinks(links) {
  let strs = ''
  links.forEach(url => {
    strs += `<link href="${url}" rel="stylesheet">`
  })
  return strs
}
window.addEventListener('message', init, false)
const childAttrs = {
  file: '',
  dialog:
    ' width="600px" class="dialog-width" v-if="visible" :visible.sync="visible" :modal-append-to-body="false" '
}
function init(event) {
  if (event.data.type === 'refreshFrame') {
    const $previewApp = document.getElementById('previewApp')
    const code = event.data.data
    const attrs = childAttrs[code.generateConf.type]
    let links = ''

    if (Array.isArray(code.links) && code.links.length > 0) {
      links = buildLinks(code.links)
    }

    $previewApp.innerHTML = `${links}<style>${code.css}</style><div id="appmain"></div>`

    if (Array.isArray(code.scripts) && code.scripts.length > 0) {
      loadScriptQueue(code.scripts, () => {
        newVue(attrs, code.js, code.html)
      })
    } else {
      newVue(attrs, code.js, code.html)
    }
  }
}
function newVue(attrs, main, html) {
  main = eval(`(${main})`)
  main.template = `<div>${html}</div>`
  new Vue({
    components: {
      child: main
    },
    data() {
      return {
        visible: true
      }
    },
    template: `<div><child ${attrs}/></div>`
  }).$mount('#appmain')
}
