import Vuex from 'vuex'
import Vue from 'vue'
import AllRoutesData from '../router/fullpath';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},//用户信息
        menuList: [],//权限路由
        parentName:'',//路由所属父级名称
    },
    mutations: {
        userInfo(state,userData){
            state.userInfo = Object.assign({},state.userInfo,userData)
        },
        menuList(state,menus){
            state.menuList = menus;
        },
        parentName(state,parentName){
            state.parentName = parentName
        },
        getParent(state){
            return state.parentName
        },
        CLEAR_MENU(state) {
            state.menuList = []
        },
    },
    actions: {
        parentName:({commit},parentName)=>commit('parentName',parentName),
        userInfo:({commit},userData)=>commit('userInfo',userData),
        permission:({commit},role)=>{
            let routerArry= deepCopy(AdminRouter);
            const getRouters= filterAsyncRouter(routerArry,role);
            if(role==6){
                getRouters[0].redirect="/meke/enlist";
            }
            commit('menuList',getRouters)
        },
        getParentName:({commit})=>{
            return commit('getParent')
        }
    }
});
//根据权限筛选路由
function filterAsyncRouter(asyncRouterMap,role){
    // return asyncRouterMap
    let accessedRouters = asyncRouterMap.filter(route => {
        if (route.meta.role.indexOf(role) >= 0) {
          if (route.children && route.children.length) {
            route.children = filterAsyncRouter(route.children, role)
          }
          return true
        }
        return false
    })
    return accessedRouters;
}
//深拷贝
function deepCopy(routerArr){
    return routerArr.map(arr=>{
        arr = Object.assign({},arr);
        return arr;
    })
}

export default store;