/* eslint-disable */
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'
const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    userId:'',
    userName:'',
    deptcode:'',
    deptname:'',
    organcode:'',
    organname:'',
    deptid:'',
    organid:'',
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    browserHeaderTitle: getStore({
      name: 'browserHeaderTitle'
    }) || 'NxAdmin'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_DEPTCODE: (state, deptcode) => {
      state.deptcode = deptcode
    },
    SET_DEPTNAME: (state, deptname) => {
      state.deptname = deptname
    },
    SET_ORGANCODE: (state, organcode) => {
      state.organcode = organcode
    },
    SET_ORGANNAME: (state, organname) => {
      state.organname = organname
    },
    SET_DEPTID: (state, deptid) => {
      state.deptid = deptid
    },
    SET_ORGANID: (state, organid) => {
      state.organid = organid
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    SET_LOCK: (state) => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    }

  },

  actions: {
    // // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles)
          // } else {
          //   reject(new Error('getInfo: roles must be a non-null array !'))
          // }
          commit('SET_NAME', data.realaname)
          commit('SET_USERID', data.userId)
          commit('SET_USERNAME', data.userName)
          commit('SET_DEPTCODE', data.deptcode)
          commit('SET_DEPTNAME', data.deptname)
          commit('SET_ORGANCODE', data.organcode)
          commit('SET_ORGANNAME', data.organname)
          commit('SET_DEPTID', data.deptid)
          commit('SET_ORGANID', data.organid)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('CLEAR_LOCK')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
