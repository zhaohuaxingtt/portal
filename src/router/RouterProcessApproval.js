import RouterBpm from './RouterBpm'
export default [
  {
    path: '/processApproval',
    name: 'processApproval',
    meta: {
      title: 'processApproval'
    },
    redirect: '/bpm/template',
    component: () => import('@/views/processApproval'),
    children: [...RouterBpm]
  },{
      path: '/processOperation',
      name: 'processOperation',
      meta: {
        title: 'processOperation'
      },
      component: () => import('@/views/processApproval/processOperation'),
  }
]
