export const formdesignconfig = {
  state: {
    left2: 276,
    left1: 48,
    rigth: 324,
    isleft1: true,
    isleft2: true,
    isrigth: true,
    left: 324,
    designType: 'pc',
    designStep: 'form',
    showcodeeditor: false,
    selectWidget: null,
    setleft(state) {
      state.left = state.left1
      if (state.isleft2) {
        state.left = state.left + state.left2
      }
    },
  },
  mutations: {
    /// 设置左侧导航是否显示
    setIsleft2: (state) => {
      state.isleft2 = !state.isleft2
      state.setleft(state)
    },
    setIsRigth(state) {
      state.isrigth = !state.isrigth
    },
    setdesignType(state, val) {
      state.designType = val
    },
    setshowcodeeditor(state, val) {
      state.showcodeeditor = !state.showcodeeditor
    },
    setselectWidget(state, val) {
      state.selectWidget = val
    },
    setdesignStep(state, val) {
      state.designStep = val
    },
  },
  actions: {
    // 中英文
    setIsleft2({ commit }) {
      commit('setIsleft2')
    },
    setIsRigth({ commit }) {
      commit('setIsRigth')
    },
    setdesignType({ commit }, val) {
      commit('setdesignType', val)
    },
    setdesignStep({ commit }, val) {
      commit('setdesignStep', val)
    },
    setshowcodeeditor({ commit }) {
      commit('setshowcodeeditor')
    },
    setselectWidget({ commit }, val) {
      commit('setselectWidget', val)
    },
  },
}
