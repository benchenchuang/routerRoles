import Vue from 'vue';
import Router from 'vue-router';
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
  let routeName = to.meta.name || to.name;
  window.document.title = (routeName ? routeName + ' - ' : '') + 'Vue-Access-Control';

  let userInfo = util.session('token') || '';

  if (!userInfo || !userInfo.token) {
    return vm.$router.push({ path: '/login', query: { from: vm.$router.currentRoute.path } });
  }else{
    if(to.path=='/login'){
      next({
        path: '/'
      });
    }else{
      next()
    }
  }
});

export default router;
