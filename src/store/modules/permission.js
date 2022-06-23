/* eslint-disable */
import { queryCurrentMenu } from '@/api/tappmenu'
/**
 *循环获取拥有的菜单权限
 * @param routers
 * @param addrouters
 */
function filterAsyncRouter(routers, addrouters) {
  if(routers.length>0){
    for(let i=0;i<routers.length;i++){
      if(addrouters.indexOf(routers[i].code)<0&&routers[i].code!==''&&routers[i].code!==null){
        addrouters.push({url:routers[i].code,id:routers[i].fid,buttonPower:routers[i].buttonPower})
      }
      if(routers[i].children!==undefined&&routers[i].children!==null&& routers[i].children.length>0){
         filterAsyncRouter(routers[i].children,addrouters)
      }
    }
  }
  return addrouters
}

const permission = {
  state: {
    routers: [],
    addRouters: [],
    isloadmenu: false,
    buttonPower:[]
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = filterAsyncRouter(routers,[])
      state.routers = routers
      state.isloadmenu = true
      state.addRouters.push({url:'404',id:'-1',buttonPower:[]})
      state.addRouters.push({url:'401',id:'-1',buttonPower:[]})
      state.addRouters.push({url:'lock',id:'-1',buttonPower:[]})
      state.addRouters.push({url:'dashboard/dashboard',id:'-1',buttonPower:[]})
      state.addRouters.push({url:'index',id:'-1',buttonPower:[]})
    },
    SET_BUTTONPOWER: (state, userbutton) => {
      state.buttonPower = userbutton
    }
  },
  actions: {
    GenerateRoutes({ commit }, menucode) {
      return new Promise(resolve => {
        queryCurrentMenu(menucode).then(response => {
          commit('SET_ROUTERS', response.data.menuData)
          resolve(response)
        })
      })
    }
  }
}

export default permission
