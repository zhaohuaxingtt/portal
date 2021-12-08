/*
 * @Date: 2021-11-25 09:47:21
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-08 16:42:21
 * @FilePath: \front-portal-new\src\router\RouterOpcs.js
 */
export default [{

    path: 'opcs',
    name: 'opcs',
    component: () => import('@/views/opcsSupervise/router.vue'),
    redirect: 'opcs/solPermission',
    children: [{
            path: 'solPermission',
            name: 'solPermission',
            component: () => import('@/views/opcsSupervise/opcsPermission/index'),
        }, {
            path: 'application',
            name: 'application',
            component: () => import('@/views/opcsSupervise/opcsPermission/application/router'),
            redirect: 'application/manage',
            children: [{
                path: 'manage',
                name: 'manage',
                component: () => import('@/views/opcsSupervise/opcsPermission/application/manage/index'),
            },{
                path: 'userManage',
                name: 'userManage',
                component: () => import('@/views/opcsSupervise/opcsPermission/application/userManage/index'),
            },  ]
        },

    ]
}, ]