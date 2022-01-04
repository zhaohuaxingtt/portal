/*
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-28 10:45:04
 * @FilePath: \front-portal-new\src\views\opcsSupervise\commonHeardNav\navData.js
 */
export const tabRouterList = [
    {
      value: 1,
      name: 'OPCS SOL账号授权管理',
      url: '/opcs/list',
      activePath: '/opcs/list',
      key: 'OPCSSOLZHANGHAOSHOUQUANGUANLI'
    },
   
  ]
  export const applicationRouterList = [
    {
      value: 1,
      name: '应用管理',
      url: '/provider/opcs/list/application/manage',
      activePath: '/provider/opcs/list/application/manage',
      key: 'YINGYONGGUANLI',
      icon:'el-icon-s-grid'
    },
    {
        value: 2,
        name: '联系人与用户管理',
        url: '/provider/opcs/list/application/userManage',
        activePath: '/provider/opcs/list/application/userManage',
        key: 'LIANXIRENYUYONGHUGUANLI',
        icon:'el-icon-s-check'
      },
   
  ]