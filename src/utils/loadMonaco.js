/* eslint-disable */
import { loadScriptQueue } from './loadScript'
import ELEMENT from 'element-ui'

// monaco-editor单例
let monacoEidtor

/**
 * 动态加载monaco-editor cdn资源
 * @param {Function} cb 回调，必填
 */
export default function loadMonaco(cb) {
  if (monacoEidtor) {
    cb(monacoEidtor)
    return
  }
  const vs = '/vs'
  // 使用element ui实现加载提示
  const loading = ELEMENT.Loading.service({
    fullscreen: true,
    lock: true,
    text: '编辑器资源初始化中...',
    spinner: 'el-icon-loading',
    background: 'rgba(255, 255, 255, 0.5)'
  })
  !window.require && (window.require = {})
  !window.require.paths && (window.require.paths = {})
  window.require.paths.vs = vs
  loadScriptQueue(
    [`${vs}/loader.js`, `${vs}/editor/editor.main.nls.js`],
    () => {
      loading.close()
      const code = `function monacofun(cb) {
      require.config({
        paths: {
          vs: '/vs'
        }
      })

      require(['vs/editor/editor.main'], () => {
        cb(monaco)
      })
    }`
      const fun = new Function(`return ${code}`)()
      fun(monaco => {
        monacoEidtor = monaco
        cb(monacoEidtor)
      })
    }
  )
}
