/*
 * @Date: 2021-11-25 09:47:21
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-08 18:10:58
 * @FilePath: \front-portal-new\src\router\RouterOpcs.js
 */
export default [{

    path: '/opcs/list',
    name: 'opcs',
    component: () => import('@/views/opcsSupervise/opcsPermission/index'),
}, {
    path: 'opcs/list/application',
    name: 'application',
    component: () => import('@/views/opcsSupervise/opcsPermission/application/router'),
    redirect: 'opcs/list/application/manage',
    children: [{
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/opcsSupervise/opcsPermission/application/manage/index'),
    }, {
        path: 'userManage',
        name: 'userManage',
        component: () => import('@/views/opcsSupervise/opcsPermission/application/userManage/index'),
    }, ]
}]