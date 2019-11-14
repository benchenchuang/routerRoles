# education_project

> education_project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 路由返回格式

{
  "name": "管理端",
  "resources": [
    {
      "id": "2c9180895e172348015e1740805d000d",
      "name": "账号-获取",
      "summary": null,
      "url": "/accounts",
      "method": "GET"
    },
    {
      "id": "2c9180895e172348015e1740c30f000e",
      "name": "账号-删除",
      "summary": null,
      "url": "/account/**",
      "method": "DELETE"
    },
    {
      "id": "2c9180895e172348015e1741148a000f",
      "name": "账号-修改",
      "summary": null,
      "url": "/account/**",
      "method": "PUT"
    },
    {
      "id": "2c9180895e172348015e1840b98f0013",
      "name": "账号-分配角色",
      "summary": null,
      "url": "/account/*/roles",
      "method": "POST"
    },
    {
      "id": "2c9180895e172348015e173cd55f0009",
      "name": "角色-获取",
      "summary": null,
      "url": "/roles",
      "method": "GET"
    },
    {
      "id": "2c9180895e172348015e173e83ac000a",
      "name": "角色-删除",
      "summary": null,
      "url": "/role/**",
      "method": "DELETE"
    },
    {
      "id": "2c9180895e172348015e173eb9a4000b",
      "name": "角色-修改",
      "summary": null,
      "url": "/role/**",
      "method": "PUT"
    },
    {
      "id": "2c9180895e172348015e173f2fcc000c",
      "name": "角色-添加",
      "summary": null,
      "url": "/role",
      "method": "POST"
    },
    {
      "id": "4028811a5e1820d9015e1824acf20000",
      "name": "登录",
      "summary": null,
      "url": "/signin",
      "method": "GET"
    }
  ],
  "id": "2c9180895e172348015e1740805d000d",
  "menus": [
    {
      "id": "2c9180895e13261e015e13469b7e0000",
      "name": "平台-角色管理",
      "parent_id": null,
      "route": "roles",
      "summary": null
    },
    {
      "id": "2c9180895e13261e015e1346d40a0001",
      "name": "平台-账户管理",
      "parent_id": null,
      "route": "accounts",
      "summary": null
    }
  ]
}

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
