/* eslint-disable */
import Vue from 'vue'
import store from '@/store'
/** 权限指令 **/
Vue.directive('has', {
  // 当被绑定的元素插入到 DOM 中时...
  inserted: function permission(el, binding, vnode) {
    vnode.key = Date.parse(new Date()) + '_' + Math.ceil(Math.random() * 99999)
    // 如果是内置超级管理员不校验权限 所有权限都返回
    // if (Vue.prototype.parentData.userInfo.roleType === 0) return
    // 获取当前页面的路由 吧参数去掉
    const arr = vnode.context.$route.fullPath.split('?')
    // 获取当前页面的路由 路径
    const currentPageUrl = arr[0]
    // 取出当前页面 拥有的 按钮 权限 id数组
    const currentPermissionArr =
     store.getters.buttonPower || []
    if (
      currentPermissionArr === null ||
      currentPermissionArr === undefined ||
      currentPermissionArr.length === 0
    ) {
      el.parentNode.removeChild(el)
      return
    }
    // console.log('该页面需要绑定的权限数组：-------', currentPermissionArr, Vue.prototype.parentData)
    // console.log('请使用v-has="功能按钮名称" 绑定上')
    // 获取指令按钮权限
    const characteristic =
      binding.value !== undefined && binding.value !== null
        ? binding.value
        : binding.expression
    if (!characteristic) {
      el.parentNode.removeChild(el)
      return
    }
    // if (!characteristic) throw new Error('使用按钮功能权限时 请绑定功能按钮名称')
    // 校验 是否 有该按钮权限
    if (
      currentPermissionArr.findIndex(
        (item) => item.butName === characteristic
      ) === -1
    ) {
      // 不存在权限 则 移除该dom节点
      el.parentNode.removeChild(el)
    }
  }
})
