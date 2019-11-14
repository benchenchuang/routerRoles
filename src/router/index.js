import Vue from 'vue';
import Router from 'vue-router';
import store from '../vuex/index'
import AllRoutesData from '../router/fullpath';
import * as util from '../assets/util.js';
Vue.use(Router);

let baseRoute = [{
  path: '/login',
  name: '登录',
  component: (resolve) => require(['../pages/login.vue'], resolve)
}, {
  path: '/401',
  name: '无权访问',
  component: (resolve) => require(['../pages/common/401.vue'], resolve)
}, {
  path: '/404',
  name: '找不到页面',
  component: (resolve) => require(['../pages/common/404.vue'], resolve)
}];

let router = new Router({
  routes: baseRoute
});

router.beforeEach((to, from, next) => {
  if(to.meta.title){
      document.title = to.meta.name || '';
  }
  let info = store.state.userInfo;//获取用户信息
  let infoLength = Object.keys(info).length===0;
  if(infoLength && to.path!=='/login'){
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || '';
    if(userInfo){
      store.dispatch('userInfo', userInfo)//用户信息存入vuex
      store.dispatch('getPermission', 'roottoken').then(res=>{
        console.log(222)
        let actualRouter = res;
        let originPath = util.deepCopy(AllRoutesData);
        originPath[0].children = actualRouter;
        router.addRoutes(originPath.concat([{
            path: '*',
            redirect: '/404'
        }]));
        setTimeout(()=>{
          next({ ...to, replace: true })
        },100)
      });
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      });
    }
  }else{
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || ''
    if(to.path=='/login'){
      if(userInfo){
        next({
          path: '/'
        });
      }else{
        next()
      }
    }else{
      next()
    }
  }
})

export default router;
