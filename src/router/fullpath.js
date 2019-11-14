import Abstract from '../pages/common/abstract.vue';

export default [{
  path: '/',
  name: '首页',
  component: (resolve) => require(['../pages/index.vue'], resolve),
  children: [{
    path: '/roles',
    name: '平台-角色管理',
    meta: {
      name: '角色管理'
    },
    component: (resolve) => require(['../pages/roles.vue'], resolve)
  }, {
    path: '/accounts',
    name: '平台-账号管理',
    meta: {
      name: '账号管理'
    },
    component: (resolve) => require(['../pages/accounts.vue'], resolve)
  }, {
    path: '/goods',
    name: '商品管理',
    meta: {
      icon: '&#xe62e;',
      name: '商品管理'
    },
    component: Abstract,
    children: [{
      path: 'list',
      name: '商品信息',
      meta: {
        name: '商品信息'
      },
      component: (resolve) => require(['../pages/goods-list.vue'], resolve)
    }]
  }]
}];