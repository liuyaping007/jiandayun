/* eslint-disable */
import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权
import { setTitle } from '@/utils/util' // 设置浏览器头部标题
// permission judge function
function hasPermission(routers, permissionrouters) {
  if (permissionrouters === '') {
    return true
  }
  if (permissionrouters.indexOf('/') === 0) {
    permissionrouters = permissionrouters.substring(1)
  }
  if (routers !== undefined && routers !== null) {
    const routerList = routers.filter(function (entity) {
      return permissionrouters.indexOf(entity.url) >= 0
    })
    if (routerList.length > 0) {
      store.commit('SET_BUTTONPOWER', routerList[0].buttonPower)
      return true
    }
  }
  return false
}
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  const islogin = false
  if (islogin === true) {
    if (getToken()) {
      // 设置浏览器头部标题
      const browserHeaderTitle = to.meta.title
      store.commit('SET_BROWSERHEADERTITLE', {
        browserHeaderTitle,
      })
      /* has token */
      if (store.getters.isLock && to.path !== '/lock') {
        next({
          path: '/lock',
        })
        NProgress.done()
      } else if (to.path === '/login') {
        next({
          path: '/',
        })
        NProgress.done()
      } else if (store.getters.isloadmenu !== true) {
        store
          .dispatch('GenerateRoutes')
          .then(() => {
            // 根据roles权限生成可访问的路由表
            // router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            if (!hasPermission(store.getters.addRouters, to.path)) {
              next({
                path: '/401',
                replace: true,
                query: {
                  noGoBack: true,
                },
              })
            }
          })
          .catch((err) => {
            store.dispatch('FedLogOut').then(() => {
              Message.error(err || 'Verification failed, please login again')
              next({
                path: '/',
              })
            })
          })
      } else if (hasPermission(store.getters.addRouters, to.fullPath)) {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        next() //
      } else {
        next({
          path: '/401',
          replace: true,
          query: {
            noGoBack: true,
          },
        })
      }
    } else {
      // 设置浏览器头部标题
      const browserHeaderTitle = to.name
      store.commit('SET_BROWSERHEADERTITLE', {
        browserHeaderTitle,
      })
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next('/login')
        NProgress.done()
      }
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
  setTimeout(() => {
    const browserHeaderTitle = store.getters.browserHeaderTitle
    setTitle(browserHeaderTitle)
  }, 0)
})
