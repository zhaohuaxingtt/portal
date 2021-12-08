/*
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-08 18:16:04
 * @FilePath: \front-portal-new\src\views\opcsSupervise\commonHeardNav\navData.js
 */
export const tabRouterList = [
    {
      value: 1,
      name: 'OPCS SOL账号授权管理',
      url: '/opcs/list',
      activePath: '/opcs/list',
      key: 'OPCS SOL账号授权管理'
    },
   
  ]
  export const applicationRouterList = [
    {
      value: 1,
      name: '应用管理',
      url: '/opcs/list/application/manage',
      activePath: '/opcs/list/application/manage',
      key: '应用管理',
      icon:'el-icon-s-grid'
    },
    {
        value: 2,
        name: '联系人与用户管理',
        url: '/opcs/list/application/userManage',
        activePath: '/opcs/list/application/userManage',
        key: '联系人与用户管理',
        icon:'el-icon-s-check'
      },
   
  ]