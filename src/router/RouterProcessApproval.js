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
  }
]
