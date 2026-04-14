import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/formdesign/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/temporarypreview',
    name: 'temporarypreview',
    component: () => import('../views/preview/temporarypreview.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue'),
    meta: {
      title: '测试页面',
    },
  },
]
const router = new VueRouter({
  // mode: 'history',
  routes,
})

export default router
