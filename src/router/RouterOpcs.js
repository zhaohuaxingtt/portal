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
                component: () => import('@/views/opcsSupervise/opcsPermission/application/manage'),
            }, ]
        },

    ]
}, ]