export default [{
 
    path: 'opcs',
    name: 'opcs',
    component: () => import('@/views/opcsSupervise/index.vue'),
    redirect: 'opcs/solPermission',
    children: [{
      path: 'solPermission',
      name: 'solPermission',
      component: () => import('@/views/opcsSupervise/opcsPermission/index')
    },

    ]
  },
]