/*
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-07 16:10:29
 * @FilePath: \front-portal-new\src\views\opcsSupervise\commonHeardNav\navData.js
 */
export const tabRouterList = [
    {
      value: 1,
      name: 'OPCS SOL账号授权管理',
      url: '/opcs/solPermission',
      activePath: '/opcs/solPermission',
      key: 'OPCS SOL账号授权管理'
    },
   
  ]
  export const applicationRouterList = [
    {
      value: 1,
      name: '应用管理',
      url: '/opcs/application/manage',
      activePath: '/opcs/application/manage',
      key: '应用管理',
      icon:'el-icon-s-grid'
    },
    {
        value: 2,
        name: '联系人与用户管理',
        url: '/opcs/application/userManage',
        activePath: '/opcs/application/userManage',
        key: '联系人与用户管理',
        icon:'el-icon-s-check'
      },
   
  ]