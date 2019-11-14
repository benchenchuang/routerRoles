import Vuex from 'vuex'
import Vue from 'vue'
import AllRoutesData from '../router/fullpath';
import * as util from '../assets/util.js';
import instance from '../api';
import { promised } from 'q';

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userInfo: {},//用户信息
        menuList: [],//权限路由
    },
    mutations: {
        userInfo(state,userData){
            state.userInfo = Object.assign({},state.userInfo,userData)
        },
        menuList(state,menus){
            state.menuList = menus;
        },
        CLEAR_MENU(state) {
            state.menuList = []
        },
    },
    actions: {
        userInfo:({commit},userData)=>commit('userInfo',userData),
        getPermission:({commit},token)=>{
            return new Promise((resolve,reject)=>{
                instance.get(`/signin`, {
                    params: {
                      Authorization: token
                    }
                }).then((res) => {
                    commit('CLEAR_MENU')
                    let menuData = res.data;
                    let resourcePermission = getResources(menuData);
                    let routePermission = getRoutes(menuData);
                    let getRouters= extendRoutes(routePermission);
                    commit('menuList',getRouters);
                    Vue.prototype.$_has = function(rArray) {
                        let RequiredPermissions = [];
                        let permission = true;
    
                        if (Array.isArray(rArray)) {
                            rArray.forEach(e => {
                            if(e && e.p){
                                RequiredPermissions = RequiredPermissions.concat(e.p);
                            }
                            });
                        } else {
                            if(rArray && rArray.p){
                            RequiredPermissions = rArray.p;
                            }
                        }
                        
                        for(let i=0;i<RequiredPermissions.length;i++){
                            let p = RequiredPermissions[i];
                            if (!resourcePermission[p]) {
                            permission = false;
                            break;
                            }
                        }
                        return permission;
                    }
                    resolve(getRouters)
                })
            })
            
        }
    }
});
//根据权限筛选路由
function extendRoutes(routePermission){
    let actualRouter = [];
    let findLocalRoute = function(array, base) {
        let replyResult = [];
        array.forEach(route => {
            let pathKey = (base ? base + '/' : '') + route.path;
            if (routePermission[pathKey]) {
                if (Array.isArray(route.children)) {
                    route.children = findLocalRoute(route.children, (base ? base + '/' : '') + route.path);
                }
                replyResult.push(route);
            }
        });
        if (base) {
            return replyResult;
        } else {
            actualRouter = actualRouter.concat(replyResult);
        }
    }
    findLocalRoute(AllRoutesData[0].children);
    actualRouter = actualRouter.map(e => {
        if (e.children) {
            if (!e.meta) e.meta = {};
            e.meta.children = e.children;
        }
        return e
    });
    return actualRouter;
}

function getRoutes(userPermissions) {
    let routeHash = {};
    let setMenu2Hash = function(array, base) {
        array.map(key => {
        if (key.route) {
            let hashKey = ((base ? base + '/' : '') + key.route).replace(/^\//, '');
            routeHash['/' + hashKey] = true;
            if (Array.isArray(key.children)) {
            setMenu2Hash(key.children, (base ? base + '/' : '') + key.route);
            }
        }
        });
    };
    if (Array.isArray(userPermissions.menus)) {
    /*
    * Input Like this: 
    * [{
    *   id: "2c9180895e13261e015e13469b7e0000",
    *   name: "账户管理",
    *   parent_id: "2c9180895e13261e015e13469b7e0000",
    *   route: "some-route"
    * }]
    */
        let arrayMenus = util.buildMenu(userPermissions.menus);
        setMenu2Hash(arrayMenus);
    }
    // Get hash structure
    return routeHash;
}
function getResources(userPermissions) {
    let resourceHash = {};
    if (Array.isArray(userPermissions.resources)) {
      /*
      * Input like this:
      * [{
      *   id: "2c9180895e172348015e1740805d000d"
          method: "GET"
          url: "/some-url"
      * }]
      */
      userPermissions.resources.forEach(e => {
        let key = e.method.toLowerCase() + ',' + e.url;
        resourceHash[key] = true;
      });
    }
    // Get hash structure
    return resourceHash;
}

export default store;